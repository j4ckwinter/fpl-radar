import type { PrismaClient } from "../generated/prisma";

const FUTURE_GAMEWEEK_CODE = "FUTURE_GAMEWEEK";

export interface GameweekNotStartedError {
  code: string;
  message: string;
}

/**
 * Returns an error payload if the gameweek has not started (deadline in the future).
 * Use before running ingestion or predictions for an event.
 * Returns null if the gameweek exists and its deadline has passed.
 */
export async function ensureGameweekStarted(
  prisma: PrismaClient,
  eventId: number
): Promise<GameweekNotStartedError | null> {
  const gameweek = await prisma.fplGameweek.findUnique({
    where: { id: eventId },
    select: { id: true, name: true, deadlineTime: true },
  });
  if (!gameweek) {
    return {
      code: "GAMEWEEK_NOT_FOUND",
      message: `Gameweek ${eventId} not found. Run bootstrap ingestion.`,
    };
  }
  if (gameweek.deadlineTime > new Date()) {
    return {
      code: FUTURE_GAMEWEEK_CODE,
      message:
        "Gameweek has not started yet. Use a current or past gameweek (deadline has passed).",
    };
  }
  return null;
}

/**
 * Resolves an event id for operations that must use a started gameweek only.
 * Prefers current (deadline passed), then latest by id. Never returns the "next" (future) gameweek.
 */
export async function resolveStartedEventIdFromDb(
  prisma: PrismaClient
): Promise<number | null> {
  const current = await prisma.fplGameweek.findFirst({
    where: { isCurrent: true },
    select: { id: true },
  });
  if (current) return current.id;

  const latest = await prisma.fplGameweek.findFirst({
    orderBy: { id: "desc" },
    select: { id: true, deadlineTime: true },
  });
  if (!latest) return null;
  if (latest.deadlineTime > new Date()) {
    const started = await prisma.fplGameweek.findMany({
      where: { deadlineTime: { lte: new Date() } },
      orderBy: { id: "desc" },
      take: 1,
      select: { id: true },
    });
    return started[0]?.id ?? null;
  }
  return latest.id;
}
