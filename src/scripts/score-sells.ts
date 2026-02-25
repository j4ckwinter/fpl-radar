import "dotenv/config";
import { prisma } from "../lib/prisma";
import { scoreSellCandidates } from "../prediction";
import { parseRiskProfile } from "../prediction/riskProfile";

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

function getEntryId(): number {
  const raw = process.env.FPL_ENTRY_ID;
  if (raw === undefined || raw === "") {
    throw new Error("FPL_ENTRY_ID is required. Set it in .env or the environment.");
  }
  const n = Number(raw);
  if (Number.isNaN(n) || Math.floor(n) !== n || n < 1) {
    throw new Error(`FPL_ENTRY_ID must be a positive integer; got: ${raw}`);
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

async function main() {
  const leagueId = getLeagueId();
  const entryId = getEntryId();
  const eventIdEnv = getEventIdOptional();
  const eventId = eventIdEnv ?? (await resolveEventIdFromDb());

  const riskProfile = parseRiskProfile(process.env.FPL_RISK_PROFILE);
  const { scores } = await scoreSellCandidates({
    leagueId,
    entryId,
    eventId,
    riskProfile,
  });

  const top10 = scores.slice(0, 10);
  const playerIds = top10.map((s) => s.playerId);

  const players =
    playerIds.length > 0
      ? await prisma.fplPlayer.findMany({
          where: { id: { in: playerIds } },
          select: { id: true, webName: true },
        })
      : [];
  const webNameById = new Map(players.map((p) => [p.id, p.webName]));

  console.log("Sell candidates (top 10)");
  console.log("  entryId:", entryId, " eventId:", eventId);
  console.log("");
  for (const row of top10) {
    const webName = webNameById.get(row.playerId) ?? `#${row.playerId}`;
    const reasonsStr = row.reasons.length > 0 ? row.reasons.join(", ") : "—";
    console.log(`  ${webName}  score=${row.sellScore}  ${reasonsStr}`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
    process.exitCode = 1;
  });
