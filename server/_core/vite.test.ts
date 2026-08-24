import { describe, expect, it } from "vitest";
import { reactRefreshPreamble } from "./vite";

describe("custom Vite React integration", () => {
  it("includes the Fast Refresh preamble required before React route modules execute", () => {
    expect(reactRefreshPreamble).toContain('import RefreshRuntime from "/@react-refresh"');
    expect(reactRefreshPreamble).toContain("RefreshRuntime.injectIntoGlobalHook(window)");
    expect(reactRefreshPreamble).toContain("window.__vite_plugin_react_preamble_installed__ = true");
  });
});
