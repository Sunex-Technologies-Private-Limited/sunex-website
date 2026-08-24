# SunEx Backend Environment Reference

This project uses secure deployment configuration for real values. A populated `.env` file is never created or committed. The platform blocks tracking `.env.example`, so this document is the reviewed, secret-free equivalent requested for the phased backend work.

| Variable | Required now | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes | Existing TLS-required MySQL/TiDB connection for current application data. |
| `JWT_SECRET` | Yes | Existing session signing secret; also provides a temporary server-only fallback key for HMAC rate buckets. |
| `VITE_APP_ID`, `OAUTH_SERVER_URL` | Yes | Existing Manus OAuth configuration. |
| `BUILT_IN_FORGE_API_URL`, `BUILT_IN_FORGE_API_KEY` | Yes | Existing server-side managed storage and platform integration access. |
| `SUNEX_ALLOWED_ORIGINS` | Recommended | Comma-separated reviewed production browser origins for explicit cross-origin API access. Same-origin requests remain supported without it. |
| `SUNEX_RATE_LIMIT_SECRET` | Recommended | Distinct server-only secret for anonymous contact-rate bucket HMACs; add before high-volume production promotion. |
| `SUNEX_CSP_ADDITIONAL_SOURCES` | Optional | Comma-separated reviewed HTTPS origins required by future assets or integrations. |
| `RESEND_API_KEY` | Deferred | Enables transactional e-mail only after a Resend domain is verified. |
| `SUNEX_EMAIL_FROM`, `SUNEX_EMAIL_TO` | Deferred | Approved verified sender and operations notification recipient. |
| `POSTGRES_DATABASE_URL` | Deferred | TLS-enabled target connection for the parallel Prisma migration only. |

## Activation Sequence

1. Choose the final public domain and add it to `SUNEX_ALLOWED_ORIGINS` if an external browser origin must call the API.
2. Generate a distinct `SUNEX_RATE_LIMIT_SECRET` with a password manager and add it through secure project configuration.
3. For e-mail, verify a sending domain in Resend, create a least-privilege API key, and decide the approved operations recipient before enabling delivery.
4. For Prisma/PostgreSQL, create a separate TLS-enabled target, then follow `prisma/migrations/README.md`; do not supply the current MySQL/TiDB URL to `POSTGRES_DATABASE_URL`.
