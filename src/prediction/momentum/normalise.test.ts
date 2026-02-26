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
    expect(normaliseMomentum({ value: 0, cap: 100 })).toBe(0);
    expect(normaliseMomentum({ value: 0, cap: 1 })).toBe(0);
  });

  it("value=cap => ~1", () => {
    const cap = 100;
    const m = normaliseMomentum({ value: cap, cap });
    expect(m).toBeCloseTo(1, 5);
  });

  it("value>cap => 1 (clamped)", () => {
    expect(normaliseMomentum({ value: 200, cap: 100 })).toBe(1);
    expect(normaliseMomentum({ value: 1000, cap: 50 })).toBe(1);
  });

  it("when cap is 0 and value > 0 returns 1", () => {
    expect(normaliseMomentum({ value: 1, cap: 0 })).toBe(1);
  });

  it("when cap is 0 and value is 0 returns 0", () => {
    expect(normaliseMomentum({ value: 0, cap: 0 })).toBe(0);
  });

  it("with shapePower 1.0 behaves like no shaping", () => {
    expect(normaliseMomentum({ value: 100, cap: 100, shapePower: 1 })).toBeCloseTo(1, 5);
  });

  it("with shapePower > 1 reduces saturation at high end", () => {
    const without = normaliseMomentum({ value: 80, cap: 100 });
    const withShape = normaliseMomentum({ value: 80, cap: 100, shapePower: 1.2 });
    expect(withShape).toBeLessThan(without);
    expect(withShape).toBeGreaterThan(0);
  });
});
