export const TRANSFER_PREDICTION = {
  MAX_RESULTS: 50,
  MIN_SELL_SCORE: 15, // ignore near-never sells to cut noise
  MIN_BUY_SCORE: 15, // ignore weak buys
  W_SELL: 0.55,
  W_BUY: 0.45,
  BUDGET_UNKNOWN_PENALTY: 5, // slight penalty when bank is null
  BIG_SPEND_PENALTY_THRESHOLD: 30, // £3.0m in tenths
  BIG_SPEND_PENALTY: 10,
  SOFTMAX_TEMPERATURE: 15,
} as const;

/** Minimum transfer prediction score (inclusive). */
export const SCORE_MIN = 0;

/** Maximum transfer prediction score (inclusive). */
export const SCORE_MAX = 100;

/** Maximum number of reasons shown per prediction. */
export const MAX_REASONS = 4;

/** Number of sell reasons to take when building combined reasons. */
export const SELL_REASONS_TAKE = 2;

/** Number of buy reasons to take when building combined reasons. */
export const BUY_REASONS_TAKE = 2;

/** Reason label when transfer requires significant budget. */
export const REASON_BIG_SPEND = "Requires significant budget";

/** Reason label when bank is unknown (estimate). */
export const REASON_BANK_UNKNOWN = "Bank unknown (estimate)";
