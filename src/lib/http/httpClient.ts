/**
 * Minimal fetch wrapper: timeout, retries on 429/5xx with backoff + jitter, fixed User-Agent.
 * Returns { status, headers, json } for use by FPL client and other server-side callers.
 */

const DEFAULT_TIMEOUT_MS = 10_000;
const MAX_RETRIES = 2;
const USER_AGENT = "fpl-radar/0.1 (+github)";

export interface HttpClientResponse {
  status: number;
  headers: Headers;
  json: () => Promise<unknown>;
}

function shouldRetry(status: number): boolean {
  return status === 429 || status >= 500;
}

function delayMs(attempt: number): number {
  const baseMs = 1000 * Math.pow(2, attempt);
  const jitterMs = Math.random() * 500;
  return baseMs + jitterMs;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface HttpClientOptions {
  timeoutMs?: number;
}

/**
 * GET with timeout (10s), User-Agent, and up to 2 retries on 429/5xx using exponential backoff + jitter.
 * Returns { status, headers, json } where json() parses the response body once.
 */
export async function get(
  url: string,
  options: HttpClientOptions = {}
): Promise<HttpClientResponse> {
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  let lastResponse: Response | null = null;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "User-Agent": USER_AGENT },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      lastResponse = response;

      if (attempt < MAX_RETRIES && shouldRetry(response.status)) {
        await sleep(delayMs(attempt));
        continue;
      }

      return {
        status: response.status,
        headers: response.headers,
        json: () => response.json(),
      };
    } catch (err) {
      clearTimeout(timeoutId);
      lastError = err instanceof Error ? err : new Error(String(err));
      const isAbort = lastError.name === "AbortError";
      const isRetryable = isAbort || (lastResponse !== null && shouldRetry(lastResponse.status));
      if (attempt < MAX_RETRIES && isRetryable) {
        await sleep(delayMs(attempt));
        continue;
      }
      throw lastError;
    }
  }

  if (lastResponse !== null) {
    return {
      status: lastResponse.status,
      headers: lastResponse.headers,
      json: () => lastResponse!.json(),
    };
  }
  throw lastError ?? new Error("HTTP request failed");
}
