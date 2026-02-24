import { describe, it, expect } from "vitest";
import { groupTransfers, computeProfile } from "./entryTransfersIngestion";

type TransferRow = { eventId: number; time: Date; cost: number | null };

function row(
  eventId: number,
  time: Date,
  cost: number | null = null
): TransferRow {
  return { eventId, time, cost };
}

describe("entryTransfersIngestion", () => {
  describe("groupTransfers", () => {
    it("returns empty map for empty array", () => {
      expect(groupTransfers([])).toEqual(new Map());
    });

    it("groups single transfer by eventId and time", () => {
      const t = row(1, new Date("2025-01-15T10:00:00Z"), 4);
      const map = groupTransfers([t]);
      const key = `1:${new Date("2025-01-15T10:00:00Z").getTime()}`;
      expect(map.size).toBe(1);
      expect(map.get(key)).toEqual([t]);
    });

    it("groups transfers with same eventId and time together", () => {
      const time = new Date("2025-01-15T10:00:00Z");
      const t1 = row(1, time, 4);
      const t2 = row(1, time, null);
      const map = groupTransfers([t1, t2]);
      expect(map.size).toBe(1);
      const key = `1:${time.getTime()}`;
      expect(map.get(key)).toHaveLength(2);
      expect(map.get(key)).toContainEqual(t1);
      expect(map.get(key)).toContainEqual(t2);
    });

    it("keeps different eventIds in separate groups", () => {
      const time = new Date("2025-01-15T10:00:00Z");
      const map = groupTransfers([
        row(1, time),
        row(2, time),
      ]);
      expect(map.size).toBe(2);
    });

    it("keeps same eventId different time in separate groups", () => {
      const map = groupTransfers([
        row(1, new Date("2025-01-15T10:00:00Z")),
        row(1, new Date("2025-01-15T11:00:00Z")),
      ]);
      expect(map.size).toBe(2);
    });
  });

  describe("computeProfile", () => {
    it("returns zero stats and null lastTransferAt for empty array", () => {
      const result = computeProfile([]);
      expect(result).toEqual({
        transfersCount: 0,
        hitsCount: 0,
        totalHitCost: 0,
        avgTransfersPerGw: 0,
        hitRate: 0,
        lastTransferAt: null,
      });
    });

    it("single transfer with no cost: transfersCount 1, hitsCount 0", () => {
      const t = row(1, new Date("2025-01-15T10:00:00Z"), null);
      const result = computeProfile([t]);
      expect(result.transfersCount).toBe(1);
      expect(result.hitsCount).toBe(0);
      expect(result.totalHitCost).toBe(0);
      expect(result.avgTransfersPerGw).toBe(1);
      expect(result.hitRate).toBe(0);
      expect(result.lastTransferAt).toEqual(t.time);
    });

    it("single transfer with cost: hitsCount 1, totalHitCost set", () => {
      const t = row(1, new Date("2025-01-15T10:00:00Z"), 4);
      const result = computeProfile([t]);
      expect(result.transfersCount).toBe(1);
      expect(result.hitsCount).toBe(1);
      expect(result.totalHitCost).toBe(4);
      expect(result.hitRate).toBe(1);
      expect(result.lastTransferAt).toEqual(t.time);
    });

    it("same (eventId, time) batch: hit counted once, max cost used", () => {
      const time = new Date("2025-01-15T10:00:00Z");
      const transfers = [
        row(1, time, 4),
        row(1, time, 8),
        row(1, time, 0),
      ];
      const result = computeProfile(transfers);
      expect(result.transfersCount).toBe(3);
      expect(result.hitsCount).toBe(1);
      expect(result.totalHitCost).toBe(8);
      expect(result.avgTransfersPerGw).toBe(3);
      expect(result.hitRate).toBe(1);
    });

    it("two groups with cost: hitsCount 2, totalHitCost sum of max per group", () => {
      const time1 = new Date("2025-01-15T10:00:00Z");
      const time2 = new Date("2025-01-16T10:00:00Z");
      const transfers = [
        row(1, time1, 4),
        row(1, time1, 2),
        row(2, time2, 8),
      ];
      const result = computeProfile(transfers);
      expect(result.transfersCount).toBe(3);
      expect(result.hitsCount).toBe(2);
      expect(result.totalHitCost).toBe(4 + 8);
      expect(result.avgTransfersPerGw).toBe(3 / 2);
      expect(result.hitRate).toBe(1);
    });

    it("lastTransferAt is latest time", () => {
      const early = new Date("2025-01-15T10:00:00Z");
      const late = new Date("2025-01-20T10:00:00Z");
      const result = computeProfile([
        row(1, early),
        row(2, late),
      ]);
      expect(result.lastTransferAt).toEqual(late);
    });

    it("hitRate is hitsCount / distinct events when not all events have hits", () => {
      const time1 = new Date("2025-01-15T10:00:00Z");
      const time2 = new Date("2025-01-16T10:00:00Z");
      const time3 = new Date("2025-01-17T10:00:00Z");
      const transfers = [
        row(1, time1, 4),
        row(2, time2, 0),
        row(3, time3, 0),
      ];
      const result = computeProfile(transfers);
      expect(result.transfersCount).toBe(3);
      expect(result.hitsCount).toBe(1);
      expect(result.avgTransfersPerGw).toBe(1);
      expect(result.hitRate).toBeCloseTo(1 / 3);
    });
  });
});
