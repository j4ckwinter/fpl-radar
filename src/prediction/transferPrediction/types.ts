export interface PredictTransfersForEntryParams {
  leagueId: number;
  entryId: number;
  eventId: number;
  maxResults?: number;
  riskProfile?: "safe" | "balanced" | "risky";
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

export interface NoTransferPrediction {
  type: "NO_TRANSFER";
  score: number;
  probability: number;
  reasons: string[];
}

export type EntryPrediction = TransferPrediction | NoTransferPrediction;

export function isTransferPrediction(
  p: EntryPrediction
): p is TransferPrediction {
  return "outPlayerId" in p;
}
