import { prisma } from "../../lib/prisma";
import type { SquadState } from "../types";
import { InvalidSquadError, SquadNotFoundError } from "../errors";
import { REQUIRED_SQUAD_SIZE } from "./constants";
import { mapPicksToSquadPlayers } from "./load.utils";
import type { LoadSquadStateParams, PlayerRow } from "./types";

/**
 * Loads squad state for an entry and gameweek from persisted snapshot and picks.
 * Joins to FplPlayer for teamId, positionId, nowCost.
 * @throws SquadNotFoundError if no snapshot exists for the given params
 * @throws InvalidSquadError if snapshot exists but squad is not valid (e.g. not 15 players)
 */
export async function loadSquadState(
  params: LoadSquadStateParams
): Promise<SquadState> {
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

  const playerMap = new Map(
    (players as PlayerRow[]).map((p) => [p.id, p] as const)
  );
  const squadPlayers = mapPicksToSquadPlayers(snapshot.picks, playerMap);

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
