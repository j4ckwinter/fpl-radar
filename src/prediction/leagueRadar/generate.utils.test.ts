import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("./constants", () => ({
  LEAGUE_RADAR: {
    MAX_EXAMPLES_PER_ITEM: 5,
  },
}));

import {
  createRadarAccumulator,
  addToAccumulator,
  runWithConcurrency,
  getOrCreateAcc,
  toPlayerRadarItems,
} from "./generate.utils";

describe("createRadarAccumulator", () => {
  it("returns accumulator with zero expectedCount and empty entryIds and examples", () => {
    const acc = createRadarAccumulator();
    expect(acc.expectedCount).toBe(0);
    expect(acc.entryIds.size).toBe(0);
    expect(acc.examples).toEqual([]);
  });
});

describe("addToAccumulator", () => {
  it("increments expectedCount and adds entryId and example", () => {
    const acc = createRadarAccumulator();
    addToAccumulator(acc, 100, 0.5);
    expect(acc.expectedCount).toBe(0.5);
    expect(acc.entryIds.has(100)).toBe(true);
    expect(acc.examples).toEqual([{ entryId: 100, probability: 0.5 }]);
  });

  it("sorts examples by probability descending", () => {
    const acc = createRadarAccumulator();
    addToAccumulator(acc, 1, 0.2);
    addToAccumulator(acc, 2, 0.8);
    addToAccumulator(acc, 3, 0.5);
    expect(acc.examples.map((e) => e.probability)).toEqual([0.8, 0.5, 0.2]);
  });

  it("trims examples to MAX_EXAMPLES_PER_ITEM (5)", () => {
    const acc = createRadarAccumulator();
    addToAccumulator(acc, 1, 0.1);
    addToAccumulator(acc, 2, 0.2);
    addToAccumulator(acc, 3, 0.3);
    addToAccumulator(acc, 4, 0.4);
    addToAccumulator(acc, 5, 0.5);
    addToAccumulator(acc, 6, 0.9);
    expect(acc.examples).toHaveLength(5);
    expect(acc.examples[0].probability).toBe(0.9);
    expect(acc.examples[0].entryId).toBe(6);
  });
});

describe("runWithConcurrency", () => {
  it("runs fn on each item and returns results in order", async () => {
    const results = await runWithConcurrency(
      [1, 2, 3],
      2,
      async (n) => n * 10
    );
    expect(results).toEqual([10, 20, 30]);
  });

  it("limits concurrent execution to concurrency parameter", async () => {
    const order: number[] = [];
    await runWithConcurrency(
      [1, 2, 3, 4],
      2,
      async (n) => {
        order.push(n);
        await new Promise((r) => setTimeout(r, 10));
        return n;
      }
    );
    expect(order).toHaveLength(4);
    expect(order[0]).toBe(1);
    expect(order[1]).toBe(2);
  });

  it("returns empty array when items is empty", async () => {
    const results = await runWithConcurrency([], 5, async () => 1);
    expect(results).toEqual([]);
  });
});

describe("getOrCreateAcc", () => {
  it("returns existing accumulator for key", () => {
    const map = new Map<number, ReturnType<typeof createRadarAccumulator>>();
    const acc1 = createRadarAccumulator();
    acc1.expectedCount = 10;
    map.set(42, acc1);
    const acc2 = getOrCreateAcc(map, 42);
    expect(acc2).toBe(acc1);
    expect(acc2.expectedCount).toBe(10);
  });

  it("creates and sets new accumulator when key missing", () => {
    const map = new Map<number, ReturnType<typeof createRadarAccumulator>>();
    const acc = getOrCreateAcc(map, 99);
    expect(acc.expectedCount).toBe(0);
    expect(map.get(99)).toBe(acc);
  });

  it("works with string keys for transfer map", () => {
    const map = new Map<string, ReturnType<typeof createRadarAccumulator>>();
    const acc = getOrCreateAcc(map, "10-20");
    expect(acc.expectedCount).toBe(0);
    expect(map.get("10-20")).toBe(acc);
  });
});

describe("toPlayerRadarItems", () => {
  it("returns empty array when map is empty", () => {
    const map = new Map<number, ReturnType<typeof createRadarAccumulator>>();
    expect(toPlayerRadarItems(map, 10)).toEqual([]);
  });

  it("maps entries to PlayerRadarItem and sorts by expectedCount desc then uniqueEntries desc", () => {
    const map = new Map<number, ReturnType<typeof createRadarAccumulator>>();
    const acc1 = createRadarAccumulator();
    acc1.expectedCount = 1.5;
    acc1.entryIds.add(100);
    acc1.entryIds.add(101);
    acc1.examples = [{ entryId: 100, probability: 0.8 }];
    map.set(10, acc1);
    const acc2 = createRadarAccumulator();
    acc2.expectedCount = 2;
    acc2.entryIds.add(200);
    acc2.examples = [];
    map.set(20, acc2);
    const items = toPlayerRadarItems(map, 10);
    expect(items).toHaveLength(2);
    expect(items[0].playerId).toBe(20);
    expect(items[0].expectedCount).toBe(2);
    expect(items[0].uniqueEntries).toBe(1);
    expect(items[1].playerId).toBe(10);
    expect(items[1].expectedCount).toBe(1.5);
    expect(items[1].uniqueEntries).toBe(2);
  });

  it("slices to topN", () => {
    const map = new Map<number, ReturnType<typeof createRadarAccumulator>>();
    for (let i = 0; i < 5; i++) {
      const acc = createRadarAccumulator();
      acc.expectedCount = 10 - i;
      acc.entryIds.add(i);
      map.set(i, acc);
    }
    const items = toPlayerRadarItems(map, 2);
    expect(items).toHaveLength(2);
    expect(items.map((x) => x.playerId)).toEqual([0, 1]);
  });
});
