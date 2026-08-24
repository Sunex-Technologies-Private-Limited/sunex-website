import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Privacy from "./Privacy";

vi.mock("wouter", () => ({
  Link: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => <a href={href} {...props}>{children}</a>,
}));

vi.mock("@/components/sunex/Reveal", () => ({
  Reveal: ({ children, className }: { children: React.ReactNode; className?: string }) => <div className={className}>{children}</div>,
}));

describe("Privacy information", () => {
  it("describes the guided enquiry information and retains a clear contact path", () => {
    render(<Privacy />);
    expect(screen.getByText("What the website")).toBeTruthy();
    expect(screen.getByText("Retention and deletion")).toBeTruthy();
    expect(screen.getAllByRole("link", { name: "contact@sunextech.com" })[0]?.getAttribute("href")).toBe("mailto:contact@sunextech.com");
    expect(screen.getByRole("link", { name: "Start a guided enquiry" }).getAttribute("href")).toBe("/contact");
  });
});
