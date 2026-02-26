import { describe, it, expect } from "vitest";
import { canAddEdge, getBundleState } from "./constraints";
import type { SquadState } from "../types";
import type { ScoredEdge } from "./types";

function squad(overrides: Partial<SquadState> = {}): SquadState {
  return {
    entryId: 1,
    leagueId: 1,
    eventId: 1,
    bank: 100,
    players: [
      { playerId: 1, teamId: 10, positionId: 1, nowCost: 50 },
      { playerId: 2, teamId: 10, positionId: 1, nowCost: 55 },
      { playerId: 3, teamId: 20, positionId: 2, nowCost: 60 },
    ],
    ...overrides,
  };
}

function edge(
  outPlayerId: number,
  inPlayerId: number,
  outTeamId: number,
  inTeamId: number
): ScoredEdge {
  return {
    outPlayerId,
    inPlayerId,
    positionId: 1,
    outTeamId,
    inTeamId,
    outNowCost: 50,
    inNowCost: 55,
    edgeScoreRaw: 50,
    edgeScore: 50,
    reasons: [],
    budgetUncertain: false,
  };
}

describe("getBundleState", () => {
  it("computes outs, ins, teamCounts and totalCostDelta", () => {
    const s = squad();
    const e1 = edge(1, 101, 10, 30);
    const e2 = edge(2, 102, 10, 30);
    const bundle = [e1, e2];
    const state = getBundleState(bundle, s);
    expect(state.outs.size).toBe(2);
    expect(state.outs.has(1)).toBe(true);
    expect(state.outs.has(2)).toBe(true);
    expect(state.ins.size).toBe(2);
    expect(state.ins.has(101)).toBe(true);
    expect(state.ins.has(102)).toBe(true);
    expect(state.teamCounts.get(10)).toBe(0);
    expect(state.teamCounts.get(20)).toBe(1);
    expect(state.teamCounts.get(30)).toBe(2);
    expect(state.totalCostDelta).toBe((55 - 50) + (55 - 50));
  });
});

describe("canAddEdge", () => {
  it("allows adding first edge when in is not owned", () => {
    const s = squad();
    const e = edge(1, 101, 10, 30);
    expect(canAddEdge([], e, s)).toBe(true);
  });

  it("rejects duplicate out", () => {
    const s = squad();
    const e1 = edge(1, 101, 10, 30);
    const e2 = edge(1, 102, 10, 31);
    expect(canAddEdge([e1], e2, s)).toBe(false);
  });

  it("rejects duplicate in", () => {
    const s = squad();
    const e1 = edge(1, 101, 10, 30);
    const e2 = edge(2, 101, 10, 30);
    expect(canAddEdge([e1], e2, s)).toBe(false);
  });

  it("rejects buying owned player unless sold in bundle", () => {
    const s = squad();
    const e = edge(1, 2, 10, 10);
    expect(canAddEdge([], e, s)).toBe(false);
  });

  it("allows buying owned player when they are sold in bundle", () => {
    const s = squad();
    const e1 = edge(1, 3, 10, 20);
    const e2 = edge(2, 1, 10, 10);
    expect(canAddEdge([e1], e2, s)).toBe(true);
  });

  it("rejects when in team would exceed 3 after add", () => {
    const s = squad({
      players: [
        { playerId: 1, teamId: 10, positionId: 1, nowCost: 50 },
        { playerId: 2, teamId: 10, positionId: 1, nowCost: 55 },
        { playerId: 3, teamId: 10, positionId: 1, nowCost: 60 },
        { playerId: 4, teamId: 20, positionId: 2, nowCost: 65 },
      ],
    });
    const e = edge(4, 999, 20, 10);
    expect(canAddEdge([], e, s)).toBe(false);
  });

  it("rejects when out team would go below 0 (out not in squad)", () => {
    const s = squad();
    const e = edge(99, 101, 99, 30);
    expect(canAddEdge([], e, s)).toBe(false);
  });
});
