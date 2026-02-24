import { prisma } from "../../lib/prisma";
import { SquadNotFoundError } from "../errors";
import type { LoadBuyContextParams, LoadBuyContextResult } from "./types";

/**
 * Loads owned player IDs and per-team counts for an entry's squad (snapshot + picks).
 * Used to exclude owned players from buy pool and later enforce 3-per-team when pairing.
 * @throws SquadNotFoundError if no snapshot or no picks exist for the given params
 */
export async function loadBuyContext(
  params: LoadBuyContextParams
): Promise<LoadBuyContextResult> {
  const { leagueId, entryId, eventId } = params;

  const snapshot = await prisma.fplEntrySnapshot.findUnique({
    where: {
      leagueId_entryId_eventId: { leagueId, entryId, eventId },
    },
    include: { picks: { select: { playerId: true } } },
  });

  if (!snapshot || snapshot.picks.length === 0) {
    throw new SquadNotFoundError(
      `No entry snapshot for leagueId=${leagueId} entryId=${entryId} eventId=${eventId}`,
      { leagueId, entryId, eventId }
    );
  }

  const playerIds = snapshot.picks.map((p) => p.playerId);
  const players = await prisma.fplPlayer.findMany({
    where: { id: { in: playerIds } },
    select: { id: true, teamId: true },
  });

  const ownedPlayerIds = new Set(players.map((p) => p.id));
  const teamCounts = new Map<number, number>();
  for (const p of players) {
    teamCounts.set(p.teamId, (teamCounts.get(p.teamId) ?? 0) + 1);
  }

  return { ownedPlayerIds, teamCounts };
}
