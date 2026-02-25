export const BUY_SCORE = {
  BASE: 0,
  W_MOMENTUM: 50,
  W_FIXTURES: 35,
  W_LEAGUE_OWNERSHIP: 15, // used differently based on riskProfile
  MOMENTUM_POOL_LIMIT: 600, // candidate pool size
  FLAGGED_PENALTY: 50,
  UNAVAILABLE_PENALTY: 80,
} as const;

/** Default number of buy candidates to return from scoreBuyCandidates. */
export const DEFAULT_RETURN_LIMIT = 100;

/** FPL status codes that mean the player is unavailable. */
export const UNAVAILABLE_STATUSES = ["u"] as const;

/** FPL status codes that indicate injury/suspension/doubt (flagged). */
export const FLAGGED_STATUSES = ["i", "s", "d"] as const;

/** User-facing reason labels for buy scoring. */
export const BUY_REASON = {
  HIGH_MOMENTUM: "High transfers in this GW",
  FAVOURABLE_FIXTURES: "Favourable upcoming fixtures",
  LEAGUE_HIGH_OWNERSHIP: "Highly owned in your league",
  LEAGUE_DIFFERENTIAL: "Strong differential in your league",
  AVAILABLE: "Available to play",
  FLAGGED: "Flagged / availability concern",
  NEWS: "News present",
  VERY_HIGH_PRICE: "Very high price",
  LEAGUE_MAJORITY_OWN: "Majority of rivals already own this player",
} as const;

/** Fixture score range from teamUpcomingScores (easier = higher). */
export const FIXTURE_SCORE_MIN = -10;
export const FIXTURE_SCORE_MAX = 10;
