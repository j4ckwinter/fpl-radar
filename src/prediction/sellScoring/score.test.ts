import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../lib/prisma", () => ({
  prisma: {
    fplEntrySnapshot: { findUnique: vi.fn() },
    fplPlayer: { findMany: vi.fn() },
  },
}));
vi.mock("./features", () => ({
  extractSellFeatures: vi.fn(),
}));

import { prisma } from "../../lib/prisma";
import { extractSellFeatures } from "./features";
import { scoreSellCandidates } from "./score";
import { SquadNotFoundError } from "../errors";
import { SELL_SCORE } from "./constants";

const leagueId = 1;
const entryId = 100;
const eventId = 5;

function snapshotWithPicks(
  picks: Array<{
    playerId: number;
    pickPosition: number;
    isCaptain: boolean;
    isViceCaptain: boolean;
  }>
) {
  return {
    id: "snap-1",
    leagueId,
    entryId,
    eventId,
    bank: 0,
    teamValue: null,
    eventTransfers: null,
    eventTransfersCost: null,
    fetchedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    picks,
  };
}

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

function features(overrides: Partial<{
  isFlagged: boolean;
  status: string;
  hasNews: boolean;
  selectedByPercent: number | null;
  isBenched: boolean;
  isCaptainOrVice: boolean;
  nowCost: number;
}> = {}) {
  return {
    isFlagged: false,
    status: "a",
    hasNews: false,
    selectedByPercent: 10,
    isBenched: false,
    isCaptainOrVice: false,
    nowCost: 50,
    ...overrides,
  };
}

