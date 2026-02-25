import { BUY_SCORE } from "./constants";
import {
  mapOwnershipForBuy,
  type RiskProfile,
} from "../ownershipProfile/curves";
import {
  RISKY_CONVICTION_MOMENTUM_THRESHOLD,
  RISKY_CONVICTION_FIXTURE_THRESHOLD,
  RISKY_LOW_CONVICTION_OWNERSHIP_SCALE,
} from "../ownershipProfile/constants";

export type { RiskProfile } from "../ownershipProfile/curves";

/** Features needed to compute buy raw score (no DB or loaders). */
export interface BuyScoreFeatures {
  momentumIn: number;
  fixture01: number;
  leagueOwnershipPct: number | null;
  riskProfile: RiskProfile;
  flaggedOrUnavailable: boolean;
  available: boolean;
}

/**
 * League term for buy (0..1) using profile-shaped curve.
 * Risky: applies conviction gating (reduced term when momentum/fixtures are weak).
 */
export function leagueTermForBuy(
  leagueOwnershipPct: number | null,
  riskProfile: RiskProfile,
  options?: { momentumIn?: number; fixture01?: number }
): number {
  let term = mapOwnershipForBuy(leagueOwnershipPct, riskProfile);
  if (riskProfile === "risky" && options) {
    const momentumOk =
      (options.momentumIn ?? 0) >= RISKY_CONVICTION_MOMENTUM_THRESHOLD;
    const fixtureOk =
      (options.fixture01 ?? 0) >= RISKY_CONVICTION_FIXTURE_THRESHOLD;
    if (!momentumOk && !fixtureOk) {
      term *= RISKY_LOW_CONVICTION_OWNERSHIP_SCALE;
    }
  }
  return term;
}

/**
 * Pure helper: computes raw buy score from features (before clamp).
 * Use in score.ts and in unit tests with direct feature objects.
 */
export function computeBuyRawScore(features: BuyScoreFeatures): number {
  const leagueTerm = leagueTermForBuy(
    features.leagueOwnershipPct,
    features.riskProfile,
    {
      momentumIn: features.momentumIn,
      fixture01: features.fixture01,
    }
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
