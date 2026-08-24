import pino from "pino";

export const logger = pino({
  base: { service: "sunex-gateway" },
  redact: {
    paths: [
      "req.headers.authorization",
      "req.headers.cookie",
      "request.headers.authorization",
      "request.headers.cookie",
      "email",
      "phone",
      "message",
      "organization",
      "databaseUrl",
      "apiKey",
      "authorization",
    ],
    censor: "[REDACTED]",
  },
});
