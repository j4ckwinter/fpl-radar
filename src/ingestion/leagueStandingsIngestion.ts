import { getCache } from "../lib/cache/cache";
import { prisma } from "../lib/prisma";
import { FplClient } from "../fpl/fplClient";
import type { IngestionLogger } from "./bootstrapIngestion";
import type { LeagueStandingsResult } from "../fpl/schemas/leagueStandings.schema";
import { mapStandingToEntryRow } from "./leagueStandingsIngestion.utils";

export interface IngestLeagueStandingsResult {
  leagueId: number;
  leagueName: string;
  entriesCount: number;
}

/**
 * Fetches all pages of league standings from FPL and upserts FplLeague + FplLeagueEntry.
 * Idempotent: re-run updates ranks and total points; no duplicate leagues or entries.
 */
export async function ingestLeagueStandings(params: {
  leagueId: number;
  logger: IngestionLogger;
}): Promise<IngestLeagueStandingsResult> {
  const { leagueId, logger } = params;
  const cache = await getCache();
  const client = new FplClient({ cache, logger });

  const allResults: LeagueStandingsResult[] = [];
  let leagueName = "";
  let page = 1;
  let hasNext = true;

  while (hasNext) {
    const standings = await client.getLeagueStandings({ leagueId, page });
    leagueName = standings.league.name;
    allResults.push(...standings.standings.results);
    hasNext = standings.standings.has_next;
    page += 1;
  }

  await prisma.$transaction(async (tx) => {
    await tx.fplLeague.upsert({
      where: { id: leagueId },
      create: {
        id: leagueId,
        name: leagueName,
      },
      update: {
        name: leagueName,
        updatedAt: new Date(),
      },
    });

    for (const row of allResults) {
      const entry = mapStandingToEntryRow(row, leagueId);
      await tx.fplLeagueEntry.upsert({
        where: { id: entry.id },
        create: entry,
        update: {
          leagueId: entry.leagueId,
          entryName: entry.entryName,
          playerName: entry.playerName,
          rank: entry.rank,
          lastRank: entry.lastRank,
          totalPoints: entry.totalPoints,
          updatedAt: new Date(),
        },
      });
    }
  });

  logger.info(
    { leagueId, leagueName, entriesCount: allResults.length },
    "ingestLeagueStandings completed"
  );

  return {
    leagueId,
    leagueName,
    entriesCount: allResults.length,
  };
}
