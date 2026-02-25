import type { FastifyRequest, FastifyReply } from "fastify";
import { getCache } from "../../lib/cache/cache";
import { prisma } from "../../lib/prisma";
import {
  predictTransfersForEntry,
  isTransferPrediction,
} from "../../prediction";
import { InvalidSquadError, SquadNotFoundError } from "../../prediction/errors";
import { parseRiskProfile } from "../../prediction/riskProfile";
import { leagueEntryParamsSchema } from "../shared/schemas";
import {
  sendBadRequest,
  sendNotFound,
  sendBadRequestGameweek,
} from "../shared/replies";
import { resolveAndValidateEventId } from "../shared/eventId";
import { PREDICTIONS_CACHE_TTL_SECONDS } from "./getEntryPredictions.constants";
import { getEntryPredictionsQuerySchema } from "./getEntryPredictions.schemas";
import type {
  GetEntryPredictionsResponse,
  PredictionPlayerDisplay,
} from "./getEntryPredictions.types";
import {
  predictionsCacheKey,
  mapPredictionsToDisplay,
} from "./getEntryPredictions.utils";

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
  const paramsResult = leagueEntryParamsSchema.safeParse(request.params);
  if (!paramsResult.success) {
    await sendBadRequest(reply, "Invalid leagueId or entryId", {
      details: paramsResult.error.flatten(),
    });
    return;
  }

  const queryResult = getEntryPredictionsQuerySchema.safeParse(request.query);
  if (!queryResult.success) {
    await sendBadRequest(reply, "Invalid query parameters", {
      details: queryResult.error.flatten(),
    });
    return;
  }

  const { leagueId, entryId } = paramsResult.data;
  const { limit, eventId: eventIdQuery, riskProfile: riskProfileQuery } =
    queryResult.data;
  const riskProfile = parseRiskProfile(riskProfileQuery);

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

  const entry = await prisma.fplLeagueEntry.findFirst({
    where: { id: entryId, leagueId },
    select: { id: true },
  });
  if (!entry) {
    await sendNotFound(
      reply,
      `Entry ${entryId} not found in league ${leagueId}`
    );
    return;
  }

  const cache = await getCache();
  const cacheKey = predictionsCacheKey(
    leagueId,
    entryId,
    eventId,
    limit,
    riskProfile
  );
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
      riskProfile,
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

  const transferPredictions = predictions.filter(isTransferPrediction);
  const playerIds = [
    ...new Set(
      transferPredictions.flatMap((p) => [p.outPlayerId, p.inPlayerId])
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

  const playerMap = new Map<number, PredictionPlayerDisplay>(
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

  const displayPredictions = mapPredictionsToDisplay(predictions, playerMap);

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
