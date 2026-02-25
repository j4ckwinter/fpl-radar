import type { z } from "zod";
import type { leagueIdParamSchema } from "../shared/schemas";
import type { getLeagueRadarQuerySchema } from "./getLeagueRadar.schemas";

/** Params for GET /league/:leagueId/radar. */
export type GetLeagueRadarParams = z.infer<typeof leagueIdParamSchema>;

/** Query for GET league radar. */
export type GetLeagueRadarQuery = z.infer<typeof getLeagueRadarQuerySchema>;
