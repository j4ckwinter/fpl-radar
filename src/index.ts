import "dotenv/config";
import Fastify from "fastify";
import { prisma } from "./lib/prisma";
import { registerRoutes } from "./routes";

const app = Fastify({ logger: true });

app.register(registerRoutes);

app.setErrorHandler(async (err, request, reply) => {
  request.log.error(
    { err, method: request.method, url: request.url },
    "unexpected error"
  );
  if (reply.sent) return;
  const isProduction = process.env.NODE_ENV === "production";
  await reply.status(500).send({
    error: "Internal Server Error",
    message: isProduction
      ? "An unexpected error occurred"
      : (err as Error).message,
  });
});

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
