import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../lib/prisma", () => ({
  prisma: {
    fplEntrySnapshot: {
      findUnique: vi.fn(),
    },
    fplPlayer: {
      findMany: vi.fn(),
    },
  },
}));

import { prisma } from "../../lib/prisma";
import { loadBuyContext } from "./context";
import { SquadNotFoundError } from "../errors";

const leagueId = 1;
const entryId = 100;
const eventId = 5;

function snapshotWithPicks(picks: Array<{ playerId: number }>) {
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
    picks: picks.map((p) => ({
      id: `pick-${p.playerId}`,
      snapshotId: "snap-1",
      playerId: p.playerId,
      pickPosition: 1,
      multiplier: 1,
      isCaptain: false,
      isViceCaptain: false,
    })),
  };
}

function playerRow(id: number, teamId: number) {
  return { id, teamId };
}

describe("loadBuyContext", () => {
  beforeEach(() => {
    vi.mocked(prisma.fplEntrySnapshot.findUnique).mockResolvedValue(null);
    vi.mocked(prisma.fplPlayer.findMany).mockResolvedValue([]);
  });

  it("calls findUnique with leagueId_entryId_eventId", async () => {
    vi.mocked(prisma.fplEntrySnapshot.findUnique).mockResolvedValue(
      snapshotWithPicks([{ playerId: 1 }]) as never
    );
    vi.mocked(prisma.fplPlayer.findMany).mockResolvedValue([
      playerRow(1, 1),
    ]);

    await loadBuyContext({ leagueId, entryId, eventId });

    expect(prisma.fplEntrySnapshot.findUnique).toHaveBeenCalledWith({
      where: {
        leagueId_entryId_eventId: { leagueId, entryId, eventId },
      },
      include: { picks: { select: { playerId: true } } },
    });
  });

  it("throws SquadNotFoundError when no snapshot exists", async () => {
    vi.mocked(prisma.fplEntrySnapshot.findUnique).mockResolvedValue(null);
    vi.mocked(prisma.fplPlayer.findMany).mockClear();

    await expect(
      loadBuyContext({ leagueId, entryId, eventId })
    ).rejects.toThrow(SquadNotFoundError);

    await expect(
      loadBuyContext({ leagueId, entryId, eventId })
    ).rejects.toMatchObject({
      name: "SquadNotFoundError",
      message: expect.stringContaining("No entry snapshot"),
      params: { leagueId, entryId, eventId },
    });

    expect(prisma.fplPlayer.findMany).not.toHaveBeenCalled();
  });

  it("throws SquadNotFoundError when snapshot has no picks", async () => {
    vi.mocked(prisma.fplEntrySnapshot.findUnique).mockResolvedValue(
      snapshotWithPicks([]) as never
    );
    vi.mocked(prisma.fplPlayer.findMany).mockClear();

    await expect(
      loadBuyContext({ leagueId, entryId, eventId })
    ).rejects.toThrow(SquadNotFoundError);

    await expect(
      loadBuyContext({ leagueId, entryId, eventId })
    ).rejects.toMatchObject({
      params: { leagueId, entryId, eventId },
    });

    expect(prisma.fplPlayer.findMany).not.toHaveBeenCalled();
  });

  it("calls findMany with player ids from picks", async () => {
    vi.mocked(prisma.fplEntrySnapshot.findUnique).mockResolvedValue(
      snapshotWithPicks([{ playerId: 10 }, { playerId: 20 }]) as never
    );
    vi.mocked(prisma.fplPlayer.findMany).mockResolvedValue([
      playerRow(10, 1),
      playerRow(20, 2),
    ]);

    await loadBuyContext({ leagueId, entryId, eventId });

    expect(prisma.fplPlayer.findMany).toHaveBeenCalledWith({
      where: { id: { in: [10, 20] } },
      select: { id: true, teamId: true },
    });
  });

  it("returns ownedPlayerIds from players returned by findMany", async () => {
    vi.mocked(prisma.fplEntrySnapshot.findUnique).mockResolvedValue(
      snapshotWithPicks([{ playerId: 1 }, { playerId: 2 }]) as never
    );
    vi.mocked(prisma.fplPlayer.findMany).mockResolvedValue([
      playerRow(1, 1),
      playerRow(2, 1),
    ]);

    const result = await loadBuyContext({ leagueId, entryId, eventId });

    expect(result.ownedPlayerIds).toEqual(new Set([1, 2]));
  });

  it("returns teamCounts with count per teamId", async () => {
    vi.mocked(prisma.fplEntrySnapshot.findUnique).mockResolvedValue(
      snapshotWithPicks([{ playerId: 1 }, { playerId: 2 }, { playerId: 3 }]) as never
    );
    vi.mocked(prisma.fplPlayer.findMany).mockResolvedValue([
      playerRow(1, 10),
      playerRow(2, 10),
      playerRow(3, 20),
    ]);

    const result = await loadBuyContext({ leagueId, entryId, eventId });

    expect(result.teamCounts.get(10)).toBe(2);
    expect(result.teamCounts.get(20)).toBe(1);
  });

  it("returns empty teamCounts when no players", async () => {
    vi.mocked(prisma.fplEntrySnapshot.findUnique).mockResolvedValue(
      snapshotWithPicks([{ playerId: 1 }]) as never
    );
    vi.mocked(prisma.fplPlayer.findMany).mockResolvedValue([]);

    const result = await loadBuyContext({ leagueId, entryId, eventId });

    expect(result.ownedPlayerIds).toEqual(new Set());
    expect(result.teamCounts.size).toBe(0);
  });
});
