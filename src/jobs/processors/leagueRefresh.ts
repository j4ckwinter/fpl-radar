import type { Job } from "bullmq";
import { prisma } from "../../lib/prisma";
import {
  ensureGameweekStarted,
  resolveStartedEventIdFromDb,
} from "../../lib/gameweek";
import {
  ingestLeagueStandings,
  ingestLeagueEntryPicks,
  ingestLeagueEntryTransfers,
} from "../../ingestion";
import { generateLeagueRadar } from "../../prediction/leagueRadar/generate";
import type { LeagueRadarLogger } from "../../prediction/leagueRadar/generate";
import type { LeagueRefreshJobPayload } from "../types";

async function resolveEventIdFromDb(): Promise<number> {
  const eventId = await resolveStartedEventIdFromDb(prisma);
  if (eventId === null) {
    throw new Error("No started gameweek found in DB. Run bootstrap ingestion first.");
  }
  return eventId;
}

function jobLogger(
  job: Job<LeagueRefreshJobPayload>,
  stage: string
): { info(obj: object, msg?: string): void; warn(obj: object, msg?: string): void; error(obj: object, msg?: string): void } {
  const leagueId = job.data.leagueId;
  return {
    info(obj, msg) {
      console.log(JSON.stringify({ leagueId, stage, ...obj }), msg ?? "");
    },
    warn(obj, msg) {
      console.warn(JSON.stringify({ leagueId, stage, ...obj }), msg ?? "");
    },
    error(obj, msg) {
      console.error(JSON.stringify({ leagueId, stage, ...obj }), msg ?? "");
    },
  };
}

export async function processLeagueRefresh(
  job: Job<LeagueRefreshJobPayload>
): Promise<{ ok: true }> {
  const { leagueId, eventId: eventIdParam, maxEntries } = job.data;
  const log = (stage: string) => jobLogger(job, stage);

  if (eventIdParam !== undefined) {
    const gameweekError = await ensureGameweekStarted(prisma, eventIdParam);
    if (gameweekError !== null) {
      throw new Error(
        `${gameweekError.code}: ${gameweekError.message}`
      );
    }
  }

  const eventId =
    eventIdParam ?? (await resolveEventIdFromDb());
  await job.updateProgress({
    step: "standings",
    completed: 0,
    total: 1,
  });

  try {
    await ingestLeagueStandings({
      leagueId,
      logger: log("standings"),
    });
  } catch (err) {
    log("standings").error(
      { err, leagueId, stage: "standings" },
      "league refresh: standings failed"
    );
    throw err;
  }

  const entries = await prisma.fplLeagueEntry.findMany({
    where: { leagueId },
    orderBy: { rank: "asc" },
    take: maxEntries ?? undefined,
    select: { id: true },
  });
  const entryIds = entries.map((e) => e.id);
  const totalEntries = entryIds.length;

  await job.updateProgress({
    step: "picks",
    completed: 0,
    total: totalEntries,
  });

  try {
    await ingestLeagueEntryPicks({
      leagueId,
      eventId,
      entryIds: entryIds.length > 0 ? entryIds : undefined,
      logger: log("picks"),
      onProgress: (completed, total) => {
        void job.updateProgress({ step: "picks", completed, total });
      },
    });
  } catch (err) {
    log("picks").error(
      { err, leagueId, stage: "picks" },
      "league refresh: picks failed"
    );
    throw err;
  }

  await job.updateProgress({
    step: "transfers",
    completed: 0,
    total: totalEntries,
  });

  try {
    await ingestLeagueEntryTransfers({
      leagueId,
      entryIds: entryIds.length > 0 ? entryIds : undefined,
      logger: log("transfers"),
      onProgress: (completed, total) => {
        void job.updateProgress({ step: "transfers", completed, total });
      },
    });
  } catch (err) {
    log("transfers").error(
      { err, leagueId, stage: "transfers" },
      "league refresh: transfers failed"
    );
    throw err;
  }

  await job.updateProgress({
    step: "radar",
    completed: 0,
    total: 1,
  });

  const radarLogger: LeagueRadarLogger = log("radar");
  try {
    await generateLeagueRadar({
      leagueId,
      eventId,
      maxEntries,
      logger: radarLogger,
    });
  } catch (err) {
    log("radar").error(
      { err, leagueId, stage: "radar" },
      "league refresh: radar failed"
    );
    throw err;
  }

  await job.updateProgress({
    step: "complete",
    completed: 1,
    total: 1,
  });

  return { ok: true };
}
