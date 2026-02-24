import type { SquadState } from "../types";
import type { PlayerRow } from "./types";

/**
 * Maps snapshot picks to squad players using the player lookup.
 * Drops picks that have no matching player (caller should validate length).
 */
export function mapPicksToSquadPlayers(
  picks: Array<{ playerId: number }>,
  playerMap: Map<number, PlayerRow>
): SquadState["players"] {
  return picks
    .map((pick) => {
      const p = playerMap.get(pick.playerId);
      if (!p) return null;
      return {
        playerId: p.id,
        teamId: p.teamId,
        positionId: p.positionId,
        nowCost: p.nowCost,
      };
    })
    .filter((p): p is SquadState["players"][number] => p !== null);
}
