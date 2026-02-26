import type { BeamItemLike } from "./beamSearch.types";
import type { ScoredEdge } from "../types";

/** Canonical key for deduplication: same set of (outs, ins) in any order => same key. */
export function canonicalBundleKey(edges: ScoredEdge[]): string {
  const outs = [...new Set(edges.map((e) => e.outPlayerId))].sort((a, b) => a - b);
  const ins = [...new Set(edges.map((e) => e.inPlayerId))].sort((a, b) => a - b);
  return `${outs.join(",")}|${ins.join(",")}`;
}

/** Sort edges by out then in so bundle output order is stable for the same set. */
export function sortEdgesCanonical(edges: ScoredEdge[]): ScoredEdge[] {
  return [...edges].sort((a, b) =>
    a.outPlayerId !== b.outPlayerId
      ? a.outPlayerId - b.outPlayerId
      : a.inPlayerId - b.inPlayerId
  );
}

/** Tie-break: by outs ascending, then ins ascending (deterministic). */
export function compareBeamItems(a: BeamItemLike, b: BeamItemLike): number {
  if (b.scoreRaw !== a.scoreRaw) return b.scoreRaw - a.scoreRaw;
  const aOuts = [...a.edges.map((e) => e.outPlayerId)].sort((x, y) => x - y);
  const bOuts = [...b.edges.map((e) => e.outPlayerId)].sort((x, y) => x - y);
  for (let i = 0; i < aOuts.length; i++) {
    if (aOuts[i] !== bOuts[i]) return aOuts[i] - bOuts[i];
  }
  const aIns = [...a.edges.map((e) => e.inPlayerId)].sort((x, y) => x - y);
  const bIns = [...b.edges.map((e) => e.inPlayerId)].sort((x, y) => x - y);
  for (let i = 0; i < aIns.length; i++) {
    if (aIns[i] !== bIns[i]) return aIns[i] - bIns[i];
  }
  return 0;
}
