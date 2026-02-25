import type { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../lib/prisma";
import { generateLeagueRadar } from "../../prediction/leagueRadar/generate";
import { LEAGUE_RADAR } from "../../prediction/leagueRadar/constants";
import { leagueIdParamSchema } from "../shared/schemas";
import {
  sendBadRequest,
  sendNotFound,
  sendBadRequestGameweek,
} from "../shared/replies";
import { resolveAndValidateEventId } from "../shared/eventId";
import { getLeagueRadarQuerySchema } from "./getLeagueRadar.schemas";
import { createLeagueRadarLogger } from "./getLeagueRadar.utils";

/**
 * GET /league/:leagueId/radar
 * Returns 400 invalid input or no gameweek; 404 league not found; 500 unexpected.
 */
export async function getLeagueRadarHandler(
  request: FastifyRequest<{
    Params: { leagueId: string };
    Querystring: Record<string, string | undefined>;
  }>,
  reply: FastifyReply
): Promise<void> {
  const paramsResult = leagueIdParamSchema.safeParse(request.params);
  if (!paramsResult.success) {
    await sendBadRequest(reply, "Invalid leagueId", {
      details: paramsResult.error.flatten(),
    });
    return;
  }

  const queryResult = getLeagueRadarQuerySchema.safeParse(request.query);
  if (!queryResult.success) {
    await sendBadRequest(reply, "Invalid query parameters", {
      details: queryResult.error.flatten(),
    });
    return;
  }

  const { leagueId } = paramsResult.data;
  const { eventId: eventIdQuery, maxEntries, concurrency } = queryResult.data;

  const eventIdResult = await resolveAndValidateEventId(prisma, eventIdQuery);
  if ("error" in eventIdResult) {
    if (eventIdResult.error.code !== undefined) {
      await sendBadRequestGameweek(
        reply,
        eventIdResult.error.code,
        eventIdResult.error.message
      );
    } else {
      await sendBadRequest(reply, eventIdResult.error.message);
    }
    return;
  }
  const { eventId } = eventIdResult;

  const league = await prisma.fplLeague.findUnique({
    where: { id: leagueId },
    select: { id: true },
  });
  if (!league) {
    await sendNotFound(reply, `League ${leagueId} not found`);
    return;
  }

  const result = await generateLeagueRadar({
    leagueId,
    eventId,
    maxEntries,
    concurrency: concurrency ?? LEAGUE_RADAR.DEFAULT_CONCURRENCY,
    logger: createLeagueRadarLogger(request),
  });

  await reply.send(result);
}
