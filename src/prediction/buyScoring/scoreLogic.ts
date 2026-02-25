import { BUY_SCORE } from "./constants";

export type RiskProfile = "safe" | "balanced" | "risky";

/** Features needed to compute buy raw score (no DB or loaders). */
export interface BuyScoreFeatures {
  momentumIn: number;
  fixture01: number;
  leagueOwnershipPct: number | null;
  riskProfile: RiskProfile;
  flaggedOrUnavailable: boolean;
  available: boolean;
}

export function leagueTermForBuy(
  leagueOwnershipPct: number | null,
  riskProfile: RiskProfile
): number {
  const L = leagueOwnershipPct ?? 0;
  if (riskProfile === "safe") return L;
  if (riskProfile === "risky") return 1 - L;
  return 0.5 * L;
}

/**
 * Pure helper: computes raw buy score from features (before clamp).
 * Use in score.ts and in unit tests with direct feature objects.
 */
export function computeBuyRawScore(features: BuyScoreFeatures): number {
  const leagueTerm = leagueTermForBuy(
    features.leagueOwnershipPct,
    features.riskProfile
  );
  let raw =
    BUY_SCORE.W_MOMENTUM * features.momentumIn +
    BUY_SCORE.W_FIXTURES * features.fixture01 +
    BUY_SCORE.W_LEAGUE_OWNERSHIP * leagueTerm;

  if (features.flaggedOrUnavailable) {
    raw -= features.available
      ? BUY_SCORE.FLAGGED_PENALTY
      : BUY_SCORE.UNAVAILABLE_PENALTY;
  }

  return raw;
}
