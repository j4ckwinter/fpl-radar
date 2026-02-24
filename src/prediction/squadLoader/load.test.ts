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
import { loadSquadState } from "./load";
import { InvalidSquadError, SquadNotFoundError } from "../errors";
import { REQUIRED_SQUAD_SIZE } from "./constants";

const leagueId = 1;
const entryId = 100;
const eventId = 5;

function pick(playerId: number, overrides: Partial<{ pickPosition: number }> = {}) {
  return {
    id: `pick-${playerId}`,
    snapshotId: "snap-1",
    playerId,
    pickPosition: 1,
    multiplier: 1,
    isCaptain: false,
    isViceCaptain: false,
    ...overrides,
  };
}

function snapshot(picks: Array<{ playerId: number }>, bank: number | null = 0) {
  return {
    id: "snap-1",
    leagueId,
    entryId,
    eventId,
    bank,
    teamValue: null,
    eventTransfers: null,
    eventTransfersCost: null,
    fetchedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    picks: picks.map((p, i) => pick(p.playerId, { pickPosition: i + 1 })),
  };
}

function playerRow(
  id: number,
  overrides: Partial<{ teamId: number; positionId: number; nowCost: number }> = {}
) {
  return {
    id,
    teamId: 1,
    positionId: 1,
    nowCost: 50,
    ...overrides,
  };
}

describe("loadSquadState", () => {
  beforeEach(() => {
    vi.mocked(prisma.fplEntrySnapshot.findUnique).mockResolvedValue(null);
    vi.mocked(prisma.fplPlayer.findMany).mockResolvedValue([]);
  });

  it("throws SquadNotFoundError when no snapshot exists", async () => {
    vi.mocked(prisma.fplEntrySnapshot.findUnique).mockResolvedValue(null);

    await expect(
      loadSquadState({ leagueId, entryId, eventId })
    ).rejects.toThrow(SquadNotFoundError);

    await expect(
      loadSquadState({ leagueId, entryId, eventId })
    ).rejects.toMatchObject({
      name: "SquadNotFoundError",
      message: expect.stringContaining("No entry snapshot"),
      params: { leagueId, entryId, eventId },
    });
  });

  it("throws InvalidSquadError when snapshot has no picks", async () => {
    vi.mocked(prisma.fplEntrySnapshot.findUnique).mockResolvedValue(
      snapshot([]) as never
    );

    await expect(
      loadSquadState({ leagueId, entryId, eventId })
    ).rejects.toThrow(InvalidSquadError);

    await expect(
      loadSquadState({ leagueId, entryId, eventId })
    ).rejects.toMatchObject({
      name: "InvalidSquadError",
      message: "Entry snapshot has no picks",
      params: { leagueId, entryId, eventId },
    });
  });

  it("throws InvalidSquadError when picks reference missing FplPlayer rows", async () => {
    const picks = Array.from({ length: 15 }, (_, i) => ({ playerId: i + 1 }));
    vi.mocked(prisma.fplEntrySnapshot.findUnique).mockResolvedValue(
      snapshot(picks) as never
    );
    vi.mocked(prisma.fplPlayer.findMany).mockResolvedValue(
      Array.from({ length: 14 }, (_, i) => playerRow(i + 1))
    );

    await expect(
      loadSquadState({ leagueId, entryId, eventId })
    ).rejects.toThrow(InvalidSquadError);

    await expect(
      loadSquadState({ leagueId, entryId, eventId })
    ).rejects.toMatchObject({
      message: "One or more picks reference missing FplPlayer rows",
      params: { leagueId, entryId, eventId },
    });
  });

  it(`throws InvalidSquadError when squad size is not ${REQUIRED_SQUAD_SIZE}`, async () => {
    const picks = Array.from({ length: 14 }, (_, i) => ({ playerId: i + 1 }));
    vi.mocked(prisma.fplEntrySnapshot.findUnique).mockResolvedValue(
      snapshot(picks) as never
    );
    vi.mocked(prisma.fplPlayer.findMany).mockResolvedValue(
      picks.map((p) => playerRow(p.playerId))
    );

    await expect(
      loadSquadState({ leagueId, entryId, eventId })
    ).rejects.toThrow(InvalidSquadError);

    await expect(
      loadSquadState({ leagueId, entryId, eventId })
    ).rejects.toMatchObject({
      message: expect.stringMatching(new RegExp(`exactly ${REQUIRED_SQUAD_SIZE} players.*got 14`)),
      params: { leagueId, entryId, eventId },
    });
  });

  it(`returns SquadState with bank and players when snapshot has ${REQUIRED_SQUAD_SIZE} valid picks`, async () => {
    const picks = Array.from({ length: REQUIRED_SQUAD_SIZE }, (_, i) => ({
      playerId: i + 1,
    }));
    vi.mocked(prisma.fplEntrySnapshot.findUnique).mockResolvedValue(
      snapshot(picks, 25) as never
    );
    vi.mocked(prisma.fplPlayer.findMany).mockResolvedValue(
      picks.map((p, i) =>
        playerRow(p.playerId, {
          teamId: (i % 3) + 1,
          positionId: (i % 4) + 1,
          nowCost: 50 + i,
        })
      )
    );

    const result = await loadSquadState({ leagueId, entryId, eventId });

    expect(result).toEqual({
      entryId,
      leagueId,
      eventId,
      bank: 25,
      players: expect.arrayContaining(
        picks.map((p, i) => ({
          playerId: p.playerId,
          teamId: (i % 3) + 1,
          positionId: (i % 4) + 1,
          nowCost: 50 + i,
        }))
      ),
    });
    expect(result.players).toHaveLength(REQUIRED_SQUAD_SIZE);
  });

  it("passes bank null through when snapshot.bank is null", async () => {
    const picks = Array.from({ length: REQUIRED_SQUAD_SIZE }, (_, i) => ({
      playerId: i + 1,
    }));
    vi.mocked(prisma.fplEntrySnapshot.findUnique).mockResolvedValue(
      snapshot(picks, null) as never
    );
    vi.mocked(prisma.fplPlayer.findMany).mockResolvedValue(
      picks.map((p) => playerRow(p.playerId))
    );

    const result = await loadSquadState({ leagueId, entryId, eventId });

    expect(result.bank).toBeNull();
    expect(result.players).toHaveLength(REQUIRED_SQUAD_SIZE);
  });

  it("calls findUnique with compound key and findMany with pick player ids", async () => {
    const picks = Array.from({ length: REQUIRED_SQUAD_SIZE }, (_, i) => ({
      playerId: 100 + i,
    }));
    vi.mocked(prisma.fplEntrySnapshot.findUnique).mockResolvedValue(
      snapshot(picks) as never
    );
    vi.mocked(prisma.fplPlayer.findMany).mockResolvedValue(
      picks.map((p) => playerRow(p.playerId))
    );

    await loadSquadState({ leagueId, entryId, eventId });

    expect(prisma.fplEntrySnapshot.findUnique).toHaveBeenCalledWith({
      where: {
        leagueId_entryId_eventId: { leagueId, entryId, eventId },
      },
      include: { picks: true },
    });
    expect(prisma.fplPlayer.findMany).toHaveBeenCalledWith({
      where: { id: { in: picks.map((p) => p.playerId) } },
      select: { id: true, teamId: true, positionId: true, nowCost: true },
    });
  });
});
