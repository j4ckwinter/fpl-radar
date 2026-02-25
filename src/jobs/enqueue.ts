import { leagueRefreshQueue } from "./queues";
import type { LeagueRefreshJobPayload } from "./types";

/**
 * Build a stable job id for dedupe when force=false.
 * BullMQ job ids must not contain ":" (Redis), so we use "-".
 */
function leagueRefreshJobId(payload: LeagueRefreshJobPayload): string {
  const eventPart = payload.eventId ?? "auto";
  const maxPart = payload.maxEntries ?? "all";
  return `league-refresh-${payload.leagueId}-${eventPart}-${maxPart}`;
}

/**
 * Enqueues a league refresh job. When force=false, if a job with the same
 * leagueId/eventId/maxEntries is already waiting or active, returns that job's id.
 */
export async function enqueueLeagueRefresh(
  payload: LeagueRefreshJobPayload
): Promise<{ jobId: string }> {
  const jobOptions = {
    removeOnComplete: { count: 100 },
    removeOnFail: false,
  };

  if (payload.force !== true) {
    const jobId = leagueRefreshJobId(payload);
    const existing = await leagueRefreshQueue.getJob(jobId);
    if (existing) {
      const state = await existing.getState();
      if (state === "waiting" || state === "delayed" || state === "active") {
        return { jobId: existing.id! };
      }
    }
    const job = await leagueRefreshQueue.add("refresh", payload, {
      ...jobOptions,
      jobId,
    });
    return { jobId: job.id! };
  }

  const job = await leagueRefreshQueue.add("refresh", payload, jobOptions);
  return { jobId: job.id! };
}
