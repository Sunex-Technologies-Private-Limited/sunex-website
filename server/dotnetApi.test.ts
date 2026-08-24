import { afterEach, describe, expect, it, vi } from "vitest";
import { submitContactInquiry } from "./dotnetApi";

const payload = { name: "Asha Rao", organization: null, email: "asha@example.com", phone: null, solution: "urbantree" as const, industry: "smartcity" as const, message: "We would like to discuss an UrbanTree deployment for a public space." };

describe(".NET contact API client", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("forwards the validated payload with an idempotency key and returns the .NET response", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: true, id: 91, requestId: "trace-91" }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(submitContactInquiry(payload, "203.0.113.25", "a".repeat(64))).resolves.toEqual({ success: true, id: 91, requestId: "trace-91" });
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock.mock.calls[0]?.[0]).toContain("/internal/v1/contact-inquiries");
    expect(fetchMock.mock.calls[0]?.[1]?.headers["Idempotency-Key"]).toMatch(/^[0-9a-f-]{36}$/i);
    expect(fetchMock.mock.calls[0]?.[1]?.headers["X-Sunex-Client-IP"]).toBe("203.0.113.25");
    expect(fetchMock.mock.calls[0]?.[1]?.headers["X-Sunex-Client-Fingerprint"]).toBe("a".repeat(64));
  });

  it("does not expose backend failure details as a successful contact submission", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 503, headers: { traceparent: "trace-unavailable" } })));
    await expect(submitContactInquiry(payload)).rejects.toThrow("503");
  });
});
