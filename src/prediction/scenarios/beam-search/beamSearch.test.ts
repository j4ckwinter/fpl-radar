import { describe, it, expect } from "vitest";
import { runBeamSearch } from "./beamSearch";
import type { SquadState } from "../../types";
import type { ScoredEdge } from "../types";

function squad(overrides: Partial<SquadState> = {}): SquadState {
  return {
    entryId: 1,
    leagueId: 1,
    eventId: 1,
    bank: 100,
    players: [
      { playerId: 1, teamId: 10, positionId: 1, nowCost: 50 },
      { playerId: 2, teamId: 10, positionId: 1, nowCost: 52 },
      { playerId: 3, teamId: 20, positionId: 2, nowCost: 60 },
    ],
    ...overrides,
  };
}

function edge(
  outPlayerId: number,
  inPlayerId: number,
  edgeScoreRaw: number,
  outTeamId = 10,
  inTeamId = 30
): ScoredEdge {
  const edgeScore = Math.min(100, Math.max(0, Math.round(edgeScoreRaw)));
  return {
    outPlayerId,
    inPlayerId,
    positionId: 1,
    outTeamId,
    inTeamId,
    outNowCost: 50,
    inNowCost: 55,
    edgeScoreRaw,
    edgeScore,
    reasons: [],
    budgetUncertain: false,
  };
}

describe("runBeamSearch", () => {
  it("returns same output for same inputs (determinism)", () => {
    const s = squad();
    const edges: ScoredEdge[] = [
      edge(1, 101, 70, 10, 30),
      edge(1, 102, 65, 10, 31),
      edge(2, 103, 60, 10, 32),
      edge(2, 104, 55, 10, 33),
    ];
    const a = runBeamSearch({ edges, squad: s, k: 2, maxResults: 5 });
    const b = runBeamSearch({ edges, squad: s, k: 2, maxResults: 5 });
    expect(a.length).toBe(b.length);
    for (let i = 0; i < a.length; i++) {
      expect(a[i].outs).toEqual(b[i].outs);
      expect(a[i].ins).toEqual(b[i].ins);
      expect(a[i].score).toBe(b[i].score);
    }
  });

  it("k=2 bundle score equals raw sum of edge scores when no budget uncertainty", () => {
    const s = squad({ bank: 1000 });
    const edges: ScoredEdge[] = [
      edge(1, 101, 70, 10, 30),
      edge(2, 102, 60, 10, 31),
    ];
    const result = runBeamSearch({ edges, squad: s, k: 2, maxResults: 1 });
    expect(result.length).toBe(1);
    expect(result[0].outs).toEqual([1, 2]);
    expect(result[0].ins).toEqual([101, 102]);
    expect(result[0].components?.length).toBe(2);
    expect(result[0].score).toBe(70 + 60);
    expect(result[0].flags.budgetUncertain).toBeFalsy();
  });

  it("flags budgetUncertain and applies penalty when bank is null", () => {
    const s = squad({ bank: null });
    const edges: ScoredEdge[] = [
      edge(1, 101, 70, 10, 30),
      edge(2, 102, 60, 10, 31),
    ];
    const result = runBeamSearch({ edges, squad: s, k: 2, maxResults: 1 });
    expect(result.length).toBe(1);
    expect(result[0].flags.budgetUncertain).toBe(true);
    expect(result[0].score).toBe(70 + 60 - 5);
  });

  it("k=3 sets likelyHit flag", () => {
    const s = squad();
    const edges: ScoredEdge[] = [
      edge(1, 101, 70, 10, 30),
      edge(2, 102, 60, 10, 31),
      edge(3, 103, 50, 20, 32),
    ];
    const result = runBeamSearch({ edges, squad: s, k: 3, maxResults: 1 });
    expect(result.length).toBe(1);
    expect(result[0].flags.likelyHit).toBe(true);
  });

  it("returns at most maxResults bundles", () => {
    const s = squad();
    const edges: ScoredEdge[] = [
      edge(1, 101, 70, 10, 30),
      edge(1, 102, 65, 10, 31),
      edge(2, 103, 60, 10, 32),
      edge(2, 104, 55, 10, 33),
    ];
    const result = runBeamSearch({ edges, squad: s, k: 2, maxResults: 2 });
    expect(result.length).toBeLessThanOrEqual(2);
  });

  it("deduplicates bundles that are the same set of (outs, ins) in different order", () => {
    const s = squad();
    const edges: ScoredEdge[] = [
      edge(1, 101, 70, 10, 30),
      edge(2, 102, 70, 10, 31),
    ];
    const result = runBeamSearch({ edges, squad: s, k: 2, maxResults: 10 });
    expect(result.length).toBe(1);
    expect(new Set(result[0].outs)).toEqual(new Set([1, 2]));
    expect(new Set(result[0].ins)).toEqual(new Set([101, 102]));
    expect(result[0].outs).toEqual([1, 2]);
    expect(result[0].ins).toEqual([101, 102]);
  });
});
