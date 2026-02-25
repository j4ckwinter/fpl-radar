import { loadSquadState } from "../squadLoader";
import { generateSingleTransferCandidates } from "../candidateGenerator";
import { scoreSellCandidates } from "../sellScoring";
import { scoreBuyCandidates, loadBuyPool } from "../buyScoring";
import {
  DIVERSITY,
  TRANSFER_PREDICTION,
  PREDICTION_BUY_POOL_LIMIT,
  NO_TRANSFER_REASONS,
  NO_TRANSFER_SCORE_THRESHOLD,
  WEAK_LINK_PENALTY,
  WEAK_LINK_THRESHOLD,
  SCORE_MAX,
} from "./constants";
import { diversifyPredictions } from "./diversify";
import { clampScore, buildReasons, softmaxProbabilities } from "./predict.utils";
import type {
  PredictTransfersForEntryParams,
  TransferPrediction,
  NoTransferPrediction,
} from "./types";

export async function predictTransfersForEntry(
  params: PredictTransfersForEntryParams
): Promise<{
  predictions: (TransferPrediction | NoTransferPrediction)[];
  meta?: { droppedForDiversity: number };
}> {
  const {
    leagueId,
    entryId,
    eventId,
    maxResults = DIVERSITY.MAX_RESULTS,
    riskProfile,
  } = params;

  const squad = await loadSquadState({ leagueId, entryId, eventId });
  const ownedPlayerIds = new Set(squad.players.map((p) => p.playerId));
  const buyPool = await loadBuyPool({
    ownedPlayerIds,
    limit: PREDICTION_BUY_POOL_LIMIT,
  });
  const allowedInPlayerIds = new Set(buyPool.map((p) => p.id));

  const [sellResult, buyResult, candidatesResult] = await Promise.all([
    scoreSellCandidates({ leagueId, entryId, eventId, riskProfile }),
    scoreBuyCandidates({
      leagueId,
      entryId,
      eventId,
      limit: PREDICTION_BUY_POOL_LIMIT,
      riskProfile,
    }),
    generateSingleTransferCandidates({
      squad,
      maxCandidates: 2000,
      allowedInPlayerIds,
    }),
  ]);

  const sellByPlayerId = new Map(
    sellResult.scores.map((s) => [s.playerId, s])
  );
  const buyByPlayerId = new Map(
    buyResult.scores.map((s) => [s.playerId, s])
  );

  const candidates = candidatesResult.candidates;
  const bank = squad.bank;

  function filterCandidates(
    minBuyScore: number,
    minSellScore: number = TRANSFER_PREDICTION.MIN_SELL_SCORE
  ): TransferPrediction[] {
    const out: Array<{
      pred: TransferPrediction;
      rawScore: number;
    }> = [];

    for (const c of candidates) {
      const sellScore = sellByPlayerId.get(c.outPlayerId)?.sellScore ?? 0;
      const buyScore = buyByPlayerId.get(c.inPlayerId)?.buyScore ?? 0;

      if (sellScore < minSellScore) continue;
      if (buyScore < minBuyScore) continue;
      if (!c.checks.budgetOk && bank !== null) continue;
      if (!c.checks.teamLimitOk) continue;
      if (!c.checks.positionOk) continue;

      const bankUnknown = c.resultingBank === null;
      const bigSpend =
        c.estimatedCostDelta > TRANSFER_PREDICTION.BIG_SPEND_PENALTY_THRESHOLD;

      let rawScore =
        TRANSFER_PREDICTION.W_SELL * sellScore +
        TRANSFER_PREDICTION.W_BUY * buyScore;
      if (bankUnknown) rawScore -= TRANSFER_PREDICTION.BUDGET_UNKNOWN_PENALTY;
      if (bigSpend) rawScore -= TRANSFER_PREDICTION.BIG_SPEND_PENALTY;

      const weakLink = Math.min(sellScore, buyScore);
      if (weakLink < WEAK_LINK_THRESHOLD) {
        rawScore -= WEAK_LINK_PENALTY;
      }

      const sellReasons = sellByPlayerId.get(c.outPlayerId)?.reasons ?? [];
      const buyReasons = buyByPlayerId.get(c.inPlayerId)?.reasons ?? [];
      const reasons = buildReasons(
        sellReasons,
        buyReasons,
        bankUnknown,
        bigSpend
      );

      out.push({
        pred: {
          outPlayerId: c.outPlayerId,
          inPlayerId: c.inPlayerId,
          score: clampScore(rawScore),
          probability: 0,
          reasons,
          features: {
            sellScore,
            buyScore,
            estimatedCostDelta: c.estimatedCostDelta,
            resultingBank: c.resultingBank,
            budgetOk: c.checks.budgetOk,
            teamLimitOk: c.checks.teamLimitOk,
            positionOk: c.checks.positionOk,
          },
        },
        rawScore: clampScore(rawScore),
      });
    }

    out.sort((a, b) => b.rawScore - a.rawScore);
    return out.slice(0, TRANSFER_PREDICTION.MAX_RESULTS).map((o) => o.pred);
  }

  let sorted = filterCandidates(
    TRANSFER_PREDICTION.MIN_BUY_SCORE,
    TRANSFER_PREDICTION.MIN_SELL_SCORE
  );
  if (sorted.length === 0 && candidates.length > 0) {
    sorted = filterCandidates(
      TRANSFER_PREDICTION.MIN_BUY_SCORE,
      0
    );
  }
  if (sorted.length === 0 && candidates.length > 0) {
    sorted = filterCandidates(
      Math.floor(TRANSFER_PREDICTION.MIN_BUY_SCORE / 2),
      0
    );
  }

  const topScore = sorted.length > 0 ? sorted[0].score : 0;
  const willAddNoTransfer = buildNoTransferIfNeeded(null, topScore) !== null;
  const diversityLimit = willAddNoTransfer ? Math.max(1, maxResults - 1) : maxResults;

  const { selected, dropped } = diversifyPredictions({
    predictions: sorted,
    maxResults: diversityLimit,
    maxPerInPlayer: DIVERSITY.MAX_PER_IN_PLAYER,
    maxPerOutPlayer: DIVERSITY.MAX_PER_OUT_PLAYER,
  });

  const noTransfer = buildNoTransferIfNeeded(selected, topScore);

  const fullList: (TransferPrediction | NoTransferPrediction)[] = noTransfer
    ? [noTransfer, ...selected]
    : [...selected];

  const scores = fullList.map((p) => p.score);
  const probs = softmaxProbabilities(
    scores,
    TRANSFER_PREDICTION.SOFTMAX_TEMPERATURE
  );
  fullList.forEach((p, i) => {
    p.probability = probs[i];
  });

  return {
    predictions: fullList,
    ...(dropped > 0 && { meta: { droppedForDiversity: dropped } }),
  };
}

function buildNoTransferIfNeeded(
  selected: TransferPrediction[] | null,
  topScore: number
): NoTransferPrediction | null {
  if (selected !== null && selected.length === 0) return null;
  if (topScore >= NO_TRANSFER_SCORE_THRESHOLD) return null;

  const reasons: string[] = [NO_TRANSFER_REASONS.LOW_TOP_SCORE];
  const noTransferScore = Math.min(topScore + 5, SCORE_MAX);

  return {
    type: "NO_TRANSFER",
    score: noTransferScore,
    probability: 0,
    reasons,
  };
}
