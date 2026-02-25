import { describe, it, expect } from "vitest";
import { computeBuyRawScore } from "./scoreLogic";

function buyFeatures(overrides: Partial<Parameters<typeof computeBuyRawScore>[0]> = {}) {
  return {
    momentumIn: 0.5,
    fixture01: 0.5,
    leagueOwnershipPct: null as number | null,
    riskProfile: "balanced" as const,
    flaggedOrUnavailable: false,
    available: true,
    ...overrides,
  };
}

describe("computeBuyRawScore", () => {
  it("safe riskProfile ranks higher when leagueOwnershipPct is higher (equal other metrics)", () => {
    const lowLeague = computeBuyRawScore(
      buyFeatures({ riskProfile: "safe", leagueOwnershipPct: 0.2 })
    );
    const highLeague = computeBuyRawScore(
      buyFeatures({ riskProfile: "safe", leagueOwnershipPct: 0.8 })
    );
    expect(highLeague).toBeGreaterThan(lowLeague);
  });

  it("risky riskProfile ranks lower when leagueOwnershipPct is higher (prefer differential)", () => {
    const lowLeague = computeBuyRawScore(
      buyFeatures({ riskProfile: "risky", leagueOwnershipPct: 0.1 })
    );
    const highLeague = computeBuyRawScore(
      buyFeatures({ riskProfile: "risky", leagueOwnershipPct: 0.8 })
    );
    expect(lowLeague).toBeGreaterThan(highLeague);
  });
});
