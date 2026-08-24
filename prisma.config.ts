import { defineConfig } from "prisma/config";

// The PostgreSQL target is intentionally optional until the approved parallel
// migration begins. Prisma commands that connect to a database must fail rather
// than infer or reuse the live MySQL/TiDB connection string.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.POSTGRES_DATABASE_URL ?? "",
  },
});
