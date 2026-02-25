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
 * Greedy diversity filter: from score-ordered predictions, selects up to maxResults
 * while capping how often the same inPlayerId or outPlayerId appears.
 * Deterministic: same input → same output.
 *
 * If the first pass produces too few results (< maxResults / 2), a second pass
 * relaxes caps by +1 and refills from the remaining items so we don't return
 * very few results when the pool is small.
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

  const selected = selectWithCaps(
    predictions,
    maxResults,
    maxPerInPlayer,
    maxPerOutPlayer
  );

  const minAcceptable = Math.floor(maxResults / 2);
  if (selected.length < minAcceptable && selected.length < predictions.length) {
    const remaining = predictions.filter(
      (p) =>
        !selected.some(
          (s) => s.outPlayerId === p.outPlayerId && s.inPlayerId === p.inPlayerId
        )
    );
    const relaxed = selectWithCaps(
      remaining,
      maxResults - selected.length,
      maxPerInPlayer + 1,
      maxPerOutPlayer + 1
    );
    for (const p of relaxed) {
      if (selected.length >= maxResults) break;
      selected.push(p);
    }
  }

  return {
    selected,
    dropped: predictions.length - selected.length,
  };
}

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
