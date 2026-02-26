/**
 * Constants for transfer bundle scenarios (beam search, pools, penalties).
 */

/** Number of top sell candidates to consider (by sell score). */
export const SELL_POOL = 8;

/** Top buy candidates per position (by buy score). */
export const BUY_POOL_PER_POSITION = 6;

/** Max scored edges to keep per OUT (limits branching in beam). */
export const MAX_EDGES_PER_OUT = 8;

/** Beam width: max partial bundles to keep at each step. */
export const BEAM_WIDTH = 200;

/** Max bundles to return for k=2 and k=3. */
export const RESULTS_PER_K = 20;

/** Penalty applied to bundle score when budget is uncertain. */
export const BUDGET_UNCERTAIN_PENALTY = 5;

/** Weights and penalties aligned with single-transfer prediction (W_SELL, W_BUY, etc.). */
export const EDGE_SCORE = {
  W_SELL: 0.55,
  W_BUY: 0.45,
  BUDGET_UNKNOWN_PENALTY: 5,
  BIG_SPEND_PENALTY_THRESHOLD: 30, // £3.0m in tenths
  BIG_SPEND_PENALTY: 10,
  WEAK_LINK_THRESHOLD: 25,
  WEAK_LINK_PENALTY: 15,
  /** Bonus for fixture improvement: (fixtureIn01 - fixtureOut01), small so momentum dominates. */
  FIXTURE_DELTA_WEIGHT: 8,
  /** Min fixture delta (in01 - out01) to ensure a fixture reason is added for the edge. */
  FIXTURE_DELTA_REASON_THRESHOLD: 0.15,
} as const;

/** Reason shown when fixture delta is strong (edge-specific, at most once per edge). */
export const REASON_FIXTURE_UPGRADE = "Fixture upgrade";

/** Min score (inclusive) for scenario scores. */
export const SCORE_MIN = 0;

/** Max score (inclusive) for single-edge display (components). */
export const SCORE_MAX = 100;

/** Max reasons to take per edge when aggregating bundle reasons. */
export const REASONS_PER_EDGE = 2;

/** Max combined reasons for a bundle. */
export const MAX_BUNDLE_REASONS = 4;

/** Diversity caps for returned bundles (avoid same OUT/IN dominating). */
export const DIVERSITY_CAPS = {
  /** Max bundles in which the same OUT player can appear (tightened for variety). */
  maxBundlesPerOutPlayer: 4,
  /** Max bundles in which the same IN player can appear. */
  maxBundlesPerInPlayer: 4,
  /** Max times the same set of OUT player IDs can appear in top results. */
  maxBundlesPerOutSet: 2,
} as const;
