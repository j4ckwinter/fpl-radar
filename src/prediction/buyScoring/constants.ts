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
  /** Safe: covering a popular league pick. */
  SAFE_COVERING_POPULAR: "Covering a popular league pick",
  /** Balanced: ownership meaningfully influenced score. */
  BALANCED_LEAGUE_CONSIDERATION: "Moderate league consideration",
  /** Risky: differential upside. */
  RISKY_DIFFERENTIAL_UPSIDE: "Differential upside",
  /** Risky: low ownership with strong momentum/fixtures. */
  RISKY_LOW_OWNERSHIP_HIGH_CONVICTION: "Low ownership, high conviction",
} as const;

/** Max profile-specific reasons to add per prediction. */
export const BUY_PROFILE_REASONS_MAX = 2;

/** Max ownership-based reasons to add per prediction. */
export const BUY_OWNERSHIP_REASONS_MAX = 1;

/** Fixture score range from teamUpcomingScores (easier = higher). */
export const FIXTURE_SCORE_MIN = -10;
export const FIXTURE_SCORE_MAX = 10;
