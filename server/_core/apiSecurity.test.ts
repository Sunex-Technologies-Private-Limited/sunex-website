import { describe, expect, it, vi } from "vitest";
import { registerApiSecurity } from "./apiSecurity";

function getMiddleware() {
  const use = vi.fn();
  registerApiSecurity({ use } as never);
  return use.mock.calls[0]?.[1];
}

function makeResponse() {
  return { setHeader: vi.fn(), status: vi.fn().mockReturnThis(), json: vi.fn(), end: vi.fn() };
}

describe("API origin security", () => {
  it("allows a same-origin browser mutation and sets narrow CORS headers", () => {
    const response = makeResponse();
    const next = vi.fn();
    getMiddleware()({ method: "POST", protocol: "https", get: vi.fn((name: string) => name === "origin" ? "https://sunex.example" : "sunex.example") }, response, next);

    expect(response.setHeader).toHaveBeenCalledWith("Access-Control-Allow-Origin", "https://sunex.example");
    expect(next).toHaveBeenCalledOnce();
  });

  it("rejects an unreviewed cross-origin request before a mutation reaches the router", () => {
    const response = makeResponse();
    getMiddleware()({ method: "POST", protocol: "https", get: vi.fn((name: string) => name === "origin" ? "https://attacker.example" : "sunex.example") }, response, vi.fn());

    expect(response.status).toHaveBeenCalledWith(403);
    expect(response.json).toHaveBeenCalledWith({ error: "origin_not_allowed" });
  });
});
