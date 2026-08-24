import { ArrowUpRight, ChevronRight, Compass as Sparkles, GraduationCap, Sprout as Leaf, Stethoscope as HeartPulse } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { Reveal } from "@/components/sunex/Reveal";

const verticals = [
  {
    id: "urbantree",
    label: "UrbanTree",
    index: "01",
    category: "Environmental infrastructure",
    image: "/manus-storage/urbantree-city-clean_b9b26676.png",
    alt: "SunEx UrbanTree device in a clean-city setting",
    headline: "Air that helps cities",
    accent: "breathe better.",
    summary: "Bio-mechanical infrastructure that creates cleaner localized air pockets where people live, learn, work, and move.",
    proof: "200+ IoT sensors deployed",
    route: "/product#urbantree",
    contact: "/contact?interest=urbantree",
    Icon: Leaf,
    navigator: ["Localized air pockets", "Live environmental intelligence", "Modular city-ready systems"],
  },
  {
    id: "education",
    label: "SkillConnect",
    index: "02",
    category: "Future-ready talent",
    image: "/manus-storage/education_93e3980f.png",
    alt: "SkillConnect applied technology learning session",
    headline: "Learning that turns into",
    accent: "opportunity.",
    summary: "Industry-oriented technology education that helps students and professionals move from learning into applied work.",
    proof: "2,500+ students trained",
    route: "/service#education",
    contact: "/contact?interest=education",
    Icon: GraduationCap,
    navigator: ["Applied technology pathways", "Institutional capacity building", "Career-oriented learning"],
  },
  {
    id: "healthcare",
    label: "Healthcare",
    index: "03",
    category: "Care across borders",
    image: "/manus-storage/healthcare_60e8d462.png",
    alt: "SunEx Healthcare patient-support environment",
    headline: "Care that travels with",
    accent: "people.",
    summary: "A developing medical-tourism journey designed to make quality Indian healthcare more navigable for international patients.",
    proof: "Healthcare journey in development",
    route: "/service#healthcare",
    contact: "/contact?interest=healthcare",
    Icon: HeartPulse,
    navigator: ["Patient-first coordination", "Care journey visibility", "Cross-border support"],
  },
] as const;

type VerticalId = (typeof verticals)[number]["id"];

const currentIndicators = [
  { value: "03", label: "Business verticals" },
  { value: "200+", label: "IoT sensors deployed" },
  { value: "2,500+", label: "Students trained" },
  { value: "50+", label: "Partner institutions" },
];

const HERO_SCENE_DURATION = 6800;

