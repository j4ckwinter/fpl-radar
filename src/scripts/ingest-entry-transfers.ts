import "dotenv/config";
import pino from "pino";
import { ingestLeagueEntryTransfers } from "../ingestion";

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

async function main() {
  const logger = pino({ level: "info" });
  const leagueId = getLeagueId();

  const result = await ingestLeagueEntryTransfers({ leagueId, logger });

  console.log("Entry transfers ingestion complete");
  console.log("  leagueId:", result.leagueId);
  console.log("  processed:", result.processed);
  console.log("  succeeded:", result.succeeded);
  console.log("  failed:", result.failed);
  console.log("  insertedTransfers:", result.insertedTransfers);
  console.log("  updatedProfiles:", result.updatedProfiles);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
