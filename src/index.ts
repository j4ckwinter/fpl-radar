import "dotenv/config";
import Fastify from "fastify";
import { prisma } from "./lib/prisma";

const app = Fastify({ logger: true });

// TODO: add auth for /admin routes
app.get("/admin/bootstrap/latest", async (_request, reply) => {
  const latest = await prisma.fplBootstrapSnapshot.findFirst({
    orderBy: { fetchedAt: "desc" },
  });
  if (latest === null) {
    return reply.status(404).send({
      error: "Not Found",
      message: "No bootstrap snapshot found. Run ingest:bootstrap first.",
    });
  }
  return reply.send({
    snapshotId: latest.id,
    fetchedAt: latest.fetchedAt,
    source: latest.source,
    hash: latest.hash,
    counts: {
      teamsCount: latest.teamsCount,
      playersCount: latest.playersCount,
      positionsCount: latest.positionsCount,
      gameweeksCount: latest.gameweeksCount,
    },
  });
});

const port = Number(process.env.PORT) || 3000;
app.listen({ port, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Server listening at ${address}`);
});
