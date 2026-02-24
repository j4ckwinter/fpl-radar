import {
  SCORE_MIN,
  SCORE_MAX,
  MAX_REASONS,
  SELL_REASONS_TAKE,
  BUY_REASONS_TAKE,
  REASON_BIG_SPEND,
  REASON_BANK_UNKNOWN,
} from "./constants";

export function clampScore(score: number): number {
  return Math.max(SCORE_MIN, Math.min(SCORE_MAX, Math.round(score)));
}

export function buildReasons(
  sellReasons: string[],
  buyReasons: string[],
  bankUnknown: boolean,
  bigSpendPenalty: boolean
): string[] {
  const reasons: string[] = [];
  for (
    let i = 0;
    i < SELL_REASONS_TAKE && i < sellReasons.length && reasons.length < MAX_REASONS;
    i++
  ) {
    reasons.push(sellReasons[i]);
  }
  for (
    let i = 0;
    i < BUY_REASONS_TAKE && i < buyReasons.length && reasons.length < MAX_REASONS;
    i++
  ) {
    reasons.push(buyReasons[i]);
  }
  if (bigSpendPenalty && reasons.length < MAX_REASONS) {
    reasons.push(REASON_BIG_SPEND);
  }
  if (bankUnknown && reasons.length < MAX_REASONS) {
    reasons.push(REASON_BANK_UNKNOWN);
  }
  return reasons.slice(0, MAX_REASONS);
}

export function softmaxProbabilities(
  scores: number[],
  temperature: number
): number[] {
  if (scores.length === 0) return [];
  if (scores.length === 1) return [1];
  const maxScore = Math.max(...scores);
  const weights = scores.map((s) => Math.exp((s - maxScore) / temperature));
  const sum = weights.reduce((a, b) => a + b, 0);
  return weights.map((w) => w / sum);
}
