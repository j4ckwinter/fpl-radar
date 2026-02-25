import { prisma } from "../../lib/prisma";
import { percentile } from "./normalise";

let cached: { inP95: number; outP95: number } | null = null;

/**
 * Loads 95th percentile of transfersInEvent and transfersOutEvent across all players.
 * Cached in-process for the request lifetime (module-level).
 */
export async function loadMomentumP95(): Promise<{
  inP95: number;
  outP95: number;
}> {
  if (cached !== null) return cached;

  const players = await prisma.fplPlayer.findMany({
    select: { transfersInEvent: true, transfersOutEvent: true },
  });

  const inValues = players.map((p) => p.transfersInEvent);
  const outValues = players.map((p) => p.transfersOutEvent);

  cached = {
    inP95: percentile(inValues, 95),
    outP95: percentile(outValues, 95),
  };

  return cached;
}
