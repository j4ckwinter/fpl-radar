export const SELL_SCORE = {
  BASE: 0,
  W_MOMENTUM: 50,
  W_FIXTURES: 35,
  W_LEAGUE_OWNERSHIP: 15, // applied as a penalty in safe/balanced
  FLAGGED_BONUS: 40,
  UNAVAILABLE_BONUS: 60,
} as const;

/** Minimum sell score (inclusive). */
export const SCORE_MIN = 0;

/** Maximum sell score (inclusive). */
export const SCORE_MAX = 100;

/** Default number of sell candidates to return. */
export const DEFAULT_TOP_N = 15;

/** Maximum number of sell candidates returned (slice cap). */
export const MAX_TOP_N = 15;

/** Max length of news snippet in reason text (chars). */
export const NEWS_SNIPPET_MAX_LENGTH = 80;

/** FPL status codes that indicate injury/suspension/unavailable/doubt (flagged). */
export const FLAGGED_STATUSES = ["i", "s", "u", "d"] as const;

/** User-facing reason labels for sell scoring. */
export const SELL_REASON = {
  HIGH_MOMENTUM: "High transfers out this GW",
  BAD_FIXTURES: "Difficult upcoming fixtures",
  LEAGUE_WIDELY_OWNED: "Widely owned in your league (less urgency to sell)",
  FLAGGED: "Flagged / availability concern",
  UNAVAILABLE: "Unavailable",
  TEMPLATE_HOLD: "High-ownership template hold",
  /** Safe profile: discourage selling template without strong reason. */
  SAFE_AVOID_RISKY_SELL_TEMPLATE: "Avoiding a risky sell of a template player",
  /** Balanced: ownership meaningfully influenced score. */
  BALANCED_LEAGUE_CONSIDERATION: "Moderate league consideration",
} as const;

/** Max profile-specific reasons to add per prediction. */
export const SELL_PROFILE_REASONS_MAX = 2;

/** Max ownership-based reasons to add per prediction. */
export const SELL_OWNERSHIP_REASONS_MAX = 1;
