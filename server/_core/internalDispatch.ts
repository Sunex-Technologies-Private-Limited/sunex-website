import { timingSafeEqual } from "node:crypto";
import type { Express, Request } from "express";

function hasMatchingBearerToken(request: Request, expectedToken: string) {
  const candidate = request.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  const candidateBuffer = Buffer.from(candidate);
  const expectedBuffer = Buffer.from(expectedToken);
  return candidateBuffer.length === expectedBuffer.length && timingSafeEqual(candidateBuffer, expectedBuffer);
}

export function registerInternalDispatchHealthRoute(app: Express) {
  app.get("/internal/dispatch/health", (req, res) => {
    const token = process.env.SUNEX_INTERNAL_DISPATCH_TOKEN;
    if (!token) {
      res.status(503).json({ ok: false });
      return;
    }
    if (!hasMatchingBearerToken(req, token)) {
      res.status(401).json({ ok: false });
      return;
    }
    res.status(200).json({ ok: true });
  });
}
