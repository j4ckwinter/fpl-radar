import { isTransferPrediction } from "../../prediction";
import type { EntryPrediction } from "../../prediction";
import type { TransferBundle, TransferBundleScenario } from "../../prediction";
import type {
  EntryPredictionDisplay,
  PredictionPlayerDisplay,
  ScenarioBundleDisplay,
  ScenarioDisplay,
} from "./getEntryPredictions.types";

/** Round score for API output (1 decimal to avoid float noise). */
export function roundScore(x: number): number {
  return Math.round(x * 10) / 10;
}

/**
 * Round probability for API output (6 decimal places so small-but-nonzero values
 * are not rounded to 0). Do not use for scores.
 */
export function roundProbability(x: number): number {
  return Math.round(x * 1e6) / 1e6;
}

/**
 * Order for consistent reason display: 0=Sell, 1=Buy, 2=Fixture, 3=League, 4=Misc.
 */
function reasonDisplayOrder(r: string): number {
  const lower = r.toLowerCase();
  if (lower.includes("high transfers out") || (lower.includes("transfer") && lower.includes("out"))) return 0;
  if (lower.includes("high transfers in") || (lower.includes("transfer") && lower.includes("in"))) return 1;
  if (lower.includes("fixture") || lower.includes("favour") || lower.includes("difficult") || lower.includes("upgrade")) return 2;
  if (lower.includes("league") || lower.includes("owned") || lower.includes("consideration") || lower.includes("template") || lower.includes("differential")) return 3;
  return 4;
}

/** Sort reasons for consistent UX: sell → buy → fixture → league → misc. */
function sortReasonsForDisplay(reasons: string[]): string[] {
  return [...reasons].sort((a, b) => reasonDisplayOrder(a) - reasonDisplayOrder(b));
}

/**
 * Build cache key for entry predictions (league, entry, event, limit, risk, includeScenarios, includeComponents).
 */
export function predictionsCacheKey(
  leagueId: number,
  entryId: number,
  eventId: number,
  limit: number,
  riskProfile: string,
  includeScenarios: boolean,
  includeComponents: boolean
): string {
  return `predictions:league:${leagueId}:entry:${entryId}:event:${eventId}:limit:${limit}:risk:${riskProfile}:scenarios:${includeScenarios}:components:${includeComponents}`;
}

/**
 * Map raw predictions to display shape using a player lookup map.
 * Transfer predictions require both OUT and IN in playerMap; NO_TRANSFER is passed through.
 */
export function mapPredictionsToDisplay(
  predictions: EntryPrediction[],
  playerMap: Map<number, PredictionPlayerDisplay>
): EntryPredictionDisplay[] {
  return predictions.map((p) => {
    if (!isTransferPrediction(p)) {
      return {
        type: "NO_TRANSFER" as const,
        score: roundScore(p.score),
        probability: roundProbability(p.probability),
        reasons: sortReasonsForDisplay(p.reasons),
      };
    }
    const out = playerMap.get(p.outPlayerId);
    const inPlayer = playerMap.get(p.inPlayerId);
    if (!out || !inPlayer) {
      throw new Error(
        `Missing player data for out=${p.outPlayerId} in=${p.inPlayerId}`
      );
    }
    return {
      type: "transfer" as const,
      out: {
        playerId: out.playerId,
        webName: out.webName,
        team: { id: out.team.id, shortName: out.team.shortName },
        position: { id: out.position.id, shortName: out.position.shortName },
        nowCost: out.nowCost,
      },
      in: {
        playerId: inPlayer.playerId,
        webName: inPlayer.webName,
        team: {
          id: inPlayer.team.id,
          shortName: inPlayer.team.shortName,
        },
        position: {
          id: inPlayer.position.id,
          shortName: inPlayer.position.shortName,
        },
        nowCost: inPlayer.nowCost,
      },
      score: roundScore(p.score),
      probability: roundProbability(p.probability),
      estimatedCostDelta: p.features.estimatedCostDelta,
      resultingBank: p.features.resultingBank,
      reasons: sortReasonsForDisplay(p.reasons),
    };
  });
}

/**
 * Softmax over scores (temperature 1) so probabilities sum to 1.
 */
function softmax(scores: number[]): number[] {
  const max = Math.max(...scores);
  const exp = scores.map((s) => Math.exp(s - max));
  const sum = exp.reduce((a, b) => a + b, 0);
  return exp.map((e) => e / sum);
}

/**
 * Map raw scenarios to display shape: enrich bundles with player summaries, round scores,
 * add per-scenario bundle probabilities, optionally include components.
 */
export function mapScenariosToDisplay(
  scenarios: TransferBundleScenario[],
  playerMap: Map<number, PredictionPlayerDisplay>,
  includeComponents: boolean
): ScenarioDisplay[] {
  return scenarios.map((scenario) => {
    const scores = scenario.bundles.map((b) => b.score);
    const probabilities = softmax(scores);
    const bundles: ScenarioBundleDisplay[] = scenario.bundles.map((b, i) =>
      mapBundleToDisplay(scenario.k, b, playerMap, includeComponents, probabilities[i])
    );
    return { k: scenario.k, bundles };
  });
}

function mapBundleToDisplay(
  k: 1 | 2 | 3,
  bundle: TransferBundle,
  playerMap: Map<number, PredictionPlayerDisplay>,
  includeComponents: boolean,
  probability: number
): ScenarioBundleDisplay {
  const outs = bundle.outs.map((id) => {
    const p = playerMap.get(id);
    if (!p) throw new Error(`Missing player data for out=${id}`);
    return p;
  });
  const ins = bundle.ins.map((id) => {
    const p = playerMap.get(id);
    if (!p) throw new Error(`Missing player data for in=${id}`);
    return p;
  });
  const sortedOuts = [...bundle.outs].sort((a, b) => a - b);
  const sortedIns = [...bundle.ins].sort((a, b) => a - b);
  const bundleId = `k:${k}|out:${sortedOuts.join(",")}|in:${sortedIns.join(",")}`;
  const display: ScenarioBundleDisplay = {
    bundleId,
    outs,
    ins,
    score: roundScore(bundle.score),
    probability: roundProbability(probability),
    reasons: sortReasonsForDisplay(bundle.reasons),
    flags: bundle.flags,
  };
  if (includeComponents && bundle.components) {
    display.components = bundle.components.map((c) => ({
      outPlayerId: c.outPlayerId,
      inPlayerId: c.inPlayerId,
      score: roundScore(c.score),
      reasons: c.reasons,
    }));
  }
  return display;
}
