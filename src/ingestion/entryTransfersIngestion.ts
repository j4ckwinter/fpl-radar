import { getCache } from "../lib/cache/cache";
import { prisma } from "../lib/prisma";
import { FplClient } from "../fpl/fplClient";
import type { IngestionLogger } from "./bootstrapIngestion";

const DEFAULT_CONCURRENCY = 5;

export interface IngestLeagueEntryTransfersResult {
  leagueId: number;
  processed: number;
  succeeded: number;
  failed: number;
  insertedTransfers: number;
  updatedProfiles: number;
}

/** Group key for (eventId, time) to avoid double-counting hit cost. */
function groupKey(eventId: number, time: Date): string {
  return `${eventId}:${time.getTime()}`;
}

/**
 * Groups transfers by (eventId, time). Used to compute hit cost per "batch"
 * (FPL can repeat cost for each transfer in the same batch; we take max per group).
 */
export function groupTransfers(
  transfers: Array<{ eventId: number; time: Date; cost: number | null }>
): Map<string, Array<{ eventId: number; time: Date; cost: number | null }>> {
  const map = new Map<
    string,
    Array<{ eventId: number; time: Date; cost: number | null }>
  >();
  for (const t of transfers) {
    const key = groupKey(t.eventId, t.time);
    const list = map.get(key) ?? [];
    list.push(t);
    map.set(key, list);
  }
  return map;
}

export interface BehaviourProfileStats {
  transfersCount: number;
  hitsCount: number;
  totalHitCost: number;
  avgTransfersPerGw: number;
  hitRate: number;
  lastTransferAt: Date | null;
}

/**
 * Computes behaviour profile stats from transfer rows. Groups by (eventId, time)
 * to avoid double-counting hit cost (use max cost per group).
 * hitsCount = number of groups where cost > 0.
 */
export function computeProfile(
  transfers: Array<{ eventId: number; time: Date; cost: number | null }>
): BehaviourProfileStats {
  if (transfers.length === 0) {
    return {
      transfersCount: 0,
      hitsCount: 0,
      totalHitCost: 0,
      avgTransfersPerGw: 0,
      hitRate: 0,
      lastTransferAt: null,
    };
  }

  const groups = groupTransfers(transfers);
  const distinctEvents = new Set(transfers.map((t) => t.eventId));
  const numEventsWithTransfers = distinctEvents.size;

  let hitsCount = 0;
  let totalHitCost = 0;

  for (const group of groups.values()) {
    const maxCost = Math.max(
      0,
      ...group.map((t) => t.cost ?? 0).filter((n) => n > 0)
    );
    if (maxCost > 0) {
      hitsCount += 1;
      totalHitCost += maxCost;
    }
  }

  const lastTransferAt = transfers.reduce((latest, t) => {
    return t.time > latest ? t.time : latest;
  }, transfers[0].time);

  const avgTransfersPerGw =
    numEventsWithTransfers > 0
      ? transfers.length / numEventsWithTransfers
      : 0;
  const hitRate =
    numEventsWithTransfers > 0 ? hitsCount / numEventsWithTransfers : 0;

  return {
    transfersCount: transfers.length,
    hitsCount,
    totalHitCost,
    avgTransfersPerGw,
    hitRate,
    lastTransferAt,
  };
}

/**
 * Process one entry: fetch transfers, insert with skipDuplicates, recompute profile from DB, upsert profile.
 * Returns number of transfer rows inserted this run.
 */
async function processEntry(
  prismaClient: typeof prisma,
  client: FplClient,
  entryId: number
): Promise<{ insertedCount: number }> {
  const raw = await client.getEntryTransfers({ entryId });

  const rows = raw.map((t) => ({
    entryId,
    eventId: t.event,
    time: new Date(t.time),
    playerInId: t.element_in,
    playerOutId: t.element_out,
    value: t.value ?? null,
    bank: t.bank ?? null,
    cost: t.cost ?? null,
  }));

  const createResult = await prismaClient.fplEntryTransfer.createMany({
    data: rows,
    skipDuplicates: true,
  });

  const dbTransfers = await prismaClient.fplEntryTransfer.findMany({
    where: { entryId },
    select: { eventId: true, time: true, cost: true },
  });

  const stats = computeProfile(
    dbTransfers.map((t) => ({
      eventId: t.eventId,
      time: t.time,
      cost: t.cost,
    }))
  );

  await prismaClient.fplEntryBehaviourProfile.upsert({
    where: { entryId },
    create: {
      entryId,
      transfersCount: stats.transfersCount,
      hitsCount: stats.hitsCount,
      totalHitCost: stats.totalHitCost,
      avgTransfersPerGw: stats.avgTransfersPerGw,
      hitRate: stats.hitRate,
      lastTransferAt: stats.lastTransferAt,
    },
    update: {
      transfersCount: stats.transfersCount,
      hitsCount: stats.hitsCount,
      totalHitCost: stats.totalHitCost,
      avgTransfersPerGw: stats.avgTransfersPerGw,
      hitRate: stats.hitRate,
      lastTransferAt: stats.lastTransferAt,
      updatedAt: new Date(),
    },
  });

  return { insertedCount: createResult.count };
}

async function runWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += concurrency) {
    const chunk = items.slice(i, i + concurrency);
    const chunkResults = await Promise.all(chunk.map(fn));
    results.push(...chunkResults);
  }
  return results;
}

/**
 * Fetches transfer history for all league entries and persists transfers + behaviour profiles.
 * Idempotent: createMany(skipDuplicates), profiles recomputed from DB. Partial failures logged and counted.
 */
export async function ingestLeagueEntryTransfers(params: {
  leagueId: number;
  concurrency?: number;
  logger: IngestionLogger;
}): Promise<IngestLeagueEntryTransfersResult> {
  const { leagueId, logger } = params;
  const concurrency = params.concurrency ?? DEFAULT_CONCURRENCY;

  const cache = await getCache();
  const client = new FplClient({ cache, logger });

  const entries = await prisma.fplLeagueEntry.findMany({
    where: { leagueId },
    select: { id: true },
  });

  const results = await runWithConcurrency(entries, concurrency, async (entry) => {
    try {
      const { insertedCount } = await processEntry(prisma, client, entry.id);
      return { status: "ok" as const, insertedCount };
    } catch (err) {
      logger.error(
        { err, leagueId, entryId: entry.id },
        "entry transfers ingestion failed for entry"
      );
      return { status: "fail" as const, insertedCount: 0 };
    }
  });

  const succeeded = results.filter((r) => r.status === "ok").length;
  const failed = results.length - succeeded;
  const insertedTransfers = results.reduce((sum, r) => sum + r.insertedCount, 0);

  logger.info(
    {
      leagueId,
      processed: entries.length,
      succeeded,
      failed,
      insertedTransfers,
      updatedProfiles: succeeded,
    },
    "ingestLeagueEntryTransfers completed"
  );

  return {
    leagueId,
    processed: entries.length,
    succeeded,
    failed,
    insertedTransfers,
    updatedProfiles: succeeded,
  };
}
