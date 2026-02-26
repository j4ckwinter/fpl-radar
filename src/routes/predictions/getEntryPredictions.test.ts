import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../lib/prisma", () => ({
  prisma: {
    fplGameweek: { findFirst: vi.fn(), findUnique: vi.fn() },
    fplLeagueEntry: { findFirst: vi.fn() },
    fplPlayer: { findMany: vi.fn() },
  },
}));

vi.mock("../../lib/cache/cache", () => ({
  getCache: vi.fn(),
}));

vi.mock("../../prediction", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../../prediction")>();
  return {
    ...actual,
    predictTransfersForEntry: vi.fn(),
  };
});

import { getCache } from "../../lib/cache/cache";
import { prisma } from "../../lib/prisma";
import { predictTransfersForEntry } from "../../prediction";
import { InvalidSquadError, SquadNotFoundError } from "../../prediction/errors";
import { getEntryPredictionsHandler } from "./getEntryPredictions";
import type { FastifyRequest, FastifyReply } from "fastify";

const leagueId = 1;
const entryId = 100;
const eventId = 26;

function stubGameweek(id: number) {
  return {
    id,
    name: "GW26",
    deadlineTime: new Date(0),
    finished: false,
    isCurrent: true,
    isNext: false,
    updatedAt: new Date(0),
  };
}

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
    vi.mocked(prisma.fplLeagueEntry.findFirst).mockResolvedValue({
      id: entryId,
      leagueId: 1,
      entryName: "Entry",
      playerName: "Player",
      rank: 1,
      lastRank: null,
      totalPoints: 0,
      updatedAt: new Date(0),
    });
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
    vi.mocked(prisma.fplGameweek.findFirst).mockResolvedValue(stubGameweek(eventId));
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
    vi.mocked(prisma.fplGameweek.findFirst).mockResolvedValue(stubGameweek(eventId));
    vi.mocked(prisma.fplGameweek.findUnique).mockResolvedValue(stubGameweek(eventId));
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
    vi.mocked(prisma.fplGameweek.findFirst).mockResolvedValue(stubGameweek(eventId));
    vi.mocked(prisma.fplGameweek.findUnique).mockResolvedValue(stubGameweek(eventId));
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
    vi.mocked(prisma.fplGameweek.findFirst).mockResolvedValue(stubGameweek(eventId));
    vi.mocked(prisma.fplGameweek.findUnique).mockResolvedValue(stubGameweek(eventId));
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
    vi.mocked(prisma.fplGameweek.findFirst).mockResolvedValue(stubGameweek(eventId));
    vi.mocked(prisma.fplGameweek.findUnique).mockResolvedValue(stubGameweek(eventId));
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
    vi.mocked(prisma.fplGameweek.findFirst).mockResolvedValue(stubGameweek(eventId));
    vi.mocked(prisma.fplGameweek.findUnique).mockResolvedValue(stubGameweek(eventId));
    const preds = [
      predictionRow(1, 2, { score: 80, probability: 0.5 }),
    ];
    vi.mocked(predictTransfersForEntry).mockResolvedValue({ predictions: preds });
    vi.mocked(prisma.fplPlayer.findMany).mockResolvedValue([
      playerRow(1, { webName: "Saka", nowCost: 85 }),
      playerRow(2, { webName: "Foden", nowCost: 90, teamId: 11 }),
    ] as never);
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
    vi.mocked(prisma.fplGameweek.findFirst).mockResolvedValue(stubGameweek(eventId));
    vi.mocked(prisma.fplGameweek.findUnique).mockResolvedValue(stubGameweek(eventId));
    vi.mocked(predictTransfersForEntry).mockResolvedValue({ predictions: [] });
    const request = mockRequest({}, { eventId: "26", limit: "10" });
    const reply = mockReply();

    await getEntryPredictionsHandler(request, reply);

    expect(predictTransfersForEntry).toHaveBeenCalledWith({
      leagueId,
      entryId,
      eventId: 26,
      maxResults: 10,
      riskProfile: "balanced",
      includeScenarios: false,
    });
  });

  it("passes riskProfile from query to predictTransfersForEntry", async () => {
    vi.mocked(prisma.fplGameweek.findFirst).mockResolvedValue(stubGameweek(eventId));
    vi.mocked(prisma.fplGameweek.findUnique).mockResolvedValue(stubGameweek(eventId));
    vi.mocked(predictTransfersForEntry).mockResolvedValue({ predictions: [] });
    const req = mockRequest({}, { riskProfile: "safe" });
    const reply = mockReply();

    await getEntryPredictionsHandler(req, reply);

    expect(predictTransfersForEntry).toHaveBeenCalledWith(
      expect.objectContaining({ riskProfile: "safe" })
    );
  });

  it("sets cache with correct key and TTL after successful response", async () => {
    vi.mocked(prisma.fplGameweek.findFirst).mockResolvedValue(stubGameweek(eventId));
    vi.mocked(prisma.fplGameweek.findUnique).mockResolvedValue(stubGameweek(eventId));
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
      `predictions:league:${leagueId}:entry:${entryId}:event:${eventId}:limit:20:risk:balanced:scenarios:false:components:false`,
      expect.objectContaining({ meta: expect.any(Object), predictions: [] }),
      60
    );
  });

  it("passes includeScenarios and includeComponents from query and returns scenarios under meta.scenarioConfig", async () => {
    vi.mocked(prisma.fplGameweek.findFirst).mockResolvedValue(stubGameweek(eventId));
    vi.mocked(prisma.fplGameweek.findUnique).mockResolvedValue(stubGameweek(eventId));
    const stubScenarios = [
      { k: 1 as const, bundles: [{ outs: [1], ins: [2], score: 70, reasons: [], flags: {} }] },
    ];
    vi.mocked(predictTransfersForEntry).mockResolvedValue({
      predictions: [],
      scenarios: stubScenarios,
      scenarioConfig: {
        computedAt: "2025-01-01T00:00:00.000Z",
        beamWidth: 200,
        resultsPerK: 20,
        sellPool: 8,
        buyPoolPerPosition: 6,
        maxEdgesPerOut: 8,
      },
    });
    vi.mocked(prisma.fplPlayer.findMany).mockResolvedValue([
      playerRow(1, { webName: "Out", nowCost: 80 }),
      playerRow(2, { webName: "In", nowCost: 85 }),
    ] as never);
    const request = mockRequest({}, { includeScenarios: "true" });
    const reply = mockReply();

    await getEntryPredictionsHandler(request, reply);

    expect(predictTransfersForEntry).toHaveBeenCalledWith(
      expect.objectContaining({ includeScenarios: true })
    );
    const payload = reply.payload as { meta: { scenarioConfig?: unknown }; scenarios?: unknown[] };
    expect(payload.meta.scenarioConfig).toBeDefined();
    expect(payload.meta.scenarioConfig).toMatchObject({ beamWidth: 200 });
    expect(payload.scenarios).toHaveLength(1);
    expect(payload.scenarios![0]).toMatchObject({ k: 1 });
    const bundle = (payload.scenarios![0] as { bundles: unknown[] }).bundles[0];
    expect(bundle).toMatchObject({
      bundleId: "k:1|out:1|in:2",
      score: 70,
      probability: expect.any(Number),
      reasons: [],
      flags: {},
    });
    expect(bundle).toHaveProperty("outs");
    expect(bundle).toHaveProperty("ins");
    expect((bundle as { outs: unknown[] }).outs).toHaveLength(1);
    expect((bundle as { outs: unknown[] }).outs[0]).toMatchObject({ playerId: 1, webName: "Out" });
    expect((bundle as { ins: unknown[] }).ins[0]).toMatchObject({ playerId: 2, webName: "In" });
    expect((bundle as { bundleId: string }).bundleId).toMatch(
      /^k:\d+\|out:[\d,]*\|in:[\d,]*$/
    );
  });

  describe("response contract", () => {
    const BUNDLE_ID_REGEX = /^k:\d+\|out:[\d,]*\|in:[\d,]*$/;
    const PROBABILITY_SUM_TOLERANCE = 1e-6;

    it("meta is present and includes scenarioConfig when includeScenarios=true", async () => {
      vi.mocked(prisma.fplGameweek.findFirst).mockResolvedValue(stubGameweek(eventId));
      vi.mocked(prisma.fplGameweek.findUnique).mockResolvedValue(stubGameweek(eventId));
      vi.mocked(predictTransfersForEntry).mockResolvedValue({
        predictions: [],
        scenarios: [{ k: 1, bundles: [{ outs: [1], ins: [2], score: 70, reasons: [], flags: {} }] }],
        scenarioConfig: {
          computedAt: "",
          beamWidth: 200,
          resultsPerK: 20,
          sellPool: 8,
          buyPoolPerPosition: 6,
          maxEdgesPerOut: 8,
        },
      });
      vi.mocked(prisma.fplPlayer.findMany).mockResolvedValue([
        playerRow(1),
        playerRow(2),
      ] as never);
      const reply = mockReply();
      await getEntryPredictionsHandler(mockRequest({}, { includeScenarios: "true" }), reply);

      const payload = reply.payload as { meta: unknown };
      expect(payload.meta).toBeDefined();
      expect(payload.meta).toHaveProperty("leagueId");
      expect(payload.meta).toHaveProperty("generatedAt");
      expect(payload.meta).toHaveProperty("scenarioConfig");
    });

    it("every scenario bundle bundleId matches stable format", async () => {
      vi.mocked(prisma.fplGameweek.findFirst).mockResolvedValue(stubGameweek(eventId));
      vi.mocked(prisma.fplGameweek.findUnique).mockResolvedValue(stubGameweek(eventId));
      vi.mocked(predictTransfersForEntry).mockResolvedValue({
        predictions: [],
        scenarios: [
          { k: 2, bundles: [{ outs: [5, 21], ins: [77, 82], score: 100, reasons: [], flags: {} }] },
        ],
        scenarioConfig: {
          computedAt: "",
          beamWidth: 200,
          resultsPerK: 20,
          sellPool: 8,
          buyPoolPerPosition: 6,
          maxEdgesPerOut: 8,
        },
      });
      vi.mocked(prisma.fplPlayer.findMany).mockResolvedValue(
        [5, 21, 77, 82].map((id) => playerRow(id)) as never
      );
      const reply = mockReply();
      await getEntryPredictionsHandler(mockRequest({}, { includeScenarios: "true" }), reply);

      const scenarios = (reply.payload as { scenarios: { bundles: { bundleId: string }[] }[] }).scenarios ?? [];
      for (const scenario of scenarios) {
        for (const bundle of scenario.bundles) {
          expect(bundle.bundleId).toMatch(BUNDLE_ID_REGEX);
        }
      }
      expect((scenarios[0].bundles[0] as { bundleId: string }).bundleId).toBe(
        "k:2|out:5,21|in:77,82"
      );
    });

    it("predictions probabilities sum to approximately 1", async () => {
      vi.mocked(prisma.fplGameweek.findFirst).mockResolvedValue(stubGameweek(eventId));
      vi.mocked(prisma.fplGameweek.findUnique).mockResolvedValue(stubGameweek(eventId));
      const preds = [
        predictionRow(1, 2, { score: 80, probability: 0.5 }),
        predictionRow(3, 4, { score: 70, probability: 0.3 }),
        predictionRow(5, 6, { score: 60, probability: 0.2 }),
      ];
      vi.mocked(predictTransfersForEntry).mockResolvedValue({ predictions: preds });
      vi.mocked(prisma.fplPlayer.findMany).mockResolvedValue(
        [1, 2, 3, 4, 5, 6].map((id) => playerRow(id)) as never
      );
      const reply = mockReply();
      await getEntryPredictionsHandler(mockRequest(), reply);

      const predictions = (reply.payload as { predictions: { probability: number }[] }).predictions;
      const sum = predictions.reduce((s, p) => s + p.probability, 0);
      expect(Math.abs(sum - 1)).toBeLessThanOrEqual(PROBABILITY_SUM_TOLERANCE);
    });

    it("each scenario bundle probabilities sum to approximately 1", async () => {
      vi.mocked(prisma.fplGameweek.findFirst).mockResolvedValue(stubGameweek(eventId));
      vi.mocked(prisma.fplGameweek.findUnique).mockResolvedValue(stubGameweek(eventId));
      vi.mocked(predictTransfersForEntry).mockResolvedValue({
        predictions: [],
        scenarios: [
          {
            k: 2,
            bundles: [
              { outs: [1, 3], ins: [2, 4], score: 90, reasons: [], flags: {} },
              { outs: [5, 7], ins: [6, 8], score: 80, reasons: [], flags: {} },
            ],
          },
        ],
        scenarioConfig: {
          computedAt: "",
          beamWidth: 200,
          resultsPerK: 20,
          sellPool: 8,
          buyPoolPerPosition: 6,
          maxEdgesPerOut: 8,
        },
      });
      vi.mocked(prisma.fplPlayer.findMany).mockResolvedValue(
        [1, 2, 3, 4, 5, 6, 7, 8].map((id) => playerRow(id)) as never
      );
      const reply = mockReply();
      await getEntryPredictionsHandler(mockRequest({}, { includeScenarios: "true" }), reply);

      const scenarios = (reply.payload as { scenarios: { bundles: { probability: number }[] }[] })
        .scenarios ?? [];
      for (const scenario of scenarios) {
        const sum = scenario.bundles.reduce((s, b) => s + b.probability, 0);
        expect(Math.abs(sum - 1)).toBeLessThanOrEqual(PROBABILITY_SUM_TOLERANCE);
      }
    });
  });
});
