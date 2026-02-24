export interface BootstrapEvent {
  id: number;
  finished: boolean;
  is_next: boolean;
  is_current: boolean;
}

export interface ResolvedEvent {
  eventId: number;
  eventFinished: boolean;
}

/**
 * Resolves event from bootstrap events: is_next → is_current → latest unfinished → latest any.
 * Returns null if events array is empty.
 */
export function resolveEventIdFromBootstrap(
  events: BootstrapEvent[]
): ResolvedEvent | null {
  const next = events.find((e) => e.is_next);
  if (next) {
    return { eventId: next.id, eventFinished: next.finished };
  }
  const current = events.find((e) => e.is_current);
  if (current) {
    return { eventId: current.id, eventFinished: current.finished };
  }
  const unfinished = events.filter((e) => !e.finished);
  const latest = unfinished.length > 0
    ? unfinished.sort((a, b) => b.id - a.id)[0]
    : events.sort((a, b) => b.id - a.id)[0];
  if (!latest) return null;
  return { eventId: latest.id, eventFinished: latest.finished };
}
