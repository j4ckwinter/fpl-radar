/**
 * Returns the value at the p-th percentile (0..100) of the sorted array.
 * Empty array returns 0.
 */
export function percentile(values: number[], p: number): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.min(
    Math.max(0, Math.ceil((p / 100) * values.length) - 1),
    sorted.length - 1
  );
  return sorted[index];
}

/**
 * Normalises transfer momentum (transfers in/out this GW) to 0..1 using a log scale.
 * m = log(1+value) / log(1+cap), clamped to [0, 1].
 * Optional shapePower (default 1.0): applied as m^shapePower to reduce saturation at 1.0.
 * When cap is 0 or invalid, uses fallback divisor to avoid divide-by-zero.
 */
export function normaliseMomentum(params: {
  value: number;
  /** Cap value (e.g. p99 of transfers); used as divisor in log normalisation. */
  cap: number;
  shapePower?: number;
}): number {
  const { value, cap, shapePower = 1 } = params;
  if (value <= 0) return 0;
  const divisor = cap > 0 ? cap : 1;
  let m = Math.log(1 + value) / Math.log(1 + divisor);
  m = Math.max(0, Math.min(1, m));
  if (shapePower !== 1 && shapePower > 0) {
    m = Math.pow(m, shapePower);
  }
  return Math.max(0, Math.min(1, m));
}
