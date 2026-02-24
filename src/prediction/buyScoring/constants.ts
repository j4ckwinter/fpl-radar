export const BUY_SCORE = {
  BASE: 5,
  OWNERSHIP_BONUS_MAX: 45, // scaled by selectedByPercent
  AVAILABLE_BONUS: 15,
  FLAGGED_PENALTY: 40,
  HAS_NEWS_PENALTY: 10,
  PRICE_VERY_HIGH_PENALTY: 10, // mild penalty to avoid always picking premiums in v1
  VERY_HIGH_PRICE_THRESHOLD: 120, // £12.0m (tenths)
  TOP_POOL_LIMIT: 500, // max candidates to return for later pairing
} as const;
