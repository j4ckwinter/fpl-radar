/**
 * Types for transfer bundle scenarios (k=1..3).
 * Bundles are sets of like-for-like transfers; k=1 is the existing single-transfer list.
 */

/** Single transfer within a bundle (out → in, same position). */
export interface TransferBundleComponent {
  outPlayerId: number;
  inPlayerId: number;
  /** Transfer score for this edge (sell + buy weighting, minus penalties). */
  score: number;
  /** Short reasons for this transfer. */
  reasons: string[];
}

/** One bundle of k transfers (outs and ins with aggregate score and flags). */
export interface TransferBundle {
  /** Player IDs being sold (ordered). */
  outs: number[];
  /** Player IDs being bought (ordered, same position as corresponding out). */
  ins: number[];
  /** Aggregate score (sum of raw edge scores minus bundle-level penalties; may exceed 100). */
  score: number;
  /** Combined reasons from constituent transfers (capped). */
  reasons: string[];
  flags: {
    /** True when bank/price data is uncertain; score has penalty applied. */
    budgetUncertain?: boolean;
    /** True when bundle likely requires a hit (e.g. k=3). */
    likelyHit?: boolean;
  };
  /** Per-transfer breakdown for explainability (optional). */
  components?: TransferBundleComponent[];
}

/** Scenario for a fixed k (1, 2, or 3 transfers). */
export interface TransferBundleScenario {
  k: 1 | 2 | 3;
  bundles: TransferBundle[];
}

/** Scored edge (out → in) for beam search; same position, with cost/team info for constraints. */
export interface ScoredEdge {
  outPlayerId: number;
  inPlayerId: number;
  positionId: number;
  outTeamId: number;
  inTeamId: number;
  /** Sell price (tenths). */
  outNowCost: number;
  /** Buy price (tenths). */
  inNowCost: number;
  /** Raw transfer score (unclamped); used for bundle sums to avoid saturation. */
  edgeScoreRaw: number;
  /** Clamped score 0..100 for display (single-transfer / component). */
  edgeScore: number;
  reasons: string[];
  /** True if budget is unknown (resultingBank null) for this single transfer. */
  budgetUncertain: boolean;
  /** Populated when building edges; used for FPL_DEBUG_SCENARIOS component output. */
  debugComponents?: {
    momentumOut01: number;
    momentumIn01: number;
    fixtureOut01: number;
    fixtureIn01: number;
    fixtureDelta: number;
    leagueOwnershipOut: number | null;
    leagueOwnershipIn: number | null;
  };
}

/** Params for generating transfer scenarios. */
export interface GenerateTransferScenariosParams {
  leagueId: number;
  entryId: number;
  eventId: number;
  riskProfile?: "safe" | "balanced" | "risky";
  /** Max bundles to return per k (default from constants). */
  maxBundlesPerK?: number;
  /** When true, include debug info (p99 cap, edge score distribution, top edges). */
  debug?: boolean;
}

/** Debug info returned when debug=true (e.g. for script/validation). */
export interface ScenarioDebugInfo {
  inP99: number;
  outP99: number;
  /** Momentum cap percentile used (e.g. 99). */
  momentumCapPercentile?: number;
  edgeScoreRaw: { min: number; median: number; max: number };
  /** Saturation stats: edges with momentum 1.0. */
  momentumSaturation?: {
    countInAt1: number;
    countOutAt1: number;
    totalEdges: number;
    percentSaturatedIn: number;
    percentSaturatedOut: number;
  };
  /** Quartiles for momentumIn01 / momentumOut01 across edges (q1, median, q3). */
  momentumQuartilesIn?: [number, number, number];
  momentumQuartilesOut?: [number, number, number];
  topEdges: Array<{
    outPlayerId: number;
    inPlayerId: number;
    scoreRaw: number;
    scoreDisplay: number;
    momentumOut01?: number;
    momentumIn01?: number;
    fixtureOut01?: number;
    fixtureIn01?: number;
    fixtureDelta?: number;
    leagueOwnershipOut?: number | null;
    leagueOwnershipIn?: number | null;
  }>;
}
