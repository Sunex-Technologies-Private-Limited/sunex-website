# SunEx Phased Backend Delivery

## Architecture Decision

The existing Vite/React website continues to use its established **Express/tRPC public gateway plus private ASP.NET Core .NET 8 contact service**. This is the production choice for the current system because it preserves the live browser API, OAuth flow, managed hosting, loopback-only .NET boundary, and MySQL/TiDB data source. A Next.js rewrite would be a separate application migration, not a safe API hardening patch.

Prisma 7 and a PostgreSQL schema are now prepared in parallel, but they are inactive. No live writer, route, user data, or existing Drizzle migration has been removed or redirected.

## Delivered Changes

| Area | Delivered behavior |
| --- | --- |
| Configuration | Production startup validates required existing runtime values through Zod and fails with setting names only, never secret values. |
| HTTP security | Gateway sends CSP, HSTS on HTTPS, frame denial, MIME sniffing protection, referrer policy, restrictive device permissions, and hides Express disclosure. CSP automatically permits the configured analytics origin. |
| CORS and CSRF | `/api/*` accepts same-origin calls by default and rejects unreviewed origins before mutations reach tRPC. Reviewed cross-origin browser clients can be listed in `SUNEX_ALLOWED_ORIGINS`. |
| Contact abuse control | Existing .NET fixed-window limit remains. A durable MySQL/TiDB table now adds an 8-per-10-minute HMAC-protected IP plus browser-header bucket shared across production instances. Raw client IP and raw headers are not stored in this table. |
| Validation and sanitization | Browser input is validated by Zod and revalidated by .NET. .NET normalization now applies Unicode compatibility normalization and removes unsafe control characters before storage. |
| Error handling and logs | Gateway uses structured Pino logs with PII and secret paths redacted. Public contact failures remain generic. |
| Health | `GET /api/health` checks the Node database connection and the private .NET readiness route when .NET is enabled. It returns only boolean check states. |
| Parallel database path | Prisma 7 schema, CLI config, and non-executing migration runbook define PostgreSQL models, constraints, indexes, and a notification outbox target. |
| E-mail | Intentionally inactive. The runbook specifies a durable outbox and authenticated scheduled dispatch before Resend is activated; persistence must succeed even if delivery later fails. |

## Changed Files

| File or area | Purpose |
| --- | --- |
| `package.json`, `pnpm-lock.yaml` | Adds Pino and Prisma tooling; adds `prisma:validate`. |
| `server/_core/logger.ts` | Structured server logger with sensitive-field redaction. |
| `server/_core/runtimeConfig.ts` and test | Production runtime configuration checks and reviewed origin parsing. |
| `server/_core/apiSecurity.ts` and test | Same-origin defaults, explicit reviewed CORS, and mutation-origin enforcement. |
| `server/_core/httpSecurity.ts` and test | CSP and other security headers. |
| `server/_core/health.ts`, `server/_core/index.ts`, `server/db.ts` | Database/private-service readiness endpoint and startup enforcement. |
| `server/routers.ts`, `server/dotnetApi.ts`, and tests | HMAC-derived browser fingerprint forwarding to the private contact API. |
| `backend-dotnet/Sunex.Api/Services/ContactRateLimitService.cs` | Durable HMAC-bucket rate-limit enforcement. |
| `backend-dotnet/Sunex.Api/Services/ContactInquiryValidator.cs` and tests | Server-side Unicode/control-character normalization. |
| `backend-dotnet/Sunex.Api/Program.cs` | Registers and invokes the durable limit service. |
| `drizzle/schema.ts`, `drizzle/0002_talented_vargas.sql`, `drizzle/meta/*` | Additive `contact_rate_limit_buckets` table and expiry index; applied without modifying existing rows. |
| `prisma/schema.prisma`, `prisma.config.ts`, `prisma/migrations/README.md` | Inactive Prisma 7/PostgreSQL target and approval-gated migration procedure. |
| `docs/BACKEND_MODERNIZATION_PLAN.md`, `docs/ENVIRONMENT_REFERENCE.md`, `backend-dotnet/README.md` | Migration, configuration, operating, e-mail activation, and deferred-work guidance. |

## Route Compatibility

| Route | Compatibility |
| --- | --- |
| `/api/trpc/contact.submit` | **Unchanged request and successful response shape.** Same-origin browser calls continue normally. Requests with an explicit unreviewed `Origin` now receive `403` before the procedure runs. |
| `/api/oauth/callback` | Unchanged. |
| `/manus-storage/*` | Unchanged. |
| `/internal/v1/contact-inquiries` | Private-only contract unchanged; the Node gateway now adds a non-reversible HMAC fingerprint header for rate partitioning. |
| `/api/health` | **New.** Returns Node database and private .NET readiness booleans. |

## Deferred Activation

| Capability | Required before activation |
| --- | --- |
| Resend notifications and retry dispatch | Verified sender domain, Resend API key, approved operations recipient, and a reviewed outbox/scheduled-dispatch release. Resend supports server-side idempotency keys, which must be used by the future dispatcher.[1] |
| Explicit cross-origin browser API access | Final domain(s) in `SUNEX_ALLOWED_ORIGINS`. Same-origin use needs no change. |
| Separate rate-limit secret | Add a random `SUNEX_RATE_LIMIT_SECRET`; current code safely uses the existing server-only `JWT_SECRET` until then. |
| PostgreSQL/Prisma cutover | TLS target URL, generated SQL review, backup, reconciliation, named approver, monitoring, rollback window, and explicit cutover approval. |

The environment-variable names and safe activation sequence are documented in `docs/ENVIRONMENT_REFERENCE.md`. The deployment tool prevents a tracked `.env.example`; real settings must instead be placed through secure project configuration and never committed.

## Verification

The completed full verification sequence passed: whitespace diff check, Vitest, TypeScript, Prisma schema validation, frontend/server production build, .NET build, and .NET tests. Live smoke tests also confirmed `GET /api/health` returns `200` with security headers and a cross-origin contact mutation is rejected with `403` before it reaches tRPC.

## References

[1]: https://resend.com/docs/api-reference/emails/send-email "Resend — Send Email API"
