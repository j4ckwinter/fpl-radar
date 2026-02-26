import type { SquadState } from "../../types";
import type { ScoredEdge } from "../types";

/** Params for running beam search over edges. */
export interface BeamSearchParams {
  edges: ScoredEdge[];
  squad: SquadState;
  k: 2 | 3;
  maxResults?: number;
}

/** Internal beam item: partial bundle and its raw score. */
export interface BeamItem {
  edges: ScoredEdge[];
  scoreRaw: number;
  budgetUncertain: boolean;
}

/** Minimal shape for beam item comparison (used by compareBeamItems). */
export interface BeamItemLike {
  edges: ScoredEdge[];
  scoreRaw: number;
}
