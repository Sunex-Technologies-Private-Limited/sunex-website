import React from "react";
import { render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PageMeta } from "./PageMeta";

vi.mock("wouter", () => ({
  useLocation: () => ["/product"],
}));

describe("PageMeta", () => {
  it("sets product-specific canonical, social-preview, and organization metadata", async () => {
    render(<PageMeta />);

    await waitFor(() => expect(document.title).toContain("UrbanTree"));
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute("href")).toContain("/product");
    expect(document.head.querySelector('meta[property="og:image"]')?.getAttribute("content")).toContain("urbantree-city-clean_b9b26676.png");
    expect(document.head.querySelector('script[data-sunex-schema="organization"]')?.textContent).toContain("SunEx Technologies Pvt. Ltd.");
  });
});
