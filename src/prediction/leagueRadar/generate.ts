import { prisma } from "../../lib/prisma";
import { predictTransfersForEntry } from "../transferPrediction";
import { LEAGUE_RADAR } from "./constants";
import type {
  GenerateLeagueRadarParams,
  LeagueRadarEntryResult,
  LeagueRadarResult,
  RadarAccumulator,
  TransferRadarItem,
} from "./types";
import {
  addToAccumulator,
  getOrCreateAcc,
  runWithConcurrency,
  toPlayerRadarItems,
} from "./generate.utils";

export type { GenerateLeagueRadarParams, LeagueRadarLogger } from "./types";

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

  const results = await runWithConcurrency(
    entries,
    concurrency,
    async (entry): Promise<LeagueRadarEntryResult> => {
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
        logger.error(
          { err, leagueId, entryId: entry.id },
          "league radar: predict failed for entry"
        );
        return { status: "fail", entryId: entry.id, predictions: [] };
      }
    }
  );

  const succeeded = results.filter((r) => r.status === "ok").length;
  const failed = results.length - succeeded;

  const buyMap = new Map<number, RadarAccumulator>();
  const sellMap = new Map<number, RadarAccumulator>();
  const transferMap = new Map<string, RadarAccumulator>();

  for (const r of results) {
    if (r.status !== "ok") continue;
    for (const p of r.predictions) {
      addToAccumulator(
        getOrCreateAcc(buyMap, p.inPlayerId),
        r.entryId,
        p.probability
      );
      addToAccumulator(
        getOrCreateAcc(sellMap, p.outPlayerId),
        r.entryId,
        p.probability
      );
      const transferKey = `${p.outPlayerId}-${p.inPlayerId}`;
      addToAccumulator(
        getOrCreateAcc(transferMap, transferKey),
        r.entryId,
        p.probability
      );
    }
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
