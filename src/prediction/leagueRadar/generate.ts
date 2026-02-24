import { prisma } from "../../lib/prisma";
import { predictTransfersForEntry } from "../transferPrediction";
import { LEAGUE_RADAR } from "./constants";
import type {
  LeagueRadarResult,
  PlayerRadarItem,
  TransferRadarItem,
} from "./types";

export interface LeagueRadarLogger {
  info(obj: object, msg?: string): void;
  error(obj: object, msg?: string): void;
}

interface RadarAccumulator {
  expectedCount: number;
  entryIds: Set<number>;
  examples: Array<{ entryId: number; probability: number }>;
}

function addToAccumulator(
  acc: RadarAccumulator,
  entryId: number,
  probability: number
): void {
  acc.expectedCount += probability;
  acc.entryIds.add(entryId);
  acc.examples.push({ entryId, probability });
  acc.examples.sort((a, b) => b.probability - a.probability);
  if (acc.examples.length > LEAGUE_RADAR.MAX_EXAMPLES_PER_ITEM) {
    acc.examples = acc.examples.slice(0, LEAGUE_RADAR.MAX_EXAMPLES_PER_ITEM);
  }
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

export interface GenerateLeagueRadarParams {
  leagueId: number;
  eventId: number;
  maxEntries?: number;
  concurrency?: number;
  perEntryMaxResults?: number;
  logger: LeagueRadarLogger;
}

export async function generateLeagueRadar(
  params: GenerateLeagueRadarParams
): Promise<LeagueRadarResult> {
  const {
    leagueId,
    eventId,
    maxEntries,
    concurrency = LEAGUE_RADAR.DEFAULT_CONCURRENCY,
    perEntryMaxResults = LEAGUE_RADAR.DEFAULT_PER_ENTRY_MAX_RESULTS,
    logger,
  } = params;

  const startMs = Date.now();

  const entries = await prisma.fplLeagueEntry.findMany({
    where: { leagueId },
    orderBy: { rank: "asc" },
    take: maxEntries ?? undefined,
    select: { id: true },
  });

  const totalEntries = entries.length;

  type EntryResult =
    | { status: "ok"; entryId: number; predictions: Array<{ outPlayerId: number; inPlayerId: number; probability: number; score: number }> }
    | { status: "fail"; entryId: number; predictions: [] };

  const results = await runWithConcurrency(
    entries,
    concurrency,
    async (entry): Promise<EntryResult> => {
      try {
        const { predictions } = await predictTransfersForEntry({
          leagueId,
          entryId: entry.id,
          eventId,
          maxResults: perEntryMaxResults,
        });
        return {
          status: "ok",
          entryId: entry.id,
          predictions: predictions.map((p) => ({
            outPlayerId: p.outPlayerId,
            inPlayerId: p.inPlayerId,
            probability: p.probability,
            score: p.score,
          })),
        };
      } catch (err) {
        logger.error({ err, leagueId, entryId: entry.id }, "league radar: predict failed for entry");
        return { status: "fail", entryId: entry.id, predictions: [] };
      }
    }
  );

  const succeeded = results.filter((r) => r.status === "ok").length;
  const failed = results.length - succeeded;

  const buyMap = new Map<number, RadarAccumulator>();
  const sellMap = new Map<number, RadarAccumulator>();
  const transferMap = new Map<string, RadarAccumulator>();

  function getOrCreatePlayerAcc(
    map: Map<number, RadarAccumulator>,
    key: number
  ): RadarAccumulator {
    let acc = map.get(key);
    if (!acc) {
      acc = { expectedCount: 0, entryIds: new Set(), examples: [] };
      map.set(key, acc);
    }
    return acc;
  }

  function getOrCreateTransferAcc(
    map: Map<string, RadarAccumulator>,
    key: string
  ): RadarAccumulator {
    let acc = map.get(key);
    if (!acc) {
      acc = { expectedCount: 0, entryIds: new Set(), examples: [] };
      map.set(key, acc);
    }
    return acc;
  }

  for (const r of results) {
    if (r.status !== "ok") continue;
    for (const p of r.predictions) {
      addToAccumulator(
        getOrCreatePlayerAcc(buyMap, p.inPlayerId),
        r.entryId,
        p.probability
      );
      addToAccumulator(
        getOrCreatePlayerAcc(sellMap, p.outPlayerId),
        r.entryId,
        p.probability
      );
      const transferKey = `${p.outPlayerId}-${p.inPlayerId}`;
      addToAccumulator(
        getOrCreateTransferAcc(transferMap, transferKey),
        r.entryId,
        p.probability
      );
    }
  }

  function toPlayerRadarItems(
    map: Map<number, RadarAccumulator>,
    topN: number
  ): PlayerRadarItem[] {
    return Array.from(map.entries())
      .map(([playerId, acc]) => ({
        playerId,
        expectedCount: acc.expectedCount,
        uniqueEntries: acc.entryIds.size,
        examples: acc.examples,
      }))
      .sort((a, b) => {
        if (b.expectedCount !== a.expectedCount) return b.expectedCount - a.expectedCount;
        return b.uniqueEntries - a.uniqueEntries;
      })
      .slice(0, topN);
  }

  const buyRadar = toPlayerRadarItems(buyMap, LEAGUE_RADAR.TOP_BUY_RADAR);

  const sellRadar = toPlayerRadarItems(sellMap, LEAGUE_RADAR.TOP_SELL_RADAR);

  const transferRadar: TransferRadarItem[] = Array.from(transferMap.entries())
    .map(([key, acc]) => {
      const [outPlayerId, inPlayerId] = key.split("-").map(Number);
      return {
        outPlayerId,
        inPlayerId,
        expectedCount: acc.expectedCount,
        uniqueEntries: acc.entryIds.size,
        examples: [...acc.examples],
      };
    })
    .sort((a, b) => b.expectedCount - a.expectedCount)
    .slice(0, LEAGUE_RADAR.TOP_TRANSFER_RADAR);

  const durationMs = Date.now() - startMs;

  return {
    leagueId,
    eventId,
    generatedAt: new Date().toISOString(),
    coverage: {
      totalEntries,
      processed: results.length,
      succeeded,
      failed,
      durationMs,
    },
    buyRadar,
    sellRadar,
    transferRadar,
  };
}
