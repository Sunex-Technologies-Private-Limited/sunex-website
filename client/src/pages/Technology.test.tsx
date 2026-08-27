import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Technology from "./Technology";

vi.mock("@/components/sunex/PageHero", () => ({ PageHero: ({ eyebrow, title, image }: { eyebrow: string; title: React.ReactNode; image: string }) => <div data-testid="page-hero" data-image={image}>{eyebrow}{title}</div> }));
vi.mock("@/components/sunex/Reveal", () => ({ Reveal: ({ children, className }: { children: React.ReactNode; className?: string }) => <div className={className}>{children}</div> }));
vi.mock("wouter", () => ({ Link: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => <a href={href} {...props}>{children}</a> }));

afterEach(() => cleanup());

describe("Technology page", () => {
  it("uses the supplied water-city visual in its purpose-led Technology hero", () => {
    render(<Technology />);
    const hero = screen.getByTestId("page-hero");
    expect(hero.getAttribute("data-image")).toBe("/manus-storage/technology-water-city_f764dbb1.png");
    expect(hero.textContent).toContain("Technology with purpose.");
  });

  it("renders the approved Technology approach, focus areas, impact questions, and ecosystem content", () => {
    render(<Technology />);
    expect(screen.getByText("Our approach")).toBeTruthy();
    expect(screen.getByText("Artificial Intelligence")).toBeTruthy();
    expect(screen.getByText("Data-Driven Solutions")).toBeTruthy();
    expect(screen.getByText("What problem are we solving?")).toBeTruthy();
    expect(screen.getByText("Connecting Experience,")).toBeTruthy();
    expect(document.querySelector(".tech-approach-section")).toBeTruthy();
    expect(document.querySelectorAll(".tech-process-step__icon")).toHaveLength(5);
    expect(document.querySelector(".tech-impact-section")).toBeTruthy();
    expect(document.querySelector(".tech-impact-details")).toBeTruthy();
    expect(document.querySelector(".tech-impact-visual__index")?.textContent).toContain("Technology in action");
  });
});
