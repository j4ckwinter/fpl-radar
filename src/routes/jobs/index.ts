import type { FastifyInstance } from "fastify";
import { getJobStatusHandler } from "./getJobStatus";

export async function jobsRoutes(app: FastifyInstance): Promise<void> {
  app.get("/:jobId", getJobStatusHandler);
}
