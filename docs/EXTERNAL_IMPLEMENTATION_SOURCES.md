# External Implementation Sources

The following official documentation was consulted for the inactive integration and parallel migration design. No external integration was activated from these sources.

| Source | Design detail retained |
| --- | --- |
| [Resend Send Email API](https://resend.com/docs/api-reference/emails/send-email) | Production sends require a sender, recipient, subject, and content; API idempotency keys are supported for deduplicating retries. |
| [Resend Node.js guide](https://resend.com/docs/send-with-nodejs) | Store `RESEND_API_KEY` in server configuration and use a verified sending domain for production delivery. |
| [Prisma Config reference](https://www.prisma.io/docs/orm/reference/prisma-config-reference) | Prisma 7 keeps datasource URLs in `prisma.config.ts`; optional migration targets should not use a live source URL by inference. |
| [Prisma ORM 7 upgrade guide](https://www.prisma.io/docs/guides/upgrade-prisma-orm/v7) | Prisma 7 uses the new client generator and requires a dcore-adapter/pool design when PostgreSQL is activated. |
