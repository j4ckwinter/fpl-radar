import { getCache } from "../lib/cache/cache";
import { prisma } from "../lib/prisma";
import { FplClient } from "../fpl/fplClient";
import type { IngestionLogger } from "./bootstrapIngestion";
import {
  resolveEventIdFromBootstrap,
  type ResolvedEvent,
} from "./entryPicksIngestion.utils";

const DEFAULT_CONCURRENCY = 5;

export interface IngestLeagueEntryPicksResult {
  leagueId: number;
  eventId: number;
  processed: number;
  succeeded: number;
  failed: number;
}

/**
 * Resolves eventId: FPL_EVENT_ID env if set, else from bootstrap (is_next → is_current → latest unfinished).
 */
async function resolveEventId(
  client: FplClient,
  logger: IngestionLogger
): Promise<ResolvedEvent> {
  const envEventId = process.env.FPL_EVENT_ID;
  if (envEventId !== undefined && envEventId !== "") {
    const n = Number(envEventId);
    if (!Number.isNaN(n) && Math.floor(n) === n) {
      const bootstrap = await client.getBootstrapStatic();
      const event = bootstrap.events.find((e) => e.id === n);
      const eventFinished = event?.finished ?? false;
      logger.info({ eventId: n, source: "FPL_EVENT_ID" }, "resolved eventId from env");
      return { eventId: n, eventFinished };
    }
  }

  const bootstrap = await client.getBootstrapStatic();
  const resolved = resolveEventIdFromBootstrap(bootstrap.events);
  if (!resolved) {
    throw new Error("No gameweek found in bootstrap-static events");
  }
  logger.info(
    { eventId: resolved.eventId, eventFinished: resolved.eventFinished },
    "resolved eventId from bootstrap"
  );
  return resolved;
}

/**
 * Process a single entry: fetch picks, upsert snapshot, replace picks. Returns true on success.
 */
async function processEntry(
  prismaClient: typeof prisma,
  client: FplClient,
  params: {
    leagueId: number;
    entryId: number;
    eventId: number;
    eventFinished: boolean;
  }
): Promise<void> {
  const picksResponse = await client.getEntryPicks({
    entryId: params.entryId,
    eventId: params.eventId,
    eventFinished: params.eventFinished,
  });

  const history = picksResponse.entry_history;

  await prismaClient.$transaction(async (tx) => {
    const snapshot = await tx.fplEntrySnapshot.upsert({
      where: {
        leagueId_entryId_eventId: {
          leagueId: params.leagueId,
          entryId: params.entryId,
          eventId: params.eventId,
        },
      },
      create: {
        leagueId: params.leagueId,
        entryId: params.entryId,
        eventId: params.eventId,
        bank: history?.bank ?? null,
        teamValue: history?.value ?? null,
        eventTransfers: history?.event_transfers ?? null,
        eventTransfersCost: history?.event_transfers_cost ?? null,
      },
      update: {
        bank: history?.bank ?? null,
        teamValue: history?.value ?? null,
        eventTransfers: history?.event_transfers ?? null,
        eventTransfersCost: history?.event_transfers_cost ?? null,
        updatedAt: new Date(),
      },
    });

    await tx.fplEntryPick.deleteMany({
      where: { snapshotId: snapshot.id },
    });

    if (picksResponse.picks.length > 0) {
      await tx.fplEntryPick.createMany({
        data: picksResponse.picks.map((pick) => ({
          snapshotId: snapshot.id,
          playerId: pick.element,
          pickPosition: pick.position,
          multiplier: pick.multiplier,
          isCaptain: pick.is_captain,
          isViceCaptain: pick.is_vice_captain,
        })),
      });
    }
  });
}

/**
 * Run up to `concurrency` promises at a time.
 */
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
 * Fetches entry picks for all league entries for a gameweek and persists snapshots + picks.
 * Idempotent: re-run upserts snapshots and replaces picks. Partial failures are logged and counted.
 */
export async function ingestLeagueEntryPicks(params: {
  leagueId: number;
  eventId?: number;
  concurrency?: number;
  logger: IngestionLogger;
}): Promise<IngestLeagueEntryPicksResult> {
  const { leagueId, logger } = params;
  const concurrency = params.concurrency ?? DEFAULT_CONCURRENCY;

  const cache = await getCache();
  const client = new FplClient({ cache, logger });

  const resolved = params.eventId !== undefined
    ? (await (async () => {
        const id = params.eventId as number;
        const bootstrap = await client.getBootstrapStatic();
        const event = bootstrap.events.find((e) => e.id === id);
        return {
          eventId: id,
          eventFinished: event?.finished ?? false,
        };
      })())
    : await resolveEventId(client, logger);

  const eventId: number = resolved.eventId;
  const eventFinished = resolved.eventFinished;

  const entries = await prisma.fplLeagueEntry.findMany({
    where: { leagueId },
    select: { id: true },
  });

  const results = await runWithConcurrency(entries, concurrency, async (entry) => {
    try {
      await processEntry(prisma, client, {
        leagueId,
        entryId: entry.id,
        eventId,
        eventFinished,
      });
      return "ok" as const;
    } catch (err) {
      logger.error(
        { err, leagueId, entryId: entry.id, eventId },
        "entry picks ingestion failed for entry"
      );
      return "fail" as const;
    }
  });

  const succeeded = results.filter((r) => r === "ok").length;
  const failed = results.length - succeeded;

  logger.info(
    { leagueId, eventId, processed: entries.length, succeeded, failed },
    "ingestLeagueEntryPicks completed"
  );

  return {
    leagueId,
    eventId,
    processed: entries.length,
    succeeded,
    failed,
  };
}
