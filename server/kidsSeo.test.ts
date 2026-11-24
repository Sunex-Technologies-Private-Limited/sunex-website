import { describe, expect, it } from "vitest";
import { injectKidsMeta, kidsRouteMeta, kidsSeoCourses } from "../shared/kidsSeo";
import { kidsCourses } from "../client/src/data/kidsCourses";

const html = `<head><meta name="description" content="old" /><meta property="og:title" content="old" /><meta property="og:description" content="old" /><title>old</title></head>`;

describe("kids SEO metadata", () => {
  it("covers exactly the courses shown on the site, with the same titles", () => {
    expect(kidsSeoCourses.map((c) => [c.id, c.title])).toEqual(kidsCourses.map((c) => [c.id, c.title]));
  });

  it("gives each course page its own title and description", () => {
    const python = kidsRouteMeta("/education/kids/python");
    const robotics = kidsRouteMeta("/education/kids/robotics/");
    expect(python?.title).toContain("Programming in Python");
    expect(python?.title).toContain("Ages 10–16");
    expect(robotics?.title).toContain("Robotics Basics");
    expect(python?.description).not.toBe(robotics?.description);
  });

  it("ignores other routes and unknown courses", () => {
    expect(kidsRouteMeta("/education")).toBeNull();
    expect(kidsRouteMeta("/education/kids/unknown")).toBeNull();
    expect(injectKidsMeta(html, "/contact")).toBe(html);
  });

  it("injects route text into index.html", () => {
    const page = injectKidsMeta(html, "/education/kids/scratch");
    expect(page).toContain("<title>Programming in Scratch for Kids (Ages 7–16)");
    expect(page).not.toContain("old");
  });
});
