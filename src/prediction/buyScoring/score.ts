import { loadTeamUpcomingFixtureScores } from "../fixtures/teamUpcomingScores";
import { getLeagueOwnership } from "../leagueOwnership/compute";
import { loadMomentumP95 } from "../momentum/p95";
import { MOMENTUM_SHAPE_POWER } from "../momentum/constants";
import { normaliseMomentum } from "../momentum/normalise";
import { parseRiskProfile } from "../riskProfile";
import { loadBuyContext } from "./context";
import { loadBuyPool } from "./pool";
import {
  BUY_REASON,
  BUY_SCORE,
  DEFAULT_RETURN_LIMIT,
  BUY_PROFILE_REASONS_MAX,
  BUY_OWNERSHIP_REASONS_MAX,
} from "./constants";
import {
  isHighOwnership,
  isLowOwnership,
} from "../ownershipProfile/thresholds";
import {
  RISKY_CONVICTION_MOMENTUM_THRESHOLD,
  RISKY_CONVICTION_FIXTURE_THRESHOLD,
} from "../ownershipProfile/constants";
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
  const [pool, teamUpcomingScores, leagueOwnership, { inP99 }] = await Promise.all([
    loadBuyPool({ ownedPlayerIds, limit: poolLimit }),
    loadTeamUpcomingFixtureScores({ eventId }),
    getLeagueOwnership({ leagueId, eventId }),
    loadMomentumP95(),
  ]);

  const scores: BuyCandidateScore[] = [];

  const totalEntries = leagueOwnership.totalEntries;

  for (const p of pool) {
    const upcomingFixtureScore = teamUpcomingScores.get(p.teamId) ?? null;
    const leagueOwnershipPct =
      leagueOwnership.ownershipByPlayerId.get(p.id) ?? null;
    const countOwned = leagueOwnership.ownershipCountByPlayerId.get(p.id) ?? 0;
    const hasNews = p.news !== null && p.news.trim().length > 0;
    const available = isAvailable(p.status);
    const flaggedOrUnavailable = isFlaggedOrUnavailable(p.status);

    const momentumIn = normaliseMomentum({
      value: p.transfersInEvent,
      cap: inP99,
      shapePower: MOMENTUM_SHAPE_POWER,
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

    const highOwnership = isHighOwnership(
      leagueOwnershipPct,
      countOwned,
      totalEntries
    );
    const lowOwnership = isLowOwnership(
      leagueOwnershipPct,
      countOwned,
      totalEntries
    );
    const riskyConvictionOk =
      momentumIn >= RISKY_CONVICTION_MOMENTUM_THRESHOLD ||
      fixture01 >= RISKY_CONVICTION_FIXTURE_THRESHOLD;

    const reasons: string[] = [];
    if (momentumIn > 0.7) reasons.push(BUY_REASON.HIGH_MOMENTUM);
    if (fixture01 > 0.7) reasons.push(BUY_REASON.FAVOURABLE_FIXTURES);

    let profileReasons = 0;
    let ownershipReasons = 0;
    if (riskProfile === "safe" && highOwnership && ownershipReasons < BUY_OWNERSHIP_REASONS_MAX) {
      reasons.push(BUY_REASON.LEAGUE_HIGH_OWNERSHIP);
      ownershipReasons++;
    }
    if (riskProfile === "safe" && highOwnership && profileReasons < BUY_PROFILE_REASONS_MAX) {
      reasons.push(BUY_REASON.SAFE_COVERING_POPULAR);
      profileReasons++;
    }
    if (
      riskProfile === "balanced" &&
      leagueOwnershipPct !== null &&
      leagueOwnershipPct >= 0.3 &&
      leagueOwnershipPct <= 0.7 &&
      profileReasons < BUY_PROFILE_REASONS_MAX
    ) {
      reasons.push(BUY_REASON.BALANCED_LEAGUE_CONSIDERATION);
      profileReasons++;
    }
    if (riskProfile === "risky" && lowOwnership && profileReasons < BUY_PROFILE_REASONS_MAX) {
      reasons.push(BUY_REASON.RISKY_DIFFERENTIAL_UPSIDE);
      profileReasons++;
    }
    if (
      riskProfile === "risky" &&
      lowOwnership &&
      riskyConvictionOk &&
      profileReasons < BUY_PROFILE_REASONS_MAX
    ) {
      reasons.push(BUY_REASON.RISKY_LOW_OWNERSHIP_HIGH_CONVICTION);
      profileReasons++;
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
