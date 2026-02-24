You are working in the repo `fpl-radar`.

Implement **Issue #16: Aggregate league-wide “transfer radar”**.

This step builds on Issue #15 (per-entry transfer predictions) and produces league-level insights:
- Which players are most likely to be bought (and sold) by multiple rivals
- Which specific transfers are most likely across the league
- Simple “crowding” signals for the user (e.g. 8/15 rivals likely to buy Player X)

Do NOT build the user-facing frontend here; just provide a backend module + a script (and optionally an API route) that returns the aggregate data.

---

## Goal
Given:
- `leagueId`
- `eventId`

Compute predictions for each entry in that league (or top N entries) and aggregate into league-level summaries:

### Outputs
1) **Most likely IN players** (buy radar)
- playerId
- expectedBuyersCount (sum of probabilities or count above threshold)
- buyers: list of entryIds (limited) with their probability
- reasons summary (optional)

2) **Most likely OUT players** (sell radar)
- playerId
- expectedSellersCount
- sellers: list of entryIds (limited) with their probability

3) **Most likely transfers** (OUT→IN radar)
- outPlayerId, inPlayerId
- expectedCount
- exampleEntries

Additionally:
- Provide a `coverage` summary:
  - totalEntriesProcessed
  - succeeded
  - failed
  - truncated entries (if any)
  - run duration

---

## Constraints
- Concurrency-limited computation (don’t run 50 entries in parallel unbounded).
- Tolerate partial failures (one entry failing doesn’t crash the whole run).
- Use DB-only for inputs (predictions are computed from persisted data).
- Deterministic results for given underlying DB data.
- Avoid recomputing expensive shared data repeatedly (e.g. bootstrap/current event) — cache in-process.

---

## Deliverables

### A) Types
Create:
- `src/prediction/leagueRadar/types.ts`

```ts
export interface EntryPredictionSummary {
  entryId: number;
  predictions: Array<{
    outPlayerId: number;
    inPlayerId: number;
    probability: number;
    score: number;
  }>;
}

export interface PlayerRadarItem {
  playerId: number;
  expectedCount: number; // sum of probabilities
  uniqueEntries: number; // count of distinct entries contributing
  examples: Array<{ entryId: number; probability: number }>;
}

export interface TransferRadarItem {
  outPlayerId: number;
  inPlayerId: number;
  expectedCount: number;
  uniqueEntries: number;
  examples: Array<{ entryId: number; probability: number }>;
}

export interface LeagueRadarResult {
  leagueId: number;
  eventId: number;
  generatedAt: string;
  coverage: {
    totalEntries: number;
    processed: number;
    succeeded: number;
    failed: number;
    durationMs: number;
  };
  buyRadar: PlayerRadarItem[];
  sellRadar: PlayerRadarItem[];
  transferRadar: TransferRadarItem[];
}
```

B) Aggregation module

Create:

- src/prediction/leagueRadar/generate.ts

Export:

```ts
export async function generateLeagueRadar(params: {
  leagueId: number;
  eventId: number;
  maxEntries?: number;      // default: process all, but allow top N for speed (e.g. 50)
  concurrency?: number;     // default 5
  perEntryMaxResults?: number; // default 20 predictions per entry used for aggregation
  logger: Logger;
}): Promise<LeagueRadarResult>
```

Implementation steps:

1) Load league entries from DB for leagueId:

- Prefer top-ranked entries (rank asc) if maxEntries is set

2) For each entry:

- Call predictTransfersForEntry({ leagueId, entryId, eventId, maxResults: perEntryMaxResults })

- If it fails:

- - increment failed

- - log error with entryId

- - continue

3) Aggregate:

- For each prediction (out,in,prob):

- - Add prob to:

- - - buyRadar[inPlayerId].expectedCount

- - - sellRadar[outPlayerId].expectedCount

- - - transferRadar[(out,in)].expectedCount

- - Track unique entry counts

- - Store up to 5 example entries per radar item (highest probabilities)

Data structures:

- Use Maps for aggregation:

- - buyMap: Map<playerId, accumulator>

- - sellMap: Map<playerId, accumulator>

- - transferMap: Map<string, accumulator> where key ${out}-${in}

- Accumulator should store:

- - expectedCount (sum of probs)

- - examples (bounded list, keep top 5 by prob)

4) Sort results:

- buyRadar: expectedCount desc, then uniqueEntries desc

- sellRadar: same

- transferRadar: expectedCount desc

5) Return top lists:

- buyRadar: top 25

- sellRadar: top 25

- transferRadar: top 50 (Define constants; make configurable if you want.)

Concurrency:

- Implement a simple promise pool (or reuse existing concurrency helper from ingestion steps).

- Default concurrency 5.

Timing:

- Capture start time and duration.


C) Script

Create:

- src/scripts/league-radar.ts

Env:

- FPL_LEAGUE_ID required

- FPL_EVENT_ID optional (resolve from DB: isNext else isCurrent)

Optional env:

- FPL_MAX_ENTRIES (default unset => all)

- FPL_CONCURRENCY (default 5)

Script should:

- call generateLeagueRadar

- print:

- - coverage summary

- - top 10 buys (player webName + expectedCount + uniqueEntries)

- - top 10 sells

- - top 10 transfers (out->in + expectedCount)

Add package.json script:

"predict:league-radar": "tsx src/scripts/league-radar.ts"


D) Optional API endpoint (only if your Fastify app is ready)

Add route:

GET /league/:leagueId/radar?eventId=XX&maxEntries=YY
Returns LeagueRadarResult
NOTE: If API server isn’t wired yet, skip this route and focus on the script.

Acceptance Criteria

- pnpm predict:league-radar runs and produces sensible output for a real league

- Aggregation sums probabilities across entries correctly

- Results are sorted and capped (top lists)

- Partial failures don’t stop the run; coverage reflects failures

- Concurrency is limited

- No upstream API calls added in this issue

Notes / TODOs

- This radar is “relative likelihood”, not guaranteed truth.

- Later: persist LeagueRadarResult to DB for caching and frontend performance.

- Later: add “crowding” thresholds (e.g. count entries where prob > 0.1).

Implementation Order

1) Types + constants

2) GenerateLeagueRadar with concurrency + aggregation Maps

3) Script + package.json

4) Run on a real leagueId and sanity-check top results

Keep scope strictly to league-wide aggregation of per-entry predictions.