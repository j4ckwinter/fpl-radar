import { prisma } from "../lib/prisma";
import type { SquadState, TransferCandidate } from "./types";

const MAX_PLAYERS_PER_TEAM = 3;
const DEFAULT_MAX_CANDIDATES = 2000;

/** Minimal player shape for candidate generation (DB select). */
interface PlayerRow {
  id: number;
  teamId: number;
  positionId: number;
  nowCost: number;
}

export interface GenerateSingleTransferCandidatesParams {
  squad: SquadState;
  maxCandidates?: number;
}

export interface GenerateSingleTransferCandidatesResult {
  candidates: TransferCandidate[];
  stats: {
    outPlayers: number;
    inPool: number;
    generated: number;
    filteredBudget: number;
    filteredOwned: number;
    filteredTeamLimit: number;
    filteredPosition: number;
    truncated: boolean;
  };
}

/**
 * Builds "in pool" players by position: same-position as squad, status not unavailable,
 * excluding owned. Queries by positionId to avoid full scans.
 */
async function loadInPoolByPosition(
  positionIds: number[],
  ownedPlayerIds: Set<number>
): Promise<Map<number, PlayerRow[]>> {
  if (positionIds.length === 0) {
    return new Map();
  }

  const players = await prisma.fplPlayer.findMany({
    where: {
      positionId: { in: positionIds },
      status: { not: "u" },
    },
    select: { id: true, teamId: true, positionId: true, nowCost: true },
  });

  const byPosition = new Map<number, PlayerRow[]>();
  for (const p of players) {
    if (ownedPlayerIds.has(p.id)) continue;
    const list = byPosition.get(p.positionId) ?? [];
    list.push(p);
    byPosition.set(p.positionId, list);
  }
  return byPosition;
}

/**
 * Generates legal single-transfer candidates (OUT → IN, same position) for a given squad.
 * Loads in-pool players from DB (by position, excluding unavailable and owned), then
 * applies budget, team limit, and position checks. Stops after maxCandidates and sets
 * stats.truncated when hit.
 */
export async function generateSingleTransferCandidates(
  params: GenerateSingleTransferCandidatesParams
): Promise<GenerateSingleTransferCandidatesResult> {
  const { squad, maxCandidates = DEFAULT_MAX_CANDIDATES } = params;

  const ownedPlayerIds = new Set(squad.players.map((p) => p.playerId));
  const teamCounts = new Map<number, number>();
  for (const p of squad.players) {
    teamCounts.set(p.teamId, (teamCounts.get(p.teamId) ?? 0) + 1);
  }

  const positionIds = [...new Set(squad.players.map((p) => p.positionId))];
  const inPoolByPosition = await loadInPoolByPosition(positionIds, ownedPlayerIds);
  const inPool = Array.from(inPoolByPosition.values()).reduce((sum, list) => sum + list.length, 0);

  const stats = {
    outPlayers: squad.players.length,
    inPool,
    generated: 0,
    filteredBudget: 0,
    filteredOwned: 0,
    filteredTeamLimit: 0,
    filteredPosition: 0,
    truncated: false,
  };

  const candidates: TransferCandidate[] = [];
  const bankValue = squad.bank ?? null;

  for (const outPlayer of squad.players) {
    const samePositionInPool = inPoolByPosition.get(outPlayer.positionId) ?? [];

    for (const inPlayer of samePositionInPool) {
      if (inPlayer.id === outPlayer.playerId) continue;

      const alreadyOwned = ownedPlayerIds.has(inPlayer.id);
      const positionOk = outPlayer.positionId === inPlayer.positionId;

      const estimatedSellPrice = outPlayer.nowCost;
      const buyPrice = inPlayer.nowCost;
      const estimatedCostDelta = buyPrice - estimatedSellPrice;

      let resultingBank: number | null;
      let budgetOk: boolean;
      if (bankValue === null) {
        resultingBank = null;
        budgetOk = true;
      } else {
        resultingBank = bankValue + estimatedSellPrice - buyPrice;
        budgetOk = bankValue + estimatedSellPrice >= buyPrice;
      }

      const outTeamId = outPlayer.teamId;
      const inTeamId = inPlayer.teamId;
      const countOut = teamCounts.get(outTeamId) ?? 0;
      const countIn = teamCounts.get(inTeamId) ?? 0;
      let teamLimitOk: boolean;
      if (inTeamId === outTeamId) {
        teamLimitOk = true;
      } else {
        teamLimitOk = countIn + 1 <= MAX_PLAYERS_PER_TEAM && countOut - 1 >= 0;
      }

      if (!budgetOk) stats.filteredBudget += 1;
      if (alreadyOwned) stats.filteredOwned += 1;
      if (!teamLimitOk) stats.filteredTeamLimit += 1;
      if (!positionOk) stats.filteredPosition += 1;

      const legal = budgetOk && !alreadyOwned && teamLimitOk && positionOk;
      if (!legal) continue;

      if (candidates.length >= maxCandidates) {
        stats.truncated = true;
        stats.generated = candidates.length;
        return { candidates, stats };
      }

      candidates.push({
        outPlayerId: outPlayer.playerId,
        inPlayerId: inPlayer.id,
        outTeamId,
        inTeamId,
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

  stats.generated = candidates.length;
  return { candidates, stats };
}
