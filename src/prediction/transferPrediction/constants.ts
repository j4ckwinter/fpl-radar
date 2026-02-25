/** Buy pool size for prediction: ensure enough per-position coverage (top N by transfers in). */
export const PREDICTION_BUY_POOL_LIMIT = 2000;

/** League ownership threshold (0..1) above which "safe" profile penalises selling that player. */
export const SAFE_PROFILE_HIGH_OWNERSHIP_THRESHOLD = 0.6;

/** Penalty applied to transfer score when safe profile and OUT player is widely owned in league. */
export const SAFE_PROFILE_HIGH_OWNERSHIP_PENALTY = 20;

/**
 * Momentum out (0..1) above which selling is treated as "widely copied" in safe mode.
 * We do not apply the high-ownership sell penalty when OUT player has high transfers out.
 */
export const SAFE_PROFILE_CONSENSUS_SELL_MOMENTUM_THRESHOLD = 0.5;

/**
 * Fixture difficulty (0..1, high = difficult) above which we waive high-ownership sell penalty.
 */
export const SAFE_PROFILE_DIFFICULT_FIXTURES_THRESHOLD = 0.5;

/** Penalise transfers where min(sellScore, buyScore) is below this (weak-link penalty). */
export const WEAK_LINK_THRESHOLD = 25;

/** Amount subtracted from rawScore when weak link is below threshold. */
export const WEAK_LINK_PENALTY = 15;

/** Top transfer score below this may trigger NO_TRANSFER option. */
export const NO_TRANSFER_SCORE_THRESHOLD = 35;

/** Reason labels for NO_TRANSFER outcome. */
export const NO_TRANSFER_REASONS = {
  LOW_TOP_SCORE: "No strong transfer identified",
  LOW_SELL_PRESSURE: "Low sell pressure across squad",
  LOW_BUY_PRESSURE: "No strong upgrades identified",
} as const;

export const TRANSFER_PREDICTION = {
  MAX_RESULTS: 50,
  MIN_SELL_SCORE: 10, // allow neutral sell scores (BASE 10) so healthy squads still get suggestions
  MIN_BUY_SCORE: 10, // ignore weak buys
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

/** Diversity limits for transfer prediction output (cap repeats of same IN/OUT player). */
export const DIVERSITY = {
  /** Max times the same IN player can appear in the returned list. */
  MAX_PER_IN_PLAYER: 2,
  /** Max times the same OUT player can appear in the returned list. */
  MAX_PER_OUT_PLAYER: 2,
  MAX_RESULTS: 30,
} as const;
