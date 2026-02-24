import type { LeagueStandingsResult } from "../fpl/schemas/leagueStandings.schema";

export interface LeagueEntryRow {
  id: number;
  leagueId: number;
  entryName: string;
  playerName: string;
  rank: number;
  lastRank: number;
  totalPoints: number;
}

/**
 * Maps a single league standings result from the FPL API to the shape used for
 * FplLeagueEntry create/update.
 */
export function mapStandingToEntryRow(
  row: LeagueStandingsResult,
  leagueId: number
): LeagueEntryRow {
  return {
    id: row.entry,
    leagueId,
    entryName: row.entry_name,
    playerName: row.player_name,
    rank: row.rank,
    lastRank: row.last_rank,
    totalPoints: row.total,
  };
}
