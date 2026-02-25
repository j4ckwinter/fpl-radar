/**
 * Upcoming fixture difficulty score. Lower FPL difficulty = easier fixture.
 * Formula: lookahead * 6 - sum(difficulty) over next N fixtures, clamped to [-10, 10].
 */

const SCORE_MIN = -10;
const SCORE_MAX = 10;

export interface UpcomingFixtureInput {
  eventId: number | null;
  teamId: number;
  difficulty: number; // 1–5
}

export interface ComputeUpcomingFixtureScoreParams {
  /** Fixtures in chronological order (next first). Only first `lookahead` are used. */
  fixtures: UpcomingFixtureInput[];
  lookahead?: number; // default 3
}

/**
 * Computes a single score from the next N fixtures for one team.
 * Higher score = easier run (lower difficulty); lower/negative = harder run.
 */
export function computeUpcomingFixtureScore(
  params: ComputeUpcomingFixtureScoreParams
): number {
  const lookahead = params.lookahead ?? 3;
  const next = params.fixtures.slice(0, lookahead);
  if (next.length === 0) return 0;

  const sumDifficulty = next.reduce((acc, f) => acc + f.difficulty, 0);
  const score = lookahead * 6 - sumDifficulty;
  return Math.max(SCORE_MIN, Math.min(SCORE_MAX, Math.round(score)));
}
