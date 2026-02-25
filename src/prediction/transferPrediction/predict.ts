import { loadSquadState } from "../squadLoader";
import { generateSingleTransferCandidates } from "../candidateGenerator";
import { scoreSellCandidates } from "../sellScoring";
import { scoreBuyCandidates } from "../buyScoring";
import { DIVERSITY, TRANSFER_PREDICTION } from "./constants";
import { diversifyPredictions } from "./diversify";
import { clampScore, buildReasons, softmaxProbabilities } from "./predict.utils";
import type { PredictTransfersForEntryParams, TransferPrediction } from "./types";

export async function predictTransfersForEntry(
  params: PredictTransfersForEntryParams
): Promise<{
  predictions: TransferPrediction[];
  meta?: { droppedForDiversity: number };
}> {
  const {
    leagueId,
    entryId,
    eventId,
    maxResults = DIVERSITY.MAX_RESULTS,
  } = params;

  const squad = await loadSquadState({ leagueId, entryId, eventId });

  const [sellResult, buyResult, candidatesResult] = await Promise.all([
    scoreSellCandidates({ leagueId, entryId, eventId }),
    scoreBuyCandidates({ leagueId, entryId, eventId, limit: 200 }),
    generateSingleTransferCandidates({
      squad,
      maxCandidates: 2000,
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

  function filterCandidates(minBuyScore: number): TransferPrediction[] {
    const out: Array<{
      pred: TransferPrediction;
      rawScore: number;
    }> = [];

    for (const c of candidates) {
      const sellScore = sellByPlayerId.get(c.outPlayerId)?.sellScore ?? 0;
      const buyScore = buyByPlayerId.get(c.inPlayerId)?.buyScore ?? 0;

      if (sellScore < TRANSFER_PREDICTION.MIN_SELL_SCORE) continue;
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

  let sorted = filterCandidates(TRANSFER_PREDICTION.MIN_BUY_SCORE);
  if (sorted.length === 0) {
    const relaxedBuy = Math.floor(TRANSFER_PREDICTION.MIN_BUY_SCORE / 2);
    sorted = filterCandidates(relaxedBuy);
  }

  const { selected, dropped } = diversifyPredictions({
    predictions: sorted,
    maxResults,
    maxPerInPlayer: DIVERSITY.MAX_PER_IN_PLAYER,
    maxPerOutPlayer: DIVERSITY.MAX_PER_OUT_PLAYER,
  });

  const scores = selected.map((p) => p.score);
  const probs = softmaxProbabilities(
    scores,
    TRANSFER_PREDICTION.SOFTMAX_TEMPERATURE
  );
  selected.forEach((p, i) => {
    p.probability = probs[i];
  });

  return {
    predictions: selected,
    ...(dropped > 0 && { meta: { droppedForDiversity: dropped } }),
  };
}
