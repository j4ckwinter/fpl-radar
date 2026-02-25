import { isTransferPrediction } from "../../prediction";
import type { EntryPrediction } from "../../prediction";
import type {
  EntryPredictionDisplay,
  PredictionPlayerDisplay,
} from "./getEntryPredictions.types";

/**
 * Build cache key for entry predictions (league, entry, event, limit, risk).
 */
export function predictionsCacheKey(
  leagueId: number,
  entryId: number,
  eventId: number,
  limit: number,
  riskProfile: string
): string {
  return `predictions:league:${leagueId}:entry:${entryId}:event:${eventId}:limit:${limit}:risk:${riskProfile}`;
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
        score: p.score,
        probability: p.probability,
        reasons: p.reasons,
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
      score: p.score,
      probability: p.probability,
      estimatedCostDelta: p.features.estimatedCostDelta,
      resultingBank: p.features.resultingBank,
      reasons: p.reasons,
    };
  });
}
