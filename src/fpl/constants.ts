/**
 * FPL API base URL. Override via env FPL_BASE_URL for dev/proxy.
 */
export const FPL_BASE_URL =
  process.env.FPL_BASE_URL ?? "https://fantasy.premierleague.com/api";

/** Default cache TTL in seconds. */
export const TTL = {
  /** bootstrap-static: global data changes rarely (teams, players, gameweeks). */
  BOOTSTRAP_STATIC_SECONDS: 6 * 60 * 60, // 6 hours
  /**
   * League standings: 5 minutes to balance freshness with rate limits.
   * (1 minute would be possible if we need more real-time ranks.)
   */
  LEAGUE_STANDINGS_SECONDS: 5 * 60, // 5 minutes
} as const;

const CACHE_KEY_PREFIX = "fpl";

export const cacheKey = {
  bootstrapStatic(): string {
    return `${CACHE_KEY_PREFIX}:bootstrap-static`;
  },

  leagueStandings(leagueId: number, page: number, phase?: number): string {
    const base = `${CACHE_KEY_PREFIX}:league-standings:${leagueId}:${page}`;
    return phase !== undefined ? `${base}:phase-${phase}` : base;
  },
};
