import type { FastifyInstance } from "fastify";
import { getEntryPredictionsHandler } from "./getEntryPredictions";
import { getLeagueRadarHandler } from "./getLeagueRadar";

export async function predictionsRoutes(app: FastifyInstance): Promise<void> {
  app.get(
    "/:leagueId/entry/:entryId/predictions",
    getEntryPredictionsHandler
  );
  app.get("/:leagueId/radar", getLeagueRadarHandler);
}
