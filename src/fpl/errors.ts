/**
 * FPL client errors: safe to log (no sensitive data), include endpoint context.
 */

export class FplUpstreamError extends Error {
  readonly name = "FplUpstreamError";
  constructor(
    readonly statusCode: number,
    readonly endpoint: string,
    message?: string
  ) {
    super(message ?? `FPL upstream error: ${statusCode} at ${endpoint}`);
    Object.setPrototypeOf(this, FplUpstreamError.prototype);
  }
}

export class FplValidationError extends Error {
  readonly name = "FplValidationError";
  constructor(
    readonly endpoint: string,
    readonly issues: unknown,
    message?: string
  ) {
    super(message ?? `FPL validation failed for ${endpoint}`);
    Object.setPrototypeOf(this, FplValidationError.prototype);
  }
}

export class FplRateLimitError extends Error {
  readonly name = "FplRateLimitError";
  constructor(
    readonly retryAfter: string | number | null,
    readonly endpoint: string,
    message?: string
  ) {
    super(message ?? `FPL rate limited at ${endpoint}`);
    Object.setPrototypeOf(this, FplRateLimitError.prototype);
  }
}
