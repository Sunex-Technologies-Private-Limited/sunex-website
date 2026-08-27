import { createServer } from "node:http";
import express from "express";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { registerInternalDispatchHealthRoute } from "./internalDispatch";

describe("internal dispatch health endpoint", () => {
  const configuredToken = process.env.SUNEX_INTERNAL_DISPATCH_TOKEN;
  let server: ReturnType<typeof createServer>;
  let baseUrl = "";

  beforeAll(async () => {
    expect(configuredToken).toBeTruthy();
    const app = express();
    registerInternalDispatchHealthRoute(app);
    server = createServer(app);
    await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("Test server failed to bind.");
    baseUrl = `http://127.0.0.1:${address.port}`;
  });

  afterAll(async () => {
    await new Promise<void>(resolve => server.close(() => resolve()));
  });

  it("accepts the configured dispatch token without returning its value", async () => {
    const response = await fetch(`${baseUrl}/internal/dispatch/health`, {
      headers: { Authorization: `Bearer ${configuredToken}` },
    });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
  });

  it("rejects requests without the configured dispatch token", async () => {
    const response = await fetch(`${baseUrl}/internal/dispatch/health`);
    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({ ok: false });
  });
});
