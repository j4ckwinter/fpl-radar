import { EDGE_SCORE, SCORE_MIN, SCORE_MAX, REASON_FIXTURE_UPGRADE } from "./constants";
import {
  SELL_REASONS_TAKE,
  BUY_REASONS_TAKE,
  MAX_REASONS,
  REASON_BIG_SPEND,
  REASON_BANK_UNKNOWN,
} from "../transferPrediction/constants";

export interface EdgeScoreInput {
  sellScore: number;
  buyScore: number;
  sellReasons: string[];
  buyReasons: string[];
  /** Out price (tenths). */
  outNowCost: number;
  /** In price (tenths). */
  inNowCost: number;
  /** Current bank (tenths) or null if unknown. */
  bank: number | null;
  /** Out fixture quality 0..1 (higher = easier). Optional; adds fixture-delta term when both set. */
  fixtureOut01?: number;
  /** In fixture quality 0..1 (higher = easier). Optional. */
  fixtureIn01?: number;
}

export interface EdgeScoreResult {
  rawScore: number;
  clampedScore: number;
  reasons: string[];
  budgetUncertain: boolean;
}

function clampScore(score: number): number {
  return Math.max(SCORE_MIN, Math.min(SCORE_MAX, Math.round(score)));
}

function buildReasons(
  sellReasons: string[],
  buyReasons: string[],
  bankUnknown: boolean,
  bigSpend: boolean
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
  if (bigSpend && reasons.length < MAX_REASONS) {
    reasons.push(REASON_BIG_SPEND);
  }
  if (bankUnknown && reasons.length < MAX_REASONS) {
    reasons.push(REASON_BANK_UNKNOWN);
  }
  return reasons.slice(0, MAX_REASONS);
}

/**
 * Compute transfer score for a single edge (out → in), matching single-transfer prediction logic.
 */
export function computeEdgeScore(input: EdgeScoreInput): EdgeScoreResult {
  const {
    sellScore,
    buyScore,
    sellReasons,
    buyReasons,
    outNowCost,
    inNowCost,
    bank,
    fixtureOut01,
    fixtureIn01,
  } = input;

  const estimatedCostDelta = inNowCost - outNowCost;
  const resultingBank = bank !== null ? bank + outNowCost - inNowCost : null;
  const budgetUncertain = resultingBank === null && bank === null;
  const bigSpend =
    estimatedCostDelta > EDGE_SCORE.BIG_SPEND_PENALTY_THRESHOLD;

  let rawScore =
    EDGE_SCORE.W_SELL * sellScore + EDGE_SCORE.W_BUY * buyScore;
  if (fixtureOut01 !== undefined && fixtureIn01 !== undefined) {
    rawScore += EDGE_SCORE.FIXTURE_DELTA_WEIGHT * (fixtureIn01 - fixtureOut01);
  }
  if (budgetUncertain) {
    rawScore -= EDGE_SCORE.BUDGET_UNKNOWN_PENALTY;
  }
  if (bigSpend) {
    rawScore -= EDGE_SCORE.BIG_SPEND_PENALTY;
  }
  const weakLink = Math.min(sellScore, buyScore);
  if (weakLink < EDGE_SCORE.WEAK_LINK_THRESHOLD) {
    rawScore -= EDGE_SCORE.WEAK_LINK_PENALTY;
  }

  let reasons = buildReasons(
    sellReasons,
    buyReasons,
    budgetUncertain,
    bigSpend
  );

  const fixtureDelta =
    fixtureOut01 !== undefined && fixtureIn01 !== undefined
      ? fixtureIn01 - fixtureOut01
      : 0;
  const hasFixtureReason = reasons.some(
    (r) => /fixture|favour|difficult|upgrade/i.test(r) || r === REASON_FIXTURE_UPGRADE
  );
  if (
    fixtureDelta >= EDGE_SCORE.FIXTURE_DELTA_REASON_THRESHOLD &&
    !hasFixtureReason &&
    reasons.length < 4
  ) {
    reasons = [...reasons, REASON_FIXTURE_UPGRADE].slice(0, 4);
  }

  return {
    rawScore,
    clampedScore: clampScore(rawScore),
    reasons,
    budgetUncertain,
  };
}
