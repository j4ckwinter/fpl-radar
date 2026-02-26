import type { SquadState } from "../../types";
import type { BeamItem, BeamSearchParams } from "./beamSearch.types";
import type { ScoredEdge, TransferBundle } from "../types";
import { BEAM_WIDTH, RESULTS_PER_K, BUDGET_UNCERTAIN_PENALTY } from "../constants";
import { canAddEdge, getBundleState } from "../constraints";
import { aggregateBundleReasons } from "./bundleReasons";
import {
  canonicalBundleKey,
  sortEdgesCanonical,
  compareBeamItems,
} from "./beamSearch.utils";

function bundleScore(
  edges: ScoredEdge[],
  squad: SquadState
): { scoreRaw: number; budgetUncertain: boolean } {
  const state = getBundleState(edges, squad);
  const raw = edges.reduce((s, e) => s + e.edgeScoreRaw, 0);
  const resultingBank =
    squad.bank !== null ? squad.bank - state.totalCostDelta : null;
  const budgetUncertain =
    squad.bank === null || (resultingBank !== null && resultingBank < 0);
  const penalty = budgetUncertain ? BUDGET_UNCERTAIN_PENALTY : 0;
  return { scoreRaw: raw - penalty, budgetUncertain };
}

function toTransferBundle(item: BeamItem, k: 2 | 3): TransferBundle {
  const sortedEdges = sortEdgesCanonical(item.edges);
  const outs = sortedEdges.map((e) => e.outPlayerId);
  const ins = sortedEdges.map((e) => e.inPlayerId);
  const reasons = aggregateBundleReasons(sortedEdges);
  return {
    outs,
    ins,
    score: item.scoreRaw,
    reasons,
    flags: {
      budgetUncertain: item.budgetUncertain || undefined,
      likelyHit: k === 3 ? true : undefined,
    },
    components: sortedEdges.map((e) => ({
      outPlayerId: e.outPlayerId,
      inPlayerId: e.inPlayerId,
      score: e.edgeScore,
      reasons: e.reasons.slice(0, 3),
    })),
  };
}

/**
 * Run beam search for bundles of size k (2 or 3). Returns top bundles by score.
 */
export function runBeamSearch(params: BeamSearchParams): TransferBundle[] {
  const { edges, squad, k, maxResults = RESULTS_PER_K } = params;

  let beam: BeamItem[] = [{ edges: [], scoreRaw: 0, budgetUncertain: false }];

  for (let step = 0; step < k; step++) {
    const expanded: BeamItem[] = [];
    for (const item of beam) {
      for (const edge of edges) {
        if (!canAddEdge(item.edges, edge, squad)) continue;
        const newEdges = [...item.edges, edge];
        const { scoreRaw, budgetUncertain } = bundleScore(newEdges, squad);
        expanded.push({ edges: newEdges, scoreRaw, budgetUncertain });
      }
    }
    expanded.sort(compareBeamItems);
    beam = expanded.slice(0, BEAM_WIDTH);
  }

  const seen = new Set<string>();
  const result: TransferBundle[] = [];
  for (const item of beam) {
    if (result.length >= maxResults) break;
    const key = canonicalBundleKey(item.edges);
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(toTransferBundle(item, k));
  }
  return result;
}
