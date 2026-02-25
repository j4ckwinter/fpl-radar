export type RiskProfile = "safe" | "balanced" | "risky";

/**
 * Map raw ownership fraction L (0..1) to a 0..1 term for BUY scoring.
 * Safe: high L matters a lot, low L barely; balanced: mild preference; risky: low L rewarded, flattened near zero.
 */
export function mapOwnershipForBuy(
  leagueOwnershipPct: number | null,
  riskProfile: RiskProfile
): number {
  const L = leagueOwnershipPct ?? 0;
  if (riskProfile === "safe") {
    if (L <= 0.3) return 0.15 * (L / 0.3);
    if (L >= 0.6) return 0.3 + 0.7 * ((L - 0.6) / 0.4);
    return 0.15 + 0.15 * ((L - 0.3) / 0.3);
  }
  if (riskProfile === "balanced") {
    return 0.3 + 0.4 * L;
  }
  if (riskProfile === "risky") {
    const oneMinusL = 1 - L;
    if (L >= 0.15) return oneMinusL;
    return 0.85 + (0.15 - L) * 0.5;
  }
  return 0.3 + 0.4 * L;
}

/**
 * Map raw ownership fraction L (0..1) to a 0..1 PENALTY for SELL scoring.
 * Safe: strong smooth penalty for high L; balanced: moderate; risky: small but visible.
 */
export function mapOwnershipForSell(
  leagueOwnershipPct: number | null,
  riskProfile: RiskProfile
): number {
  const L = leagueOwnershipPct ?? 0;
  if (riskProfile === "safe") {
    return L * L;
  }
  if (riskProfile === "balanced") {
    return 0.5 * Math.pow(L, 1.1);
  }
  if (riskProfile === "risky") {
    return 0.35 * L;
  }
  return 0.5 * L;
}
