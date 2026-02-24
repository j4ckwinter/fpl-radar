import type { Cache } from "../lib/cache/cache";
import { get } from "../lib/http/httpClient";
import { FplRateLimitError, FplUpstreamError, FplValidationError } from "./errors";
import { FPL_BASE_URL, TTL, cacheKey } from "./constants";
import {
  bootstrapStaticSchema,
  type BootstrapStatic,
} from "./schemas/bootstrapStatic.schema";
import {
  leagueStandingsSchema,
  type LeagueStandings,
} from "./schemas/leagueStandings.schema";
import {
  entryPicksResponseSchema,
  type EntryPicksResponse,
} from "./schemas/entryPicks.schema";
import {
  entryTransfersResponseSchema,
  type EntryTransfersResponse,
} from "./schemas/entryTransfers.schema";

export interface FplClientLogger {
  info(obj: object, msg?: string): void;
  warn(obj: object, msg?: string): void;
  error(obj: object, msg?: string): void;
}

export interface FplClientDeps {
  cache: Cache;
  logger: FplClientLogger;
}

export class FplClient {
  constructor(private readonly deps: FplClientDeps) {}

  async getBootstrapStatic(): Promise<BootstrapStatic> {
    const key = cacheKey.bootstrapStatic();
    const cached = await this.deps.cache.get<BootstrapStatic>(key);
    if (cached !== null) {
      this.deps.logger.info({ key }, "bootstrap-static cache hit");
      return cached;
    }

    const endpoint = `${FPL_BASE_URL}/bootstrap-static/`;
    const response = await get(endpoint);

    if (response.status === 429) {
      const retryAfter = response.headers.get("Retry-After");
      throw new FplRateLimitError(retryAfter, endpoint);
    }
    if (response.status < 200 || response.status >= 300) {
      throw new FplUpstreamError(response.status, endpoint);
    }

    const raw = await response.json();
    const parsed = bootstrapStaticSchema.safeParse(raw);
    if (!parsed.success) {
      throw new FplValidationError(endpoint, parsed.error.issues);
    }

    const data = parsed.data;
    await this.deps.cache.set(key, data, TTL.BOOTSTRAP_STATIC_SECONDS);
    this.deps.logger.info({ key }, "bootstrap-static cache set");
    return data;
  }

  async getLeagueStandings(params: {
    leagueId: number;
    page?: number;
    phase?: number;
  }): Promise<LeagueStandings> {
    const page = params.page ?? 1;
    const phase = params.phase;
    const key = cacheKey.leagueStandings(params.leagueId, page, phase);
    const cached = await this.deps.cache.get<LeagueStandings>(key);
    if (cached !== null) {
      this.deps.logger.info({ key }, "league-standings cache hit");
      return cached;
    }

    const searchParams = new URLSearchParams({ page_standings: String(page) });
    if (phase !== undefined) searchParams.set("phase", String(phase));
    const endpoint = `${FPL_BASE_URL}/leagues-classic/${params.leagueId}/standings/?${searchParams.toString()}`;
    const response = await get(endpoint);

    if (response.status === 429) {
      const retryAfter = response.headers.get("Retry-After");
      throw new FplRateLimitError(retryAfter, endpoint);
    }
    if (response.status < 200 || response.status >= 300) {
      throw new FplUpstreamError(response.status, endpoint);
    }

    const raw = await response.json();
    const parsed = leagueStandingsSchema.safeParse(raw);
    if (!parsed.success) {
      throw new FplValidationError(endpoint, parsed.error.issues);
    }

    const data = parsed.data;
    await this.deps.cache.set(key, data, TTL.LEAGUE_STANDINGS_SECONDS);
    this.deps.logger.info({ key }, "league-standings cache set");
    return data;
  }

  /**
   * Fetches one entry's picks for a gameweek (GET /api/entry/{entryId}/event/{eventId}/picks/).
   * Use eventFinished: true for finished gameweeks to cache longer (6h vs 60s).
   */
  async getEntryPicks(params: {
    entryId: number;
    eventId: number;
    eventFinished?: boolean;
  }): Promise<EntryPicksResponse> {
    const { entryId, eventId, eventFinished = false } = params;
    const key = cacheKey.entryPicks(entryId, eventId);
    const ttl = eventFinished
      ? TTL.ENTRY_PICKS_FINISHED_SECONDS
      : TTL.ENTRY_PICKS_CURRENT_SECONDS;

    const cached = await this.deps.cache.get<EntryPicksResponse>(key);
    if (cached !== null) {
      this.deps.logger.info({ key }, "entry-picks cache hit");
      return cached;
    }

    const endpoint = `${FPL_BASE_URL}/entry/${entryId}/event/${eventId}/picks/`;
    const response = await get(endpoint);

    if (response.status === 429) {
      const retryAfter = response.headers.get("Retry-After");
      throw new FplRateLimitError(retryAfter, endpoint);
    }
    if (response.status < 200 || response.status >= 300) {
      throw new FplUpstreamError(response.status, endpoint);
    }

    const raw = await response.json();
    const parsed = entryPicksResponseSchema.safeParse(raw);
    if (!parsed.success) {
      throw new FplValidationError(endpoint, parsed.error.issues);
    }

    const data = parsed.data;
    await this.deps.cache.set(key, data, ttl);
    this.deps.logger.info({ key }, "entry-picks cache set");
    return data;
  }

  /**
   * Fetches an entry's transfer history (GET /api/entry/{entryId}/transfers/).
   * Cached for 5 minutes.
   */
  async getEntryTransfers(params: { entryId: number }): Promise<EntryTransfersResponse> {
    const { entryId } = params;
    const key = cacheKey.entryTransfers(entryId);
    const cached = await this.deps.cache.get<EntryTransfersResponse>(key);
    if (cached !== null) {
      this.deps.logger.info({ key }, "entry-transfers cache hit");
      return cached;
    }

    const endpoint = `${FPL_BASE_URL}/entry/${entryId}/transfers/`;
    const response = await get(endpoint);

    if (response.status === 429) {
      const retryAfter = response.headers.get("Retry-After");
      throw new FplRateLimitError(retryAfter, endpoint);
    }
    if (response.status < 200 || response.status >= 300) {
      throw new FplUpstreamError(response.status, endpoint);
    }

    const raw = await response.json();
    const parsed = entryTransfersResponseSchema.safeParse(raw);
    if (!parsed.success) {
      throw new FplValidationError(endpoint, parsed.error.issues);
    }

    const data = parsed.data;
    await this.deps.cache.set(key, data, TTL.ENTRY_TRANSFERS_SECONDS);
    this.deps.logger.info({ key }, "entry-transfers cache set");
    return data;
  }
}
