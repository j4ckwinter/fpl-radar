import { getCache } from "../lib/cache/cache";
import { prisma } from "../lib/prisma";
import { FplClient } from "../fpl/fplClient";

export interface IngestionLogger {
  info(obj: object, msg?: string): void;
  warn(obj: object, msg?: string): void;
  error(obj: object, msg?: string): void;
}

export interface IngestBootstrapStaticResult {
  snapshotId: string;
  fetchedAt: Date;
  counts: {
    teamsCount: number;
    playersCount: number;
    positionsCount: number;
    gameweeksCount: number;
  };
}

export function parseSelectedByPercent(value: string): number | null {
  const n = Number.parseFloat(value);
  return Number.isNaN(n) ? null : n;
}

export function parseDeadlineTime(iso: string): Date {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) throw new Error(`Invalid deadline_time: ${iso}`);
  return d;
}

export async function ingestBootstrapStatic(opts: {
  logger: IngestionLogger;
}): Promise<IngestBootstrapStaticResult> {
  const { logger } = opts;
  const cache = await getCache();
  const client = new FplClient({ cache, logger });

  const data = await client.getBootstrapStatic();

  const result = await prisma.$transaction(async (tx) => {
    const now = new Date();

    for (const t of data.teams) {
      await tx.fplTeam.upsert({
        where: { id: t.id },
        create: {
          id: t.id,
          name: t.name,
          shortName: t.short_name,
          code: t.code ?? null,
          updatedAt: now,
        },
        update: {
          name: t.name,
          shortName: t.short_name,
          code: t.code ?? null,
          updatedAt: now,
        },
      });
    }

    for (const p of data.element_types) {
      await tx.fplPosition.upsert({
        where: { id: p.id },
        create: {
          id: p.id,
          shortName: p.singular_name_short,
          updatedAt: now,
        },
        update: {
          shortName: p.singular_name_short,
          updatedAt: now,
        },
      });
    }

    for (const e of data.events) {
      await tx.fplGameweek.upsert({
        where: { id: e.id },
        create: {
          id: e.id,
          name: e.name,
          deadlineTime: parseDeadlineTime(e.deadline_time),
          finished: e.finished,
          isCurrent: e.is_current,
          isNext: e.is_next,
          updatedAt: now,
        },
        update: {
          name: e.name,
          deadlineTime: parseDeadlineTime(e.deadline_time),
          finished: e.finished,
          isCurrent: e.is_current,
          isNext: e.is_next,
          updatedAt: now,
        },
      });
    }

    for (const el of data.elements) {
      await tx.fplPlayer.upsert({
        where: { id: el.id },
        create: {
          id: el.id,
          teamId: el.team,
          positionId: el.element_type,
          firstName: el.first_name,
          secondName: el.second_name,
          webName: el.web_name,
          nowCost: el.now_cost,
          status: el.status,
          news: el.news === "" ? null : el.news,
          selectedByPercent: parseSelectedByPercent(el.selected_by_percent),
          updatedAt: now,
        },
        update: {
          teamId: el.team,
          positionId: el.element_type,
          firstName: el.first_name,
          secondName: el.second_name,
          webName: el.web_name,
          nowCost: el.now_cost,
          status: el.status,
          news: el.news === "" ? null : el.news,
          selectedByPercent: parseSelectedByPercent(el.selected_by_percent),
          updatedAt: now,
        },
      });
    }

    const snapshot = await tx.fplBootstrapSnapshot.create({
      data: {
        source: "bootstrap-static",
        teamsCount: data.teams.length,
        playersCount: data.elements.length,
        positionsCount: data.element_types.length,
        gameweeksCount: data.events.length,
      },
    });

    return {
      snapshotId: snapshot.id,
      fetchedAt: snapshot.fetchedAt,
      counts: {
        teamsCount: data.teams.length,
        playersCount: data.elements.length,
        positionsCount: data.element_types.length,
        gameweeksCount: data.events.length,
      },
    };
  });

  logger.info(
    {
      snapshotId: result.snapshotId,
      ...result.counts,
    },
    "ingestBootstrapStatic completed"
  );
  return result;
}
