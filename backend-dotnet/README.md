# SunEx .NET Backend

## What it does

`Sunex.Api` is an ASP.NET Core 8 service that owns guided-enquiry persistence. It validates and normalizes every request, limits contact writes through a durable privacy-preserving rate bucket, stores the existing SunEx contact fields in MySQL/TiDB, prevents duplicate inserts with idempotency keys, emits JSON logs, and exposes liveness and readiness health checks.

The public browser never calls this service directly. The Node website gateway remains responsible for the public route and forwards production contact submissions across loopback only.

## Local development

Install the .NET 8 SDK, ensure the project `DATABASE_URL` is available, then run either:

```bash
pnpm build:dotnet
pnpm test:dotnet
```

To run the Node gateway and .NET API together locally:

```bash
pnpm dev:dotnet
```

`pnpm dev` intentionally starts the Vite-only website preview used by the managed Preview panel. Use `pnpm dev:server` when developing the Express gateway without .NET, or `pnpm dev:dotnet` when exercising the complete Node-to-.NET contact flow locally.

The .NET API listens on `http://127.0.0.1:5090` by default. The liveness endpoint is `/internal/health/live`; database readiness is `/internal/health/ready`.

## Configuration

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Existing MySQL/TiDB connection string in `mysql://user:password@host:port/database` format. |
| `SUNEX_API_BIND` | Private bind URL. Defaults to `http://127.0.0.1:5090`. |
| `SUNEX_API_URL` | Node-to-.NET private base URL. Defaults to `http://127.0.0.1:5090`. |
| `SUNEX_DOTNET_API_ENABLED` | Set to `true` to launch .NET from the Node development gateway. Production activates it automatically. |
| `SUNEX_DOTNET_API_MANAGED` | Set to `external` when the deployment startup script owns the precompiled .NET process. |
| `SUNEX_RATE_LIMIT_SECRET` | Optional distinct server secret for HMAC-protected rate-limit buckets. Until supplied, the existing `JWT_SECRET` is used as the server-side fallback. |

Do not commit connection strings or other secrets. The managed deployment injects existing project secrets at runtime.

## Contact endpoint

`POST /internal/v1/contact-inquiries` accepts the existing enquiry shape and requires an `Idempotency-Key` header. It is loopback-only and therefore must be reached through the Node gateway. The endpoint permits eight write attempts per ten minutes per HMAC-protected IP and browser-header bucket; it does not persist raw browser headers or raw client IP addresses in the rate-limit table. Node validation and frontend validation remain additional defenses.

The gateway adds a public `GET /api/health` readiness route. It verifies Node database access and, when enabled, the private .NET readiness route without returning database errors, secrets, or enquiry data.

## Extending the backend

Future domains such as protected staff workflows, enquiry status, audit events, notifications, and reporting should be added as separate modules beneath `Sunex.Api`. Keep any new public browser entry point behind the Node gateway until authentication, authorization, CSRF, validation, and rate limits are explicitly designed. Transactional e-mail remains deliberately inactive until SunEx provides a verified Resend domain, API key, and approved operations recipient; see `docs/BACKEND_MODERNIZATION_PLAN.md` for the non-blocking activation sequence.

## Production

The root `Dockerfile` publishes the .NET service and builds the Node application. `scripts/start-production.sh` starts .NET privately, then starts Node on the platform-provided `PORT`. Only Node is public; the .NET API stays bound to loopback.
