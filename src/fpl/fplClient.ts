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
}
