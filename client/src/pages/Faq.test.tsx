import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Faq from "./Faq";

vi.mock("wouter", () => ({
  Link: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => <a href={href} {...props}>{children}</a>,
}));

vi.mock("@/components/sunex/Reveal", () => ({
  Reveal: ({ children, className }: { children: React.ReactNode; className?: string }) => <div className={className}>{children}</div>,
}));

describe("SunEx FAQs", () => {
  it("groups decision-support answers by service and keeps a direct contact escalation", () => {
    render(<Faq />);
    expect(screen.getByText("What is UrbanTree?")).toBeTruthy();
    expect(screen.getByText("Where can I confirm course duration, eligibility, and fees?")).toBeTruthy();
    expect(screen.getByText("Does this website provide medical advice?")).toBeTruthy();
    expect(screen.getByRole("link", { name: "Start a guided enquiry" }).getAttribute("href")).toBe("/contact");
  });
});
