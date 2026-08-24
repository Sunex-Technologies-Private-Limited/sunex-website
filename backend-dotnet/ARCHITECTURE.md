# SunEx .NET Backend Architecture

## Purpose

The .NET backend becomes the authoritative persistence service for SunEx guided enquiries while the existing Node application remains the public website gateway and static-asset host. This reduces migration risk: React routes, Manus OAuth, the current frontend contract, and deployment routing continue to work while new business APIs are built in ASP.NET Core.

## Runtime boundary

```text
Browser → Node /api/trpc gateway → loopback .NET API → MySQL/TiDB
                         │
                         └→ React static application, OAuth, storage proxy
```

The .NET service listens only on `127.0.0.1:5090`. It is not directly internet-facing, does not require browser CORS configuration, and rejects non-loopback requests. Node forwards validated guided-enquiry submissions to the internal .NET endpoint.

## API contract

`POST /internal/v1/contact-inquiries` accepts the existing public contact fields: name, organization, email, phone, solution, industry, and message. The .NET service repeats validation rather than trusting the Node gateway. It applies a per-client fixed-window rate limit, generates or propagates request identifiers, stores an idempotency key, and returns a stable `{ success, id, requestId }` response.

## Security controls

The initial foundation applies defense in depth: strict field-length and allowed-value validation, loopback-only middleware, per-client rate limiting, a short Node-to-.NET request timeout, idempotent inserts, problem-details errors without internal detail, structured request logging, readiness and liveness health checks, and secret-free configuration. MySQL credentials continue to arrive through the existing `DATABASE_URL` environment variable; no credentials are committed to source control.

## Data compatibility

The service continues to use the existing `contact_inquiries` table. An optional unique `idempotencyKey` field is added so a repeated gateway request returns the original inquiry identifier instead of creating a duplicate record. The existing Drizzle schema is updated in parallel so the legacy TypeScript data model stays truthful throughout the transition.

## Deployment model

Development runs the .NET API as a child process of the Node gateway after a local .NET build. Production uses a custom multi-runtime image: an ASP.NET Core runtime hosts the private API process and Node hosts the public website process. A single startup script manages process signals and exposes only the platform-provided Node `PORT`.

## Migration path

The first release migrates guided enquiries. Subsequent .NET modules can add protected staff workflows, enquiry status, audit events, notification delivery, and reporting behind the same Node gateway without forcing a frontend rewrite. The existing tRPC layer remains a compatibility facade until each contract has been deliberately moved.
