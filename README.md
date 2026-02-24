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

1. **FPL public data** – The system fetches data from the official FPL API (bootstrap-static, league standings). Responses are validated with Zod and cached in Redis (with in-memory fallback).
2. **Reference data persistence** – Bootstrap data (teams, players, positions, gameweeks) is ingested via a script and stored in PostgreSQL. Each run creates a snapshot record for traceability.
3. **League ingestion** – League standings and related data can be fetched and stored for the target mini-league(s).
4. **Rival analysis and prediction** – (Planned.) A pipeline will consume reference and league data to model rival constraints and behaviour and produce transfer-risk and bandwagon-style insights.

---

## Getting started (local development)

### Prerequisites

- **Node.js** – v20+ (LTS recommended)
- **pnpm** – v10+ (see [pnpm](https://pnpm.io/))
- **PostgreSQL** – running locally or reachable (e.g. default port 5432)
- **Redis** – running locally or reachable (optional; in-memory cache used if Redis is unavailable)

### Install and configure

```bash
pnpm install
cp .env.example .env
```

Edit `.env` and set at least:

- `DATABASE_URL` – PostgreSQL connection string (e.g. `postgresql://USER:PASSWORD@localhost:5432/fpl_radar`)
- `REDIS_URL` – (optional) e.g. `redis://localhost:6379`
- `FPL_LEAGUE_ID` – (optional) default test league ID, e.g. `133057`

Other optional vars: `PORT`, `FPL_BASE_URL`, `NODE_ENV`.

### Database and reference data

```bash
pnpm prisma migrate deploy
pnpm ingest:bootstrap
```

### Run the API and worker

```bash
pnpm dev          # API (Fastify) on PORT, with tsx watch
pnpm worker       # Worker (BullMQ) with tsx watch
```

---

## Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start the Fastify API with tsx watch (default port 3000). |
| `pnpm start` | Start the API from built output (`node dist/index.js`). Run `pnpm build` first. |
| `pnpm worker` | Start the BullMQ worker with tsx watch. |
| `pnpm ingest:bootstrap` | Fetch bootstrap-static from FPL, normalise and upsert teams, players, positions, gameweeks, and write a snapshot. Idempotent. |
| `pnpm test` | Run Vitest once. |
| `pnpm test:watch` | Run Vitest in watch mode. |
| `pnpm build` | Compile TypeScript (tsc). |
| `pnpm prisma` | Prisma CLI (e.g. `pnpm prisma migrate dev`, `pnpm prisma generate`). |

---

## Current status

- **Foundations** – API skeleton, FPL client with caching and validation, Prisma schema and migrations, ingestion pipeline for bootstrap-static, and admin-style diagnostic route are in place.
- **Reference data ingestion** – Bootstrap ingestion is implemented and can be run repeatedly; snapshot and counts are recorded.
- **Rival prediction engine** – Planned; not yet implemented.

---

## Roadmap

- League ingestion (standings and league-specific data).
- Rival transfer prediction (constraints + behaviour modelling).
- Public API surface for a future frontend.
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
