export type RiskProfile = "safe" | "balanced" | "risky";

export function parseRiskProfile(input: unknown): RiskProfile {
  return input === "safe" || input === "risky" ? input : "balanced";
}