describe("scoreSellCandidates", () => {
  beforeEach(() => {
    vi.mocked(prisma.fplEntrySnapshot.findUnique).mockResolvedValue(
      snapshotWithPicks([pick(1), pick(2)]) as never
    );
    vi.mocked(prisma.fplPlayer.findMany).mockResolvedValue([
      { id: 1, status: "a", news: null, selectedByPercent: 10, nowCost: 50 },
      { id: 2, status: "a", news: null, selectedByPercent: 40, nowCost: 55 },
    ]);
    vi.mocked(extractSellFeatures).mockReturnValue(
      new Map([
        [1, features()],
        [2, features({ selectedByPercent: 40 })],
      ])
    );
  });

  it("calls findUnique with leagueId_entryId_eventId and include picks", async () => {
    await scoreSellCandidates({ leagueId, entryId, eventId });

    expect(prisma.fplEntrySnapshot.findUnique).toHaveBeenCalledWith({
      where: {
        leagueId_entryId_eventId: { leagueId, entryId, eventId },
      },
      include: {
        picks: {
          select: {
            playerId: true,
            pickPosition: true,
            isCaptain: true,
            isViceCaptain: true,
          },
        },
      },
    });
  });

  it("calls findMany with player ids from picks", async () => {
    await scoreSellCandidates({ leagueId, entryId, eventId });

    expect(prisma.fplPlayer.findMany).toHaveBeenCalledWith({
      where: { id: { in: [1, 2] } },
      select: {
        id: true,
        status: true,
        news: true,
        selectedByPercent: true,
        nowCost: true,
      },
    });
  });

  it("calls extractSellFeatures with picks and playersById", async () => {
    await scoreSellCandidates({ leagueId, entryId, eventId });

    expect(extractSellFeatures).toHaveBeenCalledWith(
      expect.objectContaining({
        picks: expect.arrayContaining([
          expect.objectContaining({ playerId: 1 }),
          expect.objectContaining({ playerId: 2 }),
        ]),
      })
    );
    const callArg = vi.mocked(extractSellFeatures).mock.calls[0][0];
    expect(callArg.playersById.size).toBe(2);
  });

  it("throws SquadNotFoundError when no snapshot exists", async () => {
    vi.mocked(prisma.fplEntrySnapshot.findUnique).mockResolvedValue(null);
    vi.mocked(extractSellFeatures).mockClear();

    await expect(
      scoreSellCandidates({ leagueId, entryId, eventId })
    ).rejects.toThrow(SquadNotFoundError);

    await expect(
      scoreSellCandidates({ leagueId, entryId, eventId })
    ).rejects.toMatchObject({
      params: { leagueId, entryId, eventId },
    });
    expect(extractSellFeatures).not.toHaveBeenCalled();
  });

  it("throws SquadNotFoundError when snapshot has no picks", async () => {
    vi.mocked(prisma.fplEntrySnapshot.findUnique).mockResolvedValue(
      snapshotWithPicks([]) as never
    );
    vi.mocked(extractSellFeatures).mockClear();

    await expect(
      scoreSellCandidates({ leagueId, entryId, eventId })
    ).rejects.toThrow(SquadNotFoundError);

    expect(extractSellFeatures).not.toHaveBeenCalled();
  });

  it("returns scores sorted by sellScore descending", async () => {
    vi.mocked(extractSellFeatures).mockReturnValue(
      new Map([
        [1, features({ isBenched: true })],
        [2, features()],
        [3, features({ isFlagged: true })],
      ])
    );
    vi.mocked(prisma.fplEntrySnapshot.findUnique).mockResolvedValue(
      snapshotWithPicks([pick(1), pick(2), pick(3)]) as never
    );
    vi.mocked(prisma.fplPlayer.findMany).mockResolvedValue([
      { id: 1, status: "a", news: null, selectedByPercent: 10, nowCost: 50 },
      { id: 2, status: "a", news: null, selectedByPercent: 10, nowCost: 50 },
      { id: 3, status: "i", news: null, selectedByPercent: 10, nowCost: 50 },
    ]);

    const result = await scoreSellCandidates({ leagueId, entryId, eventId });

    expect(result.scores.length).toBeGreaterThanOrEqual(1);
    for (let i = 1; i < result.scores.length; i++) {
      expect(result.scores[i].sellScore).toBeLessThanOrEqual(
        result.scores[i - 1].sellScore
      );
    }
  });

  it("adds reasons for flagged, benched, captain, and news", async () => {
    vi.mocked(extractSellFeatures).mockReturnValue(
      new Map([
        [
          1,
          features({
            isFlagged: true,
            hasNews: true,
            isBenched: true,
            isCaptainOrVice: true,
            selectedByPercent: 35,
          }),
        ],
      ])
    );
    vi.mocked(prisma.fplEntrySnapshot.findUnique).mockResolvedValue(
      snapshotWithPicks([pick(1)]) as never
    );
    vi.mocked(prisma.fplPlayer.findMany).mockResolvedValue([
      { id: 1, status: "i", news: "Injured", selectedByPercent: 35, nowCost: 50 },
    ]);

    const result = await scoreSellCandidates({ leagueId, entryId, eventId });

    expect(result.scores[0].reasons).toContain("Flagged / availability concern");
    expect(result.scores[0].reasons).toContain("On the bench");
    expect(result.scores[0].reasons).toContain("Captain/vice captain");
    expect(result.scores[0].reasons.some((r) => r.startsWith("News:"))).toBe(
      true
    );
  });

  it("adds High-ownership template hold when not flagged and selectedByPercent >= threshold", async () => {
    vi.mocked(extractSellFeatures).mockReturnValue(
      new Map([
        [
          1,
          features({
            isFlagged: false,
            selectedByPercent: SELL_SCORE.TEMPLATE_THRESHOLD,
          }),
        ],
      ])
    );
    vi.mocked(prisma.fplEntrySnapshot.findUnique).mockResolvedValue(
      snapshotWithPicks([pick(1)]) as never
    );
    vi.mocked(prisma.fplPlayer.findMany).mockResolvedValue([
      {
        id: 1,
        status: "a",
        news: null,
        selectedByPercent: SELL_SCORE.TEMPLATE_THRESHOLD,
        nowCost: 50,
      },
    ]);

    const result = await scoreSellCandidates({ leagueId, entryId, eventId });

    expect(result.scores[0].reasons).toContain("High-ownership template hold");
  });

  it("respects topN and caps at 15", async () => {
    const manyEntries = Array.from({ length: 20 }, (_, i) => [
      i + 1,
      features({ nowCost: 50 - i }),
    ]);
    vi.mocked(extractSellFeatures).mockReturnValue(new Map(manyEntries));
    vi.mocked(prisma.fplEntrySnapshot.findUnique).mockResolvedValue(
      snapshotWithPicks(
        manyEntries.map(([id]) => pick(id as number))
      ) as never
    );
    vi.mocked(prisma.fplPlayer.findMany).mockResolvedValue(
      manyEntries.map(([id]) => ({
        id,
        status: "a",
        news: null,
        selectedByPercent: 10,
        nowCost: 50,
      })) as never
    );

    const result = await scoreSellCandidates({
      leagueId,
      entryId,
      eventId,
      topN: 25,
    });

    expect(result.scores).toHaveLength(15);
  });

  it("includes features on each score", async () => {
    vi.mocked(extractSellFeatures).mockReturnValue(
      new Map([[1, features({ status: "a", selectedByPercent: 25 })]])
    );
    vi.mocked(prisma.fplEntrySnapshot.findUnique).mockResolvedValue(
      snapshotWithPicks([pick(1)]) as never
    );
    vi.mocked(prisma.fplPlayer.findMany).mockResolvedValue([
      { id: 1, status: "a", news: null, selectedByPercent: 25, nowCost: 50 },
    ]);

    const result = await scoreSellCandidates({ leagueId, entryId, eventId });

    expect(result.scores[0]).toMatchObject({
      playerId: 1,
      sellScore: expect.any(Number),
      reasons: expect.any(Array),
      features: {
        isFlagged: false,
        status: "a",
        hasNews: false,
        selectedByPercent: 25,
        isBenched: false,
        isCaptainOrVice: false,
        nowCost: 50,
      },
    });
  });

  it("clamps sellScore to 0-100", async () => {
    vi.mocked(extractSellFeatures).mockReturnValue(
      new Map([
        [
          1,
          features({
            isFlagged: true,
            status: "u",
            isBenched: true,
            hasNews: true,
            isCaptainOrVice: false,
            selectedByPercent: 0,
          }),
        ],
      ])
    );
    vi.mocked(prisma.fplEntrySnapshot.findUnique).mockResolvedValue(
      snapshotWithPicks([pick(1)]) as never
    );
    vi.mocked(prisma.fplPlayer.findMany).mockResolvedValue([
      { id: 1, status: "u", news: "Out", selectedByPercent: 0, nowCost: 50 },
    ]);

    const result = await scoreSellCandidates({ leagueId, entryId, eventId });

    expect(result.scores[0].sellScore).toBeGreaterThanOrEqual(0);
    expect(result.scores[0].sellScore).toBeLessThanOrEqual(100);
  });
});
