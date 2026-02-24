export interface LeagueRadarLogger {
  info(obj: object, msg?: string): void;
  error(obj: object, msg?: string): void;
}

export interface GenerateLeagueRadarParams {
  leagueId: number;
  eventId: number;
  maxEntries?: number;
  concurrency?: number;
  perEntryMaxResults?: number;
  logger: LeagueRadarLogger;
}

/** Internal accumulator for aggregating probabilities per player or transfer. */
export interface RadarAccumulator {
  expectedCount: number;
  entryIds: Set<number>;
  examples: Array<{ entryId: number; probability: number }>;
}

/** Result of predicting transfers for one entry (ok with predictions or fail). */
export type LeagueRadarEntryResult =
  | {
      status: "ok";
      entryId: number;
      predictions: Array<{
        outPlayerId: number;
        inPlayerId: number;
        probability: number;
        score: number;
      }>;
    }
  | { status: "fail"; entryId: number; predictions: [] };

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
