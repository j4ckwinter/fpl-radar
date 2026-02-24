import { z } from "zod";
import type { FastifyRequest, FastifyReply } from "fastify";
import { leagueRefreshQueue } from "../../jobs/queues";

const paramsSchema = z.object({
  jobId: z.string().min(1),
});

export interface JobStatusResponse {
  jobId: string;
  state: string;
  progress: { step?: string; completed?: number; total?: number } | number | null;
  result: unknown;
  error: string | null;
}

export async function getJobStatusHandler(
  request: FastifyRequest<{ Params: { jobId: string } }>,
  reply: FastifyReply
): Promise<void> {
  const paramsResult = paramsSchema.safeParse(request.params);
  if (!paramsResult.success) {
    await reply.status(400).send({
      error: "Bad Request",
      message: "Invalid jobId",
      details: paramsResult.error.flatten(),
    });
    return;
  }
  const { jobId } = paramsResult.data;

  const job = await leagueRefreshQueue.getJob(jobId);
  if (!job) {
    await reply.status(404).send({
      error: "Not Found",
      message: `Job ${jobId} not found`,
    });
    return;
  }

  const state = await job.getState();
  const progress = job.progress;
  const result = job.returnvalue ?? null;
  const error =
    state === "failed" && job.failedReason ? job.failedReason : null;

  const response: JobStatusResponse = {
    jobId: job.id!,
    state,
    progress:
      typeof progress === "object" && progress !== null ? progress : progress,
    result,
    error,
  };
  await reply.send(response);
}
