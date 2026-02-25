import {
  UNAVAILABLE_STATUSES,
  FLAGGED_STATUSES,
  FIXTURE_SCORE_MIN,
  FIXTURE_SCORE_MAX,
} from "./constants";

const SCORE_MIN = 0;
const SCORE_MAX = 100;

export function clampScore(score: number): number {
  return Math.max(SCORE_MIN, Math.min(SCORE_MAX, Math.round(score)));
}

/**
 * Maps upcoming fixture score (easier = higher) to 0..1. Null (no fixtures) -> 0.5 (neutral).
 * Input range from teamUpcomingScores is [FIXTURE_SCORE_MIN, FIXTURE_SCORE_MAX].
 */
export function normaliseFixtureScore(score: number | null): number {
  if (score === null) return 0.5;
  const normalised =
    (score - FIXTURE_SCORE_MIN) /
    (FIXTURE_SCORE_MAX - FIXTURE_SCORE_MIN);
  return Math.max(0, Math.min(1, normalised));
}

export function isAvailable(status: string): boolean {
  if (UNAVAILABLE_STATUSES.includes(status as (typeof UNAVAILABLE_STATUSES)[number])) {
    return false;
  }
  if (FLAGGED_STATUSES.includes(status as (typeof FLAGGED_STATUSES)[number])) {
    return false;
  }
  return true;
}

export function isFlaggedOrUnavailable(status: string): boolean {
  if (UNAVAILABLE_STATUSES.includes(status as (typeof UNAVAILABLE_STATUSES)[number])) {
    return true;
  }
  if (FLAGGED_STATUSES.includes(status as (typeof FLAGGED_STATUSES)[number])) {
    return true;
  }
  return false;
}
