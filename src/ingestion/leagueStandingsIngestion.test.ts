import { describe, it, expect } from "vitest";
import { mapStandingToEntryRow } from "./leagueStandingsIngestion.utils";
import type { LeagueStandingsResult } from "../fpl/schemas/leagueStandings.schema";

function standing(overrides: Partial<LeagueStandingsResult> = {}): LeagueStandingsResult {
  return {
    entry: 100,
    entry_name: "My Team",
    player_name: "John Doe",
    rank: 1,
    last_rank: 2,
    total: 1500,
    ...overrides,
  };
}

describe("leagueStandingsIngestion.utils", () => {
  describe("mapStandingToEntryRow", () => {
    it("maps API result to entry row with leagueId", () => {
      const row = standing();
      const result = mapStandingToEntryRow(row, 12345);
      expect(result).toEqual({
        id: 100,
        leagueId: 12345,
        entryName: "My Team",
        playerName: "John Doe",
        rank: 1,
        lastRank: 2,
        totalPoints: 1500,
      });
    });

    it("uses entry as id", () => {
      const row = standing({ entry: 999 });
      const result = mapStandingToEntryRow(row, 1);
      expect(result.id).toBe(999);
    });

    it("maps entry_name to entryName", () => {
      const row = standing({ entry_name: "Rivals FC" });
      expect(mapStandingToEntryRow(row, 1).entryName).toBe("Rivals FC");
    });

    it("maps player_name to playerName", () => {
      const row = standing({ player_name: "Jane Smith" });
      expect(mapStandingToEntryRow(row, 1).playerName).toBe("Jane Smith");
    });

    it("maps rank, last_rank and total to rank, lastRank, totalPoints", () => {
      const row = standing({ rank: 5, last_rank: 3, total: 1420 });
      const result = mapStandingToEntryRow(row, 1);
      expect(result.rank).toBe(5);
      expect(result.lastRank).toBe(3);
      expect(result.totalPoints).toBe(1420);
    });

    it("applies leagueId to every row", () => {
      const row = standing();
      expect(mapStandingToEntryRow(row, 999).leagueId).toBe(999);
      expect(mapStandingToEntryRow(row, 1).leagueId).toBe(1);
    });
  });
});
