import type { z } from "zod";
import type { leagueEntryParamsSchema } from "../shared/schemas";
import type { getEntryPredictionsQuerySchema } from "./getEntryPredictions.schemas";

/** Params for GET /league/:leagueId/entry/:entryId/predictions. */
export type GetEntryPredictionsParams = z.infer<typeof leagueEntryParamsSchema>;

/** Query for GET entry predictions. */
export type GetEntryPredictionsQuery = z.infer<
  typeof getEntryPredictionsQuerySchema
>;

/** Player data used when building transfer prediction display. */
export interface PredictionPlayerDisplay {
  playerId: number;
  webName: string;
  team: { id: number; shortName: string };
  position: { id: number; shortName: string };
  nowCost: number;
}

/** Display shape for a single transfer prediction (OUT → IN). */
export interface TransferPredictionDisplay {
  type?: "transfer";
  out: PredictionPlayerDisplay;
  in: PredictionPlayerDisplay;
  score: number;
  probability: number;
  estimatedCostDelta: number;
  resultingBank: number | null;
  reasons: string[];
}

/** Display shape for the NO_TRANSFER outcome. */
export interface NoTransferPredictionDisplay {
  type: "NO_TRANSFER";
  score: number;
  probability: number;
  reasons: string[];
}

export type EntryPredictionDisplay =
  | TransferPredictionDisplay
  | NoTransferPredictionDisplay;

/** Display shape for one bundle within a scenario (enriched for API). */
export interface ScenarioBundleDisplay {
  /** Stable id for keys (k + out ids + in ids). */
  bundleId: string;
  /** OUT players. */
  outs: PredictionPlayerDisplay[];
  /** IN players. */
  ins: PredictionPlayerDisplay[];
  score: number;
  /** Probability within this scenario's k (bundles in same k sum to 1). */
  probability: number;
  reasons: string[];
  flags: { budgetUncertain?: boolean; likelyHit?: boolean };
  /** Present only when includeComponents=true. */
  components?: Array<{
    outPlayerId: number;
    inPlayerId: number;
    score: number;
    reasons: string[];
  }>;
}

/** Display shape for one scenario (k=1, 2, or 3). */
export interface ScenarioDisplay {
  k: 1 | 2 | 3;
  bundles: ScenarioBundleDisplay[];
}

/** Scenario config under meta when includeScenarios=true. */
export interface ScenarioConfigDisplay {
  riskProfile?: "safe" | "balanced" | "risky";
  beamWidth: number;
  resultsPerK: number;
  sellPool: number;
  buyPoolPerPosition: number;
  maxEdgesPerOut: number;
}

/** API response for GET entry predictions. */
export interface GetEntryPredictionsResponse {
  meta: {
    leagueId: number;
    entryId: number;
    eventId: number;
    generatedAt: string;
    /** Present when includeScenarios=true. */
    scenarioConfig?: ScenarioConfigDisplay;
  };
  predictions: EntryPredictionDisplay[];
  /** Present when includeScenarios=true. */
  scenarios?: ScenarioDisplay[];
}
