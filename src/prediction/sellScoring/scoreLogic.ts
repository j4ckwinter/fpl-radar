import { SELL_SCORE } from "./constants";

export type RiskProfile = "safe" | "balanced" | "risky";

/** Features needed to compute sell raw score (no DB or loaders). */
export interface SellScoreFeatures {
  momentumOut: number;
  fixtureBad01: number;
  leagueOwnershipPct: number | null;
  riskProfile: RiskProfile;
  isFlagged: boolean;
  isUnavailable: boolean;
}

export function leaguePenaltyForSell(
  leagueOwnershipPct: number | null,
  riskProfile: RiskProfile
): number {
  const L = leagueOwnershipPct ?? 0;
  if (riskProfile === "safe") return L;
  if (riskProfile === "risky") return 0.1 * L;
  return 0.5 * L;
}

/**
 * Pure helper: computes raw sell score from features (before clamp).
 * Use in score.ts and in unit tests with direct feature objects.
 */
export function computeSellRawScore(features: SellScoreFeatures): number {
  const leaguePenalty = leaguePenaltyForSell(
    features.leagueOwnershipPct,
    features.riskProfile
  );
  let raw =
    SELL_SCORE.W_MOMENTUM * features.momentumOut +
    SELL_SCORE.W_FIXTURES * features.fixtureBad01 -
    SELL_SCORE.W_LEAGUE_OWNERSHIP * leaguePenalty;

  if (features.isFlagged) {
    raw += features.isUnavailable
      ? SELL_SCORE.UNAVAILABLE_BONUS
      : SELL_SCORE.FLAGGED_BONUS;
  }

  return raw;
}
