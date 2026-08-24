import { index, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const contactInquiries = mysqlTable("contact_inquiries", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  organization: varchar("organization", { length: 160 }),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 60 }),
  solution: varchar("solution", { length: 40 }).notNull(),
  industry: varchar("industry", { length: 40 }).notNull(),
  message: text("message").notNull(),
  idempotencyKey: varchar("idempotencyKey", { length: 72 }).unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Stores HMAC-derived, non-reversible anonymous contact rate-limit buckets.
// A short window key bounds each counter without retaining raw IP addresses or
// browser identifiers in the enquiry record itself.
export const contactRateLimitBuckets = mysqlTable("contact_rate_limit_buckets", {
  bucket: varchar("bucket", { length: 128 }).primaryKey(),
  windowStart: timestamp("windowStart").notNull(),
  requestCount: int("requestCount").notNull().default(0),
  expiresAt: timestamp("expiresAt").notNull(),
}, table => [index("contact_rate_limit_buckets_expires_at_idx").on(table.expiresAt)]);

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type InsertContactInquiry = typeof contactInquiries.$inferInsert;
