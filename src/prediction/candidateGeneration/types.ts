export interface PlayerReference {
  id: number;
  teamId: number;
  positionId: number;
  nowCost: number;
}

export interface CandidateDiagnostics {
  squadPlayersCount: number;
  totalOutInPairsConsidered: number;
  filteredByBudget: number;
  filteredByAlreadyOwned: number;
  filteredByTeamLimit: number;
  legalCandidatesCount: number;
}
