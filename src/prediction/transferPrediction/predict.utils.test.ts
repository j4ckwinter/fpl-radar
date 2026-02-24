import { describe, it, expect } from "vitest";
import {
  clampScore,
  buildReasons,
  softmaxProbabilities,
} from "./predict.utils";
import { REASON_BIG_SPEND, REASON_BANK_UNKNOWN } from "./constants";

describe("clampScore", () => {
  it("returns value when within 0..100", () => {
    expect(clampScore(0)).toBe(0);
    expect(clampScore(50)).toBe(50);
    expect(clampScore(100)).toBe(100);
  });

  it("rounds and clamps below 0 to 0", () => {
    expect(clampScore(-1)).toBe(0);
    expect(clampScore(-10.4)).toBe(0);
  });

  it("rounds and clamps above 100 to 100", () => {
    expect(clampScore(101)).toBe(100);
    expect(clampScore(150.6)).toBe(100);
  });

  it("rounds to nearest integer", () => {
    expect(clampScore(50.4)).toBe(50);
    expect(clampScore(50.6)).toBe(51);
  });
});

describe("buildReasons", () => {
  it("takes up to SELL_REASONS_TAKE sell reasons then up to BUY_REASONS_TAKE buy reasons", () => {
    const sell = ["S1", "S2", "S3"];
    const buy = ["B1", "B2"];
    const result = buildReasons(sell, buy, false, false);
    expect(result).toEqual(["S1", "S2", "B1", "B2"]);
  });

  it("stops at MAX_REASONS (4)", () => {
    const sell = ["S1", "S2", "S3"];
    const buy = ["B1", "B2", "B3"];
    const result = buildReasons(sell, buy, false, false);
    expect(result).toHaveLength(4);
    expect(result).toEqual(["S1", "S2", "B1", "B2"]);
  });

  it("adds big spend reason when bigSpendPenalty is true and space remains", () => {
    const result = buildReasons([], [], false, true);
    expect(result).toContain(REASON_BIG_SPEND);
  });

  it("adds bank unknown reason when bankUnknown is true and space remains", () => {
    const result = buildReasons([], [], true, false);
    expect(result).toContain(REASON_BANK_UNKNOWN);
  });

  it("adds both penalty reasons when both flags true and space remains", () => {
    const result = buildReasons(["S1"], [], true, true);
    expect(result).toContain(REASON_BIG_SPEND);
    expect(result).toContain(REASON_BANK_UNKNOWN);
  });

  it("does not add penalty reasons when already at MAX_REASONS", () => {
    const sell = ["S1", "S2"];
    const buy = ["B1", "B2"];
    const result = buildReasons(sell, buy, true, true);
    expect(result).toHaveLength(4);
    expect(result).not.toContain(REASON_BIG_SPEND);
    expect(result).not.toContain(REASON_BANK_UNKNOWN);
  });

  it("returns empty array when no reasons and no flags", () => {
    expect(buildReasons([], [], false, false)).toEqual([]);
  });
});

describe("softmaxProbabilities", () => {
  it("returns empty array for empty scores", () => {
    expect(softmaxProbabilities([], 1)).toEqual([]);
  });

  it("returns [1] for single score", () => {
    expect(softmaxProbabilities([50], 10)).toEqual([1]);
  });

  it("returns probabilities that sum to 1", () => {
    const scores = [20, 50, 80];
    const probs = softmaxProbabilities(scores, 15);
    const sum = probs.reduce((a, b) => a + b, 0);
    expect(sum).toBeCloseTo(1, 10);
  });

  it("returns higher probability for higher score", () => {
    const scores = [10, 50, 90];
    const probs = softmaxProbabilities(scores, 15);
    expect(probs[2]).toBeGreaterThan(probs[1]);
    expect(probs[1]).toBeGreaterThan(probs[0]);
  });

  it("uses temperature to scale spread (lower temp = sharper)", () => {
    const scores = [40, 50, 60];
    const lowTemp = softmaxProbabilities(scores, 1);
    const highTemp = softmaxProbabilities(scores, 100);
    expect(highTemp[1]).toBeGreaterThan(lowTemp[1]);
    expect(highTemp[0]).toBeGreaterThan(lowTemp[0]);
  });
});
