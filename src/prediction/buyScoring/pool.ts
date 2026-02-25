import { prisma } from "../../lib/prisma";
import { BUY_SCORE } from "./constants";
import type { BuyPoolPlayer, LoadBuyPoolParams } from "./types";

/**
 * Loads candidate pool for buy scoring: players not owned, ordered by selectedByPercent
 * descending (nulls last), limited for performance.
 */
export async function loadBuyPool(
  params: LoadBuyPoolParams
): Promise<BuyPoolPlayer[]> {
  const { ownedPlayerIds, limit = BUY_SCORE.MOMENTUM_POOL_LIMIT } = params;

  const excludeIds = ownedPlayerIds.size > 0 ? [...ownedPlayerIds] : [];

  const players = await prisma.fplPlayer.findMany({
    where:
      excludeIds.length > 0
        ? { id: { notIn: excludeIds } }
        : undefined,
    orderBy: { transfersInEvent: "desc" },
    take: limit,
    select: {
      id: true,
      teamId: true,
      positionId: true,
      nowCost: true,
      status: true,
      news: true,
      selectedByPercent: true,
      webName: true,
      transfersInEvent: true,
    },
  });

  return players;
}
