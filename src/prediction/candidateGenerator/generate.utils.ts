import type { SquadState, TransferCandidate } from "../types";
import { MAX_PLAYERS_PER_TEAM } from "./constants";
import type {
  GenerateCandidatesOptions,
  GenerateCandidatesResult,
  PlayerRow,
} from "./types";

/**
 * Pure candidate generation from squad and in-pool by position. Used by
 * generateSingleTransferCandidates after loading in-pool from DB; exported for tests.
 */
export function generateCandidatesFromSquadAndPool(
  squad: SquadState,
  inPoolByPosition: Map<number, PlayerRow[]>,
  maxCandidates: number,
  options: GenerateCandidatesOptions = {}
): GenerateCandidatesResult {
  const ownedPlayerIds = new Set(squad.players.map((p) => p.playerId));
  const teamCounts = new Map<number, number>();
  for (const p of squad.players) {
    teamCounts.set(p.teamId, (teamCounts.get(p.teamId) ?? 0) + 1);
  }

  const inPool = Array.from(inPoolByPosition.values()).reduce(
    (sum, list) => sum + list.length,
    0
  );

  const stats = {
    outPlayers: squad.players.length,
    inPool,
    generated: 0,
    filteredBudget: 0,
    filteredOwned: 0,
    filteredTeamLimit: 0,
    filteredPosition: 0,
    truncated: false,
    inPoolPerPositionLimit: options.perPositionLimit ?? 0,
    inPoolSizeByPosition: options.inPoolSizeByPosition ?? {},
    inPoolSizeByPositionBeforeLimit: options.inPoolSizeByPositionBeforeLimit ?? {},
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
