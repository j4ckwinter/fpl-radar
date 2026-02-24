import "dotenv/config";
import pino from "pino";
import { ingestLeagueEntryPicks } from "../ingestion";

function getLeagueId(): number {
  const raw = process.env.FPL_LEAGUE_ID;
  if (raw === undefined || raw === "") {
    throw new Error("FPL_LEAGUE_ID is required. Set it in .env or the environment.");
  }
  const n = Number(raw);
  if (Number.isNaN(n) || Math.floor(n) !== n || n < 1) {
    throw new Error(`FPL_LEAGUE_ID must be a positive integer; got: ${raw}`);
  }
  return n;
}

function getEventIdOptional(): number | undefined {
  const raw = process.env.FPL_EVENT_ID;
  if (raw === undefined || raw === "") return undefined;
  const n = Number(raw);
  if (Number.isNaN(n) || Math.floor(n) !== n || n < 1) {
    throw new Error(`FPL_EVENT_ID must be a positive integer; got: ${raw}`);
  }
  return n;
}

async function main() {
  const logger = pino({ level: "info" });
  const leagueId = getLeagueId();
  const eventId = getEventIdOptional();

  const result = await ingestLeagueEntryPicks({ leagueId, eventId, logger });

  console.log("Entry picks ingestion complete");
  console.log("  leagueId:", result.leagueId);
  console.log("  eventId:", result.eventId);
  console.log("  processed:", result.processed);
  console.log("  succeeded:", result.succeeded);
  console.log("  failed:", result.failed);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
