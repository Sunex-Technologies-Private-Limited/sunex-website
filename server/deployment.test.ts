import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("production container contract", () => {
  it("runs the Node gateway and private .NET API without root privileges", () => {
    const dockerfile = readFileSync(new URL("../Dockerfile", import.meta.url), "utf8");

    expect(dockerfile).toContain("useradd --system --gid sunex");
    expect(dockerfile).toContain("COPY --chown=sunex:sunex");
    expect(dockerfile).toMatch(/USER sunex\s+CMD \["\.\/scripts\/start-production\.sh"\]/);
  });
});

