import "dotenv/config";
import { Worker } from "bullmq";
import Redis from "ioredis";
import { LEAGUE_REFRESH_QUEUE_NAME } from "./jobs/queues";
import { processLeagueRefresh } from "./jobs/processors/leagueRefresh";
import type { LeagueRefreshJobPayload } from "./jobs/types";

const connection = new Redis(process.env.REDIS_URL ?? "redis://localhost:6379", {
  maxRetriesPerRequest: null,
});

const worker = new Worker<LeagueRefreshJobPayload>(
  LEAGUE_REFRESH_QUEUE_NAME,
  processLeagueRefresh,
  { connection }
);

worker.on("completed", (job, result) => {
  console.log(
    JSON.stringify({
      event: "job_completed",
      jobId: job.id,
      leagueId: job.data.leagueId,
      result,
    })
  );
});

worker.on("failed", (job, err) => {
  console.error(
    JSON.stringify({
      event: "job_failed",
      jobId: job?.id,
      leagueId: job?.data?.leagueId,
      error: err?.message ?? String(err),
    })
  );
});

async function shutdown(): Promise<void> {
  await worker.close();
  await connection.quit();
  process.exit(0);
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
