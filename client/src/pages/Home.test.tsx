import React from "react";
import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Home, { HomeExperience } from "./Home";

vi.mock("wouter", () => ({
  Link: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => <a href={href} {...props}>{children}</a>,
}));

class IntersectionObserverMock {
  constructor(_callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {}
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] { return []; }
}

vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

describe("Home cinematic hero", () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("automatically advances from UrbanTree to SkillConnect and updates the guided enquiry destination", () => {
    vi.useFakeTimers();
    render(<Home />);

    expect(screen.getByRole("heading", { name: /Air that helps cities/i })).toBeTruthy();
    expect(document.querySelector("#proof-title")?.textContent).toContain("Evidence we can");
    expect(screen.getByText("Publication standard")).toBeTruthy();

    act(() => vi.advanceTimersByTime(6800));

    expect(screen.getByRole("heading", { name: /Learning that turns into\s*opportunity/i })).toBeTruthy();
    const enquiryLinks = screen.getAllByRole("link", { name: /Discuss SkillConnect/i });
    expect(enquiryLinks[0]?.getAttribute("href")).toBe("/contact?interest=education");
  });

  it("holds the first UrbanTree scene when reduced motion is requested", () => {
    vi.useFakeTimers();
    render(<HomeExperience forceReducedMotion />);

    act(() => vi.advanceTimersByTime(13_600));

    expect(screen.getByRole("heading", { name: /Air that helps cities/i })).toBeTruthy();
    expect(screen.queryByRole("heading", { name: /Learning that turns into\s*opportunity/i })).toBeNull();
    expect(screen.queryByLabelText(/Automatic SunEx scene/i)).toBeNull();
  });
});
