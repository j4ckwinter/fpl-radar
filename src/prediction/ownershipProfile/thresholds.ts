import {
  SMALL_LEAGUE_MAX_ENTRIES,
  HIGH_OWNERSHIP_MIN_COUNT,
  HIGH_OWNERSHIP_FRACTION,
  LOW_OWNERSHIP_FRACTION,
} from "./constants";

/**
 * Whether to treat as "high ownership" for reasons/UI. League-size aware:
 * small leagues use minimum count; larger leagues use fraction threshold.
 */
export function isHighOwnership(
  fraction: number | null,
  countOwned: number,
  totalEntries: number
): boolean {
  if (fraction === null || totalEntries === 0) return false;
  if (totalEntries < SMALL_LEAGUE_MAX_ENTRIES) {
    return countOwned >= HIGH_OWNERSHIP_MIN_COUNT;
  }
  return fraction >= HIGH_OWNERSHIP_FRACTION;
}

/**
 * Whether to treat as "low ownership" / differential. League-size aware for consistency.
 */
export function isLowOwnership(
  fraction: number | null,
  countOwned: number,
  totalEntries: number
): boolean {
  if (fraction === null || totalEntries === 0) return false;
  if (totalEntries < SMALL_LEAGUE_MAX_ENTRIES) {
    return countOwned < Math.min(3, Math.ceil(totalEntries * LOW_OWNERSHIP_FRACTION));
  }
  return fraction < LOW_OWNERSHIP_FRACTION;
}
