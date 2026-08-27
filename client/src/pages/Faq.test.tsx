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
  it("groups the supplied SunEx questions and keeps a direct conversation action", () => {
    render(<Faq />);
    expect(screen.getByText("What is SunEx Technologies?")).toBeTruthy();
    expect(screen.getByText("What is UrbanTree?")).toBeTruthy();
    expect(screen.getByText("Does SunEx work in education?")).toBeTruthy();
    expect(screen.getByText("Does this website provide medical advice?")).toBeTruthy();
    expect(screen.getByRole("link", { name: "Start a conversation" }).getAttribute("href")).toBe("/contact");
  });
});
