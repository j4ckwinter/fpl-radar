import "dotenv/config";
import pino from "pino";
import { ingestBootstrapStatic } from "../ingestion";

async function main() {
  const logger = pino({ level: "info" });
  const result = await ingestBootstrapStatic({ logger });

  console.log("Bootstrap ingestion complete");
  console.log("  snapshotId:", result.snapshotId);
  console.log("  fetchedAt:", result.fetchedAt.toISOString());
  console.log("  counts:", result.counts);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
