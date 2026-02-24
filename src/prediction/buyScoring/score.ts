import { loadBuyContext } from "./context";
import { loadBuyPool } from "./pool";
import { BUY_SCORE } from "./constants";
import type { BuyCandidateScore } from "./types";

const DEFAULT_RETURN_LIMIT = 100;
const UNAVAILABLE_STATUSES = ["u"] as const;
const FLAGGED_STATUSES = ["i", "s", "d"] as const;
// TODO: Refine status code meanings once verified.

function clampScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function isAvailable(status: string): boolean {
  if (UNAVAILABLE_STATUSES.includes(status as (typeof UNAVAILABLE_STATUSES)[number])) {
    return false;
  }
  if (FLAGGED_STATUSES.includes(status as (typeof FLAGGED_STATUSES)[number])) {
    return false;
  }
  return true;
}

function isFlaggedOrUnavailable(status: string): boolean {
  if (UNAVAILABLE_STATUSES.includes(status as (typeof UNAVAILABLE_STATUSES)[number])) {
    return true;
  }
  if (FLAGGED_STATUSES.includes(status as (typeof FLAGGED_STATUSES)[number])) {
    return true;
  }
  return false;
}

export interface ScoreBuyCandidatesParams {
  leagueId: number;
  entryId: number;
  eventId: number;
  limit?: number;
}

export async function scoreBuyCandidates(
  params: ScoreBuyCandidatesParams
): Promise<{ scores: BuyCandidateScore[] }> {
  const { leagueId, entryId, eventId, limit = DEFAULT_RETURN_LIMIT } = params;

  const { ownedPlayerIds } = await loadBuyContext({ leagueId, entryId, eventId });

  const pool = await loadBuyPool({ ownedPlayerIds });

  const scores: BuyCandidateScore[] = [];

  for (const p of pool) {
    const hasNews = p.news !== null && p.news.trim().length > 0;
    const available = isAvailable(p.status);
    const flaggedOrUnavailable = isFlaggedOrUnavailable(p.status);

    let score = BUY_SCORE.BASE;

    if (p.selectedByPercent !== null && p.selectedByPercent !== undefined) {
      const ownershipBonus = Math.min(
        BUY_SCORE.OWNERSHIP_BONUS_MAX,
        p.selectedByPercent * (BUY_SCORE.OWNERSHIP_BONUS_MAX / 60)
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

    const reasons: string[] = [];
    if (p.selectedByPercent !== null && p.selectedByPercent >= 20) {
      reasons.push("High ownership / template target");
    }
    if (available) {
      reasons.push("Available to play");
    }
    if (flaggedOrUnavailable) {
      reasons.push("Flagged / availability concern");
    }
    if (hasNews) {
      reasons.push("News present");
    }
    if (p.nowCost >= BUY_SCORE.VERY_HIGH_PRICE_THRESHOLD) {
      reasons.push("Very high price");
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
      },
    });
  }

  scores.sort((a, b) => b.buyScore - a.buyScore);

  return { scores: scores.slice(0, limit) };
}
