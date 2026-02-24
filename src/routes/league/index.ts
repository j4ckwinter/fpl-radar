import type { FastifyInstance } from "fastify";
import { getLeagueHandler } from "./getLeague";
import { postRefreshLeagueHandler } from "./postRefreshLeague";

export async function leagueRoutes(app: FastifyInstance): Promise<void> {
  // TODO: when @fastify/swagger is wired in the server, add route schema here
  // (params: leagueId, querystring: limit/offset/eventId, response: 200/400/404/500)
  // so GET /league/:leagueId appears in OpenAPI docs. Zod validation remains in getLeague.ts.
  app.get("/:leagueId", getLeagueHandler);
  app.post("/:leagueId/refresh", postRefreshLeagueHandler);
}
