import "dotenv/config";
import { prisma } from "../lib/prisma";
import {
  generateLeagueRadar,
  type LeagueRadarLogger,
} from "../prediction/leagueRadar/generate";
import type { LeagueRadarResult } from "../prediction/leagueRadar/types";

function getLeagueId(): number {
  const raw = process.env.FPL_LEAGUE_ID;
  if (raw === undefined || raw === "") {
    throw new Error("FPL_LEAGUE_ID is required. Set it in .env or the environment.");
  }
  const n = Number(raw);
  if (Number.isNaN(n) || Math.floor(n) !== n || n < 1) {
    throw new Error(`FPL_LEAGUE_ID must be a positive integer; got: ${raw}`);
  }
  return n;
}

function getEventIdOptional(): number | undefined {
  const raw = process.env.FPL_EVENT_ID;
  if (raw === undefined || raw === "") return undefined;
  const n = Number(raw);
  if (Number.isNaN(n) || Math.floor(n) !== n || n < 1) {
    throw new Error(`FPL_EVENT_ID must be a positive integer; got: ${raw}`);
  }
  return n;
}

function getMaxEntriesOptional(): number | undefined {
  const raw = process.env.FPL_MAX_ENTRIES;
  if (raw === undefined || raw === "") return undefined;
  const n = Number(raw);
  if (Number.isNaN(n) || Math.floor(n) !== n || n < 1) {
    throw new Error(`FPL_MAX_ENTRIES must be a positive integer; got: ${raw}`);
  }
  return n;
}

function getConcurrencyOptional(): number {
  const raw = process.env.FPL_CONCURRENCY;
  if (raw === undefined || raw === "") return 5;
  const n = Number(raw);
  if (Number.isNaN(n) || Math.floor(n) !== n || n < 1) {
    throw new Error(`FPL_CONCURRENCY must be a positive integer; got: ${raw}`);
  }
  return n;
}

async function resolveEventIdFromDb(): Promise<number> {
  const next = await prisma.fplGameweek.findFirst({
    where: { isNext: true },
    select: { id: true },
  });
  if (next) return next.id;

  const current = await prisma.fplGameweek.findFirst({
    where: { isCurrent: true },
    select: { id: true },
  });
  if (current) return current.id;

  const latest = await prisma.fplGameweek.findFirst({
    orderBy: { id: "desc" },
    select: { id: true },
  });
  if (!latest) {
    throw new Error("No gameweeks found in DB. Run bootstrap ingestion first.");
  }
  return latest.id;
}

const consoleLogger: LeagueRadarLogger = {
  info(obj, msg) {
    console.log(msg ?? "", JSON.stringify(obj));
  },
  error(obj, msg) {
    console.error(msg ?? "", JSON.stringify(obj));
  },
};

function collectPlayerIds(result: LeagueRadarResult): number[] {
  const ids = new Set<number>();
  for (const item of result.buyRadar) ids.add(item.playerId);
  for (const item of result.sellRadar) ids.add(item.playerId);
  for (const item of result.transferRadar) {
    ids.add(item.outPlayerId);
    ids.add(item.inPlayerId);
  }
  return Array.from(ids);
}

async function main() {
  const leagueId = getLeagueId();
  const eventIdEnv = getEventIdOptional();
  const eventId = eventIdEnv ?? (await resolveEventIdFromDb());
  const maxEntries = getMaxEntriesOptional();
  const concurrency = getConcurrencyOptional();

  const result = await generateLeagueRadar({
    leagueId,
    eventId,
    maxEntries,
    concurrency,
    logger: consoleLogger,
  });

  const playerIds = collectPlayerIds(result);
  const players =
    playerIds.length > 0
      ? await prisma.fplPlayer.findMany({
          where: { id: { in: playerIds } },
          select: { id: true, webName: true },
        })
      : [];
  const webNameById = new Map(players.map((p) => [p.id, p.webName]));

  const c = result.coverage;
  console.log("League radar — coverage");
  console.log(`  leagueId: ${result.leagueId}  eventId: ${result.eventId}`);
  console.log(`  totalEntries: ${c.totalEntries}  processed: ${c.processed}  succeeded: ${c.succeeded}  failed: ${c.failed}  durationMs: ${c.durationMs}`);
  console.log("");

  const topN = 10;

  console.log(`Top ${topN} buys (webName, expectedCount, uniqueEntries)`);
  for (const item of result.buyRadar.slice(0, topN)) {
    const name = webNameById.get(item.playerId) ?? `#${item.playerId}`;
    console.log(`  ${name}  expectedCount=${item.expectedCount.toFixed(2)}  uniqueEntries=${item.uniqueEntries}`);
  }
  console.log("");

  console.log(`Top ${topN} sells (webName, expectedCount, uniqueEntries)`);
  for (const item of result.sellRadar.slice(0, topN)) {
    const name = webNameById.get(item.playerId) ?? `#${item.playerId}`;
    console.log(`  ${name}  expectedCount=${item.expectedCount.toFixed(2)}  uniqueEntries=${item.uniqueEntries}`);
  }
  console.log("");

  console.log(`Top ${topN} transfers (out -> in, expectedCount)`);
  for (const item of result.transferRadar.slice(0, topN)) {
    const outName = webNameById.get(item.outPlayerId) ?? `#${item.outPlayerId}`;
    const inName = webNameById.get(item.inPlayerId) ?? `#${item.inPlayerId}`;
    console.log(`  ${outName} -> ${inName}  expectedCount=${item.expectedCount.toFixed(2)}`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
    process.exitCode = 1;
  });
