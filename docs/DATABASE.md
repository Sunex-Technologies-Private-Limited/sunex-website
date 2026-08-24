# Database Architecture

The Sunex Website uses MySQL as its primary relational database.

## Dual ORM Configuration (ADR)

> [!WARNING]
> **ORM Consolidation Plan:** You will notice we have both `drizzle-orm` and `@prisma/client` in our `package.json`. Having two ORMs is generally an anti-pattern. 

**Why do we have both?**
This project originally started with Prisma due to its rapid prototyping capabilities and excellent schema readability. As performance requirements scaled, particularly around edge-compatibility and cold-start times for serverless functions, Drizzle ORM was introduced for its lightweight, SQL-like query builder. 

**Current Ownership Split:**
- **Prisma:** Owns the source of truth for the database schema (`prisma/schema.prisma`). It is used exclusively by the optional `.NET` backend (via generated types) and legacy Node scripts.
- **Drizzle:** Used by the active Node.js TRPC routes for all runtime querying and mutations due to its superior performance footprint.

**Consolidation Plan:**
The long-term goal is to fully migrate schema definition and all querying to Drizzle ORM to remove the Prisma dependency entirely. Until then, *do not* add new Prisma queries in the Node backend. Use Drizzle for all new features.

## Migrations and Schema Changes

Because Prisma currently owns the schema definition, all schema changes must begin in `prisma.schema`.

### The `db:push` Command

To sync your local schema changes to your database, you use:
```bash
pnpm run db:push
```

> [!CAUTION]
> **Destructive Capabilities:** The `db:push` command forces the database to match your Prisma schema. If you rename a column or delete a table in your schema, **`db:push` will drop the underlying data without a formal migration file.**
> Never run this command against production or staging databases. 

### Rollback Procedure for Local `db:push` Failures

If you accidentally run `db:push` locally and destroy data or corrupt your schema state:
1. **Discard Schema Changes:** Revert your `schema.prisma` to the `main` branch state (`git checkout main -- prisma/schema.prisma`).
2. **Re-sync:** Run `pnpm run db:push` again to revert the tables back to their original structure.
3. **Seed:** Run your local database seeder to repopulate lost test data (if applicable).
4. *If totally corrupted:* Drop the local MySQL database entirely, recreate it, and run `db:push`.
