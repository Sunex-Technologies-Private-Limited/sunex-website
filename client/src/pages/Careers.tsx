import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { PageHero } from "@/components/sunex/PageHero";

export default function Careers() {
  return (
    <div className="page-wrap">
      <PageHero 
        eyebrow="Join SunEx" 
        title={<>Build the <em>future</em> with us.</>} 
        description="We're a team of innovators, engineers, and creators building sustainable solutions and empowering talent globally."
        image="/images/skillconnect-collaboration.jpg" 
        action={{ label: "View Open Roles", href: "#open-roles" }}
      />

      <section style={{ padding: '80px 0', borderTop: '1px solid var(--border)' }}>
        <div className="content-wrap">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="display" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>Hire from <em>India</em>.</h2>
              <p className="copy" style={{ marginTop: 24, marginBottom: 32 }}>
                Looking to expand your team with world-class talent? SunEx connects global organizations with top-tier professionals from India. Through our extensive network and rigorous vetting process, we help you build high-performing remote or relocated teams.
              </p>
              <Link href="/contact">
                <button className="rivr-pill">
                  Start hiring <span><ArrowUpRight className="sunex-action-glyph" size={15} /></span>
                </button>
              </Link>
            </div>
            
            <div style={{ padding: '40px', backgroundColor: 'var(--muted)', borderRadius: '24px' }}>
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
            </div>
          </div>
        </div>
      </section>

      <section id="open-roles" style={{ padding: '80px 0', borderTop: '1px solid var(--border)', backgroundColor: 'var(--background-alt, #f8f9fa)' }}>
        <div className="content-wrap text-center">
          <h2 className="display" style={{ fontSize: 'clamp(28px, 3vw, 40px)' }}>Open <em>Positions</em></h2>
          <p className="copy" style={{ maxWidth: 600, margin: '24px auto', fontSize: 16 }}>
            We're always looking for passionate individuals to join our team in India. Check back soon for open roles, or send us your resume.
          </p>
          <div style={{ marginTop: '40px', padding: '40px', border: '1px dashed var(--border)', borderRadius: '16px', maxWidth: '600px', margin: '0 auto' }}>
            <p style={{ color: 'var(--muted-foreground)' }}>No open positions at the moment.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
