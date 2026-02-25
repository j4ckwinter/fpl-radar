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
 * m = log(1+value) / log(1+p95), clamped to [0, 1].
 * When p95 is 0, returns value > 0 ? 1 : 0.
 */
export function normaliseMomentum(params: {
  value: number;
  p95: number;
}): number {
  const { value, p95 } = params;
  if (value <= 0) return 0;
  if (p95 <= 0) return 1;
  const m = Math.log(1 + value) / Math.log(1 + p95);
  return Math.max(0, Math.min(1, m));
}
