import { LEAGUE_RADAR } from "./constants";
import type { PlayerRadarItem, RadarAccumulator } from "./types";

export function createRadarAccumulator(): RadarAccumulator {
  return {
    expectedCount: 0,
    entryIds: new Set(),
    examples: [],
  };
}

export function addToAccumulator(
  acc: RadarAccumulator,
  entryId: number,
  probability: number
): void {
  acc.expectedCount += probability;
  acc.entryIds.add(entryId);
  acc.examples.push({ entryId, probability });
  acc.examples.sort((a, b) => b.probability - a.probability);
  if (acc.examples.length > LEAGUE_RADAR.MAX_EXAMPLES_PER_ITEM) {
    acc.examples = acc.examples.slice(0, LEAGUE_RADAR.MAX_EXAMPLES_PER_ITEM);
  }
}

export async function runWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += concurrency) {
    const chunk = items.slice(i, i + concurrency);
    const chunkResults = await Promise.all(chunk.map(fn));
    results.push(...chunkResults);
  }
  return results;
}

export function getOrCreateAcc<K>(
  map: Map<K, RadarAccumulator>,
  key: K
): RadarAccumulator {
  let acc = map.get(key);
  if (!acc) {
    acc = createRadarAccumulator();
    map.set(key, acc);
  }
  return acc;
}

export function toPlayerRadarItems(
  map: Map<number, RadarAccumulator>,
  topN: number
): PlayerRadarItem[] {
  return Array.from(map.entries())
    .map(([playerId, acc]) => ({
      playerId,
      expectedCount: acc.expectedCount,
      uniqueEntries: acc.entryIds.size,
      examples: acc.examples,
    }))
    .sort((a, b) => {
      if (b.expectedCount !== a.expectedCount) return b.expectedCount - a.expectedCount;
      return b.uniqueEntries - a.uniqueEntries;
    })
    .slice(0, topN);
}
