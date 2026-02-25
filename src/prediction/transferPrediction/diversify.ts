import type { TransferPrediction } from "./types";

export interface DiversifyPredictionsParams {
  /** Predictions already sorted by score descending. */
  predictions: TransferPrediction[];
  maxResults: number;
  maxPerInPlayer: number;
  maxPerOutPlayer: number;
}

export interface DiversifyPredictionsResult {
  selected: TransferPrediction[];
  dropped: number;
}

/**
 * Diversity filter: score-respecting selection with caps.
 * Iterates in score-desc order; selects only when IN/OUT caps allow.
 * If too few results, relaxes caps and refills from remaining, then re-sorts by score.
 * Deterministic: same input → same output.
 */
export function diversifyPredictions(
  params: DiversifyPredictionsParams
): DiversifyPredictionsResult {
  const {
    predictions,
    maxResults,
    maxPerInPlayer,
    maxPerOutPlayer,
  } = params;

  if (predictions.length === 0) {
    return { selected: [], dropped: 0 };
  }

  let selected = selectWithCaps(
    predictions,
    maxResults,
    maxPerInPlayer,
    maxPerOutPlayer
  );

  const minAcceptable = Math.floor(maxResults / 2);
  if (selected.length < minAcceptable && selected.length < predictions.length) {
    const selectedSet = new Set(
      selected.map((p) => `${p.outPlayerId}:${p.inPlayerId}`)
    );
    const remaining = predictions.filter(
      (p) => !selectedSet.has(`${p.outPlayerId}:${p.inPlayerId}`)
    );
    const relaxedOut = maxPerOutPlayer + 1;
    const relaxedIn = maxPerInPlayer + 1;
    const outCount = new Map<number, number>();
    const inCount = new Map<number, number>();
    for (const p of selected) {
      outCount.set(p.outPlayerId, (outCount.get(p.outPlayerId) ?? 0) + 1);
      inCount.set(p.inPlayerId, (inCount.get(p.inPlayerId) ?? 0) + 1);
    }
    for (const p of remaining) {
      if (selected.length >= maxResults) break;
      const outCur = outCount.get(p.outPlayerId) ?? 0;
      const inCur = inCount.get(p.inPlayerId) ?? 0;
      if (outCur < relaxedOut && inCur < relaxedIn) {
        selected.push(p);
        outCount.set(p.outPlayerId, outCur + 1);
        inCount.set(p.inPlayerId, inCur + 1);
      }
    }
    selected.sort((a, b) => b.score - a.score);
  }

  return {
    selected,
    dropped: predictions.length - selected.length,
  };
}

/**
 * Greedy score-first selection: iterate in score-desc order, select when caps allow.
 */
function selectWithCaps(
  predictions: TransferPrediction[],
  maxResults: number,
  maxPerInPlayer: number,
  maxPerOutPlayer: number
): TransferPrediction[] {
  const selected: TransferPrediction[] = [];
  const inCount = new Map<number, number>();
  const outCount = new Map<number, number>();

  for (const p of predictions) {
    if (selected.length >= maxResults) break;

    const inCur = inCount.get(p.inPlayerId) ?? 0;
    const outCur = outCount.get(p.outPlayerId) ?? 0;

    if (inCur < maxPerInPlayer && outCur < maxPerOutPlayer) {
      selected.push(p);
      inCount.set(p.inPlayerId, inCur + 1);
      outCount.set(p.outPlayerId, outCur + 1);
    }
  }

  return selected;
}
