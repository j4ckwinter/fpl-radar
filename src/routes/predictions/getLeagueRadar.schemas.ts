import { z } from "zod";

/** Query schema for GET /league/:leagueId/radar. */
export const getLeagueRadarQuerySchema = z.object({
  eventId: z.coerce.number().int().positive().optional(),
  maxEntries: z.coerce.number().int().min(1).optional(),
  concurrency: z.coerce.number().int().min(1).optional(),
});
