# fpl-radar

**fpl-radar** is a backend engine for Fantasy Premier League (FPL) analysis. It exists to support mini-league managers with rival-aware, probabilistic insights: instead of generic stats, it focuses on **predicting likely transfers by rivals in a specific league**, using constraints, behaviour, and form. The goal is a decision-support system that answers “what are my rivals likely to do?” and “how risky is my move given that context?”, not just another stats API. The backend is API- and worker-focused today and is designed to support a future web frontend.

---

## Core idea

FPL managers in a mini-league lack visibility into what their rivals are likely to do. Generic tools show ownership and form; they do not model *who might sell whom* or *which bandwagons your league might jump on*.

fpl-radar addresses this by modelling rival constraints and behaviour to predict likely transfers and moves. Examples of the kinds of questions it aims to support:

- Which players are most likely to be sold by rivals (e.g. due to blanks, injury, or form)?
- Which bandwagons are my rivals likely to follow?
- How risky is a differential pick given what my league might do?

The value is in making these insights explicit and risk-aware, so you can plan moves with rival behaviour in mind.

---

## High-level architecture

- **API service (Fastify)** – HTTP API for diagnostics and, later, frontend and third-party consumers.
- **Worker service (BullMQ)** – Background jobs (e.g. ingestion, league sync, analysis).
- **PostgreSQL (Prisma)** – Primary store for reference data (teams, players, gameweeks), snapshots, and league/rival data.
- **Redis** – Caching for FPL API responses and queue backend for BullMQ.
- **FPL public API** – Upstream source for bootstrap-static, league standings, and related data.

```
                    +------------------+
                    |   FPL Public API |
                    +--------+---------+
                             |
         +-------------------+-------------------+
         |                   |                   |
         v                   v                   v
  +-------------+    +-------------+    +------------------+
  |   Fastify   |    |   Worker    |    |  Redis (cache +  |
  |   (API)     |    |  (BullMQ)   |    |  queues)         |
  +------+------+    +------+------+    +------------------+
         |                   |
         +--------+----------+
                  |
                  v
         +------------------+
         |   PostgreSQL     |
         |   (Prisma)       |
         +------------------+
```

---

## Tech stack

- Node.js + TypeScript (strict)
- Fastify – HTTP server
- PostgreSQL + Prisma (v7, driver adapter)
- Redis – caching and BullMQ
- BullMQ – job queues
- Zod – runtime validation of upstream payloads
- Pino – structured logging
- Vitest – unit tests
- pnpm – package manager

---

## Data flow overview

1. **FPL public data** – The system fetches data from the official FPL API (bootstrap-static, league standings, entry picks, transfers). Responses are validated with Zod and cached in Redis (with in-memory fallback).
2. **Reference data persistence** – Bootstrap data (teams, players, positions, gameweeks) is ingested via a script and stored in PostgreSQL. Each run creates a snapshot record for traceability.
3. **League ingestion** – League standings and entry-level data (picks, transfers) can be fetched and stored for the target mini-league(s). The **league refresh** job runs standings → picks → transfers (and optionally league radar) in one pipeline.
4. **Rival analysis and prediction** – A pipeline consumes reference and league data to score sell/buy candidates and produce per-entry transfer predictions and league-wide “radar” (top buys, sells, transfers). Results are exposed via the API and can be recomputed on demand or after a refresh.

---

## Getting started (local development)

**Quick start (after cloning):**

1. `pnpm install` → `cp .env.example .env` → set `DATABASE_URL` and `REDIS_URL`.
2. `pnpm prisma migrate deploy` → `pnpm ingest:bootstrap`.
3. (Optional) `pnpm ingest:league` to load a league (uses `FPL_LEAGUE_ID`).
4. Start Redis, then in two terminals: `pnpm dev` (API) and `pnpm worker` (worker).
5. `curl -X POST http://localhost:3000/league/LEAGUE_ID/refresh -H "Content-Type: application/json" -d '{}'` to run a refresh; poll with `curl http://localhost:3000/jobs/JOB_ID`.

---

### Prerequisites

