import type { SquadState, TransferCandidate } from "../types";

export interface GenerateSingleTransferCandidatesParams {
  squad: SquadState;
  maxCandidates?: number;
  perPositionInPoolLimit?: number;
}

export interface PlayerRow {
  id: number;
  teamId: number;
  positionId: number;
  nowCost: number;
}

export interface GenerateCandidatesResult {
  candidates: TransferCandidate[];
  stats: {
    outPlayers: number;
    inPool: number;
    generated: number;
    filteredBudget: number;
    filteredOwned: number;
    filteredTeamLimit: number;
    filteredPosition: number;
    truncated: boolean;
    inPoolPerPositionLimit: number;
    inPoolSizeByPosition: Record<number, number>;
    inPoolSizeByPositionBeforeLimit: Record<number, number>;
  };
}

export interface GenerateCandidatesOptions {
  perPositionLimit?: number;
  inPoolSizeByPosition?: Record<number, number>;
  inPoolSizeByPositionBeforeLimit?: Record<number, number>;
}
