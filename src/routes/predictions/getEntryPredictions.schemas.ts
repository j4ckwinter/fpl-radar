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
  /** When true, include transfer bundle scenarios (k=1..3) in the response. */
  includeScenarios: z.coerce.boolean().optional().default(false),
  /** When true with includeScenarios, include per-transfer components in each bundle. */
  includeComponents: z.coerce.boolean().optional().default(false),
});
