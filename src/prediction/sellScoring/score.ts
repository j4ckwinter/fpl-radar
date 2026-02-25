import { prisma } from "../../lib/prisma";
import { SquadNotFoundError } from "../errors";
import { loadTeamUpcomingFixtureScores } from "../fixtures/teamUpcomingScores";
import { getLeagueOwnership } from "../leagueOwnership/compute";
import { loadMomentumP95 } from "../momentum/p95";
import { normaliseMomentum } from "../momentum/normalise";
import { parseRiskProfile } from "../riskProfile";
import { normaliseFixtureScore } from "../buyScoring/score.utils";
import {
  DEFAULT_TOP_N,
  MAX_TOP_N,
  SELL_REASON,
  SELL_PROFILE_REASONS_MAX,
  SELL_OWNERSHIP_REASONS_MAX,
} from "./constants";
import { isHighOwnership } from "../ownershipProfile/thresholds";
import { computeSellRawScore } from "./scoreLogic";
import { extractSellFeatures } from "./features";
import { clampScore, buildReasons, newsToSnippet } from "./score.utils";
import type { ScoreSellCandidatesParams, SellCandidateScore } from "./types";

export async function scoreSellCandidates(
  params: ScoreSellCandidatesParams
): Promise<{ scores: SellCandidateScore[] }> {
  const {
    leagueId,
    entryId,
    eventId,
    topN = DEFAULT_TOP_N,
    riskProfile: riskProfileParam,
  } = params;
  const riskProfile = parseRiskProfile(riskProfileParam);

  const snapshot = await prisma.fplEntrySnapshot.findUnique({
    where: {
      leagueId_entryId_eventId: { leagueId, entryId, eventId },
    },
    include: {
      picks: {
        select: {
          playerId: true,
          pickPosition: true,
          isCaptain: true,
          isViceCaptain: true,
        },
      },
    },
  });

  if (!snapshot || snapshot.picks.length === 0) {
    throw new SquadNotFoundError(
      `No entry snapshot for leagueId=${leagueId} entryId=${entryId} eventId=${eventId}`,
      { leagueId, entryId, eventId }
    );
  }

  const playerIds = snapshot.picks.map((p) => p.playerId);
  const [players, teamUpcomingScores, leagueOwnership, { outP95 }] =
    await Promise.all([
      prisma.fplPlayer.findMany({
        where: { id: { in: playerIds } },
        select: {
          id: true,
          status: true,
          news: true,
          selectedByPercent: true,
          nowCost: true,
          teamId: true,
          transfersOutEvent: true,
        },
      }),
      loadTeamUpcomingFixtureScores({ eventId }),
      getLeagueOwnership({ leagueId, eventId }),
      loadMomentumP95(),
    ]);

  const playersById = new Map(
    players.map((p) => [
      p.id,
      {
        status: p.status,
        news: p.news,
        selectedByPercent: p.selectedByPercent,
        nowCost: p.nowCost,
        teamId: p.teamId,
        transfersOutEvent: p.transfersOutEvent,
      },
    ])
  );

  const picks = snapshot.picks.map((p) => ({
    playerId: p.playerId,
    pickPosition: p.pickPosition,
    isCaptain: p.isCaptain,
    isViceCaptain: p.isViceCaptain,
  }));

  const featuresByPlayerId = extractSellFeatures({
    picks,
    playersById,
    teamUpcomingScores,
  });

  const newsByPlayerId = new Map(
    players.map((p) => [p.id, newsToSnippet(p.news)])
  );

  const scores: SellCandidateScore[] = [];

  for (const [playerId, features] of featuresByPlayerId.entries()) {
    const momentumOut = normaliseMomentum({
      value: features.transfersOutEvent,
      p95: outP95,
    });
    const fixtureGood01 = normaliseFixtureScore(features.upcomingFixtureScore);
    const fixtureBad01 = 1 - fixtureGood01;
    const leagueOwnershipPct =
      leagueOwnership.ownershipByPlayerId.get(playerId) ?? null;
    const countOwned =
      leagueOwnership.ownershipCountByPlayerId.get(playerId) ?? 0;
    const totalEntries = leagueOwnership.totalEntries;

    const raw = computeSellRawScore({
      momentumOut,
      fixtureBad01,
      leagueOwnershipPct,
      riskProfile,
      isFlagged: features.isFlagged,
      isUnavailable: features.status === "u",
    });

    const reasons: string[] = [];
    if (momentumOut > 0.5) reasons.push(SELL_REASON.HIGH_MOMENTUM);
    if (fixtureBad01 > 0.5) reasons.push(SELL_REASON.BAD_FIXTURES);

    const highOwnership = isHighOwnership(
      leagueOwnershipPct,
      countOwned,
      totalEntries
    );
    let profileReasons = 0;
    let ownershipReasons = 0;
    if (
      riskProfile === "safe" &&
      highOwnership &&
      ownershipReasons < SELL_OWNERSHIP_REASONS_MAX
    ) {
      reasons.push(SELL_REASON.LEAGUE_WIDELY_OWNED);
      ownershipReasons++;
    }
    if (
      riskProfile === "safe" &&
      highOwnership &&
      profileReasons < SELL_PROFILE_REASONS_MAX
    ) {
      reasons.push(SELL_REASON.SAFE_AVOID_RISKY_SELL_TEMPLATE);
      profileReasons++;
    }
    if (
      riskProfile === "balanced" &&
      leagueOwnershipPct !== null &&
      leagueOwnershipPct >= 0.3 &&
      leagueOwnershipPct <= 0.7 &&
      profileReasons < SELL_PROFILE_REASONS_MAX
    ) {
      reasons.push(SELL_REASON.BALANCED_LEAGUE_CONSIDERATION);
      profileReasons++;
    }
    reasons.push(...buildReasons(features, newsByPlayerId.get(playerId) ?? null));

    scores.push({
      playerId,
      sellScore: clampScore(raw),
      reasons,
      features: {
        ...features,
        momentumOut,
        leagueOwnershipPct,
      },
    });
  }

  scores.sort((a, b) => b.sellScore - a.sellScore);

  const topScores = scores.slice(0, Math.min(topN, MAX_TOP_N));

  return { scores: topScores };
}
