# SunEx Backend Readiness Assessment

**Assessment date:** 24 August 2026  
**Scope:** The public SunEx website, its Node/tRPC gateway, its private .NET 8 contact-enquiry API, and the MySQL/TiDB persistence path.  
**Assessment basis:** Source review and automated validation performed in this repository. This is a software readiness assessment, **not** a penetration test, compliance certification, legal opinion, or managed-hosting configuration audit.

> **Current conclusion:** The implemented guided-enquiry path has a sound production boundary: browsers reach the public Node/tRPC gateway only, while the .NET 8 API is restricted to loopback traffic and is the production persistence authority. The public enquiry remains intentionally unauthenticated. Its safeguards are server-side validation, bounded request size, rate limiting, idempotency, generic error handling, and parameterized persistence—not an access-control gate.

## Production Architecture

```text
Browser
  -> public Node / Express / tRPC gateway
  -> private 127.0.0.1 .NET 8 enquiry API
  -> managed MySQL / TiDB database
```

The Node process provides static hosting, the tRPC contract, OAuth session integration, and managed-asset delivery. In production, it starts the .NET service and sends contact writes to `POST /internal/v1/contact-inquiries`. The .NET process exposes only loopback-bound internal routes, validates and normalizes the request again, and is the sole production writer for enquiries. Development preview deliberately retains a Node/Drizzle fallback when the .NET service is not enabled; it is not the intended production path.

## Verified Controls

| Area | Verified implementation | Readiness assessment |
| --- | --- | --- |
| **Public API boundary** | Browser traffic is limited to the public Node/tRPC gateway. The .NET routes are grouped under `/internal`, bind to `127.0.0.1` by default, and reject non-loopback peers. | **Implemented for the current contact workflow.** |
| **Framework/API design** | React clients call typed tRPC procedures. Node forwards production contact writes through a short-timeout private HTTP client to ASP.NET Core .NET 8. | **Implemented.** The dual-runtime boundary is explicit and documented. |
| **Input validation** | Zod validates the public procedure; .NET independently validates the request, enforces allow-listed categories, length limits, e-mail format, and normalization. | **Implemented with defense in depth.** |
| **Request-size control** | Public JSON and URL-encoded parsing are each capped at 64 KB. The site has no file-upload endpoint. | **Hardened in this assessment.** This removes the previous 50 MB anonymous parser allowance. |
| **Abuse protection** | The internal contact write has an 8-request-per-10-minute fixed-window policy. The gateway now sends its proxy-derived client IP to the private loopback API so limits are not shared by every public visitor. | **Hardened in this assessment.** The private API accepts this header only behind its loopback boundary. |
| **Idempotency** | Node creates an idempotency key for every private contact write; .NET requires it; persistence uses a unique key and duplicate-safe insert behavior. | **Implemented for server-to-server retries.** A browser retry creates a fresh submission; this is suitable for the current one-shot form but not a general client retry protocol. |
| **Database / ORM** | Production .NET persistence uses parameterized MySqlConnector commands. Node/Drizzle is retained only for local fallback. Connection timeout, command timeout, and pool size are bounded. | **Implemented.** |
| **Database transport** | The .NET connection factory now uses `MySqlSslMode.Required`, preventing a fallback to an unencrypted managed-database connection. | **Hardened in this assessment.** Certificate-authority verification remains a deployment prerequisite because no CA bundle/configuration is currently supplied in the project. |
| **Authentication** | Manus OAuth validates a one-time nonce against a host-only secure cookie before exchanging the authorization code. Session cookies are HTTP-only and secure on HTTPS requests. | **Implemented for sign-in.** |
| **Authorization** | tRPC exports protected and administrator-only procedure patterns; the user schema distinguishes `user` and `admin`. No staff/admin business endpoint is currently exposed. | **Ready as a pattern; no authorization-requiring business flow is implemented.** |
| **Contact access model** | `contact.submit` is intentionally a public procedure because the website is an enquiry destination. | **Intentional.** Do not change this to login-only without a product decision. |
| **HTTP hardening** | The gateway now removes the Express disclosure header, trusts exactly one managed proxy hop, adds `nosniff`, frame denial, referrer policy, restrictive device permissions, and HSTS on secure requests. | **Hardened in this assessment.** A content-security policy should be added only after analytics and asset allow-lists are agreed and tested. |
| **Errors and logs** | The API returns generic availability errors with a request identifier and writes structured JSON server logs. Contact persistence logs omit the enquiry message, e-mail, phone, and organization. | **Implemented for the .NET contact API.** Storage-proxy upstream failures should remain protected by host-level log access controls. |
| **Health and process handling** | Liveness and database-readiness endpoints exist on the private API. The production entrypoint starts both processes and forwards termination signals. | **Implemented for basic availability checks.** |
| **Container isolation** | The custom production image now copies runtime artifacts to a dedicated `sunex` account and runs the Node gateway and private .NET process without root privileges. | **Hardened in this assessment.** |
| **Secrets / configuration** | Runtime credentials are platform-injected; no `.env` file or secret literal is introduced by this project. The .NET database parser rejects missing/malformed `DATABASE_URL` values when initialized. | **Partially implemented.** Node configuration is centralized but does not yet fail fast with a complete production schema. |
| **Storage** | Managed asset delivery uses a server-side authenticated presign redirect. There is no public user-upload route and no database blob storage. | **Implemented for approved public assets.** This is not yet a private-document or end-user upload system. |
| **Caching** | No application cache exists. Contact writes are deliberately uncached; asset redirects use `no-store`. | **Intentionally not implemented.** Add a cache only when a measured read-heavy requirement exists. |
| **Background jobs** | No in-container cron, queue worker, or detached job exists. | **Intentionally not implemented.** This matches the current form-only requirements and the autoscaling runtime model. |
| **Blog, payments, and monetary workflows** | No CMS/blog editor, payment gateway, billing workflow, or monetary transaction logic is present. | **Intentionally not implemented.** These require separate product, authorization, webhook, retention, and reconciliation design. |

