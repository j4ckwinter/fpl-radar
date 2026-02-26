import { prisma } from "../../lib/prisma";
import { percentile } from "./normalise";
import { MOMENTUM_CAP_PERCENTILE } from "./constants";

let cached: { inP99: number; outP99: number } | null = null;

/**
 * Loads the configured percentile (default p99) of transfersInEvent and transfersOutEvent
 * for use as the momentum cap. Cached in-process for the request lifetime (module-level).
 */
export async function loadMomentumP95(): Promise<{
  inP99: number;
  outP99: number;
}> {
  if (cached !== null) return cached;

  const players = await prisma.fplPlayer.findMany({
    select: { transfersInEvent: true, transfersOutEvent: true },
  });

  const inValues = players.map((p) => p.transfersInEvent);
  const outValues = players.map((p) => p.transfersOutEvent);

  const inCapRaw = percentile(inValues, MOMENTUM_CAP_PERCENTILE);
  const outCapRaw = percentile(outValues, MOMENTUM_CAP_PERCENTILE);
  const inMax = inValues.length > 0 ? Math.max(...inValues) : 0;
  const outMax = outValues.length > 0 ? Math.max(...outValues) : 0;
  cached = {
    inP99: inCapRaw > 0 ? inCapRaw : Math.max(1, inMax),
    outP99: outCapRaw > 0 ? outCapRaw : Math.max(1, outMax),
  };

  return cached;
}
