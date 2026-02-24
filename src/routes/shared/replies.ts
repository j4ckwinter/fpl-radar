import type { FastifyReply } from "fastify";

export interface BadRequestOptions {
  details?: unknown;
  code?: string;
}

export async function sendBadRequest(
  reply: FastifyReply,
  message: string,
  options: BadRequestOptions = {}
): Promise<void> {
  const body: Record<string, unknown> = {
    error: "Bad Request",
    message,
  };
  if (options.code !== undefined) body.code = options.code;
  if (options.details !== undefined) body.details = options.details;
  await reply.status(400).send(body);
}

export async function sendNotFound(
  reply: FastifyReply,
  message: string
): Promise<void> {
  await reply.status(404).send({
    error: "Not Found",
    message,
  });
}

export async function sendBadRequestGameweek(
  reply: FastifyReply,
  code: string,
  message: string
): Promise<void> {
  await reply.status(400).send({
    error: "Bad Request",
    code,
    message,
  });
}
