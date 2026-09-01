import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { PageHero } from "@/components/sunex/PageHero";
import { Reveal } from "@/components/sunex/Reveal";

export default function HireFromUs() {
  return (
    <>
      <PageHero 
        eyebrow="Hire from SunEx" 
        title={<>Build your <em>dream team.</em></>} 
        description="Connect with top-tier professionals and innovators from SunEx to scale your operations efficiently." 
        image="/images/hire_from_us_hero.jpg"
        action={{ label: "Start Hiring", href: "/contact" }} 
      />

      <section style={{ padding: '80px 0' }}>
        <div className="content-wrap">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <Reveal>
              <h2 className="display" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>Hire from <em>Us</em>.</h2>
              <p className="copy" style={{ marginTop: 24, marginBottom: 32 }}>
                Looking to expand your team with world-class talent? SunEx connects global organizations with top-tier professionals. Through our extensive network and rigorous vetting process, we help you build high-performing remote or relocated teams.
              </p>
              <Link href="/contact">
                <button className="rivr-pill">
                  Start hiring <span><ArrowUpRight className="sunex-action-glyph" size={15} /></span>
                </button>
              </Link>
            </Reveal>
            
            <Reveal delay={0.1} style={{ padding: '40px', backgroundColor: 'var(--muted)', borderRadius: '24px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '16px' }}>Why hire with SunEx?</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--sunex-orange)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '12px', marginTop: '4px' }}>✓</div>
                  <div>
                    <strong style={{ display: 'block', marginBottom: '4px' }}>Vetted Talent</strong>
                    <span style={{ fontSize: '14px', color: 'var(--muted-foreground)' }}>Access to pre-screened, highly qualified professionals across engineering, design, and management.</span>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--sunex-orange)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '12px', marginTop: '4px' }}>✓</div>
                  <div>
                    <strong style={{ display: 'block', marginBottom: '4px' }}>Seamless Integration</strong>
                    <span style={{ fontSize: '14px', color: 'var(--muted-foreground)' }}>We handle the logistics so your new team members can start contributing from day one.</span>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--sunex-orange)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '12px', marginTop: '4px' }}>✓</div>
                  <div>
                    <strong style={{ display: 'block', marginBottom: '4px' }}>Cost Effective</strong>
                    <span style={{ fontSize: '14px', color: 'var(--muted-foreground)' }}>Scale your operations efficiently without compromising on quality or expertise.</span>
                  </div>
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
