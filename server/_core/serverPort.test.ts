import { describe, expect, it } from "vitest";
import { resolveServerPort } from "./serverPort";

describe("managed server port", () => {
  it("uses the exact platform port and defaults to 3000 only when none is supplied", () => {
    expect(resolveServerPort("4173")).toBe(4173);
    expect(resolveServerPort(undefined)).toBe(3000);
  });

  it("rejects invalid ports instead of scanning for an unmanaged fallback", () => {
    expect(() => resolveServerPort("0")).toThrow("PORT must be a valid TCP port number.");
    expect(() => resolveServerPort("not-a-port")).toThrow("PORT must be a valid TCP port number.");
  });
});
