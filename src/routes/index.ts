import type { FastifyInstance } from "fastify";
import { leagueRoutes } from "./league";
import { predictionsRoutes } from "./predictions";

export async function registerRoutes(app: FastifyInstance): Promise<void> {
  app.register(leagueRoutes, { prefix: "/league" });
  app.register(predictionsRoutes, { prefix: "/league" });
}
