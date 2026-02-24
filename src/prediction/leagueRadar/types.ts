export interface EntryPredictionSummary {
  entryId: number;
  predictions: Array<{
    outPlayerId: number;
    inPlayerId: number;
    probability: number;
    score: number;
  }>;
}

export interface PlayerRadarItem {
  playerId: number;
  expectedCount: number; // sum of probabilities
  uniqueEntries: number; // count of distinct entries contributing
  examples: Array<{ entryId: number; probability: number }>;
}

export interface TransferRadarItem {
  outPlayerId: number;
  inPlayerId: number;
  expectedCount: number;
  uniqueEntries: number;
  examples: Array<{ entryId: number; probability: number }>;
}

export interface LeagueRadarResult {
  leagueId: number;
  eventId: number;
  generatedAt: string;
  coverage: {
    totalEntries: number;
    processed: number;
    succeeded: number;
    failed: number;
    durationMs: number;
  };
  buyRadar: PlayerRadarItem[];
  sellRadar: PlayerRadarItem[];
  transferRadar: TransferRadarItem[];
}
