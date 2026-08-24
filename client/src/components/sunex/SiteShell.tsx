import { ArrowUpRight, Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const logo = "/manus-storage/sunex-logo-symbol-only_428f5f83.png";
const actualNavigationLockup = "/manus-storage/sunex-actual-nav-lockup-transparent_7c99c62e.png";

const navItems = [
  ["Home", "/"],
  ["About", "/about"],
  ["Product", "/product"],
  ["Contact", "/contact"],
] as const;

const serviceItems = [
  { label: "SkillConnect", detail: "SunEx Education", href: "/education" },
  { label: "SunEx Healthcare", detail: "Care coordination", href: "/healthcare" },
] as const;

export function SunexMark({ inverse = false, showLockup = false }: { inverse?: boolean; showLockup?: boolean }) {
  return (
    <Link href="/" className={`sunex-mark ${inverse ? "sunex-mark--inverse" : ""}`} aria-label="SunEx Technologies home">
      {showLockup ? <img className="sunex-mark__actual-lockup" src={actualNavigationLockup} alt="" /> : <span className="sunex-mark__logo"><img src={logo} alt="" /></span>}
    </Link>
  );
}

export function SiteHeader() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 22);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`site-nav ${scrolled ? "site-nav--scrolled" : ""}`}>
      <div className="site-nav__inner">
        <SunexMark showLockup />
        <nav className="site-nav__links" aria-label="Main navigation">
          {navItems.slice(0, 3).map(([label, href]) => <Link key={href} href={href} className={location === href ? "is-active" : ""}>{label}</Link>)}
          <DropdownMenu>
            <DropdownMenuTrigger asChild><button className={`site-nav__services-trigger ${location === "/education" || location === "/healthcare" ? "is-active" : ""}`}>Services <ChevronDown size={14} /></button></DropdownMenuTrigger>
            <DropdownMenuContent align="center" sideOffset={14} className="site-nav__service-menu">
              <p className="site-nav__service-menu-label">Services</p>
              <div className="site-nav__service-menu-list">
                {serviceItems.map(({ label, detail, href }) => <DropdownMenuItem asChild key={href}><Link href={href} className="site-nav__service-menu-item"><span className="site-nav__service-menu-copy"><strong>{label}</strong><small>{detail}</small></span></Link></DropdownMenuItem>)}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          {navItems.slice(3).map(([label, href]) => <Link key={href} href={href} className={location === href ? "is-active" : ""}>{label}</Link>)}
        </nav>
        <Link href="/contact" className="action-pill action-pill--nav">Get in touch <span><ArrowUpRight className="sunex-action-glyph" size={15} /></span></Link>
        <button className="site-nav__toggle" onClick={() => setOpen(!open)} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open}>{open ? <X size={20} /> : <Menu size={22} />}</button>
      </div>
      <div className={`site-nav__mobile ${open ? "is-open" : ""}`}>
        {navItems.slice(0, 3).map(([label, href]) => <Link key={href} href={href} onClick={close}>{label}<ArrowUpRight className="sunex-action-glyph" size={17} /></Link>)}
        <div className="site-nav__mobile-services"><span>Services</span>{serviceItems.map(({ label, detail, href }) => <Link key={href} href={href} onClick={close}><span><strong>{label}</strong><small>{detail}</small></span></Link>)}</div>
        {navItems.slice(3).map(([label, href]) => <Link key={href} href={href} onClick={close}>{label}<ArrowUpRight className="sunex-action-glyph" size={17} /></Link>)}
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="content-wrap">
        <div className="site-footer__lead"><SunexMark showLockup /><p>Innovating for a sustainable future.</p></div>
        <div className="site-footer__grid">
          <div><p>Solutions</p><Link href="/product#urbantree">UrbanTree</Link><Link href="/education">SkillConnect</Link><Link href="/healthcare">SunEx Healthcare</Link></div>
          <div><p>Company</p><Link href="/about">About</Link><Link href="/education">Education</Link><Link href="/healthcare">Healthcare</Link><Link href="/faq">FAQs</Link><Link href="/contact">Contact</Link></div>
          <div className="site-footer__statement"><strong>SunEx Technologies Pvt. Ltd.</strong><span>The digital headquarters for UrbanTree, SunEx Education, and SunEx Healthcare.</span></div>
        </div>
        <div className="site-footer__bottom"><span>© {new Date().getFullYear()} SunEx Technologies. All rights reserved.</span><div><Link href="/privacy">Privacy information</Link><Link href="/contact">Get in touch <ArrowUpRight className="sunex-action-glyph" size={13} /></Link></div></div>
      </div>
    </footer>
  );
}

function ConversionDock() {
  const [location] = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 520);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  if (!visible || location === "/contact") return null;

  return <Link href="/contact?interest=partnership" className="conversion-dock"><span className="status-dot" /> <strong>Talk to SunEx</strong><small>Start a guided enquiry</small><ArrowUpRight className="sunex-action-glyph" size={15} /></Link>;
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="sunex-app"><a className="skip-link" href="#main-content">Skip to main content</a><SiteHeader /><main id="main-content" tabIndex={-1}>{children}</main><ConversionDock /><SiteFooter /></div>;
}
