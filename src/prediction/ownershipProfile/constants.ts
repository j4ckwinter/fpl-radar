/** Below this league size we use count-based thresholds; above we use fraction. */
export const SMALL_LEAGUE_MAX_ENTRIES = 8;

/** Minimum number of rivals that must own a player to count as "high ownership" in small leagues. */
export const HIGH_OWNERSHIP_MIN_COUNT = 6;

/** Fraction threshold for "high ownership" when league is large enough (0..1). */
export const HIGH_OWNERSHIP_FRACTION = 0.6;

/** Fraction threshold for "low ownership" / differential when league is large enough (0..1). */
export const LOW_OWNERSHIP_FRACTION = 0.2;

/** Risky buy: momentum or fixture score above this to apply full differential bonus. */
export const RISKY_CONVICTION_MOMENTUM_THRESHOLD = 0.5;

/** Risky buy: fixture01 above this to apply full differential bonus. */
export const RISKY_CONVICTION_FIXTURE_THRESHOLD = 0.5;

/** When conviction is low, risky ownership term is scaled by this (0..1). */
export const RISKY_LOW_CONVICTION_OWNERSHIP_SCALE = 0.25;
