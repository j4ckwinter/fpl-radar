import { z } from "zod";
import {
  DEFAULT_LIMIT,
  MAX_LIMIT,
} from "./getEntryPredictions.constants";

/** Query schema for GET /league/:leagueId/entry/:entryId/predictions. */
export const getEntryPredictionsQuerySchema = z.object({
  eventId: z.coerce.number().int().positive().optional(),
  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(MAX_LIMIT)
    .default(DEFAULT_LIMIT),
  riskProfile: z.enum(["safe", "balanced", "risky"]).optional(),
});
