import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import KidsCourses from "./KidsCourses";
import { kidsCourses } from "@/data/kidsCourses";

vi.mock("wouter", () => ({
  Link: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => <a href={href} {...props}>{children}</a>,
}));
vi.mock("@/components/sunex/Reveal", () => ({ Reveal: ({ children, className }: { children: React.ReactNode; className?: string }) => <div className={className}>{children}</div> }));
vi.mock("@/lib/trpc", () => ({ trpc: { contact: { submit: { useMutation: () => ({ mutate: vi.fn(), isPending: false, error: null }) } } } }));

afterEach(cleanup);

describe("SkillConnect Kids page", () => {
  it("shows all six courses, each with three levels", () => {
    render(<KidsCourses />);
    for (const course of kidsCourses) expect(screen.getAllByText(course.title).length).toBeGreaterThan(0);
    expect(kidsCourses.every((course) => course.levels.length === 3)).toBe(true);
    expect(screen.getAllByText(/Basic/).length).toBeGreaterThan(0);
  });

  it("uses self-paced wording and never the word recorded", () => {
    const { container } = render(<KidsCourses />);
    expect(container.textContent).toContain("Learn at your own pace");
    expect(container.textContent?.toLowerCase()).not.toContain("recorded");
  });

  it("states the age range as 7 to 16", () => {
    const { container } = render(<KidsCourses />);
    expect(container.textContent).toContain("Ages 7–16");
    expect(container.textContent).not.toMatch(/\b6\s?(to|–)\s?16\b/);
  });

  it("requires parental consent in the demo form", () => {
    render(<KidsCourses />);
    const consent = screen.getByRole("checkbox") as HTMLInputElement;
    expect(consent.required).toBe(true);
    expect(consent.checked).toBe(false);
  });

  it("recommends a course in the finder", () => {
    render(<KidsCourses />);
    fireEvent.click(screen.getByRole("button", { name: /10–12 years/ }));
    fireEvent.click(screen.getByRole("button", { name: /Robots/ }));
    expect(screen.getByText("Best match")).toBeTruthy();
    expect(screen.getAllByText("Robotics Basics").length).toBeGreaterThan(0);
  });

  it("keeps internal admin and roadmap content out of the public platform preview", async () => {
    const { readFileSync } = await import("node:fs");
    const html = readFileSync("client/public/lms-preview/index.html", "utf-8");
    expect(html).not.toContain('data-v="admin"');
    expect(html.toLowerCase()).not.toContain("build vs buy");
    expect(html.toLowerCase()).not.toContain("recorded");
    expect(html).not.toMatch(/<script>/);
  });
});
