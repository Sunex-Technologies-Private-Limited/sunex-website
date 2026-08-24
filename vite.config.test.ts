import { describe, expect, it } from "vitest";
import { buildStoragePresignUrl } from "./vite.config";

describe("Vite storage proxy", () => {
  it("builds an encoded Forge presign request from a managed storage key", () => {
    expect(buildStoragePresignUrl("https://forge.example/api/", "sunex/hero image.png")).toBe(
      "https://forge.example/api/v1/storage/presign/get?path=sunex%2Fhero+image.png",
    );
  });
});
