export const TRANSFER_PREDICTION = {
  MAX_RESULTS: 50,
  MIN_SELL_SCORE: 15, // ignore near-never sells to cut noise
  MIN_BUY_SCORE: 15, // ignore weak buys
  W_SELL: 0.55,
  W_BUY: 0.45,
  BUDGET_UNKNOWN_PENALTY: 5, // slight penalty when bank is null
  BIG_SPEND_PENALTY_THRESHOLD: 30, // £3.0m in tenths
  BIG_SPEND_PENALTY: 10,
  SOFTMAX_TEMPERATURE: 15,
} as const;
