import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PageShell, SiteHeader } from "./SiteShell";

let mockLocation = "/";

vi.mock("wouter", () => ({
  Link: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => <a href={href} {...props}>{children}</a>,
  useLocation: () => [mockLocation, vi.fn()],
}));

afterEach(() => {
  cleanup();
  mockLocation = "/";
});

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

  it("uses the restored clean SUNEX Technologies lockup in the shared navigation", () => {
    render(<SiteHeader />);
    const wordmark = document.querySelector(".site-nav .sunex-mark__clean-lockup");
    expect(document.querySelector(".site-nav__brand")).toBeTruthy();
    expect(document.querySelector(".site-nav__action")?.textContent).toContain("Get in touch");
    expect(wordmark?.querySelector(".sunex-mark__wordmark strong")?.textContent).toBe("SUNEX");
    expect(wordmark?.querySelector(".sunex-mark__wordmark small")?.textContent).toBe("Technologies");
    expect(wordmark?.querySelector(".sunex-mark__x")).toBeTruthy();
  });

  it("keeps the restored clean SUNEX Technologies lockup visible in the shared footer", () => {
    const { unmount } = render(<PageShell><div>Page content</div></PageShell>);
    const footerLockup = document.querySelector(".site-footer .sunex-mark__clean-lockup");
    expect(footerLockup?.querySelector(".sunex-mark__wordmark strong")?.textContent).toBe("SUNEX");
    expect(footerLockup?.querySelector(".sunex-mark__wordmark small")?.textContent).toBe("Technologies");
    unmount();
  });

  it("provides a keyboard skip link to the main content destination", () => {
    render(<PageShell><div>Page content</div></PageShell>);
    expect(screen.getByRole("link", { name: "Skip to main content" }).getAttribute("href")).toBe("#main-content");
    expect(document.querySelector("main")?.getAttribute("id")).toBe("main-content");
  });

  it("does not render the removed shared Talk to SunEx dock", () => {
    render(<PageShell><div>Page content</div></PageShell>);
    expect(screen.queryByText("Talk to SunEx")).toBeNull();
    expect(screen.queryByText("Start a guided enquiry")).toBeNull();
  });

  it("keeps the header in its reinforced scrolled visibility state", () => {
    Object.defineProperty(window, "scrollY", { configurable: true, value: 96 });
    render(<SiteHeader />);
    fireEvent.scroll(window);

    expect(document.querySelector(".site-nav")?.classList.contains("site-nav--scrolled")).toBe(true);
    expect(document.querySelector(".site-nav")?.classList.contains("site-nav--home")).toBe(true);
    Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
  });

  it("uses the same transparent navigation state before scrolling on homepage and interior routes", () => {
    Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
    render(<SiteHeader />);
    const navigation = document.querySelector(".site-nav");
    expect(navigation?.classList.contains("site-nav--home")).toBe(true);
    expect(navigation?.classList.contains("site-nav--scrolled")).toBe(false);

    cleanup();
    mockLocation = "/education";
    render(<SiteHeader />);
    const educationNavigation = document.querySelector(".site-nav");
    expect(educationNavigation?.classList.contains("site-nav--home")).toBe(true);
    expect(educationNavigation?.classList.contains("site-nav--scrolled")).toBe(false);
  });

  it("returns an interior-page header to the transparent Home-style state after a route reset to the top", () => {
    Object.defineProperty(window, "scrollY", { configurable: true, value: 96 });
    const { rerender } = render(<SiteHeader />);
    fireEvent.scroll(window);
    expect(document.querySelector(".site-nav")?.classList.contains("site-nav--scrolled")).toBe(true);

    Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
    mockLocation = "/technology";
    rerender(<SiteHeader />);
    fireEvent.scroll(window);

    const navigation = document.querySelector(".site-nav");
    expect(navigation?.classList.contains("site-nav--home")).toBe(true);
    expect(navigation?.classList.contains("site-nav--scrolled")).toBe(false);
  });

  it("provides SkillConnect and Healthcare destinations through Services navigation", async () => {
    render(<SiteHeader />);

    const servicesTrigger = document.querySelector(".site-nav__services-trigger:not(.site-nav__product-trigger)") as HTMLButtonElement;
    expect(servicesTrigger).toBeTruthy();
    fireEvent.pointerDown(servicesTrigger, { button: 0, ctrlKey: false, pointerType: "mouse" });
    expect(await screen.findByRole("menuitem", { name: /SkillConnect/i })).toBeTruthy();
    expect(document.querySelectorAll('a[href="/education"]').length).toBeGreaterThan(0);
    expect(document.querySelectorAll('a[href="/healthcare"]').length).toBeGreaterThan(0);

    const mobileMenu = document.querySelector(".site-nav__mobile") as HTMLElement;
    expect(mobileMenu.querySelector('a[href="/education"]')).toBeTruthy();
    expect(mobileMenu.querySelector('a[href="/healthcare"]')).toBeTruthy();
  });

  it("provides UrbanTree through the Product navigation dropdown and mobile menu", async () => {
    render(<SiteHeader />);

    const productTrigger = screen.getByRole("button", { name: /Product/i });
    fireEvent.pointerDown(productTrigger, { button: 0, ctrlKey: false, pointerType: "mouse" });
    expect(await screen.findByRole("menuitem", { name: /UrbanTree/i })).toBeTruthy();
    expect(document.querySelectorAll('a[href="/urbantree"]').length).toBeGreaterThan(0);

    const mobileMenu = document.querySelector(".site-nav__mobile") as HTMLElement;
    expect(mobileMenu.querySelector('a[href="/urbantree"]')).toBeTruthy();
  });

  it("places the Technology route directly after About in desktop and mobile navigation", () => {
    render(<SiteHeader />);

    const desktopLinks = Array.from(document.querySelectorAll(".site-nav__links > a")).map(link => link.textContent);
    expect(desktopLinks.slice(0, 3)).toEqual(["Home", "About", "Technology"]);
    expect(document.querySelector('.site-nav__links a[href="/technology"]')).toBeTruthy();

    const mobileMenu = document.querySelector(".site-nav__mobile") as HTMLElement;
    const mobileLinks = Array.from(mobileMenu.querySelectorAll(':scope > a')).map(link => link.textContent);
    expect(mobileLinks.slice(0, 3)).toEqual(["Home", "About", "Technology"]);
  });
});
