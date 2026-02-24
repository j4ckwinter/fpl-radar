import "dotenv/config";
import pino from "pino";
import { getCache } from "../lib/cache/cache";
import { FplClient } from "../fpl/fplClient";

const DEFAULT_LEAGUE_ID = 133057;

async function main() {
  const leagueIdRaw = process.env.FPL_LEAGUE_ID ?? String(DEFAULT_LEAGUE_ID);
  const leagueId = Number(leagueIdRaw);
  if (!Number.isInteger(leagueId) || leagueId < 1) {
    console.error("FPL_LEAGUE_ID must be a positive integer.");
    process.exitCode = 1;
    return;
  }

  const cache = await getCache();
  const logger = pino({ level: "info" });
  const client = new FplClient({ cache, logger });

  const bootstrap = await client.getBootstrapStatic();
  console.log("Bootstrap-static:");
  console.log("  teams:", bootstrap.teams.length);
  console.log("  players (elements):", bootstrap.elements.length);

  const standings = await client.getLeagueStandings({ leagueId });
  console.log("League standings (page 1):");
  const top3 = standings.standings.results.slice(0, 3);
  top3.forEach((row, i) => {
    console.log(`  ${i + 1}. rank=${row.rank} total=${row.total} "${row.entry_name}" (${row.player_name})`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
