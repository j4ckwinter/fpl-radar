export interface ScoreSellCandidatesParams {
  leagueId: number;
  entryId: number;
  eventId: number;
  topN?: number;
}

export interface ExtractSellFeaturesParams {
  picks: Array<{
    playerId: number;
    pickPosition: number; // 1..15
    isCaptain: boolean;
    isViceCaptain: boolean;
  }>;
  playersById: Map<
    number,
    {
      status: string;
      news: string | null;
      selectedByPercent: number | null;
      nowCost: number;
    }
  >;
}

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
