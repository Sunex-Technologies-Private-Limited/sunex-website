import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("site metadata", () => {
  it("uses the transparent orange-only SunEx symbol for the browser tab icon", () => {
    const documentShell = readFileSync(resolve(process.cwd(), "client", "index.html"), "utf8");

    expect(documentShell).toContain('href="/manus-storage/sunex-logo-symbol-only_428f5f83.png"');
    expect(documentShell).not.toContain("sunex-favicon_09530f68.png");
  });
});
