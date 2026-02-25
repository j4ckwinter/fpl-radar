import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../lib/prisma", () => ({
  prisma: {
    fplEntrySnapshot: { findMany: vi.fn() },
  },
}));

import { prisma } from "../../lib/prisma";
import { computeLeagueOwnership } from "./compute";

function snapshotWithPicks(playerIds: number[]) {
  return {
    id: `snap-${Math.random().toString(36).slice(2)}`,
    picks: playerIds.map((playerId) => ({ playerId })),
  };
}

describe("computeLeagueOwnership", () => {
  beforeEach(() => {
    vi.mocked(prisma.fplEntrySnapshot.findMany).mockResolvedValue([]);
  });

  it("returns ownership 0.6 when 6 of 10 entries own the player", async () => {
    const playerId = 100;
    const snapshots = [
      ...Array.from({ length: 6 }, () => snapshotWithPicks([playerId, 2, 3])),
      ...Array.from({ length: 4 }, () => snapshotWithPicks([2, 3, 4])),
    ];
    vi.mocked(prisma.fplEntrySnapshot.findMany).mockResolvedValue(snapshots as never);

    const result = await computeLeagueOwnership({ leagueId: 1, eventId: 5 });

    expect(result.leagueId).toBe(1);
    expect(result.eventId).toBe(5);
    expect(result.totalEntries).toBe(10);
    expect(result.ownershipByPlayerId.get(playerId)).toBe(0.6);
    expect(result.ownershipCountByPlayerId.get(playerId)).toBe(6);
  });

  it("ignores entries without snapshots (only counts loaded snapshots)", async () => {
    const snapshots = [
      snapshotWithPicks([1, 2]),
      snapshotWithPicks([1, 3]),
      snapshotWithPicks([2, 3]),
    ];
    vi.mocked(prisma.fplEntrySnapshot.findMany).mockResolvedValue(snapshots as never);

    const result = await computeLeagueOwnership({ leagueId: 1, eventId: 5 });

    expect(result.totalEntries).toBe(3);
    expect(result.ownershipByPlayerId.get(1)).toBe(2 / 3);
    expect(result.ownershipByPlayerId.get(2)).toBe(2 / 3);
    expect(result.ownershipByPlayerId.get(3)).toBe(2 / 3);
  });

  it("returns empty ownership map and zero totalEntries when no snapshots", async () => {
    vi.mocked(prisma.fplEntrySnapshot.findMany).mockResolvedValue([]);

    const result = await computeLeagueOwnership({ leagueId: 1, eventId: 5 });

    expect(result.totalEntries).toBe(0);
    expect(result.ownershipByPlayerId.size).toBe(0);
    expect(result.ownershipCountByPlayerId.size).toBe(0);
  });

  it("calls findMany with leagueId and eventId", async () => {
    await computeLeagueOwnership({ leagueId: 42, eventId: 7 });

    expect(prisma.fplEntrySnapshot.findMany).toHaveBeenCalledWith({
      where: { leagueId: 42, eventId: 7 },
      select: { id: true, picks: { select: { playerId: true } } },
    });
  });

  it("counts each player once per entry (binary ownership)", async () => {
    const snapshots = [
      snapshotWithPicks([1, 1, 1, 2]),
      snapshotWithPicks([1, 2]),
    ];
    vi.mocked(prisma.fplEntrySnapshot.findMany).mockResolvedValue(snapshots as never);

    const result = await computeLeagueOwnership({ leagueId: 1, eventId: 5 });

    expect(result.totalEntries).toBe(2);
    expect(result.ownershipByPlayerId.get(1)).toBe(1);
    expect(result.ownershipByPlayerId.get(2)).toBe(1);
  });
});
