import { z } from "zod";

const productionConfigSchema = z.object({
  NODE_ENV: z.literal("production"),
  DATABASE_URL: z.string().url().refine(value => value.startsWith("mysql://"), "DATABASE_URL must use mysql://").optional().or(z.literal("")),
  JWT_SECRET: z.string().min(32).optional().or(z.literal("")),
  VITE_APP_ID: z.string().min(1).optional(),
  OAUTH_SERVER_URL: z.string().optional().or(z.literal("")),
  BUILT_IN_FORGE_API_URL: z.string().optional().or(z.literal("")),
  BUILT_IN_FORGE_API_KEY: z.string().optional().or(z.literal("")),
});

function configurationError(issues: z.ZodIssue[]) {
  const names = issues.map(issue => issue.path.join(".")).filter(Boolean);
  return new Error(`Invalid production configuration: ${names.join(", ") || "unknown setting"}.`);
}

export function assertRuntimeConfiguration(env: NodeJS.ProcessEnv = process.env) {
  if (env.NODE_ENV !== "production") return;

  const parsed = productionConfigSchema.safeParse(env);
  if (!parsed.success) throw configurationError(parsed.error.issues);
}

export function getAllowedOrigins(env: NodeJS.ProcessEnv = process.env) {
  return new Set(
    (env.SUNEX_ALLOWED_ORIGINS ?? "")
      .split(",")
      .map(value => value.trim())
      .filter(value => value.startsWith("https://") || value.startsWith("http://localhost")),
  );
}