- **Node.js** – v20+ (LTS recommended)
- **pnpm** – v10+ (see [pnpm](https://pnpm.io/))
- **PostgreSQL** – running locally or reachable (e.g. default port 5432)
- **Redis** – running locally or reachable (optional for API cache; **required** for BullMQ queues and the worker)

### Step 1: Install and configure

```bash
pnpm install
cp .env.example .env
```

Edit `.env` and set at least:

- `DATABASE_URL` – PostgreSQL connection string (e.g. `postgresql://USER:PASSWORD@localhost:5432/fpl_radar`)
- `REDIS_URL` – required for queues and worker; e.g. `redis://localhost:6379`
- `FPL_LEAGUE_ID` – (optional) default league ID for scripts, e.g. `133057`

Other optional vars: `PORT`, `FPL_BASE_URL`, `NODE_ENV`, `FPL_EVENT_ID`, `FPL_ENTRY_ID`.

### Step 2: Database and reference data

```bash
pnpm prisma migrate deploy
pnpm ingest:bootstrap
```

This loads teams, players, positions, and gameweeks from FPL into PostgreSQL. Required before using predictions or league refresh.

### Step 3: (Optional) Load a league

To use league overview, predictions, or refresh you need at least one league in the DB. Ingest standings for your league (creates/updates the league and its entries):

```bash
pnpm ingest:league
```

Uses `FPL_LEAGUE_ID` from `.env`. Then you can ingest entry picks and transfers for that league, or use the **league refresh** job to do it in one go (see Step 5).

### Step 4: Start Redis, API, and worker

Start Redis (required for the worker and for enqueueing refresh jobs):

```bash
redis-server
# or: docker run -d -p 6379:6379 redis:alpine
```

In **two separate terminals**:

**Terminal A – API**

```bash
pnpm dev
```

**Terminal B – Worker**

```bash
pnpm worker
```

The API serves HTTP; the worker processes league refresh jobs from the queue. Both need `DATABASE_URL`; the worker and the API’s enqueue path need `REDIS_URL`.

### Step 5: Trigger a league refresh (recommended before predictions)

With the API and worker running, trigger a full refresh for a league (standings → entry picks → entry transfers → league radar). Replace `123` with a `leagueId` that exists in your DB:

```bash
curl -X POST "http://localhost:3000/league/123/refresh" \
  -H "Content-Type: application/json" \
  -d '{}'
```

Or with options (e.g. limit entries for a quicker run):

```bash
curl -X POST "http://localhost:3000/league/123/refresh" \
  -H "Content-Type: application/json" \
  -d '{"eventId": 26, "maxEntries": 20, "force": false}'
```

Response: `{ "leagueId": 123, "jobId": "...", "status": "queued" }`. Copy `jobId` to poll status.

**Poll job status:**

```bash
curl "http://localhost:3000/jobs/JOB_ID"
```

Response includes `state` (`waiting`, `active`, `completed`, `failed`), `progress` (e.g. `{ "step": "picks", "completed": 5, "total": 20 }`), `result`, and `error` (if failed). Once the job is `completed`, the league has fresh standings, picks, and transfers (and radar was recomputed).

---

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/league/:leagueId` | League overview: metadata + rivals (rank, points, optional `hasSnapshot`). Query: `limit`, `offset`, `eventId`. |
| GET | `/league/:leagueId/entry/:entryId/predictions` | Per-entry transfer predictions (enriched with player/team/position). Query: `eventId`, `limit`. |
| GET | `/league/:leagueId/radar` | League-wide radar (top buys, sells, transfers). Query: `eventId`, `maxEntries`, `concurrency`. |
| POST | `/league/:leagueId/refresh` | Enqueue a league refresh job. Body (optional): `eventId`, `maxEntries`, `force`. Returns `jobId` and `status: "queued"`. |
| GET | `/jobs/:jobId` | Job status: `state`, `progress`, `result`, `error`. |
| GET | `/admin/bootstrap/latest` | Latest bootstrap ingestion snapshot (diagnostic). |

Base URL: `http://localhost:3000` (or your `PORT`).

**Example: league overview**

```bash
curl "http://localhost:3000/league/123?limit=50&offset=0"
```

**Example: entry predictions** (after refresh has run for that league/event)

```bash
curl "http://localhost:3000/league/123/entry/456789/predictions?limit=20"
```

**Example: league radar**

```bash
curl "http://localhost:3000/league/123/radar?eventId=26"
```

---

## Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start the Fastify API with tsx watch (default port 3000). |
| `pnpm start` | Start the API from built output (`node dist/index.js`). Run `pnpm build` first. |
| `pnpm worker` | Start the BullMQ worker (processes league refresh jobs). Run in a separate terminal. |
| `pnpm ingest:bootstrap` | Fetch bootstrap-static from FPL; upsert teams, players, positions, gameweeks. Idempotent. |
| `pnpm ingest:league` | Ingest league standings for `FPL_LEAGUE_ID` (creates/updates league and entries). |
| `pnpm ingest:entry-picks` | Ingest entry picks for league/event (uses `FPL_LEAGUE_ID`, `FPL_EVENT_ID` optional). |
| `pnpm ingest:entry-transfers` | Ingest entry transfer history for league entries. |
| `pnpm predict:transfers` | Run per-entry transfer predictions for `FPL_LEAGUE_ID` + `FPL_ENTRY_ID` (script; no API). |
| `pnpm predict:league-radar` | Run league radar for `FPL_LEAGUE_ID` (script; no API). |
| `pnpm test` | Run Vitest once. |
| `pnpm test:watch` | Run Vitest in watch mode. |
| `pnpm build` | Compile TypeScript (tsc). |
| `pnpm prisma` | Prisma CLI (e.g. `pnpm prisma migrate dev`, `pnpm prisma generate`). |

---

## Current status

- **Foundations** – API (Fastify), FPL client with caching and Zod validation, Prisma schema and migrations, BullMQ worker skeleton.
- **Ingestion** – Bootstrap, league standings, entry picks, and entry transfers; league refresh job runs the full pipeline (standings → picks → transfers → radar).
- **Prediction** – Per-entry transfer predictions (sell/buy scoring, candidates, softmax probabilities) and league-wide radar (top buys, sells, transfers). Exposed via API and scripts.
- **API** – League overview, per-entry predictions, league radar, POST league refresh, GET job status. Validation and error handling in place.

---

## Roadmap

- Persist league radar (e.g. DB or cache) for faster reads.
- Frontend or third-party consumers.
- Risk-mode insights (differentials vs likely rival moves).

---

## Non-goals

- **Not an official FPL API** – This project consumes the public FPL API; it does not replace or represent it.
- **Not real-time** – Data is fetched and processed on a schedule or on demand; there is no live push from FPL.
- **Not guaranteed predictions** – Outputs are probabilistic and for decision support only; no guarantee of accuracy or outcomes.

---

## License and disclaimer

This project uses publicly available Fantasy Premier League API endpoints. It is not affiliated with, endorsed by, or connected to the Premier League or the official Fantasy Premier League game. Use of FPL data is subject to the terms and conditions of the FPL service.

License: ISC.
