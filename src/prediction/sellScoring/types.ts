export interface SellCandidateScore {
  playerId: number;
  sellScore: number; // 0..100 integer
  reasons: string[];
  features: {
    isFlagged: boolean;
    status: string;
    hasNews: boolean;
    selectedByPercent: number | null;
    isBenched: boolean;
    isCaptainOrVice: boolean;
    nowCost: number;
  };
}
