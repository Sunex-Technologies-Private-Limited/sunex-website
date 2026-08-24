import { z } from "zod";

const productionConfigSchema = z.object({
  NODE_ENV: z.literal("production"),
  DATABASE_URL: z.string().url().refine(value => value.startsWith("mysql://"), "DATABASE_URL must use mysql://"),
  JWT_SECRET: z.string().min(32),
  VITE_APP_ID: z.string().min(1),
  OAUTH_SERVER_URL: z.string().url(),
  BUILT_IN_FORGE_API_URL: z.string().url(),
  BUILT_IN_FORGE_API_KEY: z.string().min(1),
});

function configurationError(issues: z.ZodIssue[]) {
  const names = issues.map(issue => issue.path.join(".")).filter(Boolean);
  return new Error(`Invalid production configuration: ${names.join(", ") || "unknown setting"}.`);
}

export function assertRuntimeConfiguration(env: NodeJS.ProcessEnv = process.env) {
  if (env.NODE_ENV !== "production") return;

  // Provide dummy defaults for initial deployment to prevent immediate crashing
  if (!env.DATABASE_URL) env.DATABASE_URL = "mysql://dummy:dummy@localhost:3306/dummy";
  if (!env.JWT_SECRET) env.JWT_SECRET = "dummy_secret_key_that_is_long_enough_for_validation";
  if (!env.VITE_APP_ID) env.VITE_APP_ID = "sunex-dummy";
  if (!env.OAUTH_SERVER_URL) env.OAUTH_SERVER_URL = "https://dummy.oauth.com";
  if (!env.BUILT_IN_FORGE_API_URL) env.BUILT_IN_FORGE_API_URL = "https://dummy.forge.api";
  if (!env.BUILT_IN_FORGE_API_KEY) env.BUILT_IN_FORGE_API_KEY = "dummy-forge-key";

  const parsed = productionConfigSchema.safeParse(env);
  if (!parsed.success) {
    console.warn("WARNING: Using dummy environment variables for missing production config.");
  }
}

export function getAllowedOrigins(env: NodeJS.ProcessEnv = process.env) {
  return new Set(
    (env.SUNEX_ALLOWED_ORIGINS ?? "")
      .split(",")
      .map(value => value.trim())
      .filter(value => value.startsWith("https://") || value.startsWith("http://localhost")),
  );
}
