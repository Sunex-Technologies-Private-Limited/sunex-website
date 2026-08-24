import { fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { PageShell, SiteHeader } from "./SiteShell";

vi.mock("wouter", () => ({
  Link: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => <a href={href} {...props}>{children}</a>,
  useLocation: () => ["/", vi.fn()],
}));

describe("SiteHeader", () => {
  it("opens and closes the responsive navigation panel", () => {
    render(<SiteHeader />);
    const toggle = screen.getByRole("button", { name: "Open navigation" });
    const menu = document.querySelector(".site-nav__mobile") as HTMLElement;

    fireEvent.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    expect(menu.classList.contains("is-open")).toBe(true);

    fireEvent.click(within(menu).getByRole("link", { name: "Contact" }));
    expect(menu.classList.contains("is-open")).toBe(false);
  });

  it("uses the supplied SunEx mark in the shared navigation", () => {
    render(<SiteHeader />);
    const actualLockup = document.querySelector(".sunex-mark__actual-lockup");
    expect(actualLockup?.getAttribute("src")).toContain("sunex-actual-nav-lockup-transparent_7c99c62e.png");
  });

  it("keeps the supplied SunEx Technologies lockup visible in the shared footer", () => {
    const { unmount } = render(<PageShell><div>Page content</div></PageShell>);
    const footerLockup = document.querySelector(".site-footer .sunex-mark__actual-lockup");
    expect(footerLockup?.getAttribute("src")).toContain("sunex-actual-nav-lockup-transparent_7c99c62e.png");
    unmount();
  });

  it("provides a keyboard skip link to the main content destination", () => {
    render(<PageShell><div>Page content</div></PageShell>);
    expect(screen.getByRole("link", { name: "Skip to main content" }).getAttribute("href")).toBe("#main-content");
    expect(document.querySelector("main")?.getAttribute("id")).toBe("main-content");
  });

  it("keeps the header in its reinforced scrolled visibility state", () => {
    Object.defineProperty(window, "scrollY", { configurable: true, value: 96 });
    render(<SiteHeader />);
    fireEvent.scroll(window);

    expect(document.querySelector(".site-nav")?.classList.contains("site-nav--scrolled")).toBe(true);
    Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
  });

  it("provides SkillConnect and Healthcare destinations through Services navigation", async () => {
    render(<SiteHeader />);

    const servicesTrigger = document.querySelector(".site-nav__services-trigger") as HTMLButtonElement;
    expect(servicesTrigger).toBeTruthy();
    fireEvent.pointerDown(servicesTrigger, { button: 0, ctrlKey: false, pointerType: "mouse" });
    expect(await screen.findByRole("menuitem", { name: /SkillConnect/i })).toBeTruthy();
    expect(document.querySelectorAll('a[href="/education"]').length).toBeGreaterThan(0);
    expect(document.querySelectorAll('a[href="/healthcare"]').length).toBeGreaterThan(0);

    const mobileMenu = document.querySelector(".site-nav__mobile") as HTMLElement;
    expect(mobileMenu.querySelector('a[href="/education"]')).toBeTruthy();
    expect(mobileMenu.querySelector('a[href="/healthcare"]')).toBeTruthy();
  });
});
