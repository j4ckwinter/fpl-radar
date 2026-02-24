import { prisma } from "../../lib/prisma";
import { DEFAULT_IN_POOL_PER_POSITION } from "../constants";
import { processGroupedPool } from "./build.utils";
import { STATUS_UNAVAILABLE } from "./constants";
import type {
  BuildInPoolByPositionParams,
  BuildInPoolByPositionResult,
  InPoolPlayer,
} from "./types";

/**
 * Builds a narrowed IN pool per position: same positions as squad, excludes owned,
 * sorted by selectedByPercent descending (nulls last), limited to perPositionLimit per position.
 * Status filtering is permissive; we only exclude STATUS_UNAVAILABLE ("u").
 */
export async function buildInPoolByPosition(
  params: BuildInPoolByPositionParams
): Promise<BuildInPoolByPositionResult> {
  const {
    ownedPlayerIds,
    positionIds,
    perPositionLimit = DEFAULT_IN_POOL_PER_POSITION,
  } = params;

  if (positionIds.length === 0) {
    return { inPoolByPosition: new Map(), sizeByPositionBeforeLimit: {} };
  }

  const rows = await prisma.fplPlayer.findMany({
    where: {
      positionId: { in: positionIds },
      status: { not: STATUS_UNAVAILABLE },
    },
    select: {
      id: true,
      teamId: true,
      positionId: true,
      nowCost: true,
      selectedByPercent: true,
      status: true,
    },
  });

  const byPosition = new Map<number, InPoolPlayer[]>();

  for (const p of rows) {
    if (ownedPlayerIds.has(p.id)) continue;
    const player: InPoolPlayer = {
      playerId: p.id,
      teamId: p.teamId,
      positionId: p.positionId,
      nowCost: p.nowCost,
      selectedByPercent: p.selectedByPercent,
      status: p.status,
    };
    const list = byPosition.get(p.positionId) ?? [];
    list.push(player);
    byPosition.set(p.positionId, list);
  }

  return processGroupedPool(byPosition, perPositionLimit);
}
