import type { ScoredEdge } from "../types";
import { REASONS_PER_EDGE, MAX_BUNDLE_REASONS } from "../constants";

/** Priority for deterministic reason order: momentum (0), fixtures (1), league (2), availability (3). */
function reasonPriority(r: string): number {
  const lower = r.toLowerCase();
  if (lower.includes("transfer") && (lower.includes("in") || lower.includes("out"))) return 0;
  if (lower.includes("fixture") || lower.includes("favour") || lower.includes("difficult") || lower.includes("upgrade")) return 1;
  if (lower.includes("league") || lower.includes("owned") || lower.includes("consideration") || lower.includes("template") || lower.includes("differential")) return 2;
  return 3;
}

function isBuySideReason(r: string): boolean {
  const lower = r.toLowerCase();
  return (lower.includes("transfer") && lower.includes("in")) || lower.includes("high transfers in");
}

function isFixtureReason(r: string): boolean {
  const lower = r.toLowerCase();
  return lower.includes("fixture") || lower.includes("favour") || lower.includes("difficult") || lower.includes("upgrade");
}

/**
 * Aggregate bundle reasons: ensure at least one buy-side and one fixture reason when any
 * component has them, then fill by priority; de-dupe and cap at MAX_BUNDLE_REASONS.
 */
export function aggregateBundleReasons(edges: ScoredEdge[]): string[] {
  const withPriority: Array<{ r: string; p: number; order: number }> = [];
  let order = 0;
  for (const e of edges) {
    const take = e.reasons.slice(0, REASONS_PER_EDGE);
    for (const r of take) {
      withPriority.push({ r, p: reasonPriority(r), order: order++ });
    }
  }
  const hasBuy = withPriority.some((x) => isBuySideReason(x.r));
  const hasFixture = withPriority.some((x) => isFixtureReason(x.r));
  withPriority.sort((a, b) => (a.p !== b.p ? a.p - b.p : a.order - b.order));
  const seen = new Set<string>();
  const out: string[] = [];

  function addIfNew(r: string): boolean {
    if (seen.has(r)) return false;
    seen.add(r);
    out.push(r);
    return true;
  }

  if (hasBuy) {
    const buy = withPriority.find((x) => isBuySideReason(x.r));
    if (buy && addIfNew(buy.r) && out.length >= MAX_BUNDLE_REASONS) return out;
  }
  if (hasFixture) {
    const fixture = withPriority.find((x) => isFixtureReason(x.r));
    if (fixture && addIfNew(fixture.r) && out.length >= MAX_BUNDLE_REASONS) return out;
  }
  for (const { r } of withPriority) {
    if (addIfNew(r) && out.length >= MAX_BUNDLE_REASONS) return out;
  }
  return out;
}