## Changes Made During This Assessment

The assessment applied only low-risk hardening changes whose behavior is covered by the repository tests. The public gateway has safe baseline response headers, a one-hop proxy trust configuration, and bounded parsers. The private .NET limiter can now partition contact writes by the public client address that Node derives after the managed proxy boundary, instead of treating every visitor as loopback. Database connections now require TLS. Finally, the production image has a non-root runtime account.

These changes did **not** change the public contact form’s fields, its no-login policy, the tRPC response contract, the storage model, or the visual website experience.

## Validation Performed

| Validation | Result |
| --- | --- |
| TypeScript static checking | Passed during final full validation. |
| Vitest suite | Passed during final full validation, including gateway header behavior, contact validation/forwarding, private-client idempotency forwarding, OAuth logout behavior, deployment-account policy, and website regressions. |
| .NET build | Passed during final full validation. |
| xUnit suite | Passed during final full validation, including request validation/normalization and TLS connection-factory coverage. |
| Production frontend/server build | Passed during final full validation. |
| Source diff whitespace check | Passed during final full validation. |
| Private API smoke tests | Liveness and malformed-contact behavior are exercised against a local .NET-enabled runtime before checkpointing. |

## Remaining Production Prerequisites

The following items are not defects in the current guided-enquiry scope, but they must be decided before the related capability is claimed or enabled.

| Priority | Required decision or setup | Why it matters |
| --- | --- | --- |
| **High** | Confirm the managed database’s production TLS CA/hostname requirements and move from encryption-only TLS to certificate verification where the provider supports it. | `Required` prevents plaintext fallback but does not replace a provider-approved trust-chain configuration. |
| **High** | Configure restricted production secrets and database/network access in the deployment environment; retain access only for the running service and authorized operators. | Source review cannot verify live identity, network, database, or hosting permissions. |
| **High** | Approve data retention, deletion, breach-response, and access-request processes for contact enquiries; obtain legal review for public privacy terms. | The form stores personal contact information, and policy must match actual operations. |
| **Medium** | Choose a monitoring destination and on-call owner for readiness failures, elevated 429/503 rates, and unexpected container restarts. | Structured logs and health endpoints exist, but alert routing is not configured. |
| **Medium** | Define the staff workflow before exposing enquiry lists, exports, notes, status changes, or notifications. | Any such endpoint must use an explicit protected/admin procedure, audit trail, and least-privilege authorization. |
| **Medium** | Decide whether confirmation e-mail, owner notification, or follow-up automation is required. | This needs a transactional provider, provider secret, delivery-failure behavior, and a deliberate background/event design. |
| **Low** | Add a content-security policy after confirming final analytics, font, and asset origins. | A guessed policy could break valid production resources; an allow-list should be tested on the deployed domain. |
| **Low** | Add caching only after a read-heavy feature and its invalidation rules are defined. | No cache is necessary for current public content and form writes. |

## Recommended Next Engineering Milestones

For the current public marketing site, the backend is appropriately scoped after these controls. The next useful milestone is an authenticated, role-protected internal enquiry workflow once SunEx defines who can view or act on leads. That work should begin with a schema and authorization design, not a public management route.

If e-mail or scheduled follow-up is required, use a provider-backed event or scheduled mechanism rather than a detached process inside the container. If payment, course checkout, or other monetary capabilities are later introduced, design them as a separate project with provider webhooks, server-side reconciliation, idempotency, authorization, and financial audit requirements.
