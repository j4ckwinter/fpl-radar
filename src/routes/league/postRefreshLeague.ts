import { z } from "zod";
import type { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../lib/prisma";
import { ensureGameweekStarted } from "../../lib/gameweek";
import { enqueueLeagueRefresh } from "../../jobs/enqueue";

const paramsSchema = z.object({
  leagueId: z.coerce.number().int().positive(),
});

const bodySchema = z
  .object({
    eventId: z.number().int().positive().optional(),
    maxEntries: z.number().int().min(1).optional(),
    force: z.boolean().optional(),
  })
  .optional()
  .default({});

export type PostRefreshLeagueParams = z.infer<typeof paramsSchema>;
export type PostRefreshLeagueBody = z.infer<typeof bodySchema>;

export interface PostRefreshLeagueResponse {
  leagueId: number;
  jobId: string;
  status: "queued";
}

export async function postRefreshLeagueHandler(
  request: FastifyRequest<{
    Params: { leagueId: string };
    Body: unknown;
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

  const bodyResult = bodySchema.safeParse(request.body ?? {});
  if (!bodyResult.success) {
    await reply.status(400).send({
      error: "Bad Request",
      message: "Invalid body",
      details: bodyResult.error.flatten(),
    });
    return;
  }

  const { leagueId } = paramsResult.data;
  const body = bodyResult.data;

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

  if (body.eventId !== undefined) {
    const gameweekError = await ensureGameweekStarted(prisma, body.eventId);
    if (gameweekError !== null) {
      await reply.status(400).send({
        error: "Bad Request",
        code: gameweekError.code,
        message: gameweekError.message,
      });
      return;
    }
  }

  const { jobId } = await enqueueLeagueRefresh({
    leagueId,
    eventId: body.eventId,
    maxEntries: body.maxEntries,
    force: body.force,
  });

  const response: PostRefreshLeagueResponse = {
    leagueId,
    jobId,
    status: "queued",
  };
  await reply.status(202).send(response);
}
