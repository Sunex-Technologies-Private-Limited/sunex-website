import { describe, expect, it } from "vitest";
import { assertRuntimeConfiguration, getAllowedOrigins } from "./runtimeConfig";

const productionEnv = {
  NODE_ENV: "production",
  DATABASE_URL: "mysql://user:password@example.com:3306/sunex",
  JWT_SECRET: "a".repeat(32),
  VITE_APP_ID: "app-id",
  OAUTH_SERVER_URL: "https://oauth.example.com",
  BUILT_IN_FORGE_API_URL: "https://forge.example.com",
  BUILT_IN_FORGE_API_KEY: "forge-key",
};

describe("runtime configuration", () => {
  it("fails fast in production without required configuration", () => {
    expect(() => assertRuntimeConfiguration({ NODE_ENV: "production" })).toThrow("Invalid production configuration");
  });

  it("accepts complete production configuration and parses reviewed origins", () => {
    expect(() => assertRuntimeConfiguration(productionEnv)).not.toThrow();
    expect(getAllowedOrigins({ SUNEX_ALLOWED_ORIGINS: "https://sunex.example, http://localhost:3000,not-an-origin" })).toEqual(
      new Set(["https://sunex.example", "http://localhost:3000"]),
    );
  });
});
