import { loadSquadState } from "../squadLoader";
import { generateSingleTransferCandidates } from "../candidateGenerator";
import { scoreSellCandidates } from "../sellScoring";
import { scoreBuyCandidates } from "../buyScoring";
import { TRANSFER_PREDICTION } from "./constants";
import { clampScore, buildReasons, softmaxProbabilities } from "./predict.utils";
import type { PredictTransfersForEntryParams, TransferPrediction } from "./types";

export async function predictTransfersForEntry(
  params: PredictTransfersForEntryParams
): Promise<{ predictions: TransferPrediction[] }> {
  const {
    leagueId,
    entryId,
    eventId,
    maxResults = TRANSFER_PREDICTION.MAX_RESULTS,
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
    const top = out.slice(0, maxResults).map((o) => o.pred);
    const scores = top.map((p) => p.score);
    const probs = softmaxProbabilities(
      scores,
      TRANSFER_PREDICTION.SOFTMAX_TEMPERATURE
    );
    top.forEach((p, i) => {
      p.probability = probs[i];
    });
    return top;
  }

  let predictions = filterCandidates(TRANSFER_PREDICTION.MIN_BUY_SCORE);
  if (predictions.length === 0) {
    const relaxedBuy = Math.floor(TRANSFER_PREDICTION.MIN_BUY_SCORE / 2);
    predictions = filterCandidates(relaxedBuy);
  }

  return { predictions };
}
