import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../lib/prisma", () => ({
  prisma: {
    fplGameweek: { findFirst: vi.fn() },
    fplLeagueEntry: { findFirst: vi.fn() },
    fplPlayer: { findMany: vi.fn() },
  },
}));

vi.mock("../../lib/cache/cache", () => ({
  getCache: vi.fn(),
}));

vi.mock("../../prediction", () => ({
  predictTransfersForEntry: vi.fn(),
}));

import { getCache } from "../../lib/cache/cache";
import { prisma } from "../../lib/prisma";
import { predictTransfersForEntry } from "../../prediction";
import { InvalidSquadError, SquadNotFoundError } from "../../prediction/errors";
import { getEntryPredictionsHandler } from "./getEntryPredictions";
import type { FastifyRequest, FastifyReply } from "fastify";

const leagueId = 1;
const entryId = 100;
const eventId = 26;

function mockRequest(
  params: { leagueId?: string; entryId?: string } = {},
  query: Record<string, string | undefined> = {}
): FastifyRequest<{
  Params: { leagueId: string; entryId: string };
  Querystring: Record<string, string | undefined>;
}> {
  return {
    params: {
      leagueId: String(leagueId),
      entryId: String(entryId),
      ...params,
    },
    query,
  } as unknown as FastifyRequest<{
    Params: { leagueId: string; entryId: string };
    Querystring: Record<string, string | undefined>;
  }>;
}

function mockReply(): FastifyReply & { statusCode: number; payload: unknown } {
  let statusCode = 200;
  return {
    statusCode: 0,
    payload: undefined,
    status(code: number) {
      statusCode = code;
      return this as FastifyReply;
    },
    send(body: unknown) {
      (this as { statusCode: number; payload: unknown }).statusCode = statusCode;
      (this as { statusCode: number; payload: unknown }).payload = body;
      return Promise.resolve();
    },
  } as unknown as FastifyReply & { statusCode: number; payload: unknown };
}

function predictionRow(
  outId: number,
  inId: number,
  overrides: Partial<{ score: number; probability: number; estimatedCostDelta: number; resultingBank: number | null; reasons: string[] }> = {}
) {
  return {
    outPlayerId: outId,
    inPlayerId: inId,
    score: 78,
    probability: 0.22,
    reasons: ["High ownership"],
    features: {
      sellScore: 50,
      buyScore: 60,
      estimatedCostDelta: 5,
      resultingBank: 10,
      budgetOk: true,
      teamLimitOk: true,
      positionOk: true,
    },
    ...overrides,
  };
}

function playerRow(
  id: number,
  overrides: Partial<{ webName: string; nowCost: number; teamId: number; positionId: number }> = {}
) {
  return {
    id,
    webName: "Player",
    nowCost: 85,
    teamId: 1,
    positionId: 3,
    team: { id: 1, shortName: "ARS" },
    position: { id: 3, shortName: "MID" },
    ...overrides,
  };
}

