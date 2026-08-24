import path from "node:path";
import { describe, expect, it } from "vitest";
import { resolveBundledStorageAssetPath } from "./storageProxy";

describe("bundled storage assets", () => {
  it("resolves a safe managed asset key under the configured asset root", () => {
    expect(resolveBundledStorageAssetPath("hero/urban.png", "/tmp/sunex-assets")).toBe(path.resolve("/tmp/sunex-assets/hero/urban.png"));
  });

  it("rejects traversal and absolute file paths", () => {
    expect(resolveBundledStorageAssetPath("../secrets.txt", "/tmp/sunex-assets")).toBeNull();
    expect(resolveBundledStorageAssetPath("/etc/passwd", "/tmp/sunex-assets")).toBeNull();
  });
});
