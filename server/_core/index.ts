import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerApiSecurity } from "./apiSecurity";
import { registerHealthRoute } from "./health";
import { registerHttpSecurity } from "./httpSecurity";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { isDotnetApiEnabled, startDotnetApi, stopDotnetApi } from "../dotnetRuntime";
import { logger } from "./logger";
import { assertRuntimeConfiguration } from "./runtimeConfig";
import { resolveServerPort } from "./serverPort";
import { registerInternalDispatchHealthRoute } from "./internalDispatch";

async function startServer() {
  assertRuntimeConfiguration();
  if (isDotnetApiEnabled()) await startDotnetApi(process.cwd());
  const app = express();
  const server = createServer(app);
  registerHttpSecurity(app);
  // This public site does not accept file uploads. Keep request parsing bounded
  // so anonymous form submissions cannot reserve excessive process memory.
  app.use(express.json({ limit: "64kb" }));
  app.use(express.urlencoded({ limit: "64kb", extended: false, parameterLimit: 100 }));
  registerApiSecurity(app);
  registerHealthRoute(app);
  registerInternalDispatchHealthRoute(app);
  registerStorageProxy(app);
  registerOAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = resolveServerPort();

  server.once("error", error => {
    logger.fatal({ event: "server_listen_failed", errorType: error.name, port }, "server could not bind to the required platform port");
    process.exitCode = 1;
  });

  server.listen(port, () => {
    logger.info({ event: "server_started", port }, "server started");
  });

  const shutdown = () => stopDotnetApi();
  process.once("SIGTERM", shutdown);
  process.once("SIGINT", shutdown);
}

startServer().catch(error => {
  logger.fatal({ event: "server_start_failed", errorType: error instanceof Error ? error.name : "unknown" }, "server startup failed");
  process.exitCode = 1;
});
