import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Education from "./Education";

vi.mock("wouter", () => ({
  Link: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => <a href={href} {...props}>{children}</a>,
}));

vi.mock("@/components/sunex/PageHero", () => ({
  PageHero: ({ eyebrow, title, image, backgroundImages, description }: { eyebrow: string; title: React.ReactNode; image: string; backgroundImages?: readonly string[]; description?: string }) => <div data-testid="page-hero" data-image={image} data-background-images={backgroundImages?.join(",")}><span>{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>,
}));

vi.mock("@/components/sunex/Reveal", () => ({
  Reveal: ({ children, className }: { children: React.ReactNode; className?: string }) => <div className={className}>{children}</div>,
}));

describe("SkillConnect course catalogue", () => {
  it("selects an individual approved course instead of a generic pathway", () => {
    render(<Education />);
    const course = screen.getByRole("button", { name: "View Industrial Programmable Logic Controllers" });

    expect(screen.getByTestId("page-hero").getAttribute("data-image")).toBe("/manus-storage/skillconnect-celebration_80c1a040.png");
    expect(screen.getByTestId("page-hero").getAttribute("data-background-images")).toBe("/manus-storage/skillconnect-celebration_80c1a040.png,/manus-storage/skillconnect-professional_4f6cd1c9.png,/manus-storage/skillconnect-collaboration_5121aa81.png");
    expect(screen.getByText("Skill Connect by sunex technology")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Preparing People for What Comes Next" })).toBeTruthy();
    expect(screen.getByText("We create learning opportunities that help students, professionals, job seekers and organisations build relevant capabilities, gain practical experience and stay prepared for the future")).toBeTruthy();
    expect(screen.getByText("Skill Connect by SunEx bridges the gap between academic education and industry requirements through practical learning, technology exposure and skill development.")).toBeTruthy();
    expect(screen.getByText("Our programs are designed and delivered by industry experts, supported by a passionate team of young professionals and experienced mentors with over two decades of industry experience, bringing together fresh perspectives and real-world expertise")).toBeTruthy();
    expect(document.querySelector(".skillconnect-intro--editorial")).toBeTruthy();
    expect(screen.getByText("15+")).toBeTruthy();
    expect(screen.getByText("Learning Opportunities")).toBeTruthy();
    expect(screen.getByText("10K")).toBeTruthy();
    expect(screen.getByText("20+")).toBeTruthy();
    expect(screen.getByText("Industry professionals")).toBeTruthy();
    expect(screen.queryByAltText("SkillConnect applied learning session")).toBeNull();
    expect(document.querySelector(".education-approach h2")?.textContent).toContain("Learning beyond");
    expect(document.querySelector(".education-approach h2")?.textContent).toContain("the classroom.");
    expect(screen.getByText("Knowledge")).toBeTruthy();
    expect(screen.getByText("Continuous Learning")).toBeTruthy();
    expect(document.querySelector(".education-focus-section h2")?.textContent).toContain("Learning that builds");
    expect(document.querySelector(".education-focus-section h2")?.textContent).toContain("real-world capability.");
    expect(document.querySelector(".education-focus-manifesto")?.textContent).toContain("01 — 06");
    expect(document.querySelector(".education-focus-layout--balanced")).toBeTruthy();
    expect(document.querySelector(".education-focus-manifesto--compact")).toBeTruthy();
    expect(document.querySelector(".education-focus-manifesto")?.className).not.toContain("reveal");
    expect(document.querySelector(".education-focus-manifesto__content")?.textContent).toContain("Learning that builds");
    expect(document.querySelectorAll(".education-focus-card")).toHaveLength(6);
    expect(document.querySelectorAll(".education-focus-card__meta")).toHaveLength(6);
    expect(document.querySelector(".education-institutions-section h2")?.textContent).toContain("Partnerships that make");
    expect(document.querySelector(".education-institutions-section h2")?.textContent).toContain("learning more relevant.");
    expect(screen.getByRole("link", { name: /Partner with SunEx/i })).toBeTruthy();
    expect(document.querySelectorAll(".education-audience__list--initiatives .education-audience__list-icon")).toHaveLength(8);
    expect(screen.getByText("Technology workshops")).toBeTruthy();
    expect(document.querySelector(".education-students-section h2")?.textContent).toContain("Confidence for the");
    expect(document.querySelector(".education-students-section h2")?.textContent).toContain("real world.");
    expect(screen.getByText("For students")).toBeTruthy();
    expect(screen.getByText("Our initiatives can help students:")).toBeTruthy();
    expect(document.querySelectorAll(".education-audience--light .education-audience__list li")).toHaveLength(7);
    expect(document.querySelector(".education-goal h2")?.textContent).toContain("Make learning more relevant.");
    expect(document.querySelector(".education-goal h2")?.textContent).toContain("Make skills more practical.");
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
    expect(screen.queryByText("Programme benefits")).toBeNull();
    expect(screen.queryByText(/Learning that travels into the real world/i)).toBeNull();
  });
});
