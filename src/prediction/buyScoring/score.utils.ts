import { UNAVAILABLE_STATUSES, FLAGGED_STATUSES } from "./constants";

const SCORE_MIN = 0;
const SCORE_MAX = 100;

export function clampScore(score: number): number {
  return Math.max(SCORE_MIN, Math.min(SCORE_MAX, Math.round(score)));
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
