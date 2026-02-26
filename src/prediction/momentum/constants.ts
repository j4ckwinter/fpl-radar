/**
 * Momentum normalisation config. Higher percentile = fewer players saturate at 1.0.
 */

/** Percentile (0..100) used as cap for log normalisation. p99 reduces saturation vs p95. */
export const MOMENTUM_CAP_PERCENTILE = 99;

/**
 * Power applied to momentum01 to increase separation at the high end.
 * 1.0 = no change. 1.2–1.5 pushes values below 1 down so only the very top stay at 1.0.
 */
export const MOMENTUM_SHAPE_POWER = 1.2;
