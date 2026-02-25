import { prisma } from "../../lib/prisma";
import {
  computeUpcomingFixtureScore,
  type UpcomingFixtureInput,
} from "./upcomingScore";

export interface LoadTeamUpcomingFixtureScoresParams {
  eventId: number;
  lookahead?: number; // default 3
}

/**
 * Loads upcoming (unfinished, eventId > current) fixtures from DB,
 * then for each team computes an upcoming fixture difficulty score.
 * Returns Map<teamId, score>; teams with no upcoming fixtures are omitted.
 */
export async function loadTeamUpcomingFixtureScores(
  params: LoadTeamUpcomingFixtureScoresParams
): Promise<Map<number, number>> {
  const lookahead = params.lookahead ?? 3;

  const fixtures = await prisma.fplFixture.findMany({
    where: {
      eventId: { not: null, gt: params.eventId },
      finished: false,
    },
    orderBy: [{ eventId: "asc" }, { kickoffTime: "asc" }, { id: "asc" }],
    select: {
      eventId: true,
      teamHId: true,
      teamAId: true,
      teamHDifficulty: true,
      teamADifficulty: true,
    },
  });

  const byTeam = new Map<number, UpcomingFixtureInput[]>();

  for (const f of fixtures) {
    const eventId = f.eventId ?? null;
    if (!byTeam.has(f.teamHId)) byTeam.set(f.teamHId, []);
    byTeam.get(f.teamHId)!.push({
      eventId,
      teamId: f.teamHId,
      difficulty: f.teamHDifficulty,
    });
    if (!byTeam.has(f.teamAId)) byTeam.set(f.teamAId, []);
    byTeam.get(f.teamAId)!.push({
      eventId,
      teamId: f.teamAId,
      difficulty: f.teamADifficulty,
    });
  }

  const result = new Map<number, number>();
  for (const [teamId, teamFixtures] of byTeam.entries()) {
    result.set(
      teamId,
      computeUpcomingFixtureScore({ fixtures: teamFixtures, lookahead })
    );
  }
  return result;
}
