import { describe, it, expect } from "vitest";
import { computeEdgeScore } from "./edgeScore.utils";

describe("computeEdgeScore", () => {
  it("combines sell and buy scores with weights", () => {
    const result = computeEdgeScore({
      sellScore: 60,
      buyScore: 40,
      sellReasons: ["a"],
      buyReasons: ["b"],
      outNowCost: 50,
      inNowCost: 55,
      bank: 100,
    });
    expect(result.clampedScore).toBeGreaterThan(0);
    expect(result.clampedScore).toBeLessThanOrEqual(100);
    expect(result.budgetUncertain).toBe(false);
  });

  it("sets budgetUncertain when bank is null", () => {
    const result = computeEdgeScore({
      sellScore: 50,
      buyScore: 50,
      sellReasons: [],
      buyReasons: [],
      outNowCost: 50,
      inNowCost: 55,
      bank: null,
    });
    expect(result.budgetUncertain).toBe(true);
    expect(result.rawScore).toBeLessThan(0.55 * 50 + 0.45 * 50);
  });

  it("adds fixture delta when fixtureOut01 and fixtureIn01 provided", () => {
    const withoutFixture = computeEdgeScore({
      sellScore: 50,
      buyScore: 50,
      sellReasons: [],
      buyReasons: [],
      outNowCost: 50,
      inNowCost: 55,
      bank: 100,
    });
    const withFixtureUpgrade = computeEdgeScore({
      sellScore: 50,
      buyScore: 50,
      sellReasons: [],
      buyReasons: [],
      outNowCost: 50,
      inNowCost: 55,
      bank: 100,
      fixtureOut01: 0.2,
      fixtureIn01: 0.8,
    });
    expect(withFixtureUpgrade.rawScore).toBeGreaterThan(withoutFixture.rawScore);
    expect(withFixtureUpgrade.rawScore - withoutFixture.rawScore).toBeCloseTo(8 * 0.6, 0);
  });

  it("adds Fixture upgrade reason when fixture delta >= 0.15 and no fixture reason present", () => {
    const result = computeEdgeScore({
      sellScore: 50,
      buyScore: 50,
      sellReasons: ["High transfers out this GW"],
      buyReasons: ["High transfers in this GW"],
      outNowCost: 50,
      inNowCost: 55,
      bank: 100,
      fixtureOut01: 0.2,
      fixtureIn01: 0.4,
    });
    expect(result.reasons).toContain("Fixture upgrade");
  });

  it("does not add Fixture upgrade when fixture reason already present", () => {
    const result = computeEdgeScore({
      sellScore: 50,
      buyScore: 50,
      sellReasons: ["Difficult upcoming fixtures"],
      buyReasons: ["High transfers in this GW"],
      outNowCost: 50,
      inNowCost: 55,
      bank: 100,
      fixtureOut01: 0.2,
      fixtureIn01: 0.4,
    });
    expect(result.reasons.some((r) => r === "Fixture upgrade")).toBe(false);
  });

  it("applies big spend penalty when cost delta exceeds threshold", () => {
    const normal = computeEdgeScore({
      sellScore: 50,
      buyScore: 50,
      sellReasons: [],
      buyReasons: [],
      outNowCost: 50,
      inNowCost: 55,
      bank: 100,
    });
    const bigSpend = computeEdgeScore({
      sellScore: 50,
      buyScore: 50,
      sellReasons: [],
      buyReasons: [],
      outNowCost: 50,
      inNowCost: 90,
      bank: 100,
    });
    expect(bigSpend.clampedScore).toBeLessThan(normal.clampedScore);
  });
});
