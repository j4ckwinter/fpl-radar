import type { SquadState } from "../types";
import type { SellCandidateScore } from "../sellScoring/types";
import type { BuyCandidateScore } from "../buyScoring/types";
import { normaliseFixtureScore } from "../buyScoring/score.utils";
import type { ScoredEdge } from "./types";
import { SELL_POOL, BUY_POOL_PER_POSITION, MAX_EDGES_PER_OUT } from "./constants";
import { computeEdgeScore } from "./edgeScore.utils";

export interface BuildEdgesParams {
  squad: SquadState;
  sellScores: SellCandidateScore[];
  buyScores: BuyCandidateScore[];
}

/**
 * Build scored transfer edges between sell pool (top SELL_POOL) and buy pool (top
 * BUY_POOL_PER_POSITION per position). Same position only; keep top MAX_EDGES_PER_OUT per OUT.
 */
export function buildEdges(params: BuildEdgesParams): ScoredEdge[] {
  const { squad, sellScores, buyScores } = params;
  const bank = squad.bank;

  const squadPlayerByPlayerId = new Map(
    squad.players.map((p) => [p.playerId, p] as const)
  );
  const ownedPlayerIds = new Set(squad.players.map((p) => p.playerId));

  const teamCounts = new Map<number, number>();
  for (const p of squad.players) {
    teamCounts.set(p.teamId, (teamCounts.get(p.teamId) ?? 0) + 1);
  }

  const sellPool = [...sellScores]
    .sort((a, b) => b.sellScore - a.sellScore)
    .slice(0, SELL_POOL);

  const buyByPosition = new Map<number, BuyCandidateScore[]>();
  for (const b of buyScores) {
    const pos = b.features.positionId;
    if (!buyByPosition.has(pos)) {
      buyByPosition.set(pos, []);
    }
    buyByPosition.get(pos)!.push(b);
  }
  for (const [pos, list] of buyByPosition) {
    buyByPosition.set(
      pos,
      [...list].sort((a, b) => b.buyScore - a.buyScore).slice(0, BUY_POOL_PER_POSITION)
    );
  }

  const edgesByOut = new Map<number, ScoredEdge[]>();

  for (const sell of sellPool) {
    const outPlayerId = sell.playerId;
    const outPlayer = squadPlayerByPlayerId.get(outPlayerId);
    if (!outPlayer) continue;

    const { positionId, teamId: outTeamId, nowCost: outNowCost } = outPlayer;
    const buyCandidates = buyByPosition.get(positionId) ?? [];

    const outCount = teamCounts.get(outTeamId) ?? 0;
    const outEdges: ScoredEdge[] = [];

    for (const buy of buyCandidates) {
      const inPlayerId = buy.playerId;
      const inTeamId = buy.features.teamId;
      const inNowCost = buy.features.nowCost;
      const inCount = teamCounts.get(inTeamId) ?? 0;
      const inOwned = ownedPlayerIds.has(inPlayerId);

      const teamLimitOk = inOwned
        ? outCount >= 1
        : outCount >= 1 && inCount < 3;
      if (!teamLimitOk) continue;

      const fixtureOut01 = normaliseFixtureScore(sell.features.upcomingFixtureScore);
      const fixtureIn01 = normaliseFixtureScore(buy.features.upcomingFixtureScore);
      const fixtureDelta = fixtureIn01 - fixtureOut01;

      const result = computeEdgeScore({
        sellScore: sell.sellScore,
        buyScore: buy.buyScore,
        sellReasons: sell.reasons,
        buyReasons: buy.reasons,
        outNowCost,
        inNowCost,
        bank,
        fixtureOut01,
        fixtureIn01,
      });

      const edge: ScoredEdge = {
        outPlayerId,
        inPlayerId,
        positionId,
        outTeamId,
        inTeamId,
        outNowCost,
        inNowCost,
        edgeScoreRaw: result.rawScore,
        edgeScore: result.clampedScore,
        reasons: result.reasons,
        budgetUncertain: result.budgetUncertain,
      };
      edge.debugComponents = {
        momentumOut01: sell.features.momentumOut,
        momentumIn01: buy.features.momentumIn,
        fixtureOut01,
        fixtureIn01,
        fixtureDelta,
        leagueOwnershipOut: sell.features.leagueOwnershipPct,
        leagueOwnershipIn: buy.features.leagueOwnershipPct,
      };
      outEdges.push(edge);
    }

    outEdges.sort((a, b) => b.edgeScoreRaw - a.edgeScoreRaw);
    const top = outEdges.slice(0, MAX_EDGES_PER_OUT);
    if (top.length > 0) {
      edgesByOut.set(outPlayerId, top);
    }
  }

  return [...edgesByOut.values()].flat();
}
