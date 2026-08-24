# SunEx Backend Modernization Plan

## Decision

The current public website is a Vite/React application served by Express/tRPC with a private ASP.NET Core .NET 8 contact API and a managed MySQL/TiDB database. It is **not** a Next.js or SQLite application. Therefore, this phase keeps the existing public route contract and current data source intact while strengthening it in place. A separate Express gateway remains the right production boundary because it already owns browser-facing routing, OAuth, static delivery, and the private .NET service boundary; moving the entire frontend and server to Next.js now would introduce avoidable route, authentication, deployment, and data-cutover risk.

> The migration target is prepared in parallel. It must not receive production traffic until a PostgreSQL instance, reconciliation evidence, rollback decision, and explicit cutover approval are in place.

## Current-State Preservation

| Asset | Current state | Treatment during this phase |
| --- | --- | --- |
| Public browser contract | `/api/trpc` remains the application API gateway. | Preserve. No frontend component change is planned. |
| Contact authority | Private .NET API writes `contact_inquiries`. | Preserve and harden. |
| Source database | Managed MySQL/TiDB with `users` and `contact_inquiries`. | Preserve. No deletion, reset, or migration-history rewrite. |
| Current ORM | Drizzle/MySQL supports the development fallback and OAuth user access. | Preserve until approved cutover. |
| Future ORM | Prisma/PostgreSQL schema and Prisma 7 CLI configuration are defined in `prisma/schema.prisma` and `prisma.config.ts`. | Prepare only; do not generate or apply a live migration yet. |

## Parallel PostgreSQL Cutover Plan

The target Prisma schema models existing identities and enquiries, adds an idempotent per-enquiry notification outbox, uses appropriate uniqueness constraints, and cascades deletion only from an enquiry to its dependent notification record. It does not add a destructive cascade to users because no ownership relation exists in the current data model.

| Gate | Required evidence | Cutover action |
| --- | --- | --- |
| Target provisioned | TLS-enforced PostgreSQL connection stored only as `POSTGRES_DATABASE_URL`. | Create an empty target database. |
| Migration reviewed | Generated Prisma SQL and manual rollback/runbook reviewed by SunEx. | Create target schema only. |
| One-time import | Counts, IDs, uniqueness, timestamps, and checksums reconcile without exposing PII in logs. | Import users and enquiries into PostgreSQL. |
| Shadow verification | Read-only comparisons and contact-write dry run pass against the target. | Keep MySQL/TiDB as source of truth. |
| Approved cutover | Named approver, rollback window, monitoring, and backup location are recorded. | Switch one configured writer at a time. |
| Stabilization | Health, error, and reconciliation monitors remain normal during the agreed window. | Retire old writer only after separate approval. |

No existing Drizzle SQL migration will be edited or removed. The current database contains live data, so any export/import or writer change must be approved separately.

## Production Hardening Scope

The in-place work adds fail-fast production configuration validation, origin restrictions, content-security policy support, mutation-origin checks, safe structured logs, a database-backed health route, server-side normalization, public-contact abuse controls, and a durable notification-outbox design. Contact submission must remain successful after persistence even when notification delivery is unavailable; delivery failure is recorded for retry rather than exposed as a false submission failure.

The outbox dispatcher must run through the platform’s authenticated scheduled HTTP mechanism, not an in-process timer. Activation requires a deployed site, an approved periodic job, Resend credentials, a verified sending domain, and designated SunEx recipient addresses. Resend’s API accepts idempotency keys and requires a verified sender domain for production delivery.[1] Prisma 7 configuration keeps the target connection URL in `prisma.config.ts`, allowing the schema to remain valid before the target database is approved.[2]

## Environment and Secret Handling

`.env.example` documents names only. Real values are supplied through secure project configuration and are never committed, returned, or included in logs. E-mail delivery remains disabled until `RESEND_API_KEY`, `SUNEX_EMAIL_FROM`, and `SUNEX_EMAIL_TO` are configured.

## References

[1]: https://resend.com/docs/api-reference/emails/send-email "Resend — Send Email API"
[2]: https://www.prisma.io/docs/orm/reference/prisma-config-reference "Prisma — Config API"
