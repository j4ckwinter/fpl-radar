import { z } from "zod";

/** Shared param: leagueId (positive int). Used by GET/POST league and predictions. */
export const leagueIdParamSchema = z.object({
  leagueId: z.coerce.number().int().positive(),
});

/** Params for routes under /league/:leagueId/entry/:entryId. */
export const leagueEntryParamsSchema = z.object({
  leagueId: z.coerce.number().int().positive(),
  entryId: z.coerce.number().int().positive(),
});

/** Optional eventId in query (positive int). */
export const eventIdQuerySchema = z.object({
  eventId: z.coerce.number().int().positive().optional(),
});
