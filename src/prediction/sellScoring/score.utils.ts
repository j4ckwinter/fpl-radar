import {
  SELL_SCORE,
  NEWS_SNIPPET_MAX_LENGTH,
  SELL_REASON,
  SCORE_MIN,
  SCORE_MAX,
} from "./constants";
import type { SellCandidateScore } from "./types";

export function clampScore(score: number): number {
  return Math.max(SCORE_MIN, Math.min(SCORE_MAX, Math.round(score)));
}

export function buildReasons(
  features: SellCandidateScore["features"],
  newsSnippet: string | null
): string[] {
  const reasons: string[] = [];
  if (features.isFlagged) {
    reasons.push(SELL_REASON.FLAGGED);
  }
  if (features.status === "u") {
    reasons.push(SELL_REASON.UNAVAILABLE);
  }
  if (features.isBenched) {
    reasons.push(SELL_REASON.BENCHED);
  }
  if (features.isCaptainOrVice) {
    reasons.push(SELL_REASON.CAPTAIN_OR_VICE);
  }
  const templateHold =
    !features.isFlagged &&
    features.selectedByPercent !== null &&
    features.selectedByPercent >= SELL_SCORE.TEMPLATE_THRESHOLD;
  if (templateHold) {
    reasons.push(SELL_REASON.TEMPLATE_HOLD);
  }
  if (features.hasNews && newsSnippet !== null) {
    reasons.push(`News: ${newsSnippet}`);
  }
  return reasons;
}

export function newsToSnippet(news: string | null): string | null {
  if (news === null || news.trim().length === 0) return null;
  const oneLine = news.replace(/\s+/g, " ").trim();
  if (oneLine.length <= NEWS_SNIPPET_MAX_LENGTH) return oneLine;
  return oneLine.slice(0, NEWS_SNIPPET_MAX_LENGTH) + "…";
}
