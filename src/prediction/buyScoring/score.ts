import { loadTeamUpcomingFixtureScores } from "../fixtures/teamUpcomingScores";
import { getLeagueOwnership } from "../leagueOwnership/compute";
import { loadBuyContext } from "./context";
import { loadBuyPool } from "./pool";
import {
  BUY_SCORE,
  DEFAULT_RETURN_LIMIT,
  HIGH_OWNERSHIP_PERCENT_THRESHOLD,
  OWNERSHIP_PERCENT_FOR_MAX_BONUS,
  BUY_REASON,
} from "./constants";
import { clampScore, isAvailable, isFlaggedOrUnavailable } from "./score.utils";
import type { BuyCandidateScore, ScoreBuyCandidatesParams } from "./types";

export type { ScoreBuyCandidatesParams } from "./types";

export async function scoreBuyCandidates(
  params: ScoreBuyCandidatesParams
): Promise<{ scores: BuyCandidateScore[] }> {
  const { leagueId, entryId, eventId, limit = DEFAULT_RETURN_LIMIT } = params;

  const { ownedPlayerIds } = await loadBuyContext({ leagueId, entryId, eventId });

  const [pool, teamUpcomingScores, leagueOwnership] = await Promise.all([
    loadBuyPool({ ownedPlayerIds }),
    loadTeamUpcomingFixtureScores({ eventId }),
    getLeagueOwnership({ leagueId, eventId }),
  ]);

  const scores: BuyCandidateScore[] = [];

  for (const p of pool) {
    const upcomingFixtureScore = teamUpcomingScores.get(p.teamId) ?? null;
    const leagueOwnershipPct = leagueOwnership.ownershipByPlayerId.get(p.id) ?? 0;
    const nonOwnershipRisk = leagueOwnershipPct;
    const hasNews = p.news !== null && p.news.trim().length > 0;
    const available = isAvailable(p.status);
    const flaggedOrUnavailable = isFlaggedOrUnavailable(p.status);

    let score = BUY_SCORE.BASE;

    if (p.selectedByPercent !== null && p.selectedByPercent !== undefined) {
      const ownershipBonus = Math.min(
        BUY_SCORE.OWNERSHIP_BONUS_MAX,
        p.selectedByPercent *
          (BUY_SCORE.OWNERSHIP_BONUS_MAX / OWNERSHIP_PERCENT_FOR_MAX_BONUS)
      );
      score += ownershipBonus;
    }

    if (available) {
      score += BUY_SCORE.AVAILABLE_BONUS;
    }
    if (flaggedOrUnavailable) {
      score -= BUY_SCORE.FLAGGED_PENALTY;
    }
    if (hasNews) {
      score -= BUY_SCORE.HAS_NEWS_PENALTY;
    }
    if (p.nowCost >= BUY_SCORE.VERY_HIGH_PRICE_THRESHOLD) {
      score -= BUY_SCORE.PRICE_VERY_HIGH_PENALTY;
    }
    if (leagueOwnershipPct !== null) {
      score += leagueOwnershipPct * BUY_SCORE.LEAGUE_OWNERSHIP_RISK_WEIGHT;
    }

    const reasons: string[] = [];
    if (
      p.selectedByPercent !== null &&
      p.selectedByPercent >= HIGH_OWNERSHIP_PERCENT_THRESHOLD
    ) {
      reasons.push(BUY_REASON.HIGH_OWNERSHIP);
    }
    if (available) {
      reasons.push(BUY_REASON.AVAILABLE);
    }
    if (flaggedOrUnavailable) {
      reasons.push(BUY_REASON.FLAGGED);
    }
    if (hasNews) {
      reasons.push(BUY_REASON.NEWS);
    }
    if (p.nowCost >= BUY_SCORE.VERY_HIGH_PRICE_THRESHOLD) {
      reasons.push(BUY_REASON.VERY_HIGH_PRICE);
    }
    if (leagueOwnershipPct !== null) {
      if (leagueOwnershipPct >= 0.6) {
        reasons.push(BUY_REASON.LEAGUE_MAJORITY_OWN);
      } else if (leagueOwnershipPct >= 0.4) {
        reasons.push(BUY_REASON.LEAGUE_HIGH_OWNERSHIP);
      }
    }

    scores.push({
      playerId: p.id,
      buyScore: clampScore(score),
      reasons,
      features: {
        isAvailable: available,
        status: p.status,
        hasNews,
        selectedByPercent: p.selectedByPercent,
        nowCost: p.nowCost,
        positionId: p.positionId,
        teamId: p.teamId,
        upcomingFixtureScore,
        leagueOwnershipPct,
        nonOwnershipRisk,
      },
    });
  }

  scores.sort((a, b) => b.buyScore - a.buyScore);

  return { scores: scores.slice(0, limit) };
}
