import { loadSquadState } from "../squadLoader";
import { scoreSellCandidates } from "../sellScoring";
import { scoreBuyCandidates } from "../buyScoring";
import { loadMomentumP95 } from "../momentum/p95";
import { PREDICTION_BUY_POOL_LIMIT } from "../transferPrediction/constants";
import { buildEdges } from "./buildEdges";
import { runBeamSearch } from "./beam-search";
import { applyBundleDiversity } from "./diversity";
import { MOMENTUM_CAP_PERCENTILE } from "../momentum/constants";
import { RESULTS_PER_K, MAX_BUNDLE_REASONS } from "./constants";

function quartiles(sorted: number[]): [number, number, number] {
  const n = sorted.length;
  if (n === 0) return [0, 0, 0];
  const q1Idx = Math.floor(n * 0.25);
  const mid = n >> 1;
  const q3Idx = Math.floor(n * 0.75);
  const q1 = sorted[q1Idx] ?? 0;
  const median = n % 2 === 1 ? sorted[mid]! : ((sorted[mid - 1] ?? 0) + (sorted[mid] ?? 0)) / 2;
  const q3 = sorted[q3Idx] ?? 0;
  return [q1, median, q3];
}
import type {
  GenerateTransferScenariosParams,
  TransferBundleScenario,
  TransferBundle,
  ScoredEdge,
  ScenarioDebugInfo,
} from "./types";

/**
 * Generate transfer bundle scenarios for k=1, 2, and 3 transfers.
 * k=1 is built from the same scored edges (top single transfers); k=2 and k=3 from beam search.
 */
export async function generateTransferScenarios(
  params: GenerateTransferScenariosParams
): Promise<{
  scenarios: TransferBundleScenario[];
  computedAt: string;
  riskProfile?: "safe" | "balanced" | "risky";
  debug?: ScenarioDebugInfo;
}> {
  const {
    leagueId,
    entryId,
    eventId,
    riskProfile,
    maxBundlesPerK = RESULTS_PER_K,
    debug: wantDebug = false,
  } = params;

  const [squad, sellResult, buyResult, p99Result] = await Promise.all([
    loadSquadState({ leagueId, entryId, eventId }),
    scoreSellCandidates({ leagueId, entryId, eventId, riskProfile }),
    scoreBuyCandidates({
      leagueId,
      entryId,
      eventId,
      limit: PREDICTION_BUY_POOL_LIMIT,
      riskProfile,
    }),
    wantDebug ? loadMomentumP95() : Promise.resolve(null),
  ]);

  const edges = buildEdges({
    squad,
    sellScores: sellResult.scores,
    buyScores: buyResult.scores,
  });

  const k1Bundles = edgesToK1Bundles(edges, maxBundlesPerK);
  const k2Candidates = runBeamSearch({
    edges,
    squad,
    k: 2,
    maxResults: maxBundlesPerK * 3,
  });
  const k2Bundles = applyBundleDiversity({
    bundles: k2Candidates,
  }).slice(0, maxBundlesPerK);
  const k3Candidates = runBeamSearch({
    edges,
    squad,
    k: 3,
    maxResults: maxBundlesPerK * 3,
  });
  const k3Bundles = applyBundleDiversity({
    bundles: k3Candidates,
  }).slice(0, maxBundlesPerK);

  const scenarios: TransferBundleScenario[] = [
    { k: 1, bundles: k1Bundles },
    { k: 2, bundles: k2Bundles },
    { k: 3, bundles: k3Bundles },
  ];

  const result: {
    scenarios: TransferBundleScenario[];
    computedAt: string;
    riskProfile?: "safe" | "balanced" | "risky";
    debug?: ScenarioDebugInfo;
  } = {
    scenarios,
    computedAt: new Date().toISOString(),
    riskProfile,
  };

  if (wantDebug && p99Result) {
    const rawScores = edges.map((e) => e.edgeScoreRaw);
    const sorted = [...rawScores].sort((a, b) => a - b);
    const mid = sorted.length >> 1;
    const median =
      sorted.length === 0
        ? 0
        : sorted.length % 2 === 1
          ? sorted[mid]
          : (sorted[mid - 1] + sorted[mid]) / 2;
    const topEdges = [...edges]
      .sort((a, b) => b.edgeScoreRaw - a.edgeScoreRaw)
      .slice(0, 10)
      .map((e) => ({
        outPlayerId: e.outPlayerId,
        inPlayerId: e.inPlayerId,
        scoreRaw: e.edgeScoreRaw,
        scoreDisplay: e.edgeScore,
        ...(e.debugComponents && {
          momentumOut01: e.debugComponents.momentumOut01,
          momentumIn01: e.debugComponents.momentumIn01,
          fixtureOut01: e.debugComponents.fixtureOut01,
          fixtureIn01: e.debugComponents.fixtureIn01,
          fixtureDelta: e.debugComponents.fixtureDelta,
          leagueOwnershipOut: e.debugComponents.leagueOwnershipOut,
          leagueOwnershipIn: e.debugComponents.leagueOwnershipIn,
        }),
      }));
    const withComponents = edges.filter((e): e is typeof e & { debugComponents: NonNullable<typeof e.debugComponents> } => e.debugComponents != null);
    const countInAt1 = withComponents.filter((e) => e.debugComponents.momentumIn01 === 1).length;
    const countOutAt1 = withComponents.filter((e) => e.debugComponents.momentumOut01 === 1).length;
    const totalEdges = withComponents.length;
    const momentumInSorted = [...withComponents.map((e) => e.debugComponents.momentumIn01)].sort((a, b) => a - b);
    const momentumOutSorted = [...withComponents.map((e) => e.debugComponents.momentumOut01)].sort((a, b) => a - b);

    result.debug = {
      inP99: p99Result.inP99,
      outP99: p99Result.outP99,
      momentumCapPercentile: MOMENTUM_CAP_PERCENTILE,
      edgeScoreRaw: {
        min: sorted[0] ?? 0,
        median,
        max: sorted[sorted.length - 1] ?? 0,
      },
      momentumSaturation:
        totalEdges > 0
          ? {
              countInAt1,
              countOutAt1,
              totalEdges,
              percentSaturatedIn: Math.round((countInAt1 / totalEdges) * 1000) / 10,
              percentSaturatedOut: Math.round((countOutAt1 / totalEdges) * 1000) / 10,
            }
          : undefined,
      momentumQuartilesIn: momentumInSorted.length > 0 ? quartiles(momentumInSorted) : undefined,
      momentumQuartilesOut: momentumOutSorted.length > 0 ? quartiles(momentumOutSorted) : undefined,
      topEdges,
    };
  }

  return result;
}

function edgesToK1Bundles(
  edges: ScoredEdge[],
  maxResults: number
): TransferBundle[] {
  const sorted = [...edges].sort((a, b) => b.edgeScoreRaw - a.edgeScoreRaw);
  return sorted.slice(0, maxResults).map((e) => ({
    outs: [e.outPlayerId],
    ins: [e.inPlayerId],
    score: e.edgeScoreRaw,
    reasons: e.reasons.slice(0, MAX_BUNDLE_REASONS),
    flags: {
      budgetUncertain: e.budgetUncertain || undefined,
    },
    components: [
      {
        outPlayerId: e.outPlayerId,
        inPlayerId: e.inPlayerId,
        score: e.edgeScore,
        reasons: e.reasons.slice(0, 3),
      },
    ],
  }));
}
