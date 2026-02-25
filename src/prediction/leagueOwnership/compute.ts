import { getCache } from "../../lib/cache/cache";
import { prisma } from "../../lib/prisma";

const CACHE_KEY_PREFIX = "leagueOwnership";
const CACHE_TTL_SECONDS = 300; // 5 minutes

export interface LeagueOwnershipResult {
  leagueId: number;
  eventId: number;
  totalEntries: number;
  /** Player ID → ownership fraction in [0, 1]. */
  ownershipByPlayerId: Map<number, number>;
  /** Player ID → number of league entries that own this player. */
  ownershipCountByPlayerId: Map<number, number>;
}

/** Serializable shape for cache (Map → record). */
interface CachedLeagueOwnership {
  leagueId: number;
  eventId: number;
  totalEntries: number;
  ownershipByPlayerId: Record<string, number>;
  ownershipCountByPlayerId: Record<string, number>;
}

function toCached(result: LeagueOwnershipResult): CachedLeagueOwnership {
  return {
    leagueId: result.leagueId,
    eventId: result.eventId,
    totalEntries: result.totalEntries,
    ownershipByPlayerId: Object.fromEntries(result.ownershipByPlayerId),
    ownershipCountByPlayerId: Object.fromEntries(result.ownershipCountByPlayerId),
  };
}

function fromCached(cached: CachedLeagueOwnership): LeagueOwnershipResult {
  const ownershipByPlayerId = new Map<number, number>();
  for (const [k, v] of Object.entries(cached.ownershipByPlayerId)) {
    ownershipByPlayerId.set(Number(k), v);
  }
  const totalEntries = cached.totalEntries;
  let ownershipCountByPlayerId: Map<number, number>;
  if (cached.ownershipCountByPlayerId && Object.keys(cached.ownershipCountByPlayerId).length > 0) {
    ownershipCountByPlayerId = new Map();
    for (const [k, v] of Object.entries(cached.ownershipCountByPlayerId)) {
      ownershipCountByPlayerId.set(Number(k), v);
    }
  } else {
    ownershipCountByPlayerId = new Map();
    if (totalEntries > 0) {
      for (const [playerId, frac] of ownershipByPlayerId) {
        ownershipCountByPlayerId.set(playerId, Math.round(frac * totalEntries));
      }
    }
  }
  return {
    leagueId: cached.leagueId,
    eventId: cached.eventId,
    totalEntries,
    ownershipByPlayerId,
    ownershipCountByPlayerId,
  };
}

/**
 * Computes league-specific ownership: for each player, the fraction of
 * entries in the league (with a snapshot for this event) that own that player.
 * Binary ownership only (owned or not); bench vs starting is ignored.
 */
export async function computeLeagueOwnership(params: {
  leagueId: number;
  eventId: number;
}): Promise<LeagueOwnershipResult> {
  const { leagueId, eventId } = params;

  const snapshots = await prisma.fplEntrySnapshot.findMany({
    where: { leagueId, eventId },
    select: {
      id: true,
      picks: { select: { playerId: true } },
    },
  });

  const totalEntries = snapshots.length;
  const countByPlayerId = new Map<number, number>();

  for (const snapshot of snapshots) {
    const ownedPlayerIds = new Set(snapshot.picks.map((p) => p.playerId));
    for (const playerId of ownedPlayerIds) {
      countByPlayerId.set(
        playerId,
        (countByPlayerId.get(playerId) ?? 0) + 1
      );
    }
  }

  const ownershipByPlayerId = new Map<number, number>();
  if (totalEntries > 0) {
    for (const [playerId, count] of countByPlayerId.entries()) {
      ownershipByPlayerId.set(playerId, count / totalEntries);
    }
  }

  return {
    leagueId,
    eventId,
    totalEntries,
    ownershipByPlayerId,
    ownershipCountByPlayerId: countByPlayerId,
  };
}

/**
 * Returns league ownership for (leagueId, eventId), using cache when available.
 * Cache key: leagueOwnership:${leagueId}:${eventId}, TTL 5 minutes.
 */
export async function getLeagueOwnership(params: {
  leagueId: number;
  eventId: number;
}): Promise<LeagueOwnershipResult> {
  const { leagueId, eventId } = params;
  const key = `${CACHE_KEY_PREFIX}:${leagueId}:${eventId}`;

  const cache = await getCache();
  const cached = await cache.get<CachedLeagueOwnership>(key);
  if (cached !== null) {
    return fromCached(cached);
  }

  const result = await computeLeagueOwnership({ leagueId, eventId });
  await cache.set(key, toCached(result), CACHE_TTL_SECONDS);
  return result;
}
