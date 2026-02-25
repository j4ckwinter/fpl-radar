import { describe, it, expect } from "vitest";
import { normaliseMomentum, percentile } from "./normalise";

describe("percentile", () => {
  it("returns 0 for empty array", () => {
    expect(percentile([], 50)).toBe(0);
    expect(percentile([], 95)).toBe(0);
  });

  it("returns the value at the p-th percentile", () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(percentile(values, 50)).toBe(5);
    expect(percentile(values, 95)).toBe(10);
    expect(percentile(values, 0)).toBe(1);
  });
});

describe("normaliseMomentum", () => {
  it("value=0 => 0", () => {
    expect(normaliseMomentum({ value: 0, p95: 100 })).toBe(0);
    expect(normaliseMomentum({ value: 0, p95: 1 })).toBe(0);
  });

  it("value=p95 => ~1", () => {
    const p95 = 100;
    const m = normaliseMomentum({ value: p95, p95 });
    expect(m).toBeCloseTo(1, 5);
  });

  it("value>p95 => 1 (clamped)", () => {
    expect(normaliseMomentum({ value: 200, p95: 100 })).toBe(1);
    expect(normaliseMomentum({ value: 1000, p95: 50 })).toBe(1);
  });

  it("when p95 is 0 and value > 0 returns 1", () => {
    expect(normaliseMomentum({ value: 1, p95: 0 })).toBe(1);
  });

  it("when p95 is 0 and value is 0 returns 0", () => {
    expect(normaliseMomentum({ value: 0, p95: 0 })).toBe(0);
  });
});
