import { defineConfig } from "vitest/config";
import path from "path";

const platformRoot = path.resolve(import.meta.dirname);

export default defineConfig({
  root: platformRoot,
  resolve: {
    alias: {
      "@": path.resolve(platformRoot, "client", "src"),
      "@shared": path.resolve(platformRoot, "shared"),
      "@assets": path.resolve(platformRoot, "attached_assets"),
    },
  },
  test: {
    environment: "node",
    environmentMatchGlobs: [["client/**/*.test.tsx", "jsdom"]],
    include: ["server/**/*.test.ts", "server/**/*.spec.ts", "client/**/*.test.tsx"],
  },
});
