import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { MemoryCache } from "./cache";

describe("MemoryCache", () => {
  describe("expiry", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });
    afterEach(() => {
      vi.useRealTimers();
    });

    it("returns null after TTL has elapsed", async () => {
      const cache = new MemoryCache();
      await cache.set("k", "v", 1);
      expect(await cache.get<string>("k")).toBe("v");
      vi.advanceTimersByTime(1001);
      expect(await cache.get<string>("k")).toBe(null);
    });

    it("returns value before TTL has elapsed", async () => {
      const cache = new MemoryCache();
      await cache.set("k", 42, 10);
      vi.advanceTimersByTime(5000);
      expect(await cache.get<number>("k")).toBe(42);
    });
  });
});
