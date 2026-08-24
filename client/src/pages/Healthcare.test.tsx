import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Healthcare from "./Healthcare";

vi.mock("wouter", () => ({
  Link: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => <a href={href} {...props}>{children}</a>,
}));

vi.mock("@/components/sunex/PageHero", () => ({
  PageHero: () => <div data-testid="page-hero" />,
}));

vi.mock("@/components/sunex/Reveal", () => ({
  Reveal: ({ children, className }: { children: React.ReactNode; className?: string }) => <div className={className}>{children}</div>,
}));

describe("Healthcare care journey", () => {
  it("changes the stage image when a different care step is selected", () => {
    render(<Healthcare />);
    const transition = screen.getByRole("button", { name: /prepare the transition/i });

    expect(screen.getByRole("img", { name: "Patient discussing care needs with a healthcare professional" }).getAttribute("src")).toBe("/manus-storage/healthcare-share-needs_d2337c04.jpg");
    fireEvent.click(transition);

    expect(transition.getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByRole("img", { name: "Healthcare travel support during a patient transition" }).getAttribute("src")).toBe("/manus-storage/healthcare-transition-support_7ed4217d.jpg");
  });
});
