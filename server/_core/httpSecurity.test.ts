import { describe, expect, it, vi } from "vitest";
import { registerHttpSecurity } from "./httpSecurity";

describe("public HTTP security middleware", () => {
  it("disables framework disclosure, trusts one managed proxy, and adds safe response headers", () => {
    const use = vi.fn();
    const app = { disable: vi.fn(), set: vi.fn(), use };
    registerHttpSecurity(app as never);

    expect(app.disable).toHaveBeenCalledWith("x-powered-by");
    expect(app.set).toHaveBeenCalledWith("trust proxy", 1);

    const middleware = use.mock.calls[0]?.[0];
    const setHeader = vi.fn();
    const next = vi.fn();
    middleware({ secure: true }, { setHeader }, next);

    expect(setHeader).toHaveBeenCalledWith("X-Content-Type-Options", "nosniff");
    expect(setHeader).toHaveBeenCalledWith("X-Frame-Options", "DENY");
    expect(setHeader).toHaveBeenCalledWith("Strict-Transport-Security", "max-age=31536000");
    expect(setHeader).toHaveBeenCalledWith("Content-Security-Policy", expect.stringContaining("frame-ancestors 'none'"));
    expect(setHeader).toHaveBeenCalledWith("Content-Security-Policy", expect.stringContaining("object-src 'none'"));
    expect(next).toHaveBeenCalledOnce();
  });

  it("does not send HSTS over a non-secure local request", () => {
    const use = vi.fn();
    registerHttpSecurity({ disable: vi.fn(), set: vi.fn(), use } as never);
    const middleware = use.mock.calls[0]?.[0];
    const setHeader = vi.fn();

    middleware({ secure: false }, { setHeader }, vi.fn());

    expect(setHeader).not.toHaveBeenCalledWith("Strict-Transport-Security", expect.any(String));
  });
});
