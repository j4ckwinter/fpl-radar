import type { SquadState } from "../types";
import { DEFAULT_MAX_CANDIDATES, DEFAULT_IN_POOL_PER_POSITION } from "../constants";
import { buildInPoolByPosition } from "../inPoolBuilder";
import type { InPoolPlayer } from "../inPoolBuilder";
import { generateCandidatesFromSquadAndPool } from "./generate.utils";
import type { GenerateCandidatesResult, GenerateSingleTransferCandidatesParams, PlayerRow } from "./types";

function inPoolToPlayerRows(inPoolByPosition: Map<number, InPoolPlayer[]>): Map<number, PlayerRow[]> {
  const map = new Map<number, PlayerRow[]>();
  for (const [positionId, list] of inPoolByPosition.entries()) {
    map.set(
      positionId,
      list.map((p) => ({
        id: p.playerId,
        teamId: p.teamId,
        positionId: p.positionId,
        nowCost: p.nowCost,
      }))
    );
  }
  return map;
}

/**
 * Generates legal single-transfer candidates (OUT → IN, same position) for a given squad.
 * Uses a narrowed IN pool (by selectedByPercent, limited per position), then applies
 * budget, team limit, and position checks. Stops after maxCandidates and sets stats.truncated when hit.
 */
export async function generateSingleTransferCandidates(
  params: GenerateSingleTransferCandidatesParams
): Promise<GenerateCandidatesResult> {
  const {
    squad,
    maxCandidates = DEFAULT_MAX_CANDIDATES,
    perPositionInPoolLimit = DEFAULT_IN_POOL_PER_POSITION,
  } = params;

  const ownedPlayerIds = new Set(squad.players.map((p) => p.playerId));
  const positionIds = [...new Set(squad.players.map((p) => p.positionId))];

  const { inPoolByPosition, sizeByPositionBeforeLimit } = await buildInPoolByPosition({
    ownedPlayerIds,
    positionIds,
    perPositionLimit: perPositionInPoolLimit,
  });

  const inPoolSizeByPosition: Record<number, number> = {};
  for (const [positionId, list] of inPoolByPosition.entries()) {
    inPoolSizeByPosition[positionId] = list.length;
  }

  const playerRowMap = inPoolToPlayerRows(inPoolByPosition);

  return generateCandidatesFromSquadAndPool(squad, playerRowMap, maxCandidates, {
    perPositionLimit: perPositionInPoolLimit,
    inPoolSizeByPosition,
    inPoolSizeByPositionBeforeLimit: sizeByPositionBeforeLimit,
  });
}
