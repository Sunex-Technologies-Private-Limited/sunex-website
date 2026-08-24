import type { Express, RequestHandler } from "express";
import { getAllowedOrigins } from "./runtimeConfig";

const unsafeMethods = new Set(["POST", "PUT", "PATCH", "DELETE"]);

function requestOrigin(req: Parameters<RequestHandler>[0]) {
  return `${req.protocol}://${req.get("host")}`;
}

function isAllowedOrigin(origin: string, req: Parameters<RequestHandler>[0]) {
  return origin === requestOrigin(req) || getAllowedOrigins().has(origin);
}

export function registerApiSecurity(app: Express) {
  const middleware: RequestHandler = (req, res, next) => {
    const origin = req.get("origin");

    if (!origin) return next();
    if (!isAllowedOrigin(origin, req)) {
      res.status(403).json({ error: "origin_not_allowed" });
      return;
    }

    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");

    if (req.method === "OPTIONS") {
      res.status(204).end();
      return;
    }

    // The API is same-origin by default. This checks the browser Origin on all
    // state changes, preventing a third-party site from driving cookie-bearing
    // mutations. Non-browser server calls have no Origin and remain protected by
    // their private network/API boundary.
    if (unsafeMethods.has(req.method) && !isAllowedOrigin(origin, req)) {
      res.status(403).json({ error: "csrf_origin_rejected" });
      return;
    }

    next();
  };

  app.use("/api", middleware);
}
