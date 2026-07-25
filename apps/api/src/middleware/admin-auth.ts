import type { RequestHandler } from "express";
import { timingSafeEqual } from "node:crypto";
import { env } from "../lib/env.js";

function matchesKey(candidate: string, expected: string): boolean {
  const candidateBuffer = Buffer.from(candidate);
  const expectedBuffer = Buffer.from(expected);

  if (candidateBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(candidateBuffer, expectedBuffer);
}

export const requireAdminKey: RequestHandler = (request, response, next) => {
  const candidate = request.header("x-admin-key") ?? "";

  if (!matchesKey(candidate, env.ADMIN_API_KEY)) {
    response.status(401).json({ error: "Unauthorised" });
    return;
  }

  next();
};
