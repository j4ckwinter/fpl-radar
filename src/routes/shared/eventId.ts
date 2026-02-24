import type { PrismaClient } from "../../generated/prisma";
import {
  ensureGameweekStarted,
  resolveStartedEventIdFromDb,
} from "../../lib/gameweek";

const NO_GAMEWEEK_MESSAGE =
  "No gameweek available. Set eventId in query or run bootstrap ingestion.";

export interface ResolvedEventId {
  eventId: number;
}

export interface EventIdError {
  error: {
    message: string;
    code?: string;
  };
}

/**
 * Resolves eventId from optional query value or DB (started gameweek only),
 * then validates the gameweek has started.
 * Use in handlers that need a single eventId (e.g. radar, predictions).
 */
export async function resolveAndValidateEventId(
  prisma: PrismaClient,
  eventIdQuery: number | undefined
): Promise<ResolvedEventId | EventIdError> {
  const eventId =
    eventIdQuery ?? (await resolveStartedEventIdFromDb(prisma));
  if (eventId === null) {
    return { error: { message: NO_GAMEWEEK_MESSAGE } };
  }
  const gameweekError = await ensureGameweekStarted(prisma, eventId);
  if (gameweekError !== null) {
    return {
      error: {
        code: gameweekError.code,
        message: gameweekError.message,
      },
    };
  }
  return { eventId };
}
