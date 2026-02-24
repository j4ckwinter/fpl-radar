import { describe, it, expect } from "vitest";
import { generateCandidatesFromSquadState } from "./generate";
import type { PlayerReference } from "./types";
import type { SquadState } from "../types";

describe("generateCandidatesFromSquadState", () => {
  const positionGkp = 1;
  const positionDef = 2;
  const teamA = 1;
  const teamB = 2;
  const teamC = 3;

  function squad(players: Array<{ playerId: number; teamId: number; positionId: number; nowCost: number }>, bank: number | null = 0): SquadState {
    return {
      entryId: 100,
      leagueId: 1,
      eventId: 5,
      bank,
      players,
    };
  }

  function ref(id: number, teamId: number, positionId: number, nowCost: number): PlayerReference {
    return { id: id, teamId, positionId, nowCost };
  }

  function byPosition(players: PlayerReference[]): Map<number, PlayerReference[]> {
    const m = new Map<number, PlayerReference[]>();
    for (const p of players) {
      const list = m.get(p.positionId) ?? [];
      list.push(p);
      m.set(p.positionId, list);
    }
    return m;
  }

  it("returns no candidates when squad has one player and no other same-position players", () => {
    const s = squad([{ playerId: 1, teamId: teamA, positionId: positionGkp, nowCost: 50 }]);
    const pool = byPosition([ref(1, teamA, positionGkp, 50)]);
    const { candidates, diagnostics } = generateCandidatesFromSquadState(s, pool);
    expect(candidates).toHaveLength(0);
    expect(diagnostics.squadPlayersCount).toBe(1);
    expect(diagnostics.totalOutInPairsConsidered).toBe(0);
  });

  it("returns one legal candidate when one keeper can be swapped for another", () => {
    const s = squad([
      { playerId: 1, teamId: teamA, positionId: positionGkp, nowCost: 50 },
    ]);
    const pool = byPosition([
      ref(1, teamA, positionGkp, 50),
      ref(2, teamB, positionGkp, 50),
    ]);
    const { candidates, diagnostics } = generateCandidatesFromSquadState(s, pool);
    expect(candidates).toHaveLength(1);
    expect(candidates[0]).toMatchObject({
      outPlayerId: 1,
      inPlayerId: 2,
      positionId: positionGkp,
      estimatedSellPrice: 50,
      buyPrice: 50,
      estimatedCostDelta: 0,
      resultingBank: 0,
      checks: { budgetOk: true, alreadyOwned: false, teamLimitOk: true, positionOk: true },
    });
    expect(diagnostics.legalCandidatesCount).toBe(1);
  });

  it("filters out transfer when in-player is already in squad", () => {
    const s = squad([
      { playerId: 1, teamId: teamA, positionId: positionGkp, nowCost: 50 },
      { playerId: 2, teamId: teamB, positionId: positionGkp, nowCost: 50 },
    ]);
    const pool = byPosition([
      ref(1, teamA, positionGkp, 50),
      ref(2, teamB, positionGkp, 50),
    ]);
    const { candidates, diagnostics } = generateCandidatesFromSquadState(s, pool);
    expect(candidates).toHaveLength(0);
    expect(diagnostics.filteredByAlreadyOwned).toBe(2);
  });

  it("filters out transfer when budget would be exceeded", () => {
    const s = squad(
      [{ playerId: 1, teamId: teamA, positionId: positionGkp, nowCost: 50 }],
      0
    );
    const pool = byPosition([
      ref(1, teamA, positionGkp, 50),
      ref(2, teamB, positionGkp, 55),
    ]);
    const { candidates, diagnostics } = generateCandidatesFromSquadState(s, pool);
    expect(candidates).toHaveLength(0);
    expect(diagnostics.filteredByBudget).toBe(1);
  });

  it("allows transfer when bank covers cost delta", () => {
    const s = squad(
      [{ playerId: 1, teamId: teamA, positionId: positionGkp, nowCost: 50 }],
      10
    );
    const pool = byPosition([
      ref(1, teamA, positionGkp, 50),
      ref(2, teamB, positionGkp, 55),
    ]);
    const { candidates } = generateCandidatesFromSquadState(s, pool);
    expect(candidates).toHaveLength(1);
    expect(candidates[0].estimatedCostDelta).toBe(5);
    expect(candidates[0].resultingBank).toBe(5);
  });

  it("filters out transfer when team limit would be exceeded", () => {
    const s = squad([
      { playerId: 1, teamId: teamA, positionId: positionDef, nowCost: 50 },
      { playerId: 2, teamId: teamA, positionId: positionDef, nowCost: 50 },
      { playerId: 3, teamId: teamA, positionId: positionDef, nowCost: 50 },
      { playerId: 4, teamId: teamB, positionId: positionDef, nowCost: 50 },
    ]);
    const pool = byPosition([
      ref(1, teamA, positionDef, 50),
      ref(2, teamA, positionDef, 50),
      ref(3, teamA, positionDef, 50),
      ref(4, teamB, positionDef, 50),
      ref(5, teamA, positionDef, 50),
    ]);
    const { candidates, diagnostics } = generateCandidatesFromSquadState(s, pool);
    const swapOutBringInA = candidates.filter((c) => c.outTeamId === teamB && c.inTeamId === teamA);
    expect(swapOutBringInA).toHaveLength(0);
    expect(diagnostics.filteredByTeamLimit).toBe(4);
  });
});
