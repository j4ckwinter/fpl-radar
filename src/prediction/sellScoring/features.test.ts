import { describe, it, expect } from "vitest";
import { extractSellFeatures } from "./features";

function pick(
  playerId: number,
  overrides: Partial<{
    pickPosition: number;
    isCaptain: boolean;
    isViceCaptain: boolean;
  }> = {}
) {
  return {
    playerId,
    pickPosition: 1,
    isCaptain: false,
    isViceCaptain: false,
    ...overrides,
  };
}

function playerData(overrides: Partial<{
  status: string;
  news: string | null;
  selectedByPercent: number | null;
  nowCost: number;
  teamId: number;
  transfersOutEvent: number;
}> = {}) {
  return {
    status: "a",
    news: null,
    selectedByPercent: 10,
    nowCost: 50,
    teamId: 1,
    transfersOutEvent: 0,
    ...overrides,
  };
}

describe("extractSellFeatures", () => {
  it("returns empty map when picks is empty", () => {
    const result = extractSellFeatures({
      picks: [],
      playersById: new Map([[1, playerData()]]),
    });
    expect(result.size).toBe(0);
  });

  it("returns one entry per pick with player data from playersById", () => {
    const playersById = new Map([
      [1, playerData({ status: "a", selectedByPercent: 25 })],
    ]);
    const result = extractSellFeatures({
      picks: [pick(1)],
      playersById,
    });
    expect(result.size).toBe(1);
    expect(result.get(1)).toEqual({
      isFlagged: false,
      status: "a",
      hasNews: false,
      selectedByPercent: 25,
      isBenched: false,
      isCaptainOrVice: false,
      nowCost: 50,
      transfersOutEvent: 0,
      momentumOut: 0,
      upcomingFixtureScore: null,
      leagueOwnershipPct: null,
    });
  });

  it("sets isBenched true when pickPosition > 11", () => {
    const result = extractSellFeatures({
      picks: [pick(1, { pickPosition: 12 })],
      playersById: new Map([[1, playerData()]]),
    });
    expect(result.get(1)!.isBenched).toBe(true);
  });

  it("sets isBenched false when pickPosition <= 11", () => {
    const result = extractSellFeatures({
      picks: [pick(1, { pickPosition: 11 })],
      playersById: new Map([[1, playerData()]]),
    });
    expect(result.get(1)!.isBenched).toBe(false);
  });

  it("sets isCaptainOrVice true when isCaptain is true", () => {
    const result = extractSellFeatures({
      picks: [pick(1, { isCaptain: true })],
      playersById: new Map([[1, playerData()]]),
    });
    expect(result.get(1)!.isCaptainOrVice).toBe(true);
  });

  it("sets isCaptainOrVice true when isViceCaptain is true", () => {
    const result = extractSellFeatures({
      picks: [pick(1, { isViceCaptain: true })],
      playersById: new Map([[1, playerData()]]),
    });
    expect(result.get(1)!.isCaptainOrVice).toBe(true);
  });

  it("sets isFlagged and hasNews when player has non-empty news", () => {
    const result = extractSellFeatures({
      picks: [pick(1)],
      playersById: new Map([[1, playerData({ news: "Doubtful" })]]),
    });
    expect(result.get(1)!.hasNews).toBe(true);
    expect(result.get(1)!.isFlagged).toBe(true);
  });

  it("sets isFlagged true for flagged statuses i, s, u, d", () => {
    for (const status of ["i", "s", "u", "d"]) {
      const result = extractSellFeatures({
        picks: [pick(1)],
        playersById: new Map([[1, playerData({ status })]]),
      });
      expect(result.get(1)!.isFlagged).toBe(true);
      expect(result.get(1)!.status).toBe(status);
    }
  });

  it("sets isFlagged false for available status a", () => {
    const result = extractSellFeatures({
      picks: [pick(1)],
      playersById: new Map([[1, playerData({ status: "a" })]]),
    });
    expect(result.get(1)!.isFlagged).toBe(false);
  });

  it("uses empty defaults when player missing from playersById", () => {
    const result = extractSellFeatures({
      picks: [pick(99)],
      playersById: new Map(),
    });
    expect(result.get(99)).toEqual({
      isFlagged: false,
      status: "",
      hasNews: false,
      selectedByPercent: null,
      isBenched: false,
      isCaptainOrVice: false,
      nowCost: 0,
      transfersOutEvent: 0,
      momentumOut: 0,
      upcomingFixtureScore: null,
      leagueOwnershipPct: null,
    });
  });

  it("sets upcomingFixtureScore from teamUpcomingScores when provided", () => {
    const teamUpcomingScores = new Map([
      [1, 5],
      [2, -3],
    ]);
    const result = extractSellFeatures({
      picks: [pick(1), pick(2)],
      playersById: new Map([
        [1, playerData({ teamId: 1 })],
        [2, playerData({ teamId: 2 })],
      ]),
      teamUpcomingScores,
    });
    expect(result.get(1)!.upcomingFixtureScore).toBe(5);
    expect(result.get(2)!.upcomingFixtureScore).toBe(-3);
  });

  it("sets upcomingFixtureScore null when team not in teamUpcomingScores", () => {
    const teamUpcomingScores = new Map([[1, 2]]);
    const result = extractSellFeatures({
      picks: [pick(1)],
      playersById: new Map([[1, playerData({ teamId: 99 })]]),
      teamUpcomingScores,
    });
    expect(result.get(1)!.upcomingFixtureScore).toBe(null);
  });

  it("returns features for multiple picks", () => {
    const playersById = new Map([
      [1, playerData({ status: "a" })],
      [2, playerData({ status: "i" })],
    ]);
    const result = extractSellFeatures({
      picks: [
        pick(1, { pickPosition: 1 }),
        pick(2, { pickPosition: 12 }),
      ],
      playersById,
    });
    expect(result.size).toBe(2);
    expect(result.get(1)!.isBenched).toBe(false);
    expect(result.get(1)!.isFlagged).toBe(false);
    expect(result.get(2)!.isBenched).toBe(true);
    expect(result.get(2)!.isFlagged).toBe(true);
  });
});
