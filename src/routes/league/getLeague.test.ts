import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../lib/prisma", () => ({
  prisma: {
    fplLeague: {
      findUnique: vi.fn(),
    },
    fplLeagueEntry: {
      count: vi.fn(),
      findMany: vi.fn(),
    },
    fplEntrySnapshot: {
      findMany: vi.fn(),
    },
  },
}));

import { prisma } from "../../lib/prisma";
import { getLeagueHandler } from "./getLeague";
import type { FastifyRequest, FastifyReply } from "fastify";

const leagueId = 123;

function mockRequest(
  params: { leagueId?: string } = {},
  query: Record<string, string | undefined> = {}
): FastifyRequest<{ Params: { leagueId: string }; Querystring: Record<string, string | undefined> }> {
  return {
    params: { leagueId: String(leagueId), ...params },
    query,
  } as unknown as FastifyRequest<{
    Params: { leagueId: string };
    Querystring: Record<string, string | undefined>;
  }>;
}

function mockReply(): FastifyReply & { statusCode: number; payload: unknown } {
  let statusCode = 200;
  let payload: unknown;
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

function leagueRow(overrides: Partial<{ id: number; name: string; updatedAt: Date }> = {}) {
  return {
    id: leagueId,
    name: "My Mini League",
    updatedAt: new Date("2026-02-24T09:00:00.000Z"),
    ...overrides,
  };
}

function entryRow(
  id: number,
  overrides: Partial<{ entryName: string; playerName: string; rank: number; lastRank: number | null; totalPoints: number }> = {}
) {
  return {
    id,
    entryName: "Team A",
    playerName: "Manager A",
    rank: 1,
    lastRank: 2,
    totalPoints: 1450,
    ...overrides,
  };
}

describe("getLeagueHandler", () => {
  beforeEach(() => {
    vi.mocked(prisma.fplLeague.findUnique).mockResolvedValue(null);
    vi.mocked(prisma.fplLeagueEntry.count).mockResolvedValue(0);
    vi.mocked(prisma.fplLeagueEntry.findMany).mockResolvedValue([]);
    vi.mocked(prisma.fplEntrySnapshot.findMany).mockResolvedValue([]);
    vi.mocked(prisma.fplEntrySnapshot.findMany).mockClear();
  });

  it("returns 400 when leagueId is invalid", async () => {
    const request = mockRequest({ leagueId: "not-a-number" });
    const reply = mockReply();

    await getLeagueHandler(request, reply);

    expect(reply.statusCode).toBe(400);
    expect(reply.payload).toMatchObject({
      error: "Bad Request",
      message: "Invalid leagueId",
    });
    expect(prisma.fplLeague.findUnique).not.toHaveBeenCalled();
  });

  it("returns 400 when query limit is out of bounds", async () => {
    const request = mockRequest({}, { limit: "300" });
    const reply = mockReply();

    await getLeagueHandler(request, reply);

    expect(reply.statusCode).toBe(400);
    expect(reply.payload).toMatchObject({
      error: "Bad Request",
      message: "Invalid query parameters",
    });
  });

  it("returns 404 when league does not exist", async () => {
    vi.mocked(prisma.fplLeague.findUnique).mockResolvedValue(null);
    const request = mockRequest();
    const reply = mockReply();

    await getLeagueHandler(request, reply);

    expect(reply.statusCode).toBe(404);
    expect(reply.payload).toMatchObject({
      error: "Not Found",
      message: `League ${leagueId} not found`,
    });
  });

  it("returns 200 with league, rivals and page when league exists", async () => {
    const league = leagueRow();
    vi.mocked(prisma.fplLeague.findUnique).mockResolvedValue(league);
    vi.mocked(prisma.fplLeagueEntry.count).mockResolvedValue(2);
    vi.mocked(prisma.fplLeagueEntry.findMany).mockResolvedValue([
      entryRow(111, { rank: 1 }),
      entryRow(222, { rank: 2 }),
    ]);
    const request = mockRequest();
    const reply = mockReply();

    await getLeagueHandler(request, reply);

    expect(reply.statusCode).toBe(200);
    expect(reply.payload).toMatchObject({
      league: {
        id: leagueId,
        name: "My Mini League",
        updatedAt: "2026-02-24T09:00:00.000Z",
      },
      rivals: [
        { entryId: 111, entryName: "Team A", playerName: "Manager A", rank: 1, totalPoints: 1450, hasSnapshot: null },
        { entryId: 222, entryName: "Team A", playerName: "Manager A", rank: 2, totalPoints: 1450, hasSnapshot: null },
      ],
      page: { limit: 50, offset: 0, total: 2 },
    });
    expect(prisma.fplEntrySnapshot.findMany).not.toHaveBeenCalled();
  });

  it("uses default limit and offset when not provided", async () => {
    const league = leagueRow();
    vi.mocked(prisma.fplLeague.findUnique).mockResolvedValue(league);
    vi.mocked(prisma.fplLeagueEntry.count).mockResolvedValue(0);
    vi.mocked(prisma.fplLeagueEntry.findMany).mockResolvedValue([]);
    const request = mockRequest();
    const reply = mockReply();

    await getLeagueHandler(request, reply);

    expect(prisma.fplLeagueEntry.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        skip: 0,
        take: 50,
      })
    );
    expect(reply.payload).toMatchObject({
      page: { limit: 50, offset: 0, total: 0 },
    });
  });

  it("passes limit and offset from query to DB and response", async () => {
    const league = leagueRow();
    vi.mocked(prisma.fplLeague.findUnique).mockResolvedValue(league);
    vi.mocked(prisma.fplLeagueEntry.count).mockResolvedValue(100);
    vi.mocked(prisma.fplLeagueEntry.findMany).mockResolvedValue([entryRow(1)]);
    const request = mockRequest({}, { limit: "10", offset: "5" });
    const reply = mockReply();

    await getLeagueHandler(request, reply);

    expect(prisma.fplLeagueEntry.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        skip: 5,
        take: 10,
      })
    );
    expect(reply.payload).toMatchObject({
      page: { limit: 10, offset: 5, total: 100 },
    });
  });

  it("sets hasSnapshot per rival when eventId provided and snapshots queried", async () => {
    const league = leagueRow();
    vi.mocked(prisma.fplLeague.findUnique).mockResolvedValue(league);
    vi.mocked(prisma.fplLeagueEntry.count).mockResolvedValue(2);
    vi.mocked(prisma.fplLeagueEntry.findMany).mockResolvedValue([
      entryRow(111, { rank: 1 }),
      entryRow(222, { rank: 2 }),
    ]);
    vi.mocked(prisma.fplEntrySnapshot.findMany).mockResolvedValue([
      { entryId: 111 },
    ]);
    const request = mockRequest({}, { eventId: "26" });
    const reply = mockReply();

    await getLeagueHandler(request, reply);

    expect(prisma.fplEntrySnapshot.findMany).toHaveBeenCalledWith({
      where: {
        leagueId,
        eventId: 26,
        entryId: { in: [111, 222] },
      },
      select: { entryId: true },
    });
    expect(reply.statusCode).toBe(200);
    expect(reply.payload).toMatchObject({
      rivals: [
        { entryId: 111, hasSnapshot: true },
        { entryId: 222, hasSnapshot: false },
      ],
    });
  });

  it("does not query snapshots when eventId is omitted", async () => {
    const league = leagueRow();
    vi.mocked(prisma.fplLeague.findUnique).mockResolvedValue(league);
    vi.mocked(prisma.fplLeagueEntry.count).mockResolvedValue(1);
    vi.mocked(prisma.fplLeagueEntry.findMany).mockResolvedValue([entryRow(111)]);
    const request = mockRequest();
    const reply = mockReply();

    await getLeagueHandler(request, reply);

    expect(prisma.fplEntrySnapshot.findMany).not.toHaveBeenCalled();
    const payload = reply.payload as { rivals: Array<{ hasSnapshot: unknown }> };
    expect(payload.rivals[0].hasSnapshot).toBeNull();
  });
});
