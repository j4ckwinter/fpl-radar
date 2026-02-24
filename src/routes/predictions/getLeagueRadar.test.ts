import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../lib/prisma", () => ({
  prisma: {
    fplGameweek: { findFirst: vi.fn(), findUnique: vi.fn() },
    fplLeague: { findUnique: vi.fn() },
  },
}));

vi.mock("../../prediction/leagueRadar/generate", () => ({
  generateLeagueRadar: vi.fn(),
}));

import { prisma } from "../../lib/prisma";
import { generateLeagueRadar } from "../../prediction/leagueRadar/generate";
import { getLeagueRadarHandler } from "./getLeagueRadar";
import type { FastifyRequest, FastifyReply } from "fastify";

const leagueId = 123;
const eventId = 26;

function mockRequest(
  params: { leagueId?: string } = {},
  query: Record<string, string | undefined> = {}
): FastifyRequest<{
  Params: { leagueId: string };
  Querystring: Record<string, string | undefined>;
}> {
  return {
    params: { leagueId: String(leagueId), ...params },
    query,
    log: {
      info: vi.fn(),
      error: vi.fn(),
    },
  } as unknown as FastifyRequest<{
    Params: { leagueId: string };
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

function leagueRadarResult(overrides: Partial<{ leagueId: number; eventId: number }> = {}) {
  return {
    leagueId,
    eventId,
    generatedAt: "2026-02-24T12:00:00.000Z",
    coverage: {
      totalEntries: 10,
      processed: 10,
      succeeded: 9,
      failed: 1,
      durationMs: 500,
    },
    buyRadar: [],
    sellRadar: [],
    transferRadar: [],
    ...overrides,
  };
}

const startedGameweek = {
  id: eventId,
  name: "GW26",
  deadlineTime: new Date(0),
};

describe("getLeagueRadarHandler", () => {
  beforeEach(() => {
    vi.mocked(prisma.fplGameweek.findFirst).mockResolvedValue(null);
    vi.mocked(prisma.fplGameweek.findUnique).mockResolvedValue(startedGameweek);
    vi.mocked(prisma.fplLeague.findUnique).mockResolvedValue(null);
    vi.mocked(generateLeagueRadar).mockResolvedValue(leagueRadarResult());
  });

  it("returns 400 when leagueId is invalid", async () => {
    const request = mockRequest({ leagueId: "abc" });
    const reply = mockReply();

    await getLeagueRadarHandler(request, reply);

    expect(reply.statusCode).toBe(400);
    expect(reply.payload).toMatchObject({
      error: "Bad Request",
      message: "Invalid leagueId",
    });
    expect(generateLeagueRadar).not.toHaveBeenCalled();
  });

  it("returns 400 when query params are invalid", async () => {
    vi.mocked(prisma.fplGameweek.findFirst).mockResolvedValue({ id: eventId });
    vi.mocked(prisma.fplLeague.findUnique).mockResolvedValue({ id: leagueId });
    const request = mockRequest({}, { maxEntries: "0" });
    const reply = mockReply();

    await getLeagueRadarHandler(request, reply);

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

    await getLeagueRadarHandler(request, reply);

    expect(reply.statusCode).toBe(400);
    expect(reply.payload).toMatchObject({
      message: expect.stringMatching(/gameweek|bootstrap/),
    });
  });

  it("returns 404 when league does not exist", async () => {
    vi.mocked(prisma.fplGameweek.findFirst).mockResolvedValue({ id: eventId });
    vi.mocked(prisma.fplLeague.findUnique).mockResolvedValue(null);
    const request = mockRequest();
    const reply = mockReply();

    await getLeagueRadarHandler(request, reply);

    expect(reply.statusCode).toBe(404);
    expect(reply.payload).toMatchObject({
      error: "Not Found",
      message: `League ${leagueId} not found`,
    });
    expect(generateLeagueRadar).not.toHaveBeenCalled();
  });

  it("returns 200 with league radar result when league exists", async () => {
    vi.mocked(prisma.fplGameweek.findFirst).mockResolvedValue({ id: eventId });
    vi.mocked(prisma.fplLeague.findUnique).mockResolvedValue({ id: leagueId });
    const result = leagueRadarResult();
    vi.mocked(generateLeagueRadar).mockResolvedValue(result);
    const request = mockRequest();
    const reply = mockReply();

    await getLeagueRadarHandler(request, reply);

    expect(reply.statusCode).toBe(200);
    expect(reply.payload).toEqual(result);
  });

  it("calls generateLeagueRadar with leagueId, eventId and default concurrency", async () => {
    vi.mocked(prisma.fplGameweek.findFirst).mockResolvedValue({ id: eventId });
    vi.mocked(prisma.fplLeague.findUnique).mockResolvedValue({ id: leagueId });
    const request = mockRequest();
    const reply = mockReply();

    await getLeagueRadarHandler(request, reply);

    expect(generateLeagueRadar).toHaveBeenCalledWith(
      expect.objectContaining({
        leagueId,
        eventId,
        maxEntries: undefined,
        concurrency: 5,
      })
    );
  });

  it("passes eventId, maxEntries and concurrency from query to generateLeagueRadar", async () => {
    vi.mocked(prisma.fplGameweek.findFirst).mockResolvedValue({ id: eventId });
    vi.mocked(prisma.fplLeague.findUnique).mockResolvedValue({ id: leagueId });
    const request = mockRequest({}, { eventId: "26", maxEntries: "50", concurrency: "3" });
    const reply = mockReply();

    await getLeagueRadarHandler(request, reply);

    expect(generateLeagueRadar).toHaveBeenCalledWith(
      expect.objectContaining({
        leagueId,
        eventId: 26,
        maxEntries: 50,
        concurrency: 3,
      })
    );
  });

  it("uses resolved eventId from DB when eventId not in query", async () => {
    vi.mocked(prisma.fplGameweek.findFirst).mockResolvedValue({ id: 99 });
    vi.mocked(prisma.fplLeague.findUnique).mockResolvedValue({ id: leagueId });
    const request = mockRequest();
    const reply = mockReply();

    await getLeagueRadarHandler(request, reply);

    expect(generateLeagueRadar).toHaveBeenCalledWith(
      expect.objectContaining({
        leagueId,
        eventId: 99,
      })
    );
  });
});
