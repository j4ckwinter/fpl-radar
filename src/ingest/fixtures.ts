import "dotenv/config";
import { z } from "zod";
import { get } from "../lib/http/httpClient";
import { prisma } from "../lib/prisma";
import { FPL_BASE_URL } from "../fpl/constants";

const fixtureRowSchema = z.object({
  id: z.number(),
  event: z.number().nullable().optional(),
  team_h: z.number(),
  team_a: z.number(),
  team_h_difficulty: z.number(),
  team_a_difficulty: z.number(),
  kickoff_time: z.string().nullable().optional(),
  finished: z.boolean(),
});

const fixturesResponseSchema = z.array(fixtureRowSchema);

type FixtureRow = z.infer<typeof fixtureRowSchema>;

/**
 * Fetches fixtures from the FPL API and upserts them by id.
 */
export async function ingestFixtures(): Promise<void> {
  const endpoint = `${FPL_BASE_URL}/fixtures/`;
  const response = await get(endpoint);

  if (response.status === 429) {
    const retryAfter = response.headers.get("Retry-After");
    throw new Error(`FPL rate limited. Retry-After: ${retryAfter}`);
  }
  if (response.status < 200 || response.status >= 300) {
    throw new Error(`FPL fixtures failed: ${response.status} ${endpoint}`);
  }

  const raw = await response.json();
  const parsed = fixturesResponseSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(
      `FPL fixtures validation failed: ${JSON.stringify(parsed.error.flatten())}`
    );
  }

  const fixtures = parsed.data;

  await prisma.$transaction(async (tx) => {
    for (const f of fixtures) {
      await tx.fplFixture.upsert({
        where: { id: f.id },
        create: toCreate(f),
        update: toUpdate(f),
      });
    }
  });
}

function toCreate(f: FixtureRow) {
  return {
    id: f.id,
    eventId: f.event ?? null,
    teamHId: f.team_h,
    teamAId: f.team_a,
    teamHDifficulty: f.team_h_difficulty,
    teamADifficulty: f.team_a_difficulty,
    kickoffTime: f.kickoff_time ? new Date(f.kickoff_time) : null,
    finished: f.finished,
  };
}

function toUpdate(f: FixtureRow) {
  return {
    eventId: f.event ?? null,
    teamHId: f.team_h,
    teamAId: f.team_a,
    teamHDifficulty: f.team_h_difficulty,
    teamADifficulty: f.team_a_difficulty,
    kickoffTime: f.kickoff_time ? new Date(f.kickoff_time) : null,
    finished: f.finished,
  };
}

async function main(): Promise<void> {
  await ingestFixtures();
  console.log("Fixtures ingestion complete.");
}

const isDirectRun =
  process.argv[1] !== undefined &&
  (process.argv[1].endsWith("fixtures.ts") ||
    process.argv[1].includes("ingest/fixtures"));
if (isDirectRun) {
  main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
  });
}
