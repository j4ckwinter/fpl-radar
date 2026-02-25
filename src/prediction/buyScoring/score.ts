import { loadTeamUpcomingFixtureScores } from "../fixtures/teamUpcomingScores";
import { getLeagueOwnership } from "../leagueOwnership/compute";
import { loadMomentumP95 } from "../momentum/p95";
import { normaliseMomentum } from "../momentum/normalise";
import { parseRiskProfile } from "../riskProfile";
import { loadBuyContext } from "./context";
import { loadBuyPool } from "./pool";
import { BUY_REASON, BUY_SCORE, DEFAULT_RETURN_LIMIT } from "./constants";
import { computeBuyRawScore } from "./scoreLogic";
import {
  clampScore,
  normaliseFixtureScore,
  isAvailable,
  isFlaggedOrUnavailable,
} from "./score.utils";
import type { BuyCandidateScore, ScoreBuyCandidatesParams } from "./types";

export type { ScoreBuyCandidatesParams } from "./types";

export async function scoreBuyCandidates(
  params: ScoreBuyCandidatesParams
): Promise<{ scores: BuyCandidateScore[] }> {
  const {
    leagueId,
    entryId,
    eventId,
    limit = DEFAULT_RETURN_LIMIT,
    riskProfile: riskProfileParam,
  } = params;
  const riskProfile = parseRiskProfile(riskProfileParam);

  const { ownedPlayerIds } = await loadBuyContext({ leagueId, entryId, eventId });

  const poolLimit = limit ?? BUY_SCORE.MOMENTUM_POOL_LIMIT;
  const [pool, teamUpcomingScores, leagueOwnership, { inP95 }] = await Promise.all([
    loadBuyPool({ ownedPlayerIds, limit: poolLimit }),
    loadTeamUpcomingFixtureScores({ eventId }),
    getLeagueOwnership({ leagueId, eventId }),
    loadMomentumP95(),
  ]);

  const scores: BuyCandidateScore[] = [];

  for (const p of pool) {
    const upcomingFixtureScore = teamUpcomingScores.get(p.teamId) ?? null;
    const leagueOwnershipPct =
      leagueOwnership.ownershipByPlayerId.get(p.id) ?? null;
    const hasNews = p.news !== null && p.news.trim().length > 0;
    const available = isAvailable(p.status);
    const flaggedOrUnavailable = isFlaggedOrUnavailable(p.status);

    const momentumIn = normaliseMomentum({
      value: p.transfersInEvent,
      p95: inP95,
    });
    const fixture01 = normaliseFixtureScore(upcomingFixtureScore);

    const raw = computeBuyRawScore({
      momentumIn,
      fixture01,
      leagueOwnershipPct,
      riskProfile,
      flaggedOrUnavailable,
      available,
    });

    const reasons: string[] = [];
    if (momentumIn > 0.7) reasons.push(BUY_REASON.HIGH_MOMENTUM);
    if (fixture01 > 0.7) reasons.push(BUY_REASON.FAVOURABLE_FIXTURES);
    if (riskProfile === "safe" && leagueOwnershipPct !== null && leagueOwnershipPct >= 0.6) {
      reasons.push(BUY_REASON.LEAGUE_HIGH_OWNERSHIP);
    }
    if (riskProfile === "risky" && leagueOwnershipPct !== null && leagueOwnershipPct < 0.2) {
      reasons.push(BUY_REASON.LEAGUE_DIFFERENTIAL);
    }
    if (available) reasons.push(BUY_REASON.AVAILABLE);
    if (flaggedOrUnavailable) reasons.push(BUY_REASON.FLAGGED);
    if (hasNews) reasons.push(BUY_REASON.NEWS);
    if (leagueOwnershipPct !== null && leagueOwnershipPct >= 0.6) {
      reasons.push(BUY_REASON.LEAGUE_MAJORITY_OWN);
    }

    scores.push({
      playerId: p.id,
      buyScore: clampScore(raw),
      reasons,
      features: {
        isAvailable: available,
        status: p.status,
        hasNews,
        selectedByPercent: p.selectedByPercent,
        nowCost: p.nowCost,
        positionId: p.positionId,
        teamId: p.teamId,
        transfersInEvent: p.transfersInEvent,
        momentumIn,
        upcomingFixtureScore,
        leagueOwnershipPct,
        nonOwnershipRisk: leagueOwnershipPct ?? null,
      },
    });
  }

  scores.sort((a, b) => b.buyScore - a.buyScore);

  return { scores: scores.slice(0, limit) };
}
