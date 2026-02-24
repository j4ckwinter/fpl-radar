import type { SquadState } from "../types";
import type { CandidateDiagnostics } from "./types";

export function createEmptyDiagnostics(
  squadPlayersCount: number
): CandidateDiagnostics {
  return {
    squadPlayersCount,
    totalOutInPairsConsidered: 0,
    filteredByBudget: 0,
    filteredByAlreadyOwned: 0,
    filteredByTeamLimit: 0,
    legalCandidatesCount: 0,
  };
}

export function countTeamInSquad(
  players: SquadState["players"],
  teamId: number,
  excludePlayerId: number | null
): number {
  return players.filter(
    (p) => p.teamId === teamId && p.playerId !== excludePlayerId
  ).length;
}
