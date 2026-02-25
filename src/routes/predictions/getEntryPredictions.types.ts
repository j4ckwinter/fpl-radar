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

/** API response for GET entry predictions. */
export interface GetEntryPredictionsResponse {
  meta: {
    leagueId: number;
    entryId: number;
    eventId: number;
    generatedAt: string;
  };
  predictions: EntryPredictionDisplay[];
}
