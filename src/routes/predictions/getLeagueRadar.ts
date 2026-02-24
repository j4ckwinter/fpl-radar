import { z } from "zod";
import type { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../lib/prisma";
import {
  ensureGameweekStarted,
  resolveStartedEventIdFromDb,
} from "../../lib/gameweek";
import {
  generateLeagueRadar,
  type LeagueRadarLogger,
} from "../../prediction/leagueRadar/generate";
import { LEAGUE_RADAR } from "../../prediction/leagueRadar/constants";

const paramsSchema = z.object({
  leagueId: z.coerce.number().int().positive(),
});

const querySchema = z.object({
  eventId: z.coerce.number().int().positive().optional(),
  maxEntries: z.coerce.number().int().min(1).optional(),
  concurrency: z.coerce.number().int().min(1).optional(),
});

export type GetLeagueRadarParams = z.infer<typeof paramsSchema>;
export type GetLeagueRadarQuery = z.infer<typeof querySchema>;

async function resolveEventIdFromDb(): Promise<number | null> {
  return resolveStartedEventIdFromDb(prisma);
}

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
  const paramsResult = paramsSchema.safeParse(request.params);
  if (!paramsResult.success) {
    await reply.status(400).send({
      error: "Bad Request",
      message: "Invalid leagueId",
      details: paramsResult.error.flatten(),
    });
    return;
  }

  const queryResult = querySchema.safeParse(request.query);
  if (!queryResult.success) {
    await reply.status(400).send({
      error: "Bad Request",
      message: "Invalid query parameters",
      details: queryResult.error.flatten(),
    });
    return;
  }

  const { leagueId } = paramsResult.data;
  const { eventId: eventIdQuery, maxEntries, concurrency } = queryResult.data;

  const eventId =
    eventIdQuery ?? (await resolveEventIdFromDb());
  if (eventId === null) {
    await reply.status(400).send({
      error: "Bad Request",
      message:
        "No gameweek available. Set eventId in query or run bootstrap ingestion.",
    });
    return;
  }

  const gameweekError = await ensureGameweekStarted(prisma, eventId);
  if (gameweekError !== null) {
    await reply.status(400).send({
      error: "Bad Request",
      code: gameweekError.code,
      message: gameweekError.message,
    });
    return;
  }

  const league = await prisma.fplLeague.findUnique({
    where: { id: leagueId },
    select: { id: true },
  });
  if (!league) {
    await reply.status(404).send({
      error: "Not Found",
      message: `League ${leagueId} not found`,
    });
    return;
  }

  const logger: LeagueRadarLogger = {
    info(obj, msg) {
      request.log.info(obj, msg);
    },
    error(obj, msg) {
      request.log.error(obj, msg);
    },
  };

  const result = await generateLeagueRadar({
    leagueId,
    eventId,
    maxEntries,
    concurrency: concurrency ?? LEAGUE_RADAR.DEFAULT_CONCURRENCY,
    logger,
  });

  await reply.send(result);
}
