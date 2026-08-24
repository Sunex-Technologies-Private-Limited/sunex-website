import type { Express, RequestHandler } from "express";

function contentSecurityPolicy() {
  const configuredSources = (process.env.SUNEX_CSP_ADDITIONAL_SOURCES ?? "")
    .split(",")
    .map(value => value.trim())
    .filter(value => value.startsWith("https://"));
  const analyticsOrigin = (() => {
    try {
      return process.env.VITE_ANALYTICS_ENDPOINT ? new URL(process.env.VITE_ANALYTICS_ENDPOINT).origin : undefined;
    } catch {
      return undefined;
    }
  })();
  const sources = ["'self'", ...configuredSources, analyticsOrigin].filter(Boolean).join(" ");
  return [
    "default-src 'self'",
    `script-src ${sources} 'unsafe-inline'`,
    `connect-src ${sources}`,
    `img-src ${sources} data: blob:`,
    `font-src ${sources} data:`,
    "style-src 'self' 'unsafe-inline'",
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
    "form-action 'self'",
  ].join("; ");
}

export function registerHttpSecurity(app: Express) {
  app.disable("x-powered-by");
  // The managed edge is the single trusted proxy in front of this application.
  // Express can therefore derive req.secure and req.ip without trusting arbitrary
  // multi-hop forwarded-header chains.
  app.set("trust proxy", 1);

  const middleware: RequestHandler = (req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Permissions-Policy", "camera=(), geolocation=(), microphone=()");
    res.setHeader("Content-Security-Policy", contentSecurityPolicy());
    if (req.secure) {
      res.setHeader("Strict-Transport-Security", "max-age=31536000");
    }
    next();
  };

  app.use(middleware);
}
