import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../lib/prisma", () => ({
  prisma: {
    fplPlayer: {
      findMany: vi.fn(),
    },
  },
}));

import { prisma } from "../../lib/prisma";
import { buildInPoolByPosition } from "./build";
import { STATUS_UNAVAILABLE } from "./constants";

const positionGkp = 1;
const positionMid = 3;

function playerRow(
  id: number,
  overrides: Partial<{
    teamId: number;
    positionId: number;
    nowCost: number;
    selectedByPercent: number | null;
    status: string;
  }> = {}
) {
  return {
    id,
    teamId: 1,
    positionId: positionGkp,
    nowCost: 50,
    selectedByPercent: 10,
    status: "a",
    ...overrides,
  };
}

describe("buildInPoolByPosition", () => {
  beforeEach(() => {
    vi.mocked(prisma.fplPlayer.findMany).mockResolvedValue([]);
  });

  it("returns empty map and empty sizeByPosition when positionIds is empty", async () => {
    const result = await buildInPoolByPosition({
      ownedPlayerIds: new Set(),
      positionIds: [],
    });
    expect(result.inPoolByPosition.size).toBe(0);
    expect(result.sizeByPositionBeforeLimit).toEqual({});
    expect(prisma.fplPlayer.findMany).not.toHaveBeenCalled();
  });

  it("excludes owned players from the pool", async () => {
    vi.mocked(prisma.fplPlayer.findMany).mockResolvedValue([
      playerRow(1, { positionId: positionGkp }),
      playerRow(2, { positionId: positionGkp }),
    ]);
    const result = await buildInPoolByPosition({
      ownedPlayerIds: new Set([1]),
      positionIds: [positionGkp],
    });
    const list = result.inPoolByPosition.get(positionGkp) ?? [];
    expect(list).toHaveLength(1);
    expect(list[0].playerId).toBe(2);
  });

  it("sorts by selectedByPercent descending with nulls last", async () => {
    vi.mocked(prisma.fplPlayer.findMany).mockResolvedValue([
      playerRow(1, { selectedByPercent: 10 }),
      playerRow(2, { selectedByPercent: null }),
      playerRow(3, { selectedByPercent: 20 }),
    ]);
    const result = await buildInPoolByPosition({
      ownedPlayerIds: new Set(),
      positionIds: [positionGkp],
    });
    const list = result.inPoolByPosition.get(positionGkp) ?? [];
    expect(list.map((p) => p.playerId)).toEqual([3, 1, 2]);
    expect(list.map((p) => p.selectedByPercent)).toEqual([20, 10, null]);
  });

  it("applies perPositionLimit and sets sizeByPositionBeforeLimit", async () => {
    vi.mocked(prisma.fplPlayer.findMany).mockResolvedValue([
      playerRow(1, { positionId: positionGkp, selectedByPercent: 50 }),
      playerRow(2, { positionId: positionGkp, selectedByPercent: 40 }),
      playerRow(3, { positionId: positionGkp, selectedByPercent: 30 }),
      playerRow(4, { positionId: positionGkp, selectedByPercent: 20 }),
      playerRow(5, { positionId: positionGkp, selectedByPercent: 10 }),
    ]);
    const result = await buildInPoolByPosition({
      ownedPlayerIds: new Set(),
      positionIds: [positionGkp],
      perPositionLimit: 2,
    });
    const list = result.inPoolByPosition.get(positionGkp) ?? [];
    expect(list).toHaveLength(2);
    expect(list[0].playerId).toBe(1);
    expect(list[1].playerId).toBe(2);
    expect(result.sizeByPositionBeforeLimit[positionGkp]).toBe(5);
  });

  it("uses default perPositionLimit when not provided", async () => {
    vi.mocked(prisma.fplPlayer.findMany).mockResolvedValue([
      playerRow(1, { positionId: positionGkp }),
    ]);
    await buildInPoolByPosition({
      ownedPlayerIds: new Set(),
      positionIds: [positionGkp],
    });
    expect(prisma.fplPlayer.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          positionId: { in: [positionGkp] },
          status: { not: STATUS_UNAVAILABLE },
        },
      })
    );
  });

  it("queries only given positionIds and excludes unavailable status", async () => {
    await buildInPoolByPosition({
      ownedPlayerIds: new Set(),
      positionIds: [positionGkp, positionMid],
    });
    expect(prisma.fplPlayer.findMany).toHaveBeenCalledWith({
      where: {
        positionId: { in: [positionGkp, positionMid] },
        status: { not: STATUS_UNAVAILABLE },
      },
      select: {
        id: true,
        teamId: true,
        positionId: true,
        nowCost: true,
        selectedByPercent: true,
        status: true,
      },
    });
  });

  it("groups by position and returns correct InPoolPlayer shape", async () => {
    vi.mocked(prisma.fplPlayer.findMany).mockResolvedValue([
      playerRow(10, {
        teamId: 2,
        positionId: positionGkp,
        nowCost: 55,
        selectedByPercent: 12.5,
        status: "a",
      }),
      playerRow(20, {
        teamId: 3,
        positionId: positionMid,
        nowCost: 80,
        selectedByPercent: 8,
        status: "i",
      }),
    ]);
    const result = await buildInPoolByPosition({
      ownedPlayerIds: new Set(),
      positionIds: [positionGkp, positionMid],
    });
    const gkp = result.inPoolByPosition.get(positionGkp) ?? [];
    const mid = result.inPoolByPosition.get(positionMid) ?? [];
    expect(gkp).toHaveLength(1);
    expect(gkp[0]).toEqual({
      playerId: 10,
      teamId: 2,
      positionId: positionGkp,
      nowCost: 55,
      selectedByPercent: 12.5,
      status: "a",
    });
    expect(mid).toHaveLength(1);
    expect(mid[0].playerId).toBe(20);
    expect(result.sizeByPositionBeforeLimit[positionGkp]).toBe(1);
    expect(result.sizeByPositionBeforeLimit[positionMid]).toBe(1);
  });
});
