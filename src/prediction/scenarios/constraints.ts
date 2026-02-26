import type { SquadState } from "../types";
import type { ScoredEdge } from "./types";

export interface BundleState {
  outs: Set<number>;
  ins: Set<number>;
  /** Team counts after applying all edges in the bundle. */
  teamCounts: Map<number, number>;
  /** Sum of (inNowCost - outNowCost) over edges (tenths). */
  totalCostDelta: number;
}

/**
 * Compute bundle state from squad and list of edges (for validation and scoring).
 */
export function getBundleState(
  bundle: ScoredEdge[],
  squad: SquadState
): BundleState {
  const teamCounts = new Map<number, number>();
  for (const p of squad.players) {
    teamCounts.set(p.teamId, (teamCounts.get(p.teamId) ?? 0) + 1);
  }

  const outs = new Set<number>();
  const ins = new Set<number>();
  let totalCostDelta = 0;

  for (const e of bundle) {
    outs.add(e.outPlayerId);
    ins.add(e.inPlayerId);
    teamCounts.set(e.outTeamId, (teamCounts.get(e.outTeamId) ?? 0) - 1);
    teamCounts.set(e.inTeamId, (teamCounts.get(e.inTeamId) ?? 0) + 1);
    totalCostDelta += e.inNowCost - e.outNowCost;
  }

  return { outs, ins, teamCounts, totalCostDelta };
}

const MAX_PLAYERS_PER_TEAM = 3;

/**
 * Check whether adding this edge to the bundle would keep constraints valid:
 * - out not already in bundle outs
 * - in not already in bundle ins
 * - if in is owned (in squad), in must be in bundle outs (sold in same bundle)
 * - after adding, no team exceeds 3 players
 */
export function canAddEdge(
  bundle: ScoredEdge[],
  edge: ScoredEdge,
  squad: SquadState
): boolean {
  const ownedPlayerIds = new Set(squad.players.map((p) => p.playerId));
  const state = getBundleState(bundle, squad);

  if (state.outs.has(edge.outPlayerId)) return false;
  if (state.ins.has(edge.inPlayerId)) return false;
  if (ownedPlayerIds.has(edge.inPlayerId) && !state.outs.has(edge.inPlayerId)) {
    return false;
  }

  const outCountAfter = (state.teamCounts.get(edge.outTeamId) ?? 0) - 1;
  const inCountAfter = (state.teamCounts.get(edge.inTeamId) ?? 0) + 1;
  if (outCountAfter < 0 || inCountAfter > MAX_PLAYERS_PER_TEAM) {
    return false;
  }

  return true;
}
