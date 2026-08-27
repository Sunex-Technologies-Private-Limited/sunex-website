import { afterEach, describe, expect, it } from "vitest";
import { contactClientFingerprint } from "./routers";

const originalRateLimitSecret = process.env.SUNEX_RATE_LIMIT_SECRET;

afterEach(() => {
  process.env.SUNEX_RATE_LIMIT_SECRET = originalRateLimitSecret;
});

describe("contact rate-limit fingerprint", () => {
  it("uses the configured server-only secret to produce a non-reversible fingerprint", () => {
    expect(process.env.SUNEX_RATE_LIMIT_SECRET).toBeTruthy();
    const headers = { "user-agent": "SunEx test browser", "accept-language": "en-IN", accept: "text/html" };
    const firstFingerprint = contactClientFingerprint(headers);

    process.env.SUNEX_RATE_LIMIT_SECRET = "different-test-rate-limit-secret";
    const secondFingerprint = contactClientFingerprint(headers);

    expect(firstFingerprint).toMatch(/^[a-f0-9]{64}$/);
    expect(secondFingerprint).toMatch(/^[a-f0-9]{64}$/);
    expect(firstFingerprint).not.toBe(secondFingerprint);
    expect(firstFingerprint).not.toContain("SunEx test browser");
  });
});
