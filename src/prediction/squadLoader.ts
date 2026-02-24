import { prisma } from "../lib/prisma";
import type { SquadState } from "./types";
import { InvalidSquadError, SquadNotFoundError } from "./errors";

const REQUIRED_SQUAD_SIZE = 15;

/**
 * Loads squad state for an entry and gameweek from persisted snapshot and picks.
 * Joins to FplPlayer for teamId, positionId, nowCost.
 * @throws SquadNotFoundError if no snapshot exists for the given params
 * @throws InvalidSquadError if snapshot exists but squad is not valid (e.g. not 15 players)
 */
export async function loadSquadState(params: {
  leagueId: number;
  entryId: number;
  eventId: number;
}): Promise<SquadState> {
  const snapshot = await prisma.fplEntrySnapshot.findUnique({
    where: {
      leagueId_entryId_eventId: {
        leagueId: params.leagueId,
        entryId: params.entryId,
        eventId: params.eventId,
      },
    },
    include: { picks: true },
  });

  if (!snapshot) {
    throw new SquadNotFoundError(
      `No entry snapshot for leagueId=${params.leagueId} entryId=${params.entryId} eventId=${params.eventId}`,
      params
    );
  }

  if (snapshot.picks.length === 0) {
    throw new InvalidSquadError(
      "Entry snapshot has no picks",
      params
    );
  }

  const playerIds = snapshot.picks.map((p) => p.playerId);
  const players = await prisma.fplPlayer.findMany({
    where: { id: { in: playerIds } },
    select: { id: true, teamId: true, positionId: true, nowCost: true },
  });

  const playerMap = new Map(players.map((p) => [p.id, p]));

  const squadPlayers = snapshot.picks
    .map((pick) => {
      const p = playerMap.get(pick.playerId);
      if (!p) return null;
      return {
        playerId: p.id,
        teamId: p.teamId,
        positionId: p.positionId,
        nowCost: p.nowCost,
      };
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);

  if (squadPlayers.length !== snapshot.picks.length) {
    throw new InvalidSquadError(
      "One or more picks reference missing FplPlayer rows",
      params
    );
  }

  if (squadPlayers.length !== REQUIRED_SQUAD_SIZE) {
    throw new InvalidSquadError(
      `Squad must have exactly ${REQUIRED_SQUAD_SIZE} players; got ${squadPlayers.length}`,
      params
    );
  }

  return {
    entryId: params.entryId,
    leagueId: params.leagueId,
    eventId: params.eventId,
    bank: snapshot.bank,
    players: squadPlayers,
  };
}
