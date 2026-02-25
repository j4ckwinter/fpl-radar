import { FLAGGED_STATUSES } from "./constants";
import type { ExtractSellFeaturesParams, SellCandidateScore } from "./types";

export function extractSellFeatures(
  params: ExtractSellFeaturesParams
): Map<number, SellCandidateScore["features"]> {
  const { picks, playersById } = params;
  const result = new Map<number, SellCandidateScore["features"]>();

  const teamUpcomingScores = params.teamUpcomingScores;

  for (const pick of picks) {
    const player = playersById.get(pick.playerId);
    const status = player?.status ?? "";
    const news = player?.news ?? null;
    const selectedByPercent = player?.selectedByPercent ?? null;
    const nowCost = player?.nowCost ?? 0;
    const teamId = player?.teamId ?? 0;

    const hasNews = news !== null && news.trim().length > 0;
    const isFlagged =
      FLAGGED_STATUSES.includes(status as (typeof FLAGGED_STATUSES)[number]) ||
      hasNews;

    const upcomingFixtureScore =
      teamUpcomingScores !== undefined
        ? (teamUpcomingScores.get(teamId) ?? null)
        : null;

    result.set(pick.playerId, {
      isFlagged,
      status,
      hasNews,
      selectedByPercent,
      isBenched: pick.pickPosition > 11,
      isCaptainOrVice: pick.isCaptain || pick.isViceCaptain,
      nowCost,
      upcomingFixtureScore,
    });
  }

  return result;
}
