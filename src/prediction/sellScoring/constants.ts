export const SELL_SCORE = {
  BASE: 10,
  FLAGGED: 50,
  UNAVAILABLE_EXTRA: 20,
  BENCHED: 15,
  HAS_NEWS: 10,
  CAPTAIN_OR_VICE_PENALTY: 30,
  TEMPLATE_HOLD_PENALTY: 10,
  TEMPLATE_THRESHOLD: 30,
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
  FLAGGED: "Flagged / availability concern",
  UNAVAILABLE: "Unavailable",
  BENCHED: "On the bench",
  CAPTAIN_OR_VICE: "Captain/vice captain",
  TEMPLATE_HOLD: "High-ownership template hold",
} as const;
