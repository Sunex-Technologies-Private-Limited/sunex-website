import { ArrowUpRight, Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";


const logo = "/manus-storage/sunex-logo-symbol-only_428f5f83.png";

const navItems = [
  ["Home", "/"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const;

const productItems = [
  { label: "UrbanTree", href: "/urbantree" },
] as const;

const serviceItems = [
  { label: "SkillConnect", detail: "SunEx Education", href: "/education" },
  { label: "SunEx Healthcare", detail: "Care coordination", href: "/healthcare" },
] as const;

export function SunexMark({ inverse = false, showLockup = false }: { inverse?: boolean; showLockup?: boolean }) {
  return (
    <Link href="/" className={`sunex-mark ${inverse ? "sunex-mark--inverse" : ""}`} aria-label="SunEx Technologies home">
      {showLockup ? <span className="sunex-mark__clean-lockup"><span className="sunex-mark__logo"><img src={logo} alt="" /></span><span className="sunex-mark__wordmark"><strong>SUNE<span className="sunex-mark__x">X</span></strong><small>Technologies</small></span></span> : <span className="sunex-mark__logo"><img src={logo} alt="" /></span>}
    </Link>
  );
}

export function SiteHeader() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const hasTransparentStart = location !== "/404";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 22);
    onScroll();
    const animationFrame = window.requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [location]);

  const close = () => setOpen(false);

  return (
    <>
    <header className={`site-nav ${hasTransparentStart ? "site-nav--home" : ""} ${scrolled ? "site-nav--scrolled" : ""}`}>
      <div className="site-nav__inner">
        <div className="site-nav__brand"><SunexMark showLockup /></div>
        <nav className="site-nav__links" aria-label="Main navigation">
          {navItems.slice(0, 2).map(([label, href]) => <Link key={href} href={href} className={location === href ? "is-active" : ""}>{label}</Link>)}
          <DropdownMenu>
            <DropdownMenuTrigger asChild><button className={`site-nav__services-trigger site-nav__product-trigger ${location === "/product" || location === "/urbantree" ? "is-active" : ""}`}>Product <ChevronDown size={14} /></button></DropdownMenuTrigger>
            <DropdownMenuContent align="center" sideOffset={14} className="site-nav__service-menu">
              <p className="site-nav__service-menu-label">Product</p>
              <div className="site-nav__service-menu-list">
                {productItems.map(({ label, href }) => <DropdownMenuItem asChild key={href}><Link href={href} className="site-nav__service-menu-item"><span className="site-nav__service-menu-copy"><strong>{label}</strong></span></Link></DropdownMenuItem>)}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild><button className={`site-nav__services-trigger ${location === "/education" || location === "/healthcare" ? "is-active" : ""}`}>Services <ChevronDown size={14} /></button></DropdownMenuTrigger>
            <DropdownMenuContent align="center" sideOffset={14} className="site-nav__service-menu">
              <p className="site-nav__service-menu-label">Services</p>
              <div className="site-nav__service-menu-list">
                {serviceItems.map(({ label, detail, href }) => <DropdownMenuItem asChild key={href}><Link href={href} className="site-nav__service-menu-item"><span className="site-nav__service-menu-copy"><strong>{label}</strong><small>{detail}</small></span></Link></DropdownMenuItem>)}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          {navItems.slice(2).map(([label, href]) => <Link key={href} href={href} className={location === href ? "is-active" : ""}>{label}</Link>)}
        </nav>
        <Dialog>
          <DialogTrigger asChild>
            <button className="rivr-pill rivr-pill--nav site-nav__action">Get in touch <span><ArrowUpRight className="sunex-action-glyph" size={15} /></span></button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] p-0 border-0 bg-transparent shadow-none">
            <div className="contact-form relative overflow-hidden shadow-2xl" style={{ border: '1px solid var(--border)' }}>
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[var(--sunex-orange)] opacity-[0.06] blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-[#1e40af] opacity-[0.04] blur-3xl pointer-events-none" />
              
              <DialogHeader className="mb-8 relative z-10 text-left">
                <p className="eyebrow" style={{ marginBottom: 6 }}>Get in touch</p>
                <DialogTitle className="display" style={{ fontSize: 'clamp(32px, 5vw, 44px)', marginTop: 0 }}>Start the <em>conversation.</em></DialogTitle>
                <DialogDescription className="copy" style={{ marginTop: 10, fontSize: 15, maxWidth: '90%' }}>
                  Whether you're looking to improve sustainability, empower future talent, or access world-class healthcare.
                </DialogDescription>
              </DialogHeader>

              <form className="form-grid relative z-10" onSubmit={(e) => { e.preventDefault(); alert("Inquiry submitted!"); }}>
                <label className="form-field">
                  <span>Your Name</span>
                  <input required type="text" placeholder="John Doe" />
                </label>
                <label className="form-field">
                  <span>Email Address</span>
                  <input required type="email" placeholder="john@example.com" />
                </label>
                <label className="form-field form-field--wide">
                  <span>Solution Interest</span>
                  <select required defaultValue="">
                    <option value="" disabled>Select your focus area</option>
                    <option value="urbantree">UrbanTree — Air Purification</option>
                    <option value="education">SkillConnect — Training Programs</option>
                    <option value="healthcare">SunEx Healthcare — Medical Tourism</option>
                    <option value="partnership">Strategic Partnership</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </label>
                <label className="form-field form-field--wide">
                  <span>Project or Challenge</span>
                  <textarea required placeholder="Tell us what you would like to explore with SunEx..." style={{ minHeight: '90px' }} />
                </label>
                <div className="form-field--wide mt-4">
                  <button className="rivr-pill form-submit w-full justify-center" type="submit" style={{ marginTop: 0, padding: '18px 24px', fontSize: '15px' }}>
                    Send inquiry <span><ArrowUpRight className="sunex-action-glyph" size={17} /></span>
                  </button>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
        <button className="site-nav__toggle" onClick={() => setOpen(!open)} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open}>{open ? <X size={20} /> : <Menu size={22} />}</button>
      </div>
    </header>

    <div className={`site-nav__mobile ${open ? "is-open" : ""}`} style={open ? { display: 'flex', flexDirection: 'column', opacity: 1, visibility: 'visible', maxHeight: '500px', zIndex: 9999, top: '75px', left: '20px', right: '20px', position: 'fixed', backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '24px', padding: '20px' } : { display: 'none' }}>
      {navItems.slice(0, 2).map(([label, href]) => <Link key={href} href={href} onClick={close} style={{ padding: '12px 0', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', fontWeight: 500 }}>{label}<ArrowUpRight className="sunex-action-glyph" size={17} /></Link>)}
      
      <div className="site-nav__mobile-services" style={{ padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
        <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold', color: 'var(--muted-foreground)', display: 'block', marginBottom: '8px' }}>Product</span>
        {productItems.map(({ label, href }) => <Link key={href} href={href} onClick={close} style={{ display: 'block', padding: '6px 0', fontWeight: 500 }}><span>{label}</span></Link>)}
      </div>
      
      <div className="site-nav__mobile-services" style={{ padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
        <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold', color: 'var(--muted-foreground)', display: 'block', marginBottom: '8px' }}>Services</span>
        {serviceItems.map(({ label, detail, href }) => <Link key={href} href={href} onClick={close} style={{ display: 'block', padding: '8px 0' }}>
          <span style={{ display: 'block', fontWeight: 500 }}>{label}</span>
          <small style={{ color: 'var(--muted-foreground)', fontSize: '11px' }}>{detail}</small>
        </Link>)}
      </div>
      
      {navItems.slice(2).map(([label, href]) => <Link key={href} href={href} onClick={close} style={{ padding: '12px 0', display: 'flex', justifyContent: 'space-between', fontWeight: 500 }}>{label}<ArrowUpRight className="sunex-action-glyph" size={17} /></Link>)}
    </div>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="content-wrap">
        <div className="site-footer__lead"><SunexMark showLockup /><p>Innovating for a sustainable future.</p></div>
        <div className="site-footer__grid">
          <div><p>Solutions</p><Link href="/product#urbantree">UrbanTree</Link><Link href="/education">SkillConnect</Link><Link href="/healthcare">SunEx Healthcare</Link></div>
          <div><p>Company</p><Link href="/about">About</Link><Link href="/education">Education</Link><Link href="/healthcare">Healthcare</Link><Link href="/faq">FAQs</Link><Link href="/contact">Contact</Link><Link href="/careers">Careers</Link></div>
          <div className="site-footer__statement">
            <strong>SunEx Technologies Pvt. Ltd.</strong>
            <span>The digital headquarters for UrbanTree, SunEx Education, and SunEx Healthcare.</span>
            
            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <strong style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', color: 'var(--foreground)', marginBottom: '4px' }}>Main Branch</strong>
                <span style={{ fontSize: '13px', lineHeight: 1.5, display: 'block' }}>Hassan<br/>Karnataka</span>
              </div>
              <div>
                <strong style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', color: 'var(--foreground)', marginBottom: '4px' }}>Training Location (Mysuru)</strong>
                <span style={{ fontSize: '13px', lineHeight: 1.5, display: 'block' }}>1133/D, Third Floor, Gokulam 2nd Stage,<br/>2nd Main, Mysuru, Karnataka 570002.</span>
              </div>
            </div>
          </div>
        </div>
        <div className="site-footer__bottom"><span>© {new Date().getFullYear()} SunEx Technologies. All rights reserved.</span><div><Link href="/privacy">Privacy information</Link><Link href="/contact">Get in touch <ArrowUpRight className="sunex-action-glyph" size={13} /></Link></div></div>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="sunex-app"><a className="skip-link" href="#main-content">Skip to main content</a><SiteHeader /><main id="main-content" tabIndex={-1}>{children}</main><SiteFooter /></div>;
}