export function HomeExperience({ forceReducedMotion }: { forceReducedMotion?: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sceneProgress, setSceneProgress] = useState(0);
  const systemReducedMotion = useReducedMotion();
  const reducedMotion = forceReducedMotion ?? systemReducedMotion;
  const active = verticals[activeIndex] ?? verticals[0];
  const ActiveIcon = active.Icon;

  useEffect(() => {
    if (reducedMotion) {
      setActiveIndex(0);
      setSceneProgress(0);
      return;
    }

    const startedAt = Date.now();
    const progressTimer = window.setInterval(() => {
      const elapsed = (Date.now() - startedAt) % HERO_SCENE_DURATION;
      setSceneProgress((elapsed / HERO_SCENE_DURATION) * 100);
    }, 80);
    const sceneTimer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % verticals.length);
      setSceneProgress(0);
    }, HERO_SCENE_DURATION);

    return () => {
      window.clearInterval(progressTimer);
      window.clearInterval(sceneTimer);
    };
  }, [reducedMotion]);

  return (
    <>
      <section className="home-hero home-hero--controlled home-hero--cinematic content-wrap" aria-labelledby="home-title">
        <div className={`home-hero__stage home-hero__stage--${active.id}`}>
          {verticals.map((vertical, index) => <div className={`home-hero__reel ${index === activeIndex ? "is-active" : ""}`} aria-hidden={index !== activeIndex} key={vertical.id}><img src={vertical.image} alt={index === activeIndex ? vertical.alt : ""} fetchPriority={vertical.id === "urbantree" ? "high" : "auto"} /></div>)}
          <div className="home-hero__veil" />
          <div className="home-hero__content home-hero__content--controlled" aria-live="off">
            <motion.div key={`${active.id}-badge`} initial={reducedMotion ? false : { opacity: 0, y: 12 }} animate={reducedMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: .48, ease: [0.22, 1, 0.36, 1] }} className="hero-badge"><ActiveIcon size={15} /> {active.category}</motion.div>
            <motion.h1 key={`${active.id}-title`} id="home-title" initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={reducedMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: .58, delay: .04, ease: [0.22, 1, 0.36, 1] }}>{active.headline}<br /><strong>{active.accent}</strong></motion.h1>
            <motion.p key={`${active.id}-summary`} initial={reducedMotion ? false : { opacity: 0 }} animate={reducedMotion ? undefined : { opacity: 1 }} transition={{ duration: .5, delay: .12, ease: [0.22, 1, 0.36, 1] }}>{active.summary}</motion.p>
            <Link href={active.contact} className="hero-primary-action">Discuss {active.label} <span><ArrowUpRight size={15} /></span></Link>
          </div>
          <div className="hero-glass-card hero-glass-card--controlled"><div><strong>{active.index}</strong><small>{active.label} focus</small></div><Link href={active.route}><span><ArrowUpRight size={14} /></span> Explore the vertical</Link></div>
          <div className="hero-corner hero-corner--controlled"><span className="hero-corner__icon"><Sparkles size={20} /></span><div><strong>SunEx cinematic sequence</strong><span><small>{reducedMotion ? "Scene one held" : `Next: ${verticals[(activeIndex + 1) % verticals.length]?.label}`}</small><i style={{ width: `${sceneProgress}%` }} /></span></div></div>
        </div>
      </section>

      <section className="metrics content-wrap" aria-label="Current SunEx indicators"><div className="metrics__card">{currentIndicators.map((metric, index) => <Reveal className="metric" delay={index * .07} key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></Reveal>)}</div></section>

      <section className="section impact-navigator-section" aria-labelledby="impact-navigator-title"><div className="content-wrap"><Reveal className="impact-navigator-heading"><div><p className="eyebrow">SunEx Impact Navigator</p><h2 id="impact-navigator-title">Choose the challenge.<br /><em>See the next move.</em></h2></div><p>Start with the outcome that matters to you. The navigator connects each SunEx vertical to its practical role, current focus, and the right next conversation.</p></Reveal><div className="impact-navigator"><div className="impact-navigator__rail" role="group" aria-label="Impact verticals">{verticals.map((vertical, index) => { const Icon = vertical.Icon; const isActive = index === activeIndex; return <button key={vertical.id} className={isActive ? "is-active" : ""} onClick={() => setActiveIndex(index)} aria-pressed={isActive}><span>{vertical.index}</span><Icon size={20} /><div><small>{vertical.category}</small><strong>{vertical.label}</strong></div><ChevronRight size={17} /></button>; })}</div><Reveal className="impact-navigator__stage" delay={.08}><div className="impact-navigator__media"><img src={active.image} alt={active.alt} loading="lazy" /><div className="impact-navigator__shade" /><div className="impact-navigator__media-label"><span className="status-dot" /> Current focus: {active.label}</div></div><div className="impact-navigator__content" aria-live="polite"><div className="impact-navigator__title"><span>{active.index}</span><div><p>{active.category}</p><h3>{active.label}</h3></div></div><p>{active.summary}</p><div className="impact-navigator__signals">{active.navigator.map((signal, index) => <div key={signal}><span>{String(index + 1).padStart(2, "0")}</span><strong>{signal}</strong></div>)}</div><div className="impact-navigator__actions"><Link href={active.route} className="text-link">Explore {active.label} <ArrowUpRight size={15} /></Link><Link href={active.contact} className="action-pill">Start a conversation <span><ArrowUpRight size={16} /></span></Link></div></div></Reveal></div></div></section>

      <section className="section section--mist proof-section" aria-labelledby="proof-title"><div className="content-wrap"><Reveal className="proof-intro"><div><p className="eyebrow">Proof of impact</p><h2 id="proof-title">Evidence we can<br /><em>share today.</em></h2></div><p>SunEx shares only the company indicators currently available in approved material. Project locations, field outcomes, partner details, and case stories are added only when they are confirmed for publication.</p></Reveal><div className="proof-grid">{currentIndicators.slice(0, 3).map((indicator, index) => <Reveal className="proof-card" delay={index * .06} key={indicator.label}><span>{String(index + 1).padStart(2, "0")}</span><strong>{indicator.value}</strong><p>{indicator.label}</p><i /></Reveal>)}<Reveal className="proof-card proof-card--next" delay={.18}><span>04</span><strong>Next</strong><p>Verified deployment stories will appear here as SunEx programs are approved for publication.</p><i /></Reveal></div><Reveal className="proof-standard"><div><span>Publication standard</span><h3>Context before claims.</h3></div><p>Every future proof story will identify what was implemented, where it took place, what was measured, and who approved the information for public use.</p><div><span>01 / Approved data</span><span>02 / Clear context</span><span>03 / Publishable evidence</span></div></Reveal></div></section>

      <section className="section section--mist"><div className="content-wrap editorial"><Reveal><p className="eyebrow">Who we are</p><h2 className="display">Innovation <em>with purpose.</em></h2></Reveal><Reveal delay={.1} className="editorial__copy"><p className="copy">SunEx Technologies Pvt. Ltd. is an innovation-driven company committed to solving real-world challenges through technology and strategic partnerships.</p><p className="copy copy--small">Every solution we build is guided by Innovation, Sustainability, and Social Impact. We believe technology should not only improve businesses but also improve lives.</p><Link href="/about" className="text-link">About SunEx <ArrowUpRight size={15} /></Link></Reveal></div></section>

      <section className="section sunex-partnership-section" aria-labelledby="why-title"><div className="content-wrap"><Reveal className="sunex-partnership-hero"><div className="sunex-partnership-hero__copy"><div className="sunex-partnership-hero__label"><span><Sparkles size={15} /></span><p>Why choose SunEx</p></div><p className="eyebrow">A partner for meaningful progress</p><h2 id="why-title">The difference lives<br /><em>in how we show up.</em></h2><p>SunEx pairs practical technology with human understanding—bringing the right insight, partners, and momentum to the challenges that shape cities, careers, and care.</p><div className="sunex-partnership-hero__points"><span>Clarity before complexity</span><span>Progress people can feel</span><span>Systems built to last</span></div><Link href="/about" className="action-pill">Meet SunEx <span><ArrowUpRight size={16} /></span></Link></div><div className="sunex-partnership-hero__media"><img src="/manus-storage/sunex-partnership-studio_691e7bdd.jpg" alt="SunEx team collaboratively planning sustainable city infrastructure" loading="lazy" /><div className="sunex-partnership-hero__veil" /><div className="sunex-partnership-hero__marker"><span>03</span><i /> <small>Purpose in practice</small></div><div className="sunex-partnership-hero__note"><span className="status-dot" /><div><small>Our working principle</small><strong>Listen deeply. Build boldly.</strong></div></div></div></Reveal><div className="sunex-partnership-intro"><div><p className="eyebrow">What carries every project</p><h3>Not just a solution.<br /><em>A standard for impact.</em></h3></div><p>Our work is organized around three commitments. Together, they make innovation more trusted, more useful, and more durable in the real world.</p></div><div className="sunex-commitment-rails">{[{ number: "01", label: "Create", title: "Build with conviction.", text: "We turn emerging capability into practical systems that solve real problems at the scale they deserve.", signals: ["Innovation-Driven Solutions", "Scalable Solutions", "Global Standards"] }, { number: "02", label: "Partner", title: "Lead with people.", text: "We earn alignment through experienced leadership, trusted relationships, and a customer-first way of working.", signals: ["Experienced Leadership", "Trusted Industry Partnerships", "Customer-Centric Approach"] }, { number: "03", label: "Sustain", title: "Leave places better.", text: "Every decision balances performance with purpose—so technology creates lasting social and environmental value.", signals: ["Technology with Social Impact", "Commitment to Sustainability", "Quality & Transparency"] }].map((commitment, index) => <Reveal className="sunex-commitment-rail" delay={index * .07} key={commitment.number}><div className="sunex-commitment-rail__meta"><span>{commitment.number}</span><p>{commitment.label}</p></div><div className="sunex-commitment-rail__body"><h3>{commitment.title}</h3><p>{commitment.text}</p></div><div className="sunex-commitment-rail__signals">{commitment.signals.map((signal) => <span key={signal}>{signal}<ArrowUpRight size={12} /></span>)}</div></Reveal>)}</div></div></section>

      <section className="section content-wrap"><Reveal className="large-cta"><p className="eyebrow">Get started</p><h2>Let’s build a better <em>tomorrow.</em></h2><p>Whether environmental sustainability, future talent, or world-class healthcare — SunEx is your partner in innovation.</p><Link href="/contact?interest=partnership" className="action-pill">Submit inquiry <span><ArrowUpRight size={16} /></span></Link></Reveal></section>
    </>
  );
}

export default function Home() {
  return <HomeExperience />;
}
