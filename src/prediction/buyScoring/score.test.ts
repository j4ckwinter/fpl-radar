import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("./context", () => ({
  loadBuyContext: vi.fn(),
}));
vi.mock("./pool", () => ({
  loadBuyPool: vi.fn(),
}));
vi.mock("../fixtures/teamUpcomingScores", () => ({
  loadTeamUpcomingFixtureScores: vi.fn().mockResolvedValue(new Map()),
}));
vi.mock("../leagueOwnership/compute", () => ({
  getLeagueOwnership: vi.fn().mockResolvedValue({
    leagueId: 1,
    eventId: 5,
    totalEntries: 10,
    ownershipByPlayerId: new Map(),
    ownershipCountByPlayerId: new Map(),
  }),
}));
vi.mock("../momentum/p95", () => ({
  loadMomentumP95: vi.fn().mockResolvedValue({ inP95: 100, outP95: 100 }),
}));

import { getLeagueOwnership } from "../leagueOwnership/compute";
import { loadBuyContext } from "./context";
import { loadBuyPool } from "./pool";
import { scoreBuyCandidates } from "./score";
import { SquadNotFoundError } from "../errors";
import { BUY_SCORE } from "./constants";

const leagueId = 1;
const entryId = 100;
const eventId = 5;

function poolPlayer(
  id: number,
  overrides: Partial<{
    teamId: number;
    positionId: number;
    nowCost: number;
    status: string;
    news: string | null;
    selectedByPercent: number | null;
    webName: string;
    transfersInEvent: number;
  }> = {}
) {
  return {
    id,
    teamId: 1,
    positionId: 2,
    nowCost: 50,
    status: "a",
    news: null,
    selectedByPercent: 10,
    webName: "Player",
    transfersInEvent: 0,
    ...overrides,
  };
}

