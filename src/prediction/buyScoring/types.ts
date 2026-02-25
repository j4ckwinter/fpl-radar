export interface LoadBuyContextParams {
  leagueId: number;
  entryId: number;
  eventId: number;
}

export interface LoadBuyContextResult {
  ownedPlayerIds: Set<number>;
  teamCounts: Map<number, number>;
}

export interface BuyPoolPlayer {
  id: number;
  teamId: number;
  positionId: number;
  nowCost: number;
  status: string;
  news: string | null;
  selectedByPercent: number | null;
  webName: string;
  transfersInEvent: number;
}

export interface LoadBuyPoolParams {
  ownedPlayerIds: Set<number>;
  limit?: number;
}

export interface ScoreBuyCandidatesParams {
  leagueId: number;
  entryId: number;
  eventId: number;
  limit?: number;
  riskProfile?: "safe" | "balanced" | "risky";
}

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
    transfersInEvent: number;
    momentumIn: number; // 0..1
    upcomingFixtureScore: number | null;
    /** Fraction of league entries (with snapshot) that own this player, 0..1. */
    leagueOwnershipPct: number | null;
    /** Derived risk of not owning (v1: same as leagueOwnershipPct). */
    nonOwnershipRisk: number | null;
  };
}
