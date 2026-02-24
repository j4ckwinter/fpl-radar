export interface SquadState {
  entryId: number;
  leagueId: number;
  eventId: number;
  bank: number | null; // tenths
  players: Array<{
    playerId: number;
    teamId: number;
    positionId: number;
    nowCost: number;
  }>;
}

export interface TransferCandidate {
  outPlayerId: number;
  inPlayerId: number;
  outTeamId: number;
  inTeamId: number;
  positionId: number;
  estimatedSellPrice: number;
  buyPrice: number;
  estimatedCostDelta: number; // buy - sell
  resultingBank: number | null;
  checks: {
    budgetOk: boolean;
    alreadyOwned: boolean;
    teamLimitOk: boolean;
    positionOk: boolean;
  };
}