describe("scoreBuyCandidates", () => {
  beforeEach(() => {
    vi.mocked(loadBuyContext).mockResolvedValue({
      ownedPlayerIds: new Set([999]),
      teamCounts: new Map([[1, 3]]),
    });
    vi.mocked(loadBuyPool).mockResolvedValue([]);
  });

  it("calls loadBuyContext and loadBuyPool with correct params", async () => {
    await scoreBuyCandidates({ leagueId, entryId, eventId });

    expect(loadBuyContext).toHaveBeenCalledWith({ leagueId, entryId, eventId });
    expect(loadBuyPool).toHaveBeenCalledWith({
      ownedPlayerIds: expect.any(Set),
      limit: 100,
    });
  });

  it("returns empty scores when pool is empty", async () => {
    vi.mocked(loadBuyPool).mockResolvedValue([]);

    const result = await scoreBuyCandidates({ leagueId, entryId, eventId });

    expect(result.scores).toHaveLength(0);
  });

  it("returns scores sorted by buyScore descending", async () => {
    vi.mocked(loadBuyPool).mockResolvedValue([
      poolPlayer(1, { transfersInEvent: 10 }),
      poolPlayer(2, { transfersInEvent: 80 }),
      poolPlayer(3, { transfersInEvent: 40 }),
    ]);

    const result = await scoreBuyCandidates({ leagueId, entryId, eventId });

    expect(result.scores).toHaveLength(3);
    expect(result.scores.map((s) => s.playerId)).toEqual([2, 3, 1]);
    expect(result.scores[0].buyScore).toBeGreaterThanOrEqual(
      result.scores[1].buyScore
    );
    expect(result.scores[1].buyScore).toBeGreaterThanOrEqual(
      result.scores[2].buyScore
    );
  });

  it("safe riskProfile ranks higher league ownership higher (equal other metrics)", async () => {
    vi.mocked(loadBuyPool).mockResolvedValue([
      poolPlayer(1, { transfersInEvent: 20 }),
      poolPlayer(2, { transfersInEvent: 20 }),
    ]);
    vi.mocked(getLeagueOwnership).mockResolvedValueOnce({
      leagueId: 1,
      eventId: 5,
      totalEntries: 10,
      ownershipByPlayerId: new Map([
        [1, 0.2],
        [2, 0.8],
      ]),
      ownershipCountByPlayerId: new Map([
        [1, 2],
        [2, 8],
      ]),
    });

    const result = await scoreBuyCandidates({
      leagueId,
      entryId,
      eventId,
      riskProfile: "safe",
    });

    const lowLeague = result.scores.find((s) => s.playerId === 1);
    const highLeague = result.scores.find((s) => s.playerId === 2);
    expect(highLeague!.buyScore).toBeGreaterThan(lowLeague!.buyScore);
    expect(highLeague!.reasons).toContain("Highly owned in your league");
  });

  it("adds Available to play reason and bonus when status is available", async () => {
    vi.mocked(loadBuyPool).mockResolvedValue([
      poolPlayer(1, { status: "a" }),
    ]);

    const result = await scoreBuyCandidates({ leagueId, entryId, eventId });

    expect(result.scores[0].features.isAvailable).toBe(true);
    expect(result.scores[0].reasons).toContain("Available to play");
  });

  it("applies flagged penalty and reason when status is flagged or unavailable", async () => {
    vi.mocked(loadBuyPool).mockResolvedValue([
      poolPlayer(1, { status: "a" }),
      poolPlayer(2, { status: "i" }),
      poolPlayer(3, { status: "u" }),
    ]);

    const result = await scoreBuyCandidates({ leagueId, entryId, eventId });

    const available = result.scores.find((s) => s.playerId === 1);
    const injured = result.scores.find((s) => s.playerId === 2);
    const unavailable = result.scores.find((s) => s.playerId === 3);

    expect(available!.features.isAvailable).toBe(true);
    expect(injured!.features.isAvailable).toBe(false);
    expect(unavailable!.features.isAvailable).toBe(false);
    expect(injured!.reasons).toContain("Flagged / availability concern");
    expect(unavailable!.reasons).toContain("Flagged / availability concern");
    expect(injured!.buyScore).toBeLessThan(available!.buyScore);
    expect(unavailable!.buyScore).toBeLessThan(available!.buyScore);
  });

  it("applies hasNews reason when news is non-empty", async () => {
    vi.mocked(loadBuyPool).mockResolvedValue([
      poolPlayer(1, { news: null }),
      poolPlayer(2, { news: "Injured" }),
    ]);

    const result = await scoreBuyCandidates({ leagueId, entryId, eventId });

    const withNews = result.scores.find((s) => s.playerId === 2);
    expect(withNews!.features.hasNews).toBe(true);
    expect(withNews!.reasons).toContain("News present");
  });

  it("clamps buyScore to 0-100", async () => {
    vi.mocked(loadBuyPool).mockResolvedValue([
      poolPlayer(1, { status: "u", transfersInEvent: 0 }),
    ]);

    const result = await scoreBuyCandidates({ leagueId, entryId, eventId });

    expect(result.scores[0].buyScore).toBeGreaterThanOrEqual(0);
    expect(result.scores[0].buyScore).toBeLessThanOrEqual(100);
  });

  it("respects limit parameter", async () => {
    vi.mocked(loadBuyPool).mockResolvedValue([
      poolPlayer(1),
      poolPlayer(2),
      poolPlayer(3),
    ]);

    const result = await scoreBuyCandidates({
      leagueId,
      entryId,
      eventId,
      limit: 2,
    });

    expect(result.scores).toHaveLength(2);
  });

  it("includes features for each scored player", async () => {
    vi.mocked(loadBuyPool).mockResolvedValue([
      poolPlayer(42, {
        status: "a",
        selectedByPercent: 25,
        nowCost: 85,
        positionId: 3,
        teamId: 2,
        transfersInEvent: 50,
      }),
    ]);

    const result = await scoreBuyCandidates({ leagueId, entryId, eventId });

    expect(result.scores[0]).toMatchObject({
      playerId: 42,
      reasons: expect.any(Array),
      features: {
        isAvailable: true,
        status: "a",
        hasNews: false,
        selectedByPercent: 25,
        nowCost: 85,
        positionId: 3,
        teamId: 2,
        transfersInEvent: 50,
        momentumIn: expect.any(Number),
        upcomingFixtureScore: null,
        leagueOwnershipPct: null,
        nonOwnershipRisk: null,
      },
    });
  });

  it("includes leagueOwnershipPct and nonOwnershipRisk in features for frontend (e.g. Owned by 8/12 rivals)", async () => {
    vi.mocked(loadBuyPool).mockResolvedValue([
      poolPlayer(1, { teamId: 5 }),
    ]);
    vi.mocked(getLeagueOwnership).mockResolvedValueOnce({
      leagueId: 1,
      eventId: 5,
      totalEntries: 12,
      ownershipByPlayerId: new Map([[1, 8 / 12]]),
      ownershipCountByPlayerId: new Map([[1, 8]]),
    });

    const result = await scoreBuyCandidates({ leagueId, entryId, eventId });

    expect(result.scores[0].features).toHaveProperty("leagueOwnershipPct");
    expect(result.scores[0].features).toHaveProperty("nonOwnershipRisk");
    expect(result.scores[0].features.leagueOwnershipPct).toBeCloseTo(8 / 12);
    expect(result.scores[0].features.nonOwnershipRisk).toBeCloseTo(8 / 12);
  });

  it("risky riskProfile prefers differential (lower league ownership ranks higher)", async () => {
    vi.mocked(loadBuyPool).mockResolvedValue([
      poolPlayer(1, { status: "a", transfersInEvent: 10 }),
      poolPlayer(2, { status: "a", transfersInEvent: 10 }),
    ]);
    vi.mocked(getLeagueOwnership).mockResolvedValueOnce({
      leagueId: 1,
      eventId: 5,
      totalEntries: 10,
      ownershipByPlayerId: new Map([
        [1, 0.8],
        [2, 0.1],
      ]),
      ownershipCountByPlayerId: new Map([
        [1, 8],
        [2, 1],
      ]),
    });

    const result = await scoreBuyCandidates({
      leagueId,
      entryId,
      eventId,
      riskProfile: "risky",
    });

    const highOwn = result.scores.find((s) => s.playerId === 1);
    const lowOwn = result.scores.find((s) => s.playerId === 2);
    expect(lowOwn!.buyScore).toBeGreaterThan(highOwn!.buyScore);
    expect(lowOwn!.reasons).toContain("Differential upside");
  });

  it("balanced riskProfile: higher league ownership gives higher buy score", async () => {
    vi.mocked(loadBuyPool).mockResolvedValue([
      poolPlayer(1, { status: "a", transfersInEvent: 10 }),
      poolPlayer(2, { status: "a", transfersInEvent: 10 }),
    ]);
    vi.mocked(getLeagueOwnership).mockResolvedValueOnce({
      leagueId: 1,
      eventId: 5,
      totalEntries: 10,
      ownershipByPlayerId: new Map([
        [1, 0.8],
        [2, 0.2],
      ]),
      ownershipCountByPlayerId: new Map([
        [1, 8],
        [2, 2],
      ]),
    });

    const result = await scoreBuyCandidates({ leagueId, entryId, eventId });

    const score1 = result.scores.find((s) => s.playerId === 1);
    const score2 = result.scores.find((s) => s.playerId === 2);
    expect(score1!.buyScore).toBeGreaterThan(score2!.buyScore);
    expect(score1!.features.leagueOwnershipPct).toBe(0.8);
    expect(score2!.features.leagueOwnershipPct).toBe(0.2);
  });

  it("does not crash when ownership data is missing (empty map)", async () => {
    vi.mocked(loadBuyPool).mockResolvedValue([
      poolPlayer(99, { status: "a" }),
    ]);
    vi.mocked(getLeagueOwnership).mockResolvedValueOnce({
      leagueId: 1,
      eventId: 5,
      totalEntries: 0,
      ownershipByPlayerId: new Map(),
      ownershipCountByPlayerId: new Map(),
    });

    const result = await scoreBuyCandidates({ leagueId, entryId, eventId });

    expect(result.scores).toHaveLength(1);
    expect(result.scores[0].features.leagueOwnershipPct).toBeNull();
    expect(result.scores[0].features.nonOwnershipRisk).toBeNull();
  });

  it("throws SquadNotFoundError when loadBuyContext throws", async () => {
    vi.mocked(loadBuyContext).mockRejectedValue(
      new SquadNotFoundError("No snapshot", { leagueId, entryId, eventId })
    );
    vi.mocked(loadBuyPool).mockClear();

    await expect(
      scoreBuyCandidates({ leagueId, entryId, eventId })
    ).rejects.toThrow(SquadNotFoundError);

    expect(loadBuyPool).not.toHaveBeenCalled();
  });
});
