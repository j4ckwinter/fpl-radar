export const BUY_SCORE = {
  BASE: 5,
  OWNERSHIP_BONUS_MAX: 45, // scaled by selectedByPercent
  AVAILABLE_BONUS: 15,
  FLAGGED_PENALTY: 40,
  HAS_NEWS_PENALTY: 10,
  PRICE_VERY_HIGH_PENALTY: 10, // mild penalty to avoid always picking premiums in v1
  VERY_HIGH_PRICE_THRESHOLD: 120, // £12.0m (tenths)
  TOP_POOL_LIMIT: 500, // max candidates to return for later pairing
  /** Bonus for league ownership (non-ownership risk); applied when leagueOwnershipPct !== null. */
  LEAGUE_OWNERSHIP_RISK_WEIGHT: 20,
} as const;

/** Default number of buy candidates to return from scoreBuyCandidates. */
export const DEFAULT_RETURN_LIMIT = 100;

/** FPL status codes that mean the player is unavailable. */
export const UNAVAILABLE_STATUSES = ["u"] as const;

/** FPL status codes that indicate injury/suspension/doubt (flagged). */
export const FLAGGED_STATUSES = ["i", "s", "d"] as const;

/** selectedByPercent >= this value adds high-ownership reason. */
export const HIGH_OWNERSHIP_PERCENT_THRESHOLD = 20;

/** Ownership % at which the ownership bonus is capped (scaling divisor). */
export const OWNERSHIP_PERCENT_FOR_MAX_BONUS = 60;

/** User-facing reason labels for buy scoring. */
export const BUY_REASON = {
  HIGH_OWNERSHIP: "High ownership / template target",
  AVAILABLE: "Available to play",
  FLAGGED: "Flagged / availability concern",
  NEWS: "News present",
  VERY_HIGH_PRICE: "Very high price",
  LEAGUE_HIGH_OWNERSHIP: "Highly owned in your league",
  LEAGUE_MAJORITY_OWN: "Majority of rivals already own this player",
} as const;
