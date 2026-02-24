import { describe, it, expect } from "vitest";
import {
  generateCandidatesFromSquadAndPool,
  type PlayerRow,
} from "./candidateGenerator.utils";
import type { SquadState } from "./types";

const positionGkp = 1;
const positionDef = 2;
const teamA = 1;
const teamB = 2;

function squad(
  players: Array<{
    playerId: number;
    teamId: number;
    positionId: number;
    nowCost: number;
  }>,
  bank: number | null = 0
): SquadState {
  return {
    entryId: 100,
    leagueId: 1,
    eventId: 5,
    bank,
    players,
  };
}

function player(
  id: number,
  teamId: number,
  positionId: number,
  nowCost: number
): PlayerRow {
  return { id, teamId, positionId, nowCost };
}

function byPosition(players: PlayerRow[]): Map<number, PlayerRow[]> {
  const m = new Map<number, PlayerRow[]>();
  for (const p of players) {
    const list = m.get(p.positionId) ?? [];
    list.push(p);
    m.set(p.positionId, list);
  }
  return m;
}

describe("candidateGenerator.utils", () => {
  describe("generateCandidatesFromSquadAndPool", () => {
    it("returns one legal candidate when one keeper can be swapped for another", () => {
      const s = squad([
        { playerId: 1, teamId: teamA, positionId: positionGkp, nowCost: 50 },
      ]);
      const pool = byPosition([
        player(1, teamA, positionGkp, 50),
        player(2, teamB, positionGkp, 50),
      ]);
      const { candidates, stats } = generateCandidatesFromSquadAndPool(
        s,
        pool,
        2000
      );
      expect(candidates).toHaveLength(1);
      expect(candidates[0]).toMatchObject({
        outPlayerId: 1,
        inPlayerId: 2,
        positionId: positionGkp,
        estimatedSellPrice: 50,
        buyPrice: 50,
        estimatedCostDelta: 0,
        resultingBank: 0,
        checks: {
          budgetOk: true,
          alreadyOwned: false,
          teamLimitOk: true,
          positionOk: true,
        },
      });
      expect(stats.outPlayers).toBe(1);
      expect(stats.inPool).toBe(2);
      expect(stats.generated).toBe(1);
      expect(stats.truncated).toBe(false);
      expect(stats).toHaveProperty("inPoolPerPositionLimit", 0);
      expect(stats).toHaveProperty("inPoolSizeByPosition");
    });

    it("includes inPoolPerPositionLimit and inPoolSizeByPosition when options passed", () => {
      const s = squad([
        { playerId: 1, teamId: teamA, positionId: positionGkp, nowCost: 50 },
      ]);
      const pool = byPosition([
        player(1, teamA, positionGkp, 50),
        player(2, teamB, positionGkp, 50),
      ]);
      const { stats } = generateCandidatesFromSquadAndPool(s, pool, 2000, {
        perPositionLimit: 300,
        inPoolSizeByPosition: { [positionGkp]: 2 },
      });
      expect(stats.inPoolPerPositionLimit).toBe(300);
      expect(stats.inPoolSizeByPosition).toEqual({ [positionGkp]: 2 });
    });

    it("when bank is null, sets resultingBank null and budgetOk true", () => {
      const s = squad(
        [{ playerId: 1, teamId: teamA, positionId: positionGkp, nowCost: 50 }],
        null
      );
      const pool = byPosition([
        player(1, teamA, positionGkp, 50),
        player(2, teamB, positionGkp, 55),
      ]);
      const { candidates } = generateCandidatesFromSquadAndPool(s, pool, 2000);
      expect(candidates).toHaveLength(1);
      expect(candidates[0].resultingBank).toBeNull();
      expect(candidates[0].checks.budgetOk).toBe(true);
    });

    it("filters by budget when bank cannot cover cost delta", () => {
      const s = squad(
        [{ playerId: 1, teamId: teamA, positionId: positionGkp, nowCost: 50 }],
        0
      );
      const pool = byPosition([
        player(1, teamA, positionGkp, 50),
        player(2, teamB, positionGkp, 55),
      ]);
      const { candidates, stats } = generateCandidatesFromSquadAndPool(
        s,
        pool,
        2000
      );
      expect(candidates).toHaveLength(0);
      expect(stats.filteredBudget).toBe(1);
    });

    it("sets truncated and stops at maxCandidates", () => {
      const s = squad(
        [
          { playerId: 1, teamId: teamA, positionId: positionGkp, nowCost: 50 },
          { playerId: 2, teamId: teamB, positionId: positionGkp, nowCost: 50 },
        ],
        1000
      );
      const inPool = [
        player(1, teamA, positionGkp, 50),
        player(2, teamB, positionGkp, 50),
        ...Array.from({ length: 10 }, (_, i) =>
          player(100 + i, teamB, positionGkp, 50)
        ),
      ];
      const pool = byPosition(inPool);
      const { candidates, stats } = generateCandidatesFromSquadAndPool(
        s,
        pool,
        3
      );
      expect(candidates).toHaveLength(3);
      expect(stats.truncated).toBe(true);
      expect(stats.generated).toBe(3);
    });

    it("filters by team limit when in-player would exceed 3 per team", () => {
      const s = squad([
        { playerId: 1, teamId: teamA, positionId: positionDef, nowCost: 50 },
        { playerId: 2, teamId: teamA, positionId: positionDef, nowCost: 50 },
        { playerId: 3, teamId: teamA, positionId: positionDef, nowCost: 50 },
        { playerId: 4, teamId: teamB, positionId: positionDef, nowCost: 50 },
      ]);
      const pool = byPosition([
        player(1, teamA, positionDef, 50),
        player(2, teamA, positionDef, 50),
        player(3, teamA, positionDef, 50),
        player(4, teamB, positionDef, 50),
        player(5, teamA, positionDef, 50),
      ]);
      const { candidates, stats } = generateCandidatesFromSquadAndPool(
        s,
        pool,
        2000
      );
      const swapOutBBringInA = candidates.filter(
        (c) => c.outTeamId === teamB && c.inTeamId === teamA
      );
      expect(swapOutBBringInA).toHaveLength(0);
      expect(stats.filteredTeamLimit).toBeGreaterThan(0);
    });

    it("returns zero candidates and correct stats when pool is empty for position", () => {
      const s = squad([
        { playerId: 1, teamId: teamA, positionId: positionGkp, nowCost: 50 },
      ]);
      const pool = byPosition([player(1, teamA, positionGkp, 50)]);
      const { candidates, stats } = generateCandidatesFromSquadAndPool(
        s,
        pool,
        2000
      );
      expect(candidates).toHaveLength(0);
      expect(stats.outPlayers).toBe(1);
      expect(stats.inPool).toBe(1);
      expect(stats.generated).toBe(0);
    });
  });
});
