import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";

describe("managed asset export", () => {
  it("discovers the website asset catalog without downloading it", () => {
    const output = execFileSync("node", ["scripts/exportManagedAssets.mjs", "--manifest-only"], {
      cwd: process.cwd(),
      encoding: "utf8",
    });
    const manifest = JSON.parse(output) as { assetCount: number; assets: string[] };

    expect(manifest.assetCount).toBeGreaterThan(20);
    expect(manifest.assets).toContain("urbantree-city-clean_b9b26676.png");
    expect(manifest.assets).toContain("responsible-ai_f08891c8.jpg");
    expect(manifest.assets).toContain("sunex-logo-symbol-only_428f5f83.png");
    expect(manifest.assets.some(asset => asset.includes("$"))).toBe(false);
  });
});
