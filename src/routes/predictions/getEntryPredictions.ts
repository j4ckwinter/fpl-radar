import { z } from "zod";
import type { FastifyRequest, FastifyReply } from "fastify";
import { getCache } from "../../lib/cache/cache";
import { prisma } from "../../lib/prisma";
import {
  ensureGameweekStarted,
  resolveStartedEventIdFromDb,
} from "../../lib/gameweek";
import { predictTransfersForEntry } from "../../prediction";
import { InvalidSquadError, SquadNotFoundError } from "../../prediction/errors";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;
const PREDICTIONS_CACHE_TTL_SECONDS = 60;

function predictionsCacheKey(
  leagueId: number,
  entryId: number,
  eventId: number,
  limit: number
): string {
  return `predictions:league:${leagueId}:entry:${entryId}:event:${eventId}:limit:${limit}`;
}

const paramsSchema = z.object({
  leagueId: z.coerce.number().int().positive(),
  entryId: z.coerce.number().int().positive(),
});

const querySchema = z.object({
  eventId: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().min(1).max(MAX_LIMIT).default(DEFAULT_LIMIT),
});

export type GetEntryPredictionsParams = z.infer<typeof paramsSchema>;
export type GetEntryPredictionsQuery = z.infer<typeof querySchema>;

export interface EntryPredictionDisplay {
  out: {
    playerId: number;
    webName: string;
    team: { id: number; shortName: string };
    position: { id: number; shortName: string };
    nowCost: number;
  };
  in: {
    playerId: number;
    webName: string;
    team: { id: number; shortName: string };
    position: { id: number; shortName: string };
    nowCost: number;
  };
  score: number;
  probability: number;
  estimatedCostDelta: number;
  resultingBank: number | null;
  reasons: string[];
}

export interface GetEntryPredictionsResponse {
  meta: {
    leagueId: number;
    entryId: number;
    eventId: number;
    generatedAt: string;
  };
  predictions: EntryPredictionDisplay[];
}

async function resolveEventIdFromDb(): Promise<number | null> {
  return resolveStartedEventIdFromDb(prisma);
}

/**
 * GET /league/:leagueId/entry/:entryId/predictions
 * Returns 400 invalid input; 404 entry not in league; 409 SNAPSHOT_MISSING; 500 unexpected.
 */
export async function getEntryPredictionsHandler(
  request: FastifyRequest<{
    Params: { leagueId: string; entryId: string };
    Querystring: Record<string, string | undefined>;
  }>,
  reply: FastifyReply
): Promise<void> {
  const paramsResult = paramsSchema.safeParse(request.params);
  if (!paramsResult.success) {
    await reply.status(400).send({
      error: "Bad Request",
      message: "Invalid leagueId or entryId",
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

  const { leagueId, entryId } = paramsResult.data;
  const { limit, eventId: eventIdQuery } = queryResult.data;

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

  const entry = await prisma.fplLeagueEntry.findFirst({
    where: { id: entryId, leagueId },
    select: { id: true },
  });
  if (!entry) {
    await reply.status(404).send({
      error: "Not Found",
      message: `Entry ${entryId} not found in league ${leagueId}`,
    });
    return;
  }

  const cache = await getCache();
  const cacheKey = predictionsCacheKey(leagueId, entryId, eventId, limit);
  const cached = await cache.get<GetEntryPredictionsResponse>(cacheKey);
  if (cached !== null) {
    await reply.send(cached);
    return;
  }

  let predictions: Awaited<
    ReturnType<typeof predictTransfersForEntry>
  >["predictions"];
  try {
    const result = await predictTransfersForEntry({
      leagueId,
      entryId,
      eventId,
      maxResults: limit,
    });
    predictions = result.predictions;
  } catch (err) {
    if (err instanceof SquadNotFoundError || err instanceof InvalidSquadError) {
      await reply.status(409).send({
        error: "Conflict",
        code: "SNAPSHOT_MISSING",
        message:
          "Snapshot missing for this entry and event. Run entry-picks ingestion for the event.",
      });
      return;
    }
    throw err;
  }

  const playerIds = [
    ...new Set(
      predictions.flatMap((p) => [p.outPlayerId, p.inPlayerId])
    ),
  ];

  const players =
    playerIds.length > 0
      ? await prisma.fplPlayer.findMany({
          where: { id: { in: playerIds } },
          select: {
            id: true,
            webName: true,
            nowCost: true,
            teamId: true,
            positionId: true,
            team: { select: { id: true, shortName: true } },
            position: { select: { id: true, shortName: true } },
          },
        })
      : [];

  const playerMap = new Map(
    players.map((p) => [
      p.id,
      {
        playerId: p.id,
        webName: p.webName,
        team: p.team,
        position: p.position,
        nowCost: p.nowCost,
      },
    ])
  );

  const displayPredictions: EntryPredictionDisplay[] = predictions.map(
    (p) => {
      const out = playerMap.get(p.outPlayerId);
      const inPlayer = playerMap.get(p.inPlayerId);
      if (!out || !inPlayer) {
        throw new Error(
          `Missing player data for out=${p.outPlayerId} in=${p.inPlayerId}`
        );
      }
      return {
        out: {
          playerId: out.playerId,
          webName: out.webName,
          team: { id: out.team.id, shortName: out.team.shortName },
          position: { id: out.position.id, shortName: out.position.shortName },
          nowCost: out.nowCost,
        },
        in: {
          playerId: inPlayer.playerId,
          webName: inPlayer.webName,
          team: { id: inPlayer.team.id, shortName: inPlayer.team.shortName },
          position: {
            id: inPlayer.position.id,
            shortName: inPlayer.position.shortName,
          },
          nowCost: inPlayer.nowCost,
        },
        score: p.score,
        probability: p.probability,
        estimatedCostDelta: p.features.estimatedCostDelta,
        resultingBank: p.features.resultingBank,
        reasons: p.reasons,
      };
    }
  );

  const response: GetEntryPredictionsResponse = {
    meta: {
      leagueId,
      entryId,
      eventId,
      generatedAt: new Date().toISOString(),
    },
    predictions: displayPredictions,
  };

  await cache.set(cacheKey, response, PREDICTIONS_CACHE_TTL_SECONDS);
  await reply.send(response);
}
