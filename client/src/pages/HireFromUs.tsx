import React, { useState } from "react";
import { ArrowUpRight, ClipboardCheck, GraduationCap, TrendingUp, FileText, Handshake, ChevronRight, CheckCircle, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { PageHero } from "@/components/sunex/PageHero";
import { Reveal } from "@/components/sunex/Reveal";

const hiringSteps = [
  { title: "PreCourse Assessment", icon: ClipboardCheck },
  { title: "Conduct Training Program", icon: GraduationCap },
  { title: "Track Progress & Performance", icon: TrendingUp },
  { title: "Conduct Assignment", icon: FileText },
  { title: "Hand hold and implement in project", icon: Handshake }
];

export default function HireFromUs() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const toggleRole = (role: string) => {
    setSelectedRoles(prev => prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]);
  };

  const handleHireSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1200);
  };

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

      <section className="relative overflow-hidden" style={{ padding: '120px 0', backgroundColor: 'var(--background-alt, #fafafa)', borderTop: '1px solid var(--border)' }}>
        {/* Abstract Background Orbs */}
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-[var(--sunex-orange)] opacity-[0.04] blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[500px] h-[500px] rounded-full bg-[#1e40af] opacity-[0.03] blur-3xl pointer-events-none" />

        <div className="content-wrap relative z-10">
          <Reveal className="text-center mb-20">
            <p className="eyebrow" style={{ color: 'var(--sunex-orange)', marginBottom: '12px' }}>Our Process</p>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}>How we <em>hire.</em></h2>
            <p className="copy mx-auto mt-6" style={{ maxWidth: '600px', fontSize: '17px' }}>
              A streamlined, proven approach to finding and integrating the best talent for your organization.
            </p>
          </Reveal>
          
          <div className="relative">
            {/* Background connecting line (visible only on large screens) */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0 border-t-2 border-dashed border-[var(--sunex-orange)] opacity-30 -translate-y-1/2 z-0" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-5 relative z-10">
              {hiringSteps.map((step, index) => (
                <Reveal 
                  delay={0.1 * index} 
                  key={index} 
                  className={`group ${index % 2 !== 0 ? 'lg:translate-y-12' : ''}`}
                >
                  <div style={{
                    backgroundColor: 'white',
                    borderRadius: '24px',
                    padding: '32px 24px',
                    height: '100%',
                    minHeight: '220px',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 10px 40px -10px rgba(0,0,0,0.05)',
                    border: '1px solid rgba(0,0,0,0.03)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  }} className="hover:shadow-2xl hover:-translate-y-2 hover:border-[var(--sunex-orange)]/40 flex flex-col items-start">
                    
                    {/* Big Background Number */}
                    <span style={{
                      position: 'absolute',
                      right: '-10px',
                      bottom: '-20px',
                      fontSize: '120px',
                      fontWeight: 800,
                      lineHeight: 1,
                      color: 'var(--muted)',
                      opacity: 0.6,
                      zIndex: 0,
                      pointerEvents: 'none',
                      transition: 'all 0.4s ease'
                    }} className="group-hover:text-[var(--sunex-orange)] group-hover:opacity-10 group-hover:scale-110 group-hover:-translate-x-2 group-hover:-translate-y-2">
                      {index + 1}
                    </span>
                    
                    <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
                      <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '16px',
                        backgroundColor: 'rgba(255, 106, 18, 0.1)',
                        color: 'var(--sunex-orange)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '24px',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                      }} className="group-hover:scale-110 group-hover:bg-[var(--sunex-orange)] group-hover:text-white group-hover:shadow-lg group-hover:shadow-orange-500/30">
                        <step.icon size={28} strokeWidth={2} />
                      </div>
                      
                      <h3 style={{ 
                        fontSize: '18px', 
                        fontWeight: 700, 
                        color: 'var(--foreground)', 
                        lineHeight: '1.35',
                        marginTop: 'auto'
                      }}>
                        {step.title}
                      </h3>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden" style={{ padding: '120px 0', backgroundColor: 'var(--background-alt, #fafafa)' }}>
        <div className="content-wrap max-w-5xl mx-auto">
          <Reveal>
            <div className="bg-white rounded-[32px] p-8 md:p-14 relative overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]" style={{ border: '1px solid rgba(0,0,0,0.04)' }}>
              {/* Subtle Brand Glowing Orbs */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[var(--sunex-orange)] opacity-[0.06] blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#1e40af] opacity-[0.04] blur-3xl pointer-events-none" />
              
              <div className="grid lg:grid-cols-12 gap-12 relative z-10">
                {/* Left side: Intro & Roles */}
                <div className="lg:col-span-5 flex flex-col">
                  <p className="eyebrow text-[var(--sunex-orange)] mb-2 uppercase tracking-widest text-xs font-bold">Start Hiring</p>
                  <h2 className="display text-slate-900" style={{ fontSize: 'clamp(32px, 4vw, 42px)', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '16px' }}>
                    Find your<br /><em>perfect match.</em>
                  </h2>
                  <p className="copy text-slate-500 mb-10" style={{ fontSize: '16px', lineHeight: 1.6 }}>
                    Select the roles you need and tell us about your project. Our experts will connect you with vetted talent.
                  </p>

                  <div className="mt-auto hidden md:block">
                    <span className="block text-[13px] font-bold text-slate-900 uppercase tracking-widest mb-4">I am looking for...</span>
                    <div className="flex flex-wrap gap-2.5">
                      {['Engineering', 'Design & UX', 'Product', 'Data & AI', 'Marketing', 'Other'].map(role => (
                        <button 
                          key={role}
                          type="button"
                          onClick={() => toggleRole(role)}
                          disabled={isSubmitting}
                          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                            selectedRoles.includes(role) 
                              ? 'bg-[var(--sunex-orange)] border-[var(--sunex-orange)] text-white shadow-md shadow-orange-500/20' 
                              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right side: Form Fields */}
                <div className="lg:col-span-7">
                  {isSuccess ? (
                    <div className="h-full flex flex-col items-center justify-center py-12 text-center bg-green-50/50 rounded-2xl border border-green-100">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="text-green-600" size={32} />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Sent!</h3>
                      <p className="text-slate-600 max-w-xs mx-auto">Thank you for reaching out. We'll be in touch within 24 hours.</p>
                    </div>
                  ) : (
                    <form className="form-grid" onSubmit={handleHireSubmit}>
                      
                      {/* Mobile Only Roles (shown above inputs on small screens) */}
                      <div className="form-field--wide md:hidden mb-6">
                        <span className="block text-[13px] font-bold text-slate-900 uppercase tracking-widest mb-4">I am looking for...</span>
                        <div className="flex flex-wrap gap-2">
                          {['Engineering', 'Design & UX', 'Product', 'Data & AI', 'Marketing', 'Other'].map(role => (
                            <button 
                              key={role}
                              type="button"
                              onClick={() => toggleRole(role)}
                              disabled={isSubmitting}
                              className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                                selectedRoles.includes(role) 
                                  ? 'bg-[var(--sunex-orange)] border-[var(--sunex-orange)] text-white shadow-sm' 
                                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                              }`}
                            >
                              {role}
                            </button>
                          ))}
                        </div>
                      </div>

                      <label className="form-field">
                        <span>Your Name</span>
                        <input required type="text" placeholder="John Doe" disabled={isSubmitting} />
                      </label>
                      <label className="form-field">
                        <span>Company Name</span>
                        <input required type="text" placeholder="Acme Corp" disabled={isSubmitting} />
                      </label>
                      
                      <label className="form-field form-field--wide">
                        <span>Email Address</span>
                        <input required type="email" placeholder="john@example.com" disabled={isSubmitting} />
                      </label>
                      
                      <label className="form-field form-field--wide">
                        <span>Requirements or Job Description</span>
                        <textarea required placeholder="Tell us about the roles you're looking to fill, technical requirements, or paste a job link..." style={{ minHeight: '140px' }} disabled={isSubmitting} />
                      </label>
                      
                      <div className="form-field--wide mt-4">
                        <button className="rivr-pill form-submit w-full justify-center shadow-lg shadow-orange-500/10" type="submit" disabled={isSubmitting} style={{ padding: '18px', fontSize: '16px' }}>
                          {isSubmitting ? <><Loader2 className="animate-spin mr-2" size={18} /> Submitting...</> : <>Submit Request <span><ArrowUpRight className="sunex-action-glyph" size={18} /></span></>}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
