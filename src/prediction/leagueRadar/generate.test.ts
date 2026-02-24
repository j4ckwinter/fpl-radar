import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../lib/prisma", () => ({
  prisma: {
    fplLeagueEntry: { findMany: vi.fn() },
  },
}));
vi.mock("../transferPrediction", () => ({
  predictTransfersForEntry: vi.fn(),
}));

import { prisma } from "../../lib/prisma";
import { predictTransfersForEntry } from "../transferPrediction";
import { generateLeagueRadar } from "./generate";

const leagueId = 100;
const eventId = 27;

function mockLogger() {
  return {
    info: vi.fn(),
    error: vi.fn(),
  };
}

function prediction(outPlayerId: number, inPlayerId: number, probability: number) {
  return { outPlayerId, inPlayerId, probability, score: 50 };
}

describe("generateLeagueRadar", () => {
  beforeEach(() => {
    vi.mocked(prisma.fplLeagueEntry.findMany).mockResolvedValue([
      { id: 1 },
      { id: 2 },
    ]);
    vi.mocked(predictTransfersForEntry).mockImplementation(async (params) => {
      if (params.entryId === 1) {
        return {
          predictions: [
            prediction(10, 20, 0.8),
            prediction(10, 21, 0.3),
          ],
        };
      }
      return { predictions: [prediction(11, 20, 0.5)] };
    });
  });

  it("calls prisma.fplLeagueEntry.findMany with leagueId and orderBy rank asc", async () => {
    await generateLeagueRadar({
      leagueId,
      eventId,
      logger: mockLogger(),
    });

    expect(prisma.fplLeagueEntry.findMany).toHaveBeenCalledWith({
      where: { leagueId },
      orderBy: { rank: "asc" },
      take: undefined,
      select: { id: true },
    });
  });

  it("passes maxEntries as take when provided", async () => {
    await generateLeagueRadar({
      leagueId,
      eventId,
      maxEntries: 5,
      logger: mockLogger(),
    });

    expect(prisma.fplLeagueEntry.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ take: 5 })
    );
  });

  it("calls predictTransfersForEntry for each entry with leagueId, entryId, eventId, maxResults", async () => {
    const logger = mockLogger();
    vi.mocked(predictTransfersForEntry).mockClear();

    await generateLeagueRadar({
      leagueId,
      eventId,
      logger,
    });

    expect(predictTransfersForEntry).toHaveBeenCalledTimes(2);
    expect(predictTransfersForEntry).toHaveBeenNthCalledWith(1, {
      leagueId,
      entryId: 1,
      eventId,
      maxResults: 20,
    });
    expect(predictTransfersForEntry).toHaveBeenNthCalledWith(2, {
      leagueId,
      entryId: 2,
      eventId,
      maxResults: 20,
    });
  });

  it("passes perEntryMaxResults when provided", async () => {
    await generateLeagueRadar({
      leagueId,
      eventId,
      perEntryMaxResults: 50,
      logger: mockLogger(),
    });

    expect(predictTransfersForEntry).toHaveBeenCalledWith(
      expect.objectContaining({ maxResults: 50 })
    );
  });

  it("returns result with leagueId, eventId, generatedAt, coverage, buyRadar, sellRadar, transferRadar", async () => {
    const result = await generateLeagueRadar({
      leagueId,
      eventId,
      logger: mockLogger(),
    });

    expect(result.leagueId).toBe(leagueId);
    expect(result.eventId).toBe(eventId);
    expect(result.generatedAt).toBeDefined();
    expect(result.coverage).toEqual({
      totalEntries: 2,
      processed: 2,
      succeeded: 2,
      failed: 0,
      durationMs: expect.any(Number),
    });
    expect(result.buyRadar).toBeDefined();
    expect(result.sellRadar).toBeDefined();
    expect(result.transferRadar).toBeDefined();
  });

  it("aggregates predictions into buyRadar by inPlayerId and sellRadar by outPlayerId", async () => {
    const result = await generateLeagueRadar({
      leagueId,
      eventId,
      logger: mockLogger(),
    });

    const buyPlayer20 = result.buyRadar.find((r) => r.playerId === 20);
    expect(buyPlayer20).toBeDefined();
    expect(buyPlayer20!.expectedCount).toBe(0.8 + 0.5);
    expect(buyPlayer20!.uniqueEntries).toBe(2);

    const sellPlayer10 = result.sellRadar.find((r) => r.playerId === 10);
    expect(sellPlayer10).toBeDefined();
    expect(sellPlayer10!.expectedCount).toBe(0.8 + 0.3);
    expect(sellPlayer10!.uniqueEntries).toBe(1);
  });

  it("aggregates transfer pairs into transferRadar", async () => {
    const result = await generateLeagueRadar({
      leagueId,
      eventId,
      logger: mockLogger(),
    });

    const transfer10_20 = result.transferRadar.find(
      (t) => t.outPlayerId === 10 && t.inPlayerId === 20
    );
    expect(transfer10_20).toBeDefined();
    expect(transfer10_20!.expectedCount).toBe(0.8);
    expect(transfer10_20!.uniqueEntries).toBe(1);
    const transfer11_20 = result.transferRadar.find(
      (t) => t.outPlayerId === 11 && t.inPlayerId === 20
    );
    expect(transfer11_20).toBeDefined();
    expect(transfer11_20!.expectedCount).toBe(0.5);
    expect(transfer11_20!.uniqueEntries).toBe(1);
  });

  it("when predictTransfersForEntry throws, returns fail for that entry and calls logger.error", async () => {
    vi.mocked(predictTransfersForEntry)
      .mockReset()
      .mockResolvedValueOnce({ predictions: [prediction(1, 2, 0.5)] })
      .mockRejectedValueOnce(new Error("No snapshot"));

    const logger = mockLogger();
    const result = await generateLeagueRadar({
      leagueId,
      eventId,
      logger,
    });

    expect(result.coverage.succeeded).toBe(1);
    expect(result.coverage.failed).toBe(1);
    expect(logger.error).toHaveBeenCalledWith(
      expect.objectContaining({ entryId: 2 }),
      "league radar: predict failed for entry"
    );
  });

  it("returns empty radars when no entries", async () => {
    vi.mocked(prisma.fplLeagueEntry.findMany).mockResolvedValue([]);
    vi.mocked(predictTransfersForEntry).mockClear();

    const result = await generateLeagueRadar({
      leagueId,
      eventId,
      logger: mockLogger(),
    });

    expect(result.coverage.totalEntries).toBe(0);
    expect(result.coverage.processed).toBe(0);
    expect(result.buyRadar).toEqual([]);
    expect(result.sellRadar).toEqual([]);
    expect(result.transferRadar).toEqual([]);
    expect(predictTransfersForEntry).not.toHaveBeenCalled();
  });
});
