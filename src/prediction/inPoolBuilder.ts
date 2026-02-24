import { prisma } from "../lib/prisma";
import { DEFAULT_IN_POOL_PER_POSITION } from "./constants";

export interface InPoolPlayer {
  playerId: number;
  teamId: number;
  positionId: number;
  nowCost: number;
  selectedByPercent: number | null;
  status: string;
}

export interface BuildInPoolByPositionParams {
  ownedPlayerIds: Set<number>;
  positionIds: number[];
  perPositionLimit?: number;
}

export interface BuildInPoolByPositionResult {
  inPoolByPosition: Map<number, InPoolPlayer[]>;
  sizeByPositionBeforeLimit: Record<number, number>;
}

/**
 * Builds a narrowed IN pool per position: same positions as squad, excludes owned,
 * sorted by selectedByPercent descending (nulls as -1), limited to perPositionLimit per position.
 * Status filtering is permissive; we only exclude status === "u" (unavailable).
 * TODO: Revisit status filtering if FPL adds other clear unavailable codes.
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
      status: { not: "u" },
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

  const sizeByPositionBeforeLimit: Record<number, number> = {};

  for (const [positionId, list] of byPosition.entries()) {
    const sorted = [...list].sort((a, b) => {
      const aVal = a.selectedByPercent ?? -1;
      const bVal = b.selectedByPercent ?? -1;
      return bVal - aVal;
    });
    sizeByPositionBeforeLimit[positionId] = sorted.length;
    byPosition.set(positionId, sorted.slice(0, perPositionLimit));
  }

  return { inPoolByPosition: byPosition, sizeByPositionBeforeLimit };
}
