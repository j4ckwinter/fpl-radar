import "dotenv/config";
import { prisma } from "../lib/prisma";
import { generateTransferScenarios } from "../prediction";
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

const TOP_N = 10;

async function main() {
  const leagueId = getLeagueId();
  const entryId = getEntryId();
  const eventIdEnv = getEventIdOptional();
  const eventId = eventIdEnv ?? (await resolveEventIdFromDb());

  const riskProfile = parseRiskProfile(process.env.FPL_RISK_PROFILE);
  const debug = process.env.FPL_DEBUG_SCENARIOS === "1";
  const { scenarios, computedAt, riskProfile: usedProfile, debug: debugInfo } =
    await generateTransferScenarios({
      leagueId,
      entryId,
      eventId,
      riskProfile,
      maxBundlesPerK: TOP_N,
      debug,
    });

  console.log("Transfer bundle scenarios (top", TOP_N, "per k)");
  console.log("  entryId:", entryId, " eventId:", eventId);
  console.log("  riskProfile:", usedProfile ?? "balanced");
  console.log("  computedAt:", computedAt);
  if (debugInfo) {
    console.log("");
    console.log("--- Debug (FPL_DEBUG_SCENARIOS=1) ---");
    console.log("  momentum cap percentile: 99");
    console.log("  inP99:", debugInfo.inP99, " outP99:", debugInfo.outP99);
    console.log(
      "  edge score raw: min=",
      debugInfo.edgeScoreRaw.min,
      " median=",
      debugInfo.edgeScoreRaw.median,
      " max=",
      debugInfo.edgeScoreRaw.max,
      " spread=",
      (debugInfo.edgeScoreRaw.max - debugInfo.edgeScoreRaw.min).toFixed(1)
    );
    if (debugInfo.momentumSaturation) {
      const s = debugInfo.momentumSaturation;
      console.log(
        "  momentum saturation: edges with momentumIn01=1:",
        s.countInAt1,
        "(" + s.percentSaturatedIn + "%)  momentumOut01=1:",
        s.countOutAt1,
        "(" + s.percentSaturatedOut + "%)  totalEdges:",
        s.totalEdges
      );
    }
    if (debugInfo.momentumQuartilesIn) {
      console.log("  momentumIn01  quartiles (q1, median, q3):", debugInfo.momentumQuartilesIn.map((n) => n.toFixed(3)).join(", "));
    }
    if (debugInfo.momentumQuartilesOut) {
      console.log("  momentumOut01 quartiles (q1, median, q3):", debugInfo.momentumQuartilesOut.map((n) => n.toFixed(3)).join(", "));
    }
    console.log("  top 10 edges (raw, display):");
    for (const e of debugInfo.topEdges) {
      console.log(`    #${e.outPlayerId} -> #${e.inPlayerId}  raw=${e.scoreRaw.toFixed(1)}  display=${e.scoreDisplay}`);
    }
    if (debugInfo.topEdges.some((e) => e.momentumOut01 !== undefined)) {
      console.log("  top 10 edge components (momentumOut01, momentumIn01, fixtureOut01, fixtureIn01, fixtureDelta, leagueOut, leagueIn):");
      for (const e of debugInfo.topEdges) {
        const c =
          e.momentumOut01 !== undefined
            ? `  momOut=${e.momentumOut01?.toFixed(3)} momIn=${e.momentumIn01?.toFixed(3)} fixOut=${e.fixtureOut01?.toFixed(3)} fixIn=${e.fixtureIn01?.toFixed(3)} delta=${e.fixtureDelta?.toFixed(3)} ownOut=${e.leagueOwnershipOut ?? "null"} ownIn=${e.leagueOwnershipIn ?? "null"}`
            : "";
        if (c) console.log(`    #${e.outPlayerId}->#${e.inPlayerId}${c}`);
      }
    }
    console.log("");
  }
  console.log("");

  const allPlayerIds = new Set<number>();
  for (const scenario of scenarios) {
    for (const bundle of scenario.bundles) {
      bundle.outs.forEach((id) => allPlayerIds.add(id));
      bundle.ins.forEach((id) => allPlayerIds.add(id));
    }
  }
  const players =
    allPlayerIds.size > 0
      ? await prisma.fplPlayer.findMany({
          where: { id: { in: [...allPlayerIds] } },
          select: { id: true, webName: true },
        })
      : [];
  const webNameById = new Map(players.map((p) => [p.id, p.webName]));

  for (const scenario of scenarios) {
    console.log(`--- Scenario k=${scenario.k} (top ${TOP_N}) ---`);
    const bundles = scenario.bundles.slice(0, TOP_N);
    for (let i = 0; i < bundles.length; i++) {
      const b = bundles[i];
      const outNames = b.outs.map((id) => webNameById.get(id) ?? `#${id}`);
      const inNames = b.ins.map((id) => webNameById.get(id) ?? `#${id}`);
      const outStr = outNames.join(", ");
      const inStr = inNames.join(", ");
      const flagsStr =
        Object.keys(b.flags).length > 0
          ? ` flags=${JSON.stringify(b.flags)}`
          : "";
      console.log(`  ${i + 1}. [${outStr}] -> [${inStr}]  score=${b.score}${flagsStr}`);
      if (b.reasons.length > 0) {
        console.log(`     ${b.reasons.slice(0, 3).join("; ")}`);
      }
    }
    console.log("");
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
    process.exitCode = 1;
  });
