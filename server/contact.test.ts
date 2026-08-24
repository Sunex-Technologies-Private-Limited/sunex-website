import { describe, expect, it, vi } from "vitest";

vi.mock("./dotnetApi", () => ({ submitContactInquiry: vi.fn().mockResolvedValue({ success: true, id: 42, requestId: "trace-42" }) }));
vi.mock("./dotnetRuntime", () => ({ isDotnetApiEnabled: () => true }));

import { submitContactInquiry } from "./dotnetApi";
import { appRouter, contactInputSchema } from "./routers";

describe("contact inquiry validation", () => {
  const validInquiry = { name: "Asha Rao", organization: "SunEx Partner", email: "asha@example.com", phone: "", solution: "urbantree", industry: "smartcity", message: "We would like to discuss an UrbanTree deployment for a public space." };

  it("accepts the source-compatible contact payload", () => {
    expect(contactInputSchema.safeParse(validInquiry).success).toBe(true);
  });

  it("rejects an inquiry without a meaningful message", () => {
    expect(contactInputSchema.safeParse({ ...validInquiry, message: "Too short" }).success).toBe(false);
  });

  it("returns the successful-submission response without needing a real database insert", async () => {
    const caller = appRouter.createCaller({ user: null, req: { ip: "203.0.113.25", headers: { "user-agent": "Vitest", "accept-language": "en" } } as never, res: { clearCookie: vi.fn() } as never });
    await expect(caller.contact.submit(validInquiry)).resolves.toEqual({ success: true, id: 42 });
    expect(submitContactInquiry).toHaveBeenCalledWith(expect.any(Object), "203.0.113.25", expect.stringMatching(/^[a-f0-9]{64}$/));
  });
});
