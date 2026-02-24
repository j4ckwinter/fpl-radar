import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryCache } from "../lib/cache/cache";
import { FplClient } from "./fplClient";
import { FplValidationError } from "./errors";

const validBootstrap = {
  teams: [
    { id: 1, name: "Team A", short_name: "A", code: 1 },
  ],
  elements: [
    {
      id: 1,
      first_name: "First",
      second_name: "Last",
      web_name: "FLast",
      team: 1,
      element_type: 1,
      now_cost: 100,
      status: "a",
      news: "",
      selected_by_percent: "0.1",
    },
  ],
  element_types: [{ id: 1, singular_name_short: "GKP" }],
  events: [
    {
      id: 1,
      name: "Gameweek 1",
      deadline_time: "2025-08-15T17:30:00Z",
      finished: true,
      is_current: false,
      is_next: false,
    },
  ],
};

const mockGet = vi.fn();
vi.mock("../lib/http/httpClient", () => ({
  get: (url: string) => mockGet(url),
}));

const noopLogger = {
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
};

describe("FplClient", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getBootstrapStatic", () => {
    it("returns cached data on second call without refetching", async () => {
      mockGet.mockResolvedValueOnce({
        status: 200,
        headers: new Headers(),
        json: async () => validBootstrap,
      });

      const cache = new MemoryCache();
      const client = new FplClient({ cache, logger: noopLogger });

      const first = await client.getBootstrapStatic();
      const second = await client.getBootstrapStatic();

      expect(first.teams).toHaveLength(1);
      expect(second.teams).toHaveLength(1);
      expect(mockGet).toHaveBeenCalledTimes(1);
    });

    it("throws FplValidationError when payload is invalid", async () => {
      mockGet.mockResolvedValueOnce({
        status: 200,
        headers: new Headers(),
        json: async () => ({ teams: "not-an-array" }),
      });

      const cache = new MemoryCache();
      const client = new FplClient({ cache, logger: noopLogger });

      await expect(client.getBootstrapStatic()).rejects.toThrow(FplValidationError);
    });
  });
});
