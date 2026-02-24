/**
 * Cache abstraction for FPL client and other server-side caching.
 * Provides a unified interface with Redis when available, in-memory fallback otherwise.
 */

export interface Cache {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttlSeconds: number): Promise<void>;
}

interface MemoryEntry {
  value: unknown;
  expiresAt: number;
}

/**
 * In-memory cache with per-key TTL. Entries are removed on get when expired.
 */
export class MemoryCache implements Cache {
  private readonly store = new Map<string, MemoryEntry>();

  async get<T>(key: string): Promise<T | null> {
    const entry = this.store.get(key);
    if (entry === undefined) return null;
    if (Date.now() >= entry.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return entry.value as T;
  }

  async set<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
    const expiresAt = Date.now() + ttlSeconds * 1000;
    this.store.set(key, { value, expiresAt });
  }
}

/**
 * Redis-backed cache. Values are JSON-serialised. Use when REDIS_URL is set and connection succeeds.
 */
export class RedisCache implements Cache {
  constructor(private readonly redis: { get(key: string): Promise<string | null>; set(key: string, value: string, ...args: (string | number)[]): Promise<unknown> }) {}

  async get<T>(key: string): Promise<T | null> {
    const raw = await this.redis.get(key);
    if (raw === null) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  async set<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
    const serialised = JSON.stringify(value);
    await this.redis.set(key, serialised, "EX", ttlSeconds);
  }
}

let cacheInstance: Cache | null = null;
let cacheInitPromise: Promise<Cache> | null = null;
let redisWarningLogged = false;

/**
 * Returns a singleton Cache: Redis if REDIS_URL is set and connection succeeds, otherwise MemoryCache.
 * Logs a warning once if Redis is unavailable and fallback is used.
 */
export async function getCache(): Promise<Cache> {
  if (cacheInstance !== null) return cacheInstance;
  if (cacheInitPromise !== null) return cacheInitPromise;

  cacheInitPromise = (async (): Promise<Cache> => {
    const url = process.env.REDIS_URL;
    if (url) {
      try {
        const Redis = (await import("ioredis")).default;
        const client = new Redis(url, { maxRetriesPerRequest: 1, connectTimeout: 5000, lazyConnect: true });
        await client.connect();
        await client.ping();
        cacheInstance = new RedisCache(client);
        return cacheInstance;
      } catch (err) {
        if (!redisWarningLogged) {
          redisWarningLogged = true;
          console.warn("[cache] Redis unavailable, using in-memory cache:", err instanceof Error ? err.message : String(err));
        }
      }
    }
    cacheInstance = new MemoryCache();
    return cacheInstance;
  })();

  return cacheInitPromise;
}