describe("getEntryPredictionsHandler", () => {
  beforeEach(() => {
    vi.mocked(prisma.fplGameweek.findFirst).mockResolvedValue(null);
    vi.mocked(prisma.fplLeagueEntry.findFirst).mockResolvedValue({ id: entryId });
    vi.mocked(prisma.fplPlayer.findMany).mockResolvedValue([]);
    vi.mocked(getCache).mockResolvedValue({
      get: vi.fn().mockResolvedValue(null),
      set: vi.fn().mockResolvedValue(undefined),
    });
    vi.mocked(predictTransfersForEntry).mockResolvedValue({ predictions: [] });
  });

  it("returns 400 when params are invalid", async () => {
    const request = mockRequest({ leagueId: "x" });
    const reply = mockReply();

    await getEntryPredictionsHandler(request, reply);

    expect(reply.statusCode).toBe(400);
    expect(reply.payload).toMatchObject({
      error: "Bad Request",
      message: "Invalid leagueId or entryId",
    });
  });

  it("returns 400 when query limit is out of bounds", async () => {
    vi.mocked(prisma.fplGameweek.findFirst).mockResolvedValue({ id: eventId });
    const request = mockRequest({}, { limit: "150" });
    const reply = mockReply();

    await getEntryPredictionsHandler(request, reply);

    expect(reply.statusCode).toBe(400);
    expect(reply.payload).toMatchObject({
      error: "Bad Request",
      message: "Invalid query parameters",
    });
  });

  it("returns 400 when no gameweek available and eventId not provided", async () => {
    vi.mocked(prisma.fplGameweek.findFirst).mockResolvedValue(null);
    const request = mockRequest();
    const reply = mockReply();

    await getEntryPredictionsHandler(request, reply);

    expect(reply.statusCode).toBe(400);
    expect(reply.payload).toMatchObject({
      message: expect.stringMatching(/gameweek|bootstrap/),
    });
  });

  it("returns 404 when entry not in league", async () => {
    vi.mocked(prisma.fplGameweek.findFirst).mockResolvedValue({ id: eventId });
    vi.mocked(prisma.fplLeagueEntry.findFirst).mockResolvedValue(null);
    const request = mockRequest();
    const reply = mockReply();

    await getEntryPredictionsHandler(request, reply);

    expect(reply.statusCode).toBe(404);
    expect(reply.payload).toMatchObject({
      error: "Not Found",
      message: `Entry ${entryId} not found in league ${leagueId}`,
    });
  });

  it("returns cached response on cache hit without calling prediction engine", async () => {
    vi.mocked(prisma.fplGameweek.findFirst).mockResolvedValue({ id: eventId });
    const cached = {
      meta: { leagueId, entryId, eventId, generatedAt: "2026-02-24T12:00:00.000Z" },
      predictions: [],
    };
    vi.mocked(getCache).mockResolvedValue({
      get: vi.fn().mockResolvedValue(cached),
      set: vi.fn().mockResolvedValue(undefined),
    });
    const request = mockRequest();
    const reply = mockReply();

    await getEntryPredictionsHandler(request, reply);

    expect(reply.statusCode).toBe(200);
    expect(reply.payload).toEqual(cached);
    expect(predictTransfersForEntry).not.toHaveBeenCalled();
  });

  it("returns 409 with SNAPSHOT_MISSING when prediction throws SquadNotFoundError", async () => {
    vi.mocked(prisma.fplGameweek.findFirst).mockResolvedValue({ id: eventId });
    vi.mocked(predictTransfersForEntry).mockRejectedValue(
      new SquadNotFoundError("No snapshot", { leagueId, entryId, eventId })
    );
    const request = mockRequest();
    const reply = mockReply();

    await getEntryPredictionsHandler(request, reply);

    expect(reply.statusCode).toBe(409);
    expect(reply.payload).toMatchObject({
      error: "Conflict",
      code: "SNAPSHOT_MISSING",
      message: expect.stringMatching(/Snapshot missing|ingestion/),
    });
  });

  it("returns 409 with SNAPSHOT_MISSING when prediction throws InvalidSquadError", async () => {
    vi.mocked(prisma.fplGameweek.findFirst).mockResolvedValue({ id: eventId });
    vi.mocked(predictTransfersForEntry).mockRejectedValue(
      new InvalidSquadError("Invalid squad", { leagueId, entryId, eventId })
    );
    const request = mockRequest();
    const reply = mockReply();

    await getEntryPredictionsHandler(request, reply);

    expect(reply.statusCode).toBe(409);
    expect(reply.payload).toMatchObject({ code: "SNAPSHOT_MISSING" });
  });

  it("returns 200 with meta and enriched predictions when engine returns data", async () => {
    vi.mocked(prisma.fplGameweek.findFirst).mockResolvedValue({ id: eventId });
    const preds = [
      predictionRow(1, 2, { score: 80, probability: 0.5 }),
    ];
    vi.mocked(predictTransfersForEntry).mockResolvedValue({ predictions: preds });
    vi.mocked(prisma.fplPlayer.findMany).mockResolvedValue([
      playerRow(1, { webName: "Saka", nowCost: 85 }),
      playerRow(2, { webName: "Foden", nowCost: 90, team: { id: 11, shortName: "MCI" } }),
    ]);
    const request = mockRequest();
    const reply = mockReply();

    await getEntryPredictionsHandler(request, reply);

    expect(reply.statusCode).toBe(200);
    const payload = reply.payload as { meta: unknown; predictions: unknown[] };
    expect(payload.meta).toMatchObject({
      leagueId,
      entryId,
      eventId,
    });
    expect(payload.meta).toHaveProperty("generatedAt");
    expect(payload.predictions).toHaveLength(1);
    expect(payload.predictions[0]).toMatchObject({
      out: { playerId: 1, webName: "Saka", nowCost: 85, team: { id: 1, shortName: "ARS" }, position: { id: 3, shortName: "MID" } },
      in: { playerId: 2, webName: "Foden", nowCost: 90 },
      score: 80,
      probability: 0.5,
      estimatedCostDelta: 5,
      resultingBank: 10,
      reasons: ["High ownership"],
    });
  });

  it("calls predictTransfersForEntry with leagueId, entryId, eventId and limit", async () => {
    vi.mocked(prisma.fplGameweek.findFirst).mockResolvedValue({ id: eventId });
    vi.mocked(predictTransfersForEntry).mockResolvedValue({ predictions: [] });
    const request = mockRequest({}, { eventId: "26", limit: "10" });
    const reply = mockReply();

    await getEntryPredictionsHandler(request, reply);

    expect(predictTransfersForEntry).toHaveBeenCalledWith({
      leagueId,
      entryId,
      eventId: 26,
      maxResults: 10,
    });
  });

  it("sets cache with correct key and TTL after successful response", async () => {
    vi.mocked(prisma.fplGameweek.findFirst).mockResolvedValue({ id: eventId });
    vi.mocked(predictTransfersForEntry).mockResolvedValue({ predictions: [] });
    const setSpy = vi.fn().mockResolvedValue(undefined);
    vi.mocked(getCache).mockResolvedValue({
      get: vi.fn().mockResolvedValue(null),
      set: setSpy,
    });
    const request = mockRequest();
    const reply = mockReply();

    await getEntryPredictionsHandler(request, reply);

    expect(setSpy).toHaveBeenCalledTimes(1);
    expect(setSpy).toHaveBeenCalledWith(
      `predictions:league:${leagueId}:entry:${entryId}:event:${eventId}:limit:20`,
      expect.objectContaining({ meta: expect.any(Object), predictions: [] }),
      60
    );
  });
});
