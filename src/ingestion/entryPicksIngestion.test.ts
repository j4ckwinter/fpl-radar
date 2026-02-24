import { describe, it, expect } from "vitest";
import {
  resolveEventIdFromBootstrap,
  type BootstrapEvent,
} from "./entryPicksIngestion.utils";

function event(
  id: number,
  opts: { finished?: boolean; is_next?: boolean; is_current?: boolean } = {}
): BootstrapEvent {
  return {
    id,
    finished: opts.finished ?? false,
    is_next: opts.is_next ?? false,
    is_current: opts.is_current ?? false,
  };
}

describe("entryPicksIngestion.utils", () => {
  describe("resolveEventIdFromBootstrap", () => {
    it("returns is_next event when present", () => {
      const events: BootstrapEvent[] = [
        event(1, { finished: true }),
        event(2, { is_next: true, finished: false }),
        event(3, { is_current: true, finished: false }),
      ];
      expect(resolveEventIdFromBootstrap(events)).toEqual({
        eventId: 2,
        eventFinished: false,
      });
    });

    it("returns is_current event when is_next is absent", () => {
      const events: BootstrapEvent[] = [
        event(1, { finished: true }),
        event(2, { is_current: true, finished: false }),
        event(3),
      ];
      expect(resolveEventIdFromBootstrap(events)).toEqual({
        eventId: 2,
        eventFinished: false,
      });
    });

    it("returns latest unfinished by id when no is_next or is_current", () => {
      const events: BootstrapEvent[] = [
        event(10, { finished: true }),
        event(20, { finished: false }),
        event(15, { finished: false }),
      ];
      expect(resolveEventIdFromBootstrap(events)).toEqual({
        eventId: 20,
        eventFinished: false,
      });
    });

    it("returns latest finished by id when all events are finished", () => {
      const events: BootstrapEvent[] = [
        event(10, { finished: true }),
        event(20, { finished: true }),
        event(15, { finished: true }),
      ];
      expect(resolveEventIdFromBootstrap(events)).toEqual({
        eventId: 20,
        eventFinished: true,
      });
    });

    it("returns null for empty events array", () => {
      expect(resolveEventIdFromBootstrap([])).toBeNull();
    });

    it("prefers is_next over is_current", () => {
      const events: BootstrapEvent[] = [
        event(1, { is_next: true, is_current: true, finished: false }),
      ];
      expect(resolveEventIdFromBootstrap(events)).toEqual({
        eventId: 1,
        eventFinished: false,
      });
    });
  });
});
