import type { SellCandidateScore } from "./types";

const FLAGGED_STATUSES = ["i", "s", "u", "d"] as const;
// TODO: Refine per FPL status meanings once verified.

export interface ExtractSellFeaturesParams {
  picks: Array<{
    playerId: number;
    pickPosition: number; // 1..15
    isCaptain: boolean;
    isViceCaptain: boolean;
  }>;
  playersById: Map<
    number,
    {
      status: string;
      news: string | null;
      selectedByPercent: number | null;
      nowCost: number;
    }
  >;
}

export function extractSellFeatures(
  params: ExtractSellFeaturesParams
): Map<number, SellCandidateScore["features"]> {
  const { picks, playersById } = params;
  const result = new Map<number, SellCandidateScore["features"]>();

  for (const pick of picks) {
    const player = playersById.get(pick.playerId);
    const status = player?.status ?? "";
    const news = player?.news ?? null;
    const selectedByPercent = player?.selectedByPercent ?? null;
    const nowCost = player?.nowCost ?? 0;

    const hasNews = news !== null && news.trim().length > 0;
    const isFlagged =
      FLAGGED_STATUSES.includes(status as (typeof FLAGGED_STATUSES)[number]) ||
      hasNews;

    result.set(pick.playerId, {
      isFlagged,
      status,
      hasNews,
      selectedByPercent,
      isBenched: pick.pickPosition > 11,
      isCaptainOrVice: pick.isCaptain || pick.isViceCaptain,
      nowCost,
    });
  }

  return result;
}
