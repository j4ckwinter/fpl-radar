import type { TransferBundle } from "./types";
import { DIVERSITY_CAPS } from "./constants";

export interface ApplyBundleDiversityParams {
  bundles: TransferBundle[];
  maxBundlesPerOutPlayer?: number;
  maxBundlesPerInPlayer?: number;
  maxBundlesPerOutSet?: number;
}

/**
 * Apply diversity caps to the bundle list: cap how often each OUT player, IN player,
 * and identical OUT set can appear. Iterates in score order (assumed already sorted)
 * and accepts bundles while caps allow. Deterministic; re-sorts by score after filter.
 */
export function applyBundleDiversity(params: ApplyBundleDiversityParams): TransferBundle[] {
  const {
    bundles,
    maxBundlesPerOutPlayer = DIVERSITY_CAPS.maxBundlesPerOutPlayer,
    maxBundlesPerInPlayer = DIVERSITY_CAPS.maxBundlesPerInPlayer,
    maxBundlesPerOutSet = DIVERSITY_CAPS.maxBundlesPerOutSet,
  } = params;

  const outPlayerCount = new Map<number, number>();
  const inPlayerCount = new Map<number, number>();
  const outSetCount = new Map<string, number>();

  const accepted: TransferBundle[] = [];

  for (const b of bundles) {
    const outSetKey = [...b.outs].sort((a, b) => a - b).join(",");
    const outSetCurrent = outSetCount.get(outSetKey) ?? 0;
    if (outSetCurrent >= maxBundlesPerOutSet) continue;

    let overCap = false;
    for (const outId of b.outs) {
      if ((outPlayerCount.get(outId) ?? 0) >= maxBundlesPerOutPlayer) {
        overCap = true;
        break;
      }
    }
    if (overCap) continue;
    for (const inId of b.ins) {
      if ((inPlayerCount.get(inId) ?? 0) >= maxBundlesPerInPlayer) {
        overCap = true;
        break;
      }
    }
    if (overCap) continue;

    accepted.push(b);
    outSetCount.set(outSetKey, outSetCurrent + 1);
    for (const outId of b.outs) {
      outPlayerCount.set(outId, (outPlayerCount.get(outId) ?? 0) + 1);
    }
    for (const inId of b.ins) {
      inPlayerCount.set(inId, (inPlayerCount.get(inId) ?? 0) + 1);
    }
  }

  return accepted.sort((a, b) => b.score - a.score);
}
