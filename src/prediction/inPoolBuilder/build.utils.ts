import { SELECTED_BY_PERCENT_NULL_FALLBACK } from "./constants";
import type { InPoolPlayer } from "./types";

/** Sorts players by selectedByPercent descending; nulls treated as SELECTED_BY_PERCENT_NULL_FALLBACK. */
export function sortBySelectedByPercentDesc(
  players: InPoolPlayer[]
): InPoolPlayer[] {
  return [...players].sort((a, b) => {
    const aVal = a.selectedByPercent ?? SELECTED_BY_PERCENT_NULL_FALLBACK;
    const bVal = b.selectedByPercent ?? SELECTED_BY_PERCENT_NULL_FALLBACK;
    return bVal - aVal;
  });
}

export interface ProcessGroupedPoolResult {
  inPoolByPosition: Map<number, InPoolPlayer[]>;
  sizeByPositionBeforeLimit: Record<number, number>;
}

/** Sorts each position's list by selectedByPercent desc and applies per-position limit. */
export function processGroupedPool(
  byPosition: Map<number, InPoolPlayer[]>,
  perPositionLimit: number
): ProcessGroupedPoolResult {
  const sizeByPositionBeforeLimit: Record<number, number> = {};
  const inPoolByPosition = new Map<number, InPoolPlayer[]>();

  for (const [positionId, list] of byPosition.entries()) {
    const sorted = sortBySelectedByPercentDesc(list);
    sizeByPositionBeforeLimit[positionId] = sorted.length;
    inPoolByPosition.set(positionId, sorted.slice(0, perPositionLimit));
  }

  return { inPoolByPosition, sizeByPositionBeforeLimit };
}
