import { prisma } from "../../lib/prisma";
import { SquadNotFoundError } from "../errors";
import { loadTeamUpcomingFixtureScores } from "../fixtures/teamUpcomingScores";
import {
  SELL_SCORE,
  DEFAULT_TOP_N,
  MAX_TOP_N,
} from "./constants";
import { extractSellFeatures } from "./features";
import { clampScore, buildReasons, newsToSnippet } from "./score.utils";
import type { ScoreSellCandidatesParams, SellCandidateScore } from "./types";

export async function scoreSellCandidates(
  params: ScoreSellCandidatesParams
): Promise<{ scores: SellCandidateScore[] }> {
  const { leagueId, entryId, eventId, topN = DEFAULT_TOP_N } = params;

  const snapshot = await prisma.fplEntrySnapshot.findUnique({
    where: {
      leagueId_entryId_eventId: { leagueId, entryId, eventId },
    },
    include: {
      picks: {
        select: { playerId: true, pickPosition: true, isCaptain: true, isViceCaptain: true },
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
  const [players, teamUpcomingScores] = await Promise.all([
    prisma.fplPlayer.findMany({
      where: { id: { in: playerIds } },
      select: {
        id: true,
        status: true,
        news: true,
        selectedByPercent: true,
        nowCost: true,
        teamId: true,
      },
    }),
    loadTeamUpcomingFixtureScores({ eventId }),
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

  const newsByPlayerId = new Map(players.map((p) => [p.id, newsToSnippet(p.news)]));

  const scores: SellCandidateScore[] = [];

  for (const [playerId, features] of featuresByPlayerId.entries()) {
    let score = SELL_SCORE.BASE;
    if (features.isFlagged) score += SELL_SCORE.FLAGGED;
    if (features.status === "u") score += SELL_SCORE.UNAVAILABLE_EXTRA;
    if (features.hasNews) score += SELL_SCORE.HAS_NEWS;
    if (features.isCaptainOrVice) score -= SELL_SCORE.CAPTAIN_OR_VICE_PENALTY;
    const templateHold =
      !features.isFlagged &&
      features.selectedByPercent !== null &&
      features.selectedByPercent >= SELL_SCORE.TEMPLATE_THRESHOLD;
    if (templateHold) score -= SELL_SCORE.TEMPLATE_HOLD_PENALTY;

    const reasons = buildReasons(features, newsByPlayerId.get(playerId) ?? null);

    scores.push({
      playerId,
      sellScore: clampScore(score),
      reasons,
      features,
    });
  }

  scores.sort((a, b) => b.sellScore - a.sellScore);

  const topScores = scores.slice(0, Math.min(topN, MAX_TOP_N));

  return { scores: topScores };
}
