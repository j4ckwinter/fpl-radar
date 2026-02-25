import { describe, it, expect } from "vitest";
import { DIVERSITY } from "./constants";
import { diversifyPredictions } from "./diversify";
import type { TransferPrediction } from "./types";

function pred(
  outPlayerId: number,
  inPlayerId: number,
  score: number
): TransferPrediction {
  return {
    outPlayerId,
    inPlayerId,
    score,
    probability: 0,
    reasons: [],
    features: {
      sellScore: 0,
      buyScore: 0,
      estimatedCostDelta: 0,
      resultingBank: null,
      budgetOk: true,
      teamLimitOk: true,
      positionOk: true,
    },
  };
}

describe("diversifyPredictions", () => {
  it("caps same IN player at maxPerInPlayer when first pass fills enough", () => {
    const sameIn = 100;
    const maxPer = DIVERSITY.MAX_PER_IN_PLAYER;
    const predictions = [
      pred(1, sameIn, 90),
      pred(2, sameIn, 85),
      pred(3, sameIn, 80),
      pred(4, 201, 78),
      pred(5, 202, 76),
      pred(6, 203, 74),
      pred(7, 204, 72),
    ];
    const { selected } = diversifyPredictions({
      predictions,
      maxResults: 6,
      maxPerInPlayer: maxPer,
      maxPerOutPlayer: maxPer,
    });

    const inCount = selected.filter((p) => p.inPlayerId === sameIn).length;
    expect(inCount).toBeLessThanOrEqual(maxPer);
  });

  it("caps same OUT player at maxPerOutPlayer when first pass fills enough", () => {
    const sameOut = 200;
    const maxPer = DIVERSITY.MAX_PER_OUT_PLAYER;
    const predictions = [
      pred(sameOut, 1, 90),
      pred(sameOut, 2, 85),
      pred(sameOut, 3, 80),
      pred(201, 10, 78),
      pred(202, 11, 76),
      pred(203, 12, 74),
      pred(204, 13, 72),
    ];
    const { selected } = diversifyPredictions({
      predictions,
      maxResults: 6,
      maxPerInPlayer: maxPer,
      maxPerOutPlayer: maxPer,
    });

    const outCount = selected.filter((p) => p.outPlayerId === sameOut).length;
    expect(outCount).toBeLessThanOrEqual(maxPer);
  });

  it("is deterministic: same input produces same output", () => {
    const predictions = [
      pred(1, 10, 90),
      pred(1, 11, 85),
      pred(2, 10, 80),
      pred(2, 11, 75),
      pred(3, 12, 70),
    ];
    const a = diversifyPredictions({
      predictions,
      maxResults: 5,
      maxPerInPlayer: 2,
      maxPerOutPlayer: 2,
    });
    const b = diversifyPredictions({
      predictions,
      maxResults: 5,
      maxPerInPlayer: 2,
      maxPerOutPlayer: 2,
    });

    expect(a.selected.length).toBe(b.selected.length);
    expect(a.dropped).toBe(b.dropped);
    expect(a.selected.map((p) => [p.outPlayerId, p.inPlayerId])).toEqual(
      b.selected.map((p) => [p.outPlayerId, p.inPlayerId])
    );
  });

  it("relaxation pass increases count when first pass yields too few", () => {
    const maxResults = 6;
    const maxPerIn = 1;
    const maxPerOut = 1;
    const predictions = [
      pred(1, 1, 50),
      pred(1, 2, 49),
      pred(2, 1, 48),
      pred(2, 2, 47),
      pred(3, 3, 46),
      pred(3, 4, 45),
      pred(4, 5, 44),
      pred(4, 6, 43),
    ];
    const { selected, dropped } = diversifyPredictions({
      predictions,
      maxResults,
      maxPerInPlayer: maxPerOut,
      maxPerOutPlayer: maxPerOut,
    });

    expect(selected.length).toBeGreaterThan(1);
    expect(selected.length).toBeLessThanOrEqual(maxResults);
    expect(dropped).toBe(predictions.length - selected.length);
  });

  it("returns empty selected and zero dropped when predictions is empty", () => {
    const { selected, dropped } = diversifyPredictions({
      predictions: [],
      maxResults: 20,
      maxPerInPlayer: 3,
      maxPerOutPlayer: 3,
    });

    expect(selected).toEqual([]);
    expect(dropped).toBe(0);
  });

  it("stops at maxResults", () => {
    const predictions = Array.from({ length: 50 }, (_, i) =>
      pred(i, i + 100, 80 - i)
    );
    const { selected } = diversifyPredictions({
      predictions,
      maxResults: 10,
      maxPerInPlayer: 5,
      maxPerOutPlayer: 5,
    });

    expect(selected.length).toBeLessThanOrEqual(10);
  });
});
