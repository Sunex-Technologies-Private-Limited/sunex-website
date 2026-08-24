import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import About from "./About";

vi.mock("@/components/sunex/PageHero", () => ({ PageHero: () => <div data-testid="page-hero" /> }));
vi.mock("@/components/sunex/Reveal", () => ({ Reveal: ({ children, className }: { children: React.ReactNode; className?: string }) => <div className={className}>{children}</div> }));
vi.mock("@/components/sunex/BentoCard", () => ({ BentoCard: ({ children }: { children: React.ReactNode }) => <article>{children}</article> }));
vi.mock("wouter", () => ({ Link: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => <a href={href} {...props}>{children}</a> }));

afterEach(cleanup);

describe("About leadership portraits", () => {
  it("keeps the About introduction copy in its dedicated readable layout", () => {
    render(<About />);

    expect(screen.getByText("Our perspective").closest(".about-intro__copy")).not.toBeNull();
    expect(screen.getByText("and improve lives.")).toBeTruthy();
    expect(screen.getByText("Guiding principles").parentElement?.className).toContain("image-panel__float--about");
  });

  it("uses portrait-specific framing classes so each leader remains visible", () => {
    render(<About />);

    expect(screen.getByAltText("Sanjeeth Suresh").closest(".team-card")?.className).toContain("team-card--sanjeeth");
    expect(screen.getByAltText("Umesh H").closest(".team-card")?.className).toContain("team-card--umesh");
    expect(screen.getByAltText("Dr. Raghavendra Deshpande").closest(".team-card")?.className).toContain("team-card--raghavendra");
    expect(screen.getAllByRole("img").map(image => image.parentElement?.className)).toContain("team-card__media");
  });
});
