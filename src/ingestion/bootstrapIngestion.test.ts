import { describe, it, expect } from "vitest";
import {
  parseSelectedByPercent,
  parseDeadlineTime,
} from "./bootstrapIngestion";

describe("bootstrapIngestion mappers", () => {
  describe("parseSelectedByPercent", () => {
    it("parses valid decimal string to float", () => {
      expect(parseSelectedByPercent("45.2")).toBe(45.2);
      expect(parseSelectedByPercent("0")).toBe(0);
      expect(parseSelectedByPercent("100.0")).toBe(100);
    });

    it("returns null for invalid or empty string", () => {
      expect(parseSelectedByPercent("")).toBe(null);
      expect(parseSelectedByPercent("n/a")).toBe(null);
      expect(parseSelectedByPercent("--")).toBe(null);
    });
  });

  describe("parseDeadlineTime", () => {
    it("parses valid ISO string to Date", () => {
      const d = parseDeadlineTime("2025-08-15T17:30:00Z");
      expect(d).toBeInstanceOf(Date);
      expect(d.toISOString()).toBe("2025-08-15T17:30:00.000Z");
    });

    it("throws for invalid date string", () => {
      expect(() => parseDeadlineTime("not-a-date")).toThrow(/Invalid deadline_time/);
    });
  });
});
