import { describe, it, expect } from "vitest";
import { computeSellRawScore } from "./scoreLogic";

function sellFeatures(
  overrides: Partial<Parameters<typeof computeSellRawScore>[0]> = {}
) {
  return {
    momentumOut: 0.5,
    fixtureBad01: 0.5,
    leagueOwnershipPct: null as number | null,
    riskProfile: "balanced" as const,
    isFlagged: false,
    isUnavailable: false,
    ...overrides,
  };
}

describe("computeSellRawScore", () => {
  it("safe riskProfile penalises selling high league ownership more than risky", () => {
    const highLeagueOwnership = 0.8;
    const safeRaw = computeSellRawScore(
      sellFeatures({
        riskProfile: "safe",
        leagueOwnershipPct: highLeagueOwnership,
      })
    );
    const riskyRaw = computeSellRawScore(
      sellFeatures({
        riskProfile: "risky",
        leagueOwnershipPct: highLeagueOwnership,
      })
    );
    expect(safeRaw).toBeLessThan(riskyRaw);
  });
});
