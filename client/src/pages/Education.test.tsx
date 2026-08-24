import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Education from "./Education";

vi.mock("wouter", () => ({
  Link: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => <a href={href} {...props}>{children}</a>,
}));

vi.mock("@/components/sunex/PageHero", () => ({
  PageHero: ({ image }: { image: string }) => <div data-testid="page-hero" data-image={image} />,
}));

vi.mock("@/components/sunex/Reveal", () => ({
  Reveal: ({ children, className }: { children: React.ReactNode; className?: string }) => <div className={className}>{children}</div>,
}));

describe("SkillConnect course catalogue", () => {
  it("selects an individual approved course instead of a generic pathway", () => {
    render(<Education />);
    const course = screen.getByRole("button", { name: "View Industrial Programmable Logic Controllers" });

    expect(screen.getByTestId("page-hero").getAttribute("data-image")).toBe("/manus-storage/skillconnect-coding-lab_8415e96a.jpg");
    expect(screen.getByText("Course index")).toBeTruthy();
    expect(document.querySelector(".course-market-feature h3")?.textContent).toContain("Find the idea");
    expect(document.querySelector<HTMLImageElement>(".course-market-feature__media img")?.src).toContain("skillconnect-course-invitation_b174345c.jpg");
    expect(course.className).toContain("course-market-card--catalogue");
    const courseVisuals = Array.from(document.querySelectorAll<HTMLImageElement>(".course-market-card__visual img")).map((image) => image.src);
    expect(courseVisuals).toHaveLength(14);
    expect(new Set(courseVisuals).size).toBe(14);
    expect(course.getAttribute("aria-pressed")).toBe("false");
    fireEvent.click(course);

    expect(course.getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByText(/Every course is a place to question, make, and move/i)).toBeTruthy();
    expect(screen.queryByText("AI & Frontier Intelligence")).toBeNull();
  });
});
