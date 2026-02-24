import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../squadLoader", () => ({
  loadSquadState: vi.fn(),
}));
vi.mock("../sellScoring", () => ({
  scoreSellCandidates: vi.fn(),
}));
vi.mock("../buyScoring", () => ({
  scoreBuyCandidates: vi.fn(),
}));
vi.mock("../candidateGenerator", () => ({
  generateSingleTransferCandidates: vi.fn(),
}));

import { loadSquadState } from "../squadLoader";
import { scoreSellCandidates } from "../sellScoring";
import { scoreBuyCandidates } from "../buyScoring";
import { generateSingleTransferCandidates } from "../candidateGenerator";
import { predictTransfersForEntry } from "./predict";
import { TRANSFER_PREDICTION } from "./constants";

const leagueId = 1;
const entryId = 100;
const eventId = 5;

function squadState(overrides: { bank?: number | null; players?: Array<{ playerId: number; teamId: number; positionId: number; nowCost: number }> } = {}) {
  return {
    entryId,
    leagueId,
    eventId,
    bank: 0 as number | null,
    players: [
      { playerId: 1, teamId: 1, positionId: 1, nowCost: 50 },
      { playerId: 2, teamId: 2, positionId: 1, nowCost: 55 },
    ],
    ...overrides,
  };
}

function sellScore(playerId: number, sellScore: number, reasons: string[] = []) {
  return {
    playerId,
    sellScore,
    reasons,
    features: { isFlagged: false, status: "a", hasNews: false, selectedByPercent: 10, isBenched: false, isCaptainOrVice: false, nowCost: 50 },
  };
}

function buyScore(playerId: number, buyScore: number, reasons: string[] = []) {
  return {
    playerId,
    buyScore,
    reasons,
    features: {},
  };
}

function candidate(
  outPlayerId: number,
  inPlayerId: number,
  overrides: Partial<{
    estimatedCostDelta: number;
    resultingBank: number | null;
    checks: { budgetOk?: boolean; teamLimitOk?: boolean; positionOk?: boolean };
  }> = {}
) {
  const { checks: checksOverrides, ...rest } = overrides;
  return {
    outPlayerId,
    inPlayerId,
    outTeamId: 1,
    inTeamId: 2,
    positionId: 1,
    estimatedSellPrice: 50,
    buyPrice: 55,
    estimatedCostDelta: 5,
    resultingBank: 0 as number | null,
    checks: {
      budgetOk: true,
      alreadyOwned: false,
      teamLimitOk: true,
      positionOk: true,
      ...checksOverrides,
    },
    ...rest,
  };
}

