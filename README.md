# FPL Radar

A backend engine for **Fantasy Premier League (FPL)** mini-league analysis. It predicts likely transfers by rivals in a specific league and supports risk-aware decisions: “what are my rivals likely to do?” and “how risky is my move?”. API- and worker-focused, ready for a future web frontend.

---

## Contents

- [Core idea](#core-idea)
- [Features](#features)
- [Architecture](#architecture)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [API](#api)
- [Scripts](#scripts)
- [Status & roadmap](#status--roadmap)
- [Non-goals](#non-goals)
- [License](#license)

---

## Core idea

Mini-league managers see ownership and form, but not *who might sell whom* or *which bandwagons the league might follow*. FPL Radar models rival constraints and behaviour to predict likely transfers and moves, and to answer:

- Which players are rivals most likely to sell (blanks, injury, form)?
- Which bandwagons are they likely to follow?
- How risky is a differential given what the league might do?

Insights are explicit and risk-aware so you can plan with rival behaviour in mind.

---

## Features

### Transfer predictions (per entry)

- **OUT → IN** suggestions with scores and probabilities (softmax over transfer score).
- **Risk profiles**: `safe` (cover + template), `balanced` (moderate), `risky` (differentials with conviction). Ownership is handled via profile-shaped curves and league-size aware thresholds; risky mode applies a “conviction gate” so low-owned punts need strong momentum or fixtures.
- **NO_TRANSFER** outcome when no strong transfer is identified (e.g. stable squad), so the engine doesn’t force a move.
- **Weak-link penalty** so “strong sell + weak buy” pairs rank lower; diversity caps (e.g. max 2 per OUT/IN) keep the list varied while staying score-ordered.
- Enriched with player/team/position and reasons (sell/buy signals, budget, etc.).

### Multiple transfer scenarios (k=1, k=2, k=3)

- Optional **scenario bundles** for single, double, and triple transfers: same sell/buy scoring and constraints, with beam search for k=2 and k=3 to find high-scoring bundles (e.g. “sell A+B, buy X+Y”).
- Returned when `includeScenarios=true` on the predictions endpoint: each scenario has `k`, `bundles` (with player summaries, scores, probabilities per bundle, reasons), and optional per-transfer `components` when `includeComponents=true`.
- Config (beam width, pool sizes, etc.) and stable `bundleId` format are in the response; probabilities are normalised within each scenario.

### League radar

- League-wide **top buys**, **top sells**, and **top transfers** across entries (with optional `maxEntries` and `concurrency`).

### Ingestion & jobs

- **Bootstrap** (teams, players, positions, gameweeks), **league standings**, **entry picks**, **entry transfers**.
- **League refresh** job: standings → picks → transfers → radar in one pipeline; poll job status via `/jobs/:jobId`.

### Risk profiles (v1.1)

| Profile   | Sell (league)     | Buy (league)              | Notes                          |
|-----------|-------------------|---------------------------|--------------------------------|
| **Safe**  | Strong penalty (L²) | Curved: high L rewarded   | Cover + avoid risky template sells |
| **Balanced** | Moderate penalty | Mild preference (0.3 + 0.4×L) | Default; momentum/fixtures dominate |
| **Risky** | Small penalty (0.35×L) | 1−L flattened; conviction gate | Differentials only when momentum/fixtures are strong |

Thresholds are **league-size aware** (e.g. small leagues use count-based “high ownership”). See `src/prediction/RISK_PROFILES.md` for detail.

---

## Architecture

```
                    ┌──────────────────┐
                    │  FPL Public API  │
                    └────────┬─────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
         ▼                   ▼                   ▼
  ┌─────────────┐    ┌─────────────┐    ┌─────────────────┐
  │   Fastify   │    │   Worker    │    │ Redis (cache +  │
  │   (API)     │    │  (BullMQ)   │    │ queues)         │
  └──────┬──────┘    └──────┬──────┘    └─────────────────┘
         │                   │
         └─────────┬─────────┘
                   │
                   ▼
         ┌─────────────────┐
         │   PostgreSQL    │
         │   (Prisma)      │
         └─────────────────┘
```

- **API** – HTTP endpoints for league, predictions, radar, refresh, jobs.
- **Worker** – Processes league refresh (standings → picks → transfers → radar).
- **PostgreSQL** – Reference data, snapshots, league/entry data.
- **Redis** – FPL response cache and BullMQ queue backend.

---

## Tech stack

| Layer      | Choice                |
|-----------|------------------------|
| Runtime   | Node.js 20+ (LTS)     |
| Language  | TypeScript (strict)    |
| HTTP      | Fastify                |
| DB        | PostgreSQL + Prisma 7 |
| Cache/Queue | Redis + BullMQ      |
| Validation| Zod                    |
| Logging   | Pino                   |
| Tests     | Vitest                 |
| Package   | pnpm                   |

---

## Getting started

### Prerequisites

- **Node.js** v20+
- **pnpm** v10+
- **PostgreSQL** (e.g. `localhost:5432`)
- **Redis** (required for worker and API queue/cache; e.g. `localhost:6379`)

### Running PostgreSQL and Redis with Docker

If you don’t have Postgres or Redis installed locally, you can run them in Docker:

**PostgreSQL**

```bash
docker run -d \
  --name fpl-radar-db \
  -p 5432:5432 \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=fpl_radar \
  postgres:16-alpine
```

Then use `DATABASE_URL=postgresql://postgres:postgres@localhost:5432/fpl_radar` in `.env`.

**Redis**

```bash
docker run -d --name fpl-radar-redis -p 6379:6379 redis:7-alpine
```

Use `REDIS_URL=redis://localhost:6379` in `.env`.

### 1. Install and configure

```bash
pnpm install
cp .env.example .env
```

Set in `.env`:

- `DATABASE_URL` – e.g. `postgresql://user:pass@localhost:5432/fpl_radar`
- `REDIS_URL` – e.g. `redis://localhost:6379`
- (Optional) `FPL_LEAGUE_ID`, `FPL_ENTRY_ID`, `FPL_EVENT_ID`, `PORT`, `NODE_ENV`

### 2. Database and bootstrap

```bash
pnpm prisma migrate deploy
pnpm ingest:bootstrap
```

Loads teams, players, positions, gameweeks from FPL. Required before predictions or refresh.

### 3. (Optional) Load a league

```bash
pnpm ingest:league
```

Uses `FPL_LEAGUE_ID`. Then use the **league refresh** API (or ingest scripts) to load picks and transfers.

### 4. Run Redis, API, and worker

**Terminal 1 – Redis** (if not already running):

```bash
redis-server
# or: docker run -d -p 6379:6379 redis:alpine
```

**Terminal 2 – API**

```bash
pnpm dev
```

**Terminal 3 – Worker**

```bash
pnpm worker
```

### 5. Trigger a league refresh

Replace `LEAGUE_ID` with a league that exists in your DB:

```bash
curl -X POST "http://localhost:3000/league/LEAGUE_ID/refresh" \
  -H "Content-Type: application/json" \
  -d '{"eventId": 27, "maxEntries": 50}'
```

Response: `{ "leagueId": ..., "jobId": "...", "status": "queued" }`. Poll:

```bash
curl "http://localhost:3000/jobs/JOB_ID"
```

When `state` is `completed`, predictions and radar use fresh data. Restart the API if you want it to pick up new bootstrap/ingestion data in memory (e.g. p95 momentum).

---

## API

Base URL: `http://localhost:3000` (or your `PORT`).

| Method | Path | Description |
|--------|------|-------------|
| **GET** | `/league/:leagueId` | League overview: metadata + rivals. Query: `limit`, `offset`, `eventId`. |
| **GET** | `/league/:leagueId/entry/:entryId/predictions` | Transfer predictions for one entry. Query: `eventId`, `limit`, **`riskProfile`** (`safe` \| `balanced` \| `risky`), **`includeScenarios`** (optional; when true, include k=1..3 scenario bundles), **`includeComponents`** (optional; when true with scenarios, include per-transfer components in each bundle). May include a **NO_TRANSFER** item when appropriate. |
| **GET** | `/league/:leagueId/radar` | League radar: top buys, sells, transfers. Query: `eventId`, `maxEntries`, `concurrency`. |
| **POST** | `/league/:leagueId/refresh` | Enqueue league refresh. Body (optional): `eventId`, `maxEntries`, `force`. Returns `jobId`. |
| **GET** | `/jobs/:jobId` | Job status: `state`, `progress`, `result`, `error`. |
| **GET** | `/admin/bootstrap/latest` | Latest bootstrap snapshot (diagnostic). |

### Example: predictions with risk profile

```bash
# Safe (cover + template)
curl -s "http://localhost:3000/league/133057/entry/1328234/predictions?eventId=27&limit=10&riskProfile=safe" | jq .

# Balanced (default)
curl -s "http://localhost:3000/league/133057/entry/1328234/predictions?eventId=27&limit=10&riskProfile=balanced" | jq .

# Risky (differentials with conviction)
curl -s "http://localhost:3000/league/133057/entry/1328234/predictions?eventId=27&limit=10&riskProfile=risky" | jq .
```

### Example: predictions with scenarios

Include transfer bundle scenarios (k=1, k=2, k=3) in the response:

```bash
curl -s "http://localhost:3000/league/133057/entry/1328234/predictions?eventId=27&limit=20&riskProfile=balanced&includeScenarios=true" | jq .
```

Add `includeComponents=true` to include per-transfer breakdowns inside each bundle.

### Example: league radar

```bash
curl -s "http://localhost:3000/league/133057/radar?eventId=27" | jq .
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start API with tsx watch (port 3000). |
| `pnpm start` | Start API from build (`pnpm build` first). |
| `pnpm worker` | Start BullMQ worker (separate terminal). |
| `pnpm ingest:bootstrap` | Ingest bootstrap-static (teams, players, gameweeks). |
| `pnpm ingest:league` | Ingest league standings (`FPL_LEAGUE_ID`). |
| `pnpm ingest:entry-picks` | Ingest entry picks for league/event. |
| `pnpm ingest:entry-transfers` | Ingest entry transfer history. |
| `pnpm predict:transfers` | Run transfer predictions (script; uses `FPL_LEAGUE_ID`, `FPL_ENTRY_ID`, `FPL_RISK_PROFILE`). |
| `pnpm predict:scenarios` | Run scenario generation (k=1..3 bundles) for an entry (script; uses `FPL_LEAGUE_ID`, `FPL_ENTRY_ID`, `FPL_EVENT_ID`). |
| `pnpm predict:league-radar` | Run league radar (script). |
| **`pnpm predict:compare-profiles`** | Compare top buys/sells/transfers across safe, balanced, risky for one entry (debug). |
| **`pnpm validate:ranking`** | Run ranking + predictions tests and print validation checklist. |
| `pnpm test` | Run Vitest. |
| `pnpm test:watch` | Vitest watch mode. |
| `pnpm build` | Compile TypeScript. |
| `pnpm prisma` | Prisma CLI. |

---

## Status & roadmap

**Done**

- API (Fastify), FPL client (caching, Zod), Prisma, BullMQ worker.
- Ingestion: bootstrap, league standings, entry picks, entry transfers; league refresh job (standings → picks → transfers → radar).
- **Transfer predictions**: sell/buy scoring, candidates, diversity (score-ordered + caps), weak-link penalty, NO_TRANSFER when weak signals, softmax probabilities.
- **Multiple transfer scenarios**: beam search for k=2 and k=3 bundles; optional `includeScenarios` and `includeComponents` on the predictions endpoint; bundle reasons, probabilities per scenario, stable `bundleId`.
- **Risk profiles v1.1**: safe/balanced/risky with ownership curves, league-size aware thresholds, risky conviction gating, profile-specific reasons.
- **Ranking v1.3**: score-respecting diversity, no safe-only transfer penalty, probabilities on final list.
- Endpoints: league overview, entry predictions (with `riskProfile`, `includeScenarios`, `includeComponents`), league radar, refresh, job status.

**Roadmap**

- Persist league radar (DB or cache) for faster reads.
- Frontend or third-party consumers.
- Optional: more risk-mode insights (e.g. “rival move likelihood” breakdowns).

---

## Non-goals

- **Not the official FPL API** – Consumes the public API; does not replace or represent it.
- **Not real-time** – Data is fetched on demand or via jobs; no live push from FPL.
- **Not guaranteed predictions** – Outputs are probabilistic and for decision support only.

---

## License

ISC. This project uses the public Fantasy Premier League API and is not affiliated with the Premier League or official FPL. Use of FPL data is subject to FPL’s terms.
