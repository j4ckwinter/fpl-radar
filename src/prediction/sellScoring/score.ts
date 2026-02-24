import { prisma } from "../../lib/prisma";
import { SquadNotFoundError } from "../errors";
import { SELL_SCORE } from "./constants";
import { extractSellFeatures } from "./features";
import type { SellCandidateScore } from "./types";

const DEFAULT_TOP_N = 15;
const NEWS_SNIPPET_MAX_LENGTH = 80;

function clampScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function buildReasons(
  features: SellCandidateScore["features"],
  newsSnippet: string | null
): string[] {
  const reasons: string[] = [];
  if (features.isFlagged) {
    reasons.push("Flagged / availability concern");
  }
  if (features.status === "u") {
    reasons.push("Unavailable");
  }
  if (features.isBenched) {
    reasons.push("On the bench");
  }
  if (features.isCaptainOrVice) {
    reasons.push("Captain/vice captain");
  }
  const templateHold =
    !features.isFlagged &&
    features.selectedByPercent !== null &&
    features.selectedByPercent >= SELL_SCORE.TEMPLATE_THRESHOLD;
  if (templateHold) {
    reasons.push("High-ownership template hold");
  }
  if (features.hasNews && newsSnippet !== null) {
    reasons.push(`News: ${newsSnippet}`);
  }
  return reasons;
}

function newsToSnippet(news: string | null): string | null {
  if (news === null || news.trim().length === 0) return null;
  const oneLine = news.replace(/\s+/g, " ").trim();
  if (oneLine.length <= NEWS_SNIPPET_MAX_LENGTH) return oneLine;
  return oneLine.slice(0, NEWS_SNIPPET_MAX_LENGTH) + "…";
}

export interface ScoreSellCandidatesParams {
  leagueId: number;
  entryId: number;
  eventId: number;
  topN?: number;
}

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
  const players = await prisma.fplPlayer.findMany({
    where: { id: { in: playerIds } },
    select: {
      id: true,
      status: true,
      news: true,
      selectedByPercent: true,
      nowCost: true,
    },
  });

  const playersById = new Map(
    players.map((p) => [
      p.id,
      {
        status: p.status,
        news: p.news,
        selectedByPercent: p.selectedByPercent,
        nowCost: p.nowCost,
      },
    ])
  );

  const picks = snapshot.picks.map((p) => ({
    playerId: p.playerId,
    pickPosition: p.pickPosition,
    isCaptain: p.isCaptain,
    isViceCaptain: p.isViceCaptain,
  }));

  const featuresByPlayerId = extractSellFeatures({ picks, playersById });

  const newsByPlayerId = new Map(players.map((p) => [p.id, newsToSnippet(p.news)]));

  const scores: SellCandidateScore[] = [];

  for (const [playerId, features] of featuresByPlayerId.entries()) {
    let score = SELL_SCORE.BASE;
    if (features.isFlagged) score += SELL_SCORE.FLAGGED;
    if (features.status === "u") score += SELL_SCORE.UNAVAILABLE_EXTRA;
    if (features.isBenched) score += SELL_SCORE.BENCHED;
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

  const topScores = scores.slice(0, Math.min(topN, 15));

  return { scores: topScores };
}
