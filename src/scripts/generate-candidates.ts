import "dotenv/config";
import { prisma } from "../lib/prisma";
import {
  loadSquadState,
  generateSingleTransferCandidates,
} from "../prediction";

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

/**
 * Resolves eventId from DB: isNext → isCurrent → latest by id.
 */
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

  const squad = await loadSquadState({ leagueId, entryId, eventId });
  const { candidates, stats } = await generateSingleTransferCandidates({ squad });

  console.log("Candidates generated");
  console.log("  entryId:", squad.entryId);
  console.log("  eventId:", squad.eventId);
  console.log("  bank:", squad.bank);
  console.log("  candidates:", stats.generated);
  console.log("  stats:", stats);

  const show = candidates.slice(0, 10);
  console.log("\nFirst 10 candidates (out -> in, delta, teamLimitOk, budgetOk):");
  for (const c of show) {
    console.log(
      `  ${c.outPlayerId} -> ${c.inPlayerId}  delta=${c.estimatedCostDelta}  teamLimitOk=${c.checks.teamLimitOk}  budgetOk=${c.checks.budgetOk}`
    );
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
    process.exitCode = 1;
  });
