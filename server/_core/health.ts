import type { Express } from "express";
import { canConnectToDatabase } from "../db";
import { isDotnetApiEnabled } from "../dotnetRuntime";
import { logger } from "./logger";

const dotnetBaseUrl = () => (process.env.SUNEX_API_URL || "http://127.0.0.1:5090").replace(/\/$/, "");

async function isDotnetReady() {
  if (!isDotnetApiEnabled()) return true;
  try {
    const response = await fetch(`${dotnetBaseUrl()}/internal/health/ready`, { signal: AbortSignal.timeout(1_500) });
    return response.ok;
  } catch {
    return false;
  }
}

export function registerHealthRoute(app: Express) {
  app.get("/api/health", async (_req, res) => {
    const [database, dotnet] = await Promise.all([canConnectToDatabase(), isDotnetReady()]);
    const ok = database && dotnet;
    if (!ok) logger.warn({ event: "health_check_failed", database, dotnet }, "health check failed");
    res.status(ok ? 200 : 503).json({ ok, checks: { database, dotnet } });
  });
}
