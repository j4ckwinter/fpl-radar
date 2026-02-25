import type { FastifyRequest } from "fastify";
import type { LeagueRadarLogger } from "../../prediction/leagueRadar/types";

/**
 * Build a LeagueRadarLogger that forwards to the request logger.
 */
export function createLeagueRadarLogger(
  request: FastifyRequest
): LeagueRadarLogger {
  return {
    info(obj, msg) {
      request.log.info(obj, msg);
    },
    error(obj, msg) {
      request.log.error(obj, msg);
    },
  };
}