describe("predictTransfersForEntry", () => {
  beforeEach(() => {
    vi.mocked(loadSquadState).mockResolvedValue(squadState() as never);
    vi.mocked(scoreSellCandidates).mockResolvedValue({
      scores: [
        sellScore(1, 20, ["Sell reason 1"]),
        sellScore(2, 25, ["Sell reason 2"]),
      ],
    } as never);
    vi.mocked(scoreBuyCandidates).mockResolvedValue({
      scores: [
        buyScore(2, 20, ["Buy reason 1"]),
        buyScore(3, 25, ["Buy reason 2"]),
      ],
    } as never);
    vi.mocked(generateSingleTransferCandidates).mockResolvedValue({
      candidates: [
        candidate(1, 2),
        candidate(1, 3),
        candidate(2, 2),
      ],
    } as never);
  });

  it("calls loadSquadState with leagueId, entryId, eventId", async () => {
    await predictTransfersForEntry({ leagueId, entryId, eventId });

    expect(loadSquadState).toHaveBeenCalledWith({ leagueId, entryId, eventId });
  });

  it("calls scoreSellCandidates and scoreBuyCandidates with leagueId, entryId, eventId", async () => {
    await predictTransfersForEntry({ leagueId, entryId, eventId });

    expect(scoreSellCandidates).toHaveBeenCalledWith({ leagueId, entryId, eventId });
    expect(scoreBuyCandidates).toHaveBeenCalledWith({
      leagueId,
      entryId,
      eventId,
      limit: 200,
    });
  });

  it("calls generateSingleTransferCandidates with squad and maxCandidates 2000", async () => {
    const squad = squadState();
    vi.mocked(loadSquadState).mockResolvedValue(squad as never);

    await predictTransfersForEntry({ leagueId, entryId, eventId });

    expect(generateSingleTransferCandidates).toHaveBeenCalledWith({
      squad,
      maxCandidates: 2000,
    });
  });

  it("returns predictions with score, probability, reasons, and features", async () => {
    const { predictions } = await predictTransfersForEntry({
      leagueId,
      entryId,
      eventId,
      maxResults: 5,
    });

    expect(predictions.length).toBeGreaterThan(0);
    for (const p of predictions) {
      expect(p).toHaveProperty("outPlayerId");
      expect(p).toHaveProperty("inPlayerId");
      expect(p.score).toBeGreaterThanOrEqual(0);
      expect(p.score).toBeLessThanOrEqual(100);
      expect(p.probability).toBeGreaterThanOrEqual(0);
      expect(p.probability).toBeLessThanOrEqual(1);
      expect(Array.isArray(p.reasons)).toBe(true);
      expect(p.features).toMatchObject({
        sellScore: expect.any(Number),
        buyScore: expect.any(Number),
        estimatedCostDelta: expect.any(Number),
        resultingBank: expect.anything(),
        budgetOk: expect.any(Boolean),
        teamLimitOk: expect.any(Boolean),
        positionOk: expect.any(Boolean),
      });
    }
  });

  it("returns probabilities that sum to 1", async () => {
    const { predictions } = await predictTransfersForEntry({
      leagueId,
      entryId,
      eventId,
      maxResults: 10,
    });

    const sum = predictions.reduce((s, p) => s + p.probability, 0);
    expect(sum).toBeCloseTo(1, 10);
  });

  it("respects maxResults", async () => {
    const { predictions } = await predictTransfersForEntry({
      leagueId,
      entryId,
      eventId,
      maxResults: 2,
    });

    expect(predictions).toHaveLength(2);
  });

  it("uses default maxResults when not provided", async () => {
    const { predictions } = await predictTransfersForEntry({
      leagueId,
      entryId,
      eventId,
    });

    expect(predictions.length).toBeLessThanOrEqual(TRANSFER_PREDICTION.MAX_RESULTS);
  });

  it("filters out candidates below MIN_SELL_SCORE", async () => {
    vi.mocked(scoreSellCandidates).mockResolvedValue({
      scores: [
        sellScore(1, 5, []),
        sellScore(2, 10, []),
      ],
    } as never);
    vi.mocked(scoreBuyCandidates).mockResolvedValue({
      scores: [buyScore(2, 50), buyScore(3, 50)],
    } as never);
    vi.mocked(generateSingleTransferCandidates).mockResolvedValue({
      candidates: [candidate(1, 2), candidate(2, 3)],
    } as never);

    const { predictions } = await predictTransfersForEntry({
      leagueId,
      entryId,
      eventId,
    });

    expect(predictions).toHaveLength(0);
  });

  it("filters out candidates below MIN_BUY_SCORE", async () => {
    vi.mocked(scoreSellCandidates).mockResolvedValue({
      scores: [sellScore(1, 50), sellScore(2, 50)],
    } as never);
    vi.mocked(scoreBuyCandidates).mockResolvedValue({
      scores: [buyScore(2, 5), buyScore(3, 5)],
    } as never);
    vi.mocked(generateSingleTransferCandidates).mockResolvedValue({
      candidates: [candidate(1, 2), candidate(1, 3)],
    } as never);

    const { predictions } = await predictTransfersForEntry({
      leagueId,
      entryId,
      eventId,
    });

    expect(predictions).toHaveLength(0);
  });

  it("when no predictions with MIN_BUY_SCORE, retries with relaxed buy threshold", async () => {
    vi.mocked(scoreSellCandidates).mockResolvedValue({
      scores: [sellScore(1, 50), sellScore(2, 50)],
    } as never);
    vi.mocked(scoreBuyCandidates).mockResolvedValue({
      scores: [buyScore(2, 10), buyScore(3, 10)],
    } as never);
    vi.mocked(generateSingleTransferCandidates).mockResolvedValue({
      candidates: [candidate(1, 2), candidate(1, 3)],
    } as never);

    const { predictions } = await predictTransfersForEntry({
      leagueId,
      entryId,
      eventId,
    });

    const relaxedBuy = Math.floor(TRANSFER_PREDICTION.MIN_BUY_SCORE / 2);
    expect(relaxedBuy).toBe(7);
    expect(predictions.length).toBeGreaterThan(0);
  });

  it("excludes candidates with budgetOk false when bank is not null", async () => {
    vi.mocked(loadSquadState).mockResolvedValue(
      squadState({ bank: 100 }) as never
    );
    vi.mocked(generateSingleTransferCandidates).mockResolvedValue({
      candidates: [
        candidate(1, 2, { checks: { budgetOk: false } }),
        candidate(1, 3),
      ],
    } as never);

    const { predictions } = await predictTransfersForEntry({
      leagueId,
      entryId,
      eventId,
    });

    const fromBadBudget = predictions.filter((p) => p.outPlayerId === 1 && p.inPlayerId === 2);
    expect(fromBadBudget).toHaveLength(0);
  });

  it("excludes candidates with teamLimitOk false", async () => {
    vi.mocked(generateSingleTransferCandidates).mockResolvedValue({
      candidates: [
        candidate(1, 2, { checks: { teamLimitOk: false } }),
        candidate(1, 3),
      ],
    } as never);

    const { predictions } = await predictTransfersForEntry({
      leagueId,
      entryId,
      eventId,
    });

    const fromBadTeamLimit = predictions.filter((p) => p.outPlayerId === 1 && p.inPlayerId === 2);
    expect(fromBadTeamLimit).toHaveLength(0);
  });

  it("excludes candidates with positionOk false", async () => {
    vi.mocked(generateSingleTransferCandidates).mockResolvedValue({
      candidates: [
        candidate(1, 2, { checks: { positionOk: false } }),
        candidate(1, 3),
      ],
    } as never);

    const { predictions } = await predictTransfersForEntry({
      leagueId,
      entryId,
      eventId,
    });

    const fromBadPosition = predictions.filter((p) => p.outPlayerId === 1 && p.inPlayerId === 2);
    expect(fromBadPosition).toHaveLength(0);
  });
});
