import { act, render } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PageHero } from "./PageHero";

vi.mock("wouter", () => ({
  Link: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => <a href={href} {...props}>{children}</a>,
}));

vi.mock("./Reveal", () => ({
  Reveal: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("PageHero background sequence", () => {
  afterEach(() => vi.useRealTimers());

  it("cycles through each supplied background image while retaining a single active image", () => {
    vi.useFakeTimers();
    const images = ["/first.png", "/second.png", "/third.png"];
    const { container } = render(<PageHero eyebrow="SkillConnect" title="Next steps" image={images[0]} backgroundImages={images} />);

    const heroImages = container.querySelectorAll<HTMLImageElement>(".page-hero__frame > img");
    expect(heroImages).toHaveLength(3);
    expect(heroImages[0]?.classList.contains("is-active")).toBe(true);

    act(() => vi.advanceTimersByTime(5800));
    expect(heroImages[1]?.classList.contains("is-active")).toBe(true);

    act(() => vi.advanceTimersByTime(5800));
    expect(heroImages[2]?.classList.contains("is-active")).toBe(true);
  });
});
