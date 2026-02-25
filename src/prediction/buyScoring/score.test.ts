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
  }),
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
    });
  });

  it("returns empty scores when pool is empty", async () => {
    vi.mocked(loadBuyPool).mockResolvedValue([]);

    const result = await scoreBuyCandidates({ leagueId, entryId, eventId });

    expect(result.scores).toHaveLength(0);
  });

  it("returns scores sorted by buyScore descending", async () => {
    vi.mocked(loadBuyPool).mockResolvedValue([
      poolPlayer(1, { selectedByPercent: 5 }),
      poolPlayer(2, { selectedByPercent: 30 }),
      poolPlayer(3, { selectedByPercent: 15 }),
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

  it("applies base score and ownership bonus from selectedByPercent", async () => {
    vi.mocked(loadBuyPool).mockResolvedValue([
      poolPlayer(1, { selectedByPercent: 0 }),
      poolPlayer(2, { selectedByPercent: 60 }),
    ]);

    const result = await scoreBuyCandidates({ leagueId, entryId, eventId });

    const lowOwnership = result.scores.find((s) => s.playerId === 1);
    const highOwnership = result.scores.find((s) => s.playerId === 2);
    expect(lowOwnership!.buyScore).toBeLessThan(highOwnership!.buyScore);
    expect(highOwnership!.features.selectedByPercent).toBe(60);
    expect(lowOwnership!.reasons).not.toContain("High ownership / template target");
    expect(highOwnership!.reasons).toContain("High ownership / template target");
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

  it("applies hasNews penalty and reason when news is non-empty", async () => {
    vi.mocked(loadBuyPool).mockResolvedValue([
      poolPlayer(1, { news: null }),
      poolPlayer(2, { news: "Injured" }),
    ]);

    const result = await scoreBuyCandidates({ leagueId, entryId, eventId });

    const noNews = result.scores.find((s) => s.playerId === 1);
    const withNews = result.scores.find((s) => s.playerId === 2);
    expect(withNews!.features.hasNews).toBe(true);
    expect(withNews!.reasons).toContain("News present");
    expect(withNews!.buyScore).toBeLessThan(noNews!.buyScore);
  });

  it("applies very high price penalty when nowCost >= threshold", async () => {
    vi.mocked(loadBuyPool).mockResolvedValue([
      poolPlayer(1, { nowCost: 100 }),
      poolPlayer(2, { nowCost: 120 }),
    ]);

    const result = await scoreBuyCandidates({ leagueId, entryId, eventId });

    const premium = result.scores.find((s) => s.playerId === 2);
    expect(premium!.reasons).toContain("Very high price");
    expect(premium!.features.nowCost).toBe(120);
  });

  it("clamps buyScore to 0-100", async () => {
    vi.mocked(loadBuyPool).mockResolvedValue([
      poolPlayer(1, {
        status: "u",
        selectedByPercent: 0,
        news: "Bad",
        nowCost: 150,
      }),
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
        upcomingFixtureScore: null,
        leagueOwnershipPct: 0,
        nonOwnershipRisk: 0,
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
    });

    const result = await scoreBuyCandidates({ leagueId, entryId, eventId });

    expect(result.scores[0].features).toHaveProperty("leagueOwnershipPct");
    expect(result.scores[0].features).toHaveProperty("nonOwnershipRisk");
    expect(result.scores[0].features.leagueOwnershipPct).toBeCloseTo(8 / 12);
    expect(result.scores[0].features.nonOwnershipRisk).toBeCloseTo(8 / 12);
  });

  it("buy score increases with higher league ownership", async () => {
    vi.mocked(loadBuyPool).mockResolvedValue([
      poolPlayer(1, { status: "a", selectedByPercent: 15, nowCost: 50 }),
      poolPlayer(2, { status: "a", selectedByPercent: 15, nowCost: 50 }),
    ]);
    vi.mocked(getLeagueOwnership).mockResolvedValueOnce({
      leagueId: 1,
      eventId: 5,
      totalEntries: 10,
      ownershipByPlayerId: new Map([
        [1, 0.8],
        [2, 0.2],
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
    });

    const result = await scoreBuyCandidates({ leagueId, entryId, eventId });

    expect(result.scores).toHaveLength(1);
    expect(result.scores[0].features.leagueOwnershipPct).toBe(0);
    expect(result.scores[0].features.nonOwnershipRisk).toBe(0);
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
