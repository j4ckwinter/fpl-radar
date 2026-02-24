export interface BuyCandidateScore {
  playerId: number;
  buyScore: number; // 0..100 integer
  reasons: string[];
  features: {
    isAvailable: boolean;
    status: string;
    hasNews: boolean;
    selectedByPercent: number | null;
    nowCost: number;
    positionId: number;
    teamId: number;
  };
}
