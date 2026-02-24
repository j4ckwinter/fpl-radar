import { z } from "zod";
import type { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../lib/prisma";
import { leagueIdParamSchema } from "../shared/schemas";
import { sendBadRequest, sendNotFound } from "../shared/replies";

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 200;

const querySchema = z.object({
  limit: z.coerce.number().int().min(1).max(MAX_LIMIT).default(DEFAULT_LIMIT),
  offset: z.coerce.number().int().min(0).default(0),
  eventId: z.coerce.number().int().positive().optional(),
});

export type GetLeagueParams = z.infer<typeof leagueIdParamSchema>;
export type GetLeagueQuery = z.infer<typeof querySchema>;

/** Response shape for GET /league/:leagueId; use for OpenAPI schema when Swagger is wired. */
export interface LeagueOverviewResponse {
  league: {
    id: number;
    name: string;
    updatedAt: string;
  };
  rivals: Array<{
    entryId: number;
    entryName: string;
    playerName: string;
    rank: number;
    lastRank: number | null;
    totalPoints: number;
    hasSnapshot: boolean | null;
  }>;
  page: {
    limit: number;
    offset: number;
    total: number;
  };
}

export async function getLeagueHandler(
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

  const queryResult = querySchema.safeParse(request.query);
  if (!queryResult.success) {
    await sendBadRequest(reply, "Invalid query parameters", {
      details: queryResult.error.flatten(),
    });
    return;
  }

  const { leagueId } = paramsResult.data;
  const { limit, offset, eventId } = queryResult.data;

  const league = await prisma.fplLeague.findUnique({
    where: { id: leagueId },
    select: { id: true, name: true, updatedAt: true },
  });

  if (!league) {
    await sendNotFound(reply, `League ${leagueId} not found`);
    return;
  }

  const [total, entries] = await Promise.all([
    prisma.fplLeagueEntry.count({ where: { leagueId } }),
    prisma.fplLeagueEntry.findMany({
      where: { leagueId },
      orderBy: { rank: "asc" },
      skip: offset,
      take: limit,
      select: {
        id: true,
        entryName: true,
        playerName: true,
        rank: true,
        lastRank: true,
        totalPoints: true,
      },
    }),
  ]);

  let snapshotEntryIds: Set<number> = new Set();
  if (eventId !== undefined && entries.length > 0) {
    const entryIds = entries.map((e) => e.id);
    const snapshots = await prisma.fplEntrySnapshot.findMany({
      where: {
        leagueId,
        eventId,
        entryId: { in: entryIds },
      },
      select: { entryId: true },
    });
    snapshotEntryIds = new Set(snapshots.map((s) => s.entryId));
  }

  const rivals = entries.map((e) => ({
    entryId: e.id,
    entryName: e.entryName,
    playerName: e.playerName,
    rank: e.rank,
    lastRank: e.lastRank,
    totalPoints: e.totalPoints,
    hasSnapshot:
      eventId === undefined ? null : snapshotEntryIds.has(e.id),
  }));

  const response: LeagueOverviewResponse = {
    league: {
      id: league.id,
      name: league.name,
      updatedAt: league.updatedAt.toISOString(),
    },
    rivals,
    page: {
      limit,
      offset,
      total,
    },
  };

  await reply.send(response);
}
