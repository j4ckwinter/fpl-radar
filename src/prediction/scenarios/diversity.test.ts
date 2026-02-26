import { describe, it, expect } from "vitest";
import { applyBundleDiversity } from "./diversity";
import type { TransferBundle } from "./types";

function bundle(
  outs: number[],
  ins: number[],
  score: number
): TransferBundle {
  return {
    outs: [...outs].sort((a, b) => a - b),
    ins: [...ins].sort((a, b) => a - b),
    score,
    reasons: [],
    flags: {},
  };
}

describe("applyBundleDiversity", () => {
  it("returns bundles re-sorted by score", () => {
    const bundles = [
      bundle([1, 2], [101, 102], 100),
      bundle([3, 4], [103, 104], 150),
    ];
    const result = applyBundleDiversity({
      bundles,
      maxBundlesPerOutPlayer: 6,
      maxBundlesPerInPlayer: 6,
      maxBundlesPerOutSet: 3,
    });
    expect(result.map((b) => b.score)).toEqual([150, 100]);
  });

  it("caps repeated OUT set", () => {
    const bundles = [
      bundle([1, 2], [101, 102], 100),
      bundle([1, 2], [103, 104], 99),
      bundle([1, 2], [105, 106], 98),
      bundle([1, 2], [107, 108], 97),
      bundle([3, 4], [109, 110], 90),
    ];
    const result = applyBundleDiversity({
      bundles,
      maxBundlesPerOutSet: 2,
    });
    expect(result.length).toBe(3);
    const outSetKeys = result.map((b) => b.outs.join(","));
    const sameSet = outSetKeys.filter((k) => k === "1,2");
    expect(sameSet.length).toBe(2);
    expect(result[2].outs).toEqual([3, 4]);
  });

  it("caps per OUT player", () => {
    const bundles = [
      bundle([1, 2], [101, 102], 100),
      bundle([1, 3], [103, 104], 99),
      bundle([1, 4], [105, 106], 98),
      bundle([1, 5], [107, 108], 97),
      bundle([1, 6], [109, 110], 96),
      bundle([1, 7], [111, 112], 95),
      bundle([2, 3], [113, 114], 94),
    ];
    const result = applyBundleDiversity({
      bundles,
      maxBundlesPerOutPlayer: 3,
    });
    expect(result.length).toBeLessThanOrEqual(7);
    const player1Count = result.filter((b) => b.outs.includes(1)).length;
    expect(player1Count).toBe(3);
  });
});
