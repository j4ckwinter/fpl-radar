import type { PrismaClient } from "../../generated/prisma";
import type { SquadState, TransferCandidate } from "../types";
import { MAX_PLAYERS_PER_TEAM } from "./constants";
import { createEmptyDiagnostics, countTeamInSquad } from "./generate.utils";
import type { CandidateDiagnostics, PlayerReference } from "./types";

/**
 * Loads the squad state for a given entry and gameweek from persisted snapshot and picks.
 * Returns null if no snapshot exists for the given leagueId, entryId, eventId.
 */
export async function getSquadState(
  prisma: PrismaClient,
  params: { leagueId: number; entryId: number; eventId: number }
): Promise<SquadState | null> {
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

  if (!snapshot || snapshot.picks.length === 0) {
    return null;
  }

  const playerIds = snapshot.picks.map((pick: { playerId: number }) => pick.playerId);
  const players = await prisma.fplPlayer.findMany({
    where: { id: { in: playerIds } },
    select: { id: true, teamId: true, positionId: true, nowCost: true },
  });

  type PlayerRow = (typeof players)[number];
  const playerMap = new Map(players.map((p: PlayerRow) => [p.id, p]));

  const squadPlayers = snapshot.picks
    .map((pick: { playerId: number }) => {
      const p = playerMap.get(pick.playerId);
      if (!p) return null;
      return {
        playerId: p.id,
        teamId: p.teamId,
        positionId: p.positionId,
        nowCost: p.nowCost,
      };
    })
    .filter((p: SquadState["players"][number] | null): p is SquadState["players"][number] => p !== null);

  if (squadPlayers.length !== snapshot.picks.length) {
    return null;
  }

  return {
    entryId: params.entryId,
    leagueId: params.leagueId,
    eventId: params.eventId,
    bank: snapshot.bank,
    players: squadPlayers,
  };
}

/**
 * Generates legal single-transfer candidates (OUT → IN, same position) for a rival entry
 * for the given gameweek. Uses current nowCost for both sell and buy (v1 approximation;
 * per-entry purchase/sell price is not reliably available from the public API).
 */
export async function generateTransferCandidates(
  prisma: PrismaClient,
  params: { leagueId: number; entryId: number; eventId: number }
): Promise<{
  candidates: TransferCandidate[];
  diagnostics: CandidateDiagnostics;
}> {
  const squad = await getSquadState(prisma, params);
  const diagnostics = createEmptyDiagnostics(0);

  if (!squad) {
    return { candidates: [], diagnostics };
  }

  const positionIds = [...new Set(squad.players.map((p) => p.positionId))];
  const allPlayersByPosition = await prisma.fplPlayer.findMany({
    where: {
      positionId: { in: positionIds },
      status: { not: "u" },
    },
    select: { id: true, teamId: true, positionId: true, nowCost: true },
  });

  const playersByPositionMap = new Map<number, PlayerReference[]>();
  for (const p of allPlayersByPosition) {
    const list = playersByPositionMap.get(p.positionId) ?? [];
    list.push(p);
    playersByPositionMap.set(p.positionId, list);
  }

  const { candidates, diagnostics: innerDiag } = generateCandidatesFromSquadState(
    squad,
    playersByPositionMap
  );

  diagnostics.squadPlayersCount = innerDiag.squadPlayersCount;
  diagnostics.totalOutInPairsConsidered = innerDiag.totalOutInPairsConsidered;
  diagnostics.filteredByBudget = innerDiag.filteredByBudget;
  diagnostics.filteredByAlreadyOwned = innerDiag.filteredByAlreadyOwned;
  diagnostics.filteredByTeamLimit = innerDiag.filteredByTeamLimit;
  diagnostics.legalCandidatesCount = innerDiag.legalCandidatesCount;

  return { candidates, diagnostics };
}

/**
 * Pure candidate generation from an in-memory squad state and players by position.
 * Used by generateTransferCandidates and by unit tests.
 */
export function generateCandidatesFromSquadState(
  squad: SquadState,
  playersByPosition: Map<number, PlayerReference[]>
): { candidates: TransferCandidate[]; diagnostics: CandidateDiagnostics } {
  const diagnostics = createEmptyDiagnostics(squad.players.length);

  const squadPlayerIds = new Set(squad.players.map((p) => p.playerId));
  const bankValue = squad.bank ?? 0;

  const candidates: TransferCandidate[] = [];

  for (const outPlayer of squad.players) {
    const samePositionPlayers = playersByPosition.get(outPlayer.positionId) ?? [];

    for (const inPlayer of samePositionPlayers) {
      if (inPlayer.id === outPlayer.playerId) continue;

      const alreadyOwned = squadPlayerIds.has(inPlayer.id);
      const positionOk = outPlayer.positionId === inPlayer.positionId;

      const estimatedSellPrice = outPlayer.nowCost;
      const buyPrice = inPlayer.nowCost;
      const estimatedCostDelta = buyPrice - estimatedSellPrice;
      const resultingBank = bankValue + estimatedSellPrice - buyPrice;
      const budgetOk = bankValue + estimatedSellPrice >= buyPrice;

      const countInTeamAfterSwap = countTeamInSquad(
        squad.players,
        inPlayer.teamId,
        outPlayer.playerId
      );
      const teamLimitOk = countInTeamAfterSwap + 1 <= MAX_PLAYERS_PER_TEAM;

      diagnostics.totalOutInPairsConsidered += 1;

      if (!budgetOk) {
        diagnostics.filteredByBudget += 1;
      }
      if (alreadyOwned) {
        diagnostics.filteredByAlreadyOwned += 1;
      }
      if (!teamLimitOk) {
        diagnostics.filteredByTeamLimit += 1;
      }

      const legal =
        budgetOk && !alreadyOwned && teamLimitOk && positionOk;

      if (legal) {
        candidates.push({
          outPlayerId: outPlayer.playerId,
          inPlayerId: inPlayer.id,
          outTeamId: outPlayer.teamId,
          inTeamId: inPlayer.teamId,
          positionId: outPlayer.positionId,
          estimatedSellPrice,
          buyPrice,
          estimatedCostDelta,
          resultingBank,
          checks: {
            budgetOk,
            alreadyOwned,
            teamLimitOk,
            positionOk,
          },
        });
      }
    }
  }

  diagnostics.legalCandidatesCount = candidates.length;

  return { candidates, diagnostics };
}
