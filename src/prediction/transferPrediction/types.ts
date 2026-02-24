export interface PredictTransfersForEntryParams {
  leagueId: number;
  entryId: number;
  eventId: number;
  maxResults?: number;
}

export interface TransferPrediction {
  outPlayerId: number;
  inPlayerId: number;
  score: number; // 0..100
  probability: number; // 0..1, normalised across returned items
  reasons: string[];
  features: {
    sellScore: number;
    buyScore: number;
    estimatedCostDelta: number;
    resultingBank: number | null;
    budgetOk: boolean;
    teamLimitOk: boolean;
    positionOk: boolean;
  };
}
