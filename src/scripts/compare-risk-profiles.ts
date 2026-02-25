/**
 * Debug script: compare top buys, sells, and transfers across safe / balanced / risky.
 * Set FPL_LEAGUE_ID, FPL_ENTRY_ID, and optionally FPL_EVENT_ID in .env.
 *
 * Usage: pnpm exec tsx src/scripts/compare-risk-profiles.ts
 */
import "dotenv/config";
import { prisma } from "../lib/prisma";
import { scoreBuyCandidates } from "../prediction/buyScoring";
import { scoreSellCandidates } from "../prediction/sellScoring";
import { predictTransfersForEntry } from "../prediction";
import type { RiskProfile } from "../prediction/ownershipProfile";

const PROFILES: RiskProfile[] = ["safe", "balanced", "risky"];
const TOP_N = 10;

function getLeagueId(): number {
  const raw = process.env.FPL_LEAGUE_ID;
  if (raw === undefined || raw === "") {
    throw new Error("FPL_LEAGUE_ID is required. Set it in .env.");
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
    throw new Error("FPL_ENTRY_ID is required. Set it in .env.");
  }
  const n = Number(raw);
  if (Number.isNaN(n) || Math.floor(n) !== n || n < 1) {
    throw new Error(`FPL_ENTRY_ID must be a positive integer; got: ${raw}`);
  }
  return n;
}

async function resolveEventId(): Promise<number> {
  const raw = process.env.FPL_EVENT_ID;
  if (raw !== undefined && raw !== "") {
    const n = Number(raw);
    if (!Number.isNaN(n) && Math.floor(n) === n && n >= 1) return n;
  }
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
  if (!latest) throw new Error("No gameweeks in DB. Run bootstrap ingestion first.");
  return latest.id;
}

async function main() {
  const leagueId = getLeagueId();
  const entryId = getEntryId();
  const eventId = await resolveEventId();

  console.log("--- Risk profile comparison ---");
  console.log("leagueId:", leagueId, " entryId:", entryId, " eventId:", eventId);
  console.log("");

  for (const profile of PROFILES) {
    console.log(`\n=== ${profile.toUpperCase()} ===\n`);

    const [sellResult, buyResult, transferResult] = await Promise.all([
      scoreSellCandidates({ leagueId, entryId, eventId, riskProfile: profile }),
      scoreBuyCandidates({
        leagueId,
        entryId,
        eventId,
        limit: TOP_N * 2,
        riskProfile: profile,
      }),
      predictTransfersForEntry({
        leagueId,
        entryId,
        eventId,
        maxResults: TOP_N,
        riskProfile: profile,
      }),
    ]);

    const topSells = sellResult.scores.slice(0, TOP_N);
    const topBuys = buyResult.scores.slice(0, TOP_N);
    const transfers = transferResult.predictions.filter((p) => "outPlayerId" in p);

    console.log("Top sells (playerId, sellScore, momentumOut, leagueOwnershipPct):");
    for (const s of topSells) {
      const mom = s.features.momentumOut ?? 0;
      const pct = s.features.leagueOwnershipPct ?? null;
      console.log(
        `  ${s.playerId}  score=${s.sellScore}  momentumOut=${mom.toFixed(2)}  leagueOwnershipPct=${pct != null ? (pct * 100).toFixed(0) + "%" : "null"}`
      );
    }

    console.log("\nTop buys (playerId, buyScore, momentumIn, leagueOwnershipPct):");
    for (const b of topBuys) {
      const mom = b.features.momentumIn ?? 0;
      const pct = b.features.leagueOwnershipPct ?? null;
      console.log(
        `  ${b.playerId}  score=${b.buyScore}  momentumIn=${mom.toFixed(2)}  leagueOwnershipPct=${pct != null ? (pct * 100).toFixed(0) + "%" : "null"}`
      );
    }

    console.log("\nTop transfers (outPlayerId -> inPlayerId, score):");
    for (const t of transfers.slice(0, TOP_N)) {
      if ("outPlayerId" in t && "inPlayerId" in t) {
        console.log(`  ${t.outPlayerId} -> ${t.inPlayerId}  score=${t.score}`);
      }
    }
  }

  console.log("\n--- Done ---\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
