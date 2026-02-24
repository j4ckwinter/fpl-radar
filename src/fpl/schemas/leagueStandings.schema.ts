import { z } from "zod";

/** Single standing row: entry, name, rank, total. */
export const leagueStandingsResultSchema = z.object({
  entry: z.number(),
  entry_name: z.string(),
  player_name: z.string(),
  rank: z.number(),
  last_rank: z.number(),
  total: z.number(),
});

/** Standings payload: page, has_next, results. */
export const leagueStandingsSchema = z.object({
  league: z.object({
    id: z.number(),
    name: z.string(),
  }),
  standings: z.object({
    has_next: z.boolean(),
    page: z.number(),
    results: z.array(leagueStandingsResultSchema),
  }),
});

export type LeagueStandingsResult = z.output<typeof leagueStandingsResultSchema>;
export type LeagueStandings = z.output<typeof leagueStandingsSchema>;
