import { ArrowUpRight, Compass, Cpu, GraduationCap, HeartPulse, Lightbulb, Maximize2, Network, PenTool, Radar, RefreshCw, Rocket, Search, Sparkles, Sprout as Leaf, Target, UsersRound, Wrench } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { Reveal } from "@/components/sunex/Reveal";
import { Testimonials } from "@/components/sunex/Testimonials";

const slides = [
  { id: "future-city", index: "01", category: "Technology, innovation & impact", badgeLabel: "Technology", badgeIconSize: 19, image: "/images/sunex-home-future-city.jpg", alt: "Sunlit sustainable city with renewable-energy infrastructure", headline: "Technology. Innovation.", accent: "Impact.", summary: "We explore and develop technology solutions that address real challenges and improve efficiency, accessibility and decision making.", contact: "/product", Icon: Sparkles },
  { id: "education", index: "02", category: "Education & skills", badgeLabel: "Education", badgeIconSize: 15, image: "/images/sunex-home-learning-studio.jpg", alt: "Students learning with a technology visualisation in a modern studio", headline: "Empowering people", accent: "through knowledge & skills.", summary: "We work to bridge the gap between academic learning and real world capabilities through practical learning, skill development, technology exposure and industry engagement.", contact: "/education", Icon: GraduationCap },
  { id: "sustainability", index: "03", category: "Environmental sustainability", badgeLabel: "Environmental", badgeIconSize: 19, image: "/images/sunex-home-urbantree-park.jpg", alt: "UrbanTree air-quality infrastructure in a green public park", headline: "A healthier, more", accent: "sustainable future.", summary: "We develop and support innovative projects that address real-world challenges across technology, environmental sustainability, society and emerging areas.", contact: "/product", Icon: Leaf },
  { id: "healthcare", index: "04", category: "Healthcare innovation", badgeLabel: "Healthcare", badgeIconSize: 19, image: "/images/sunex-home-healthcare-campus.jpg", alt: "Technology-enabled hospital campus supporting a care environment", headline: "Technology that puts", accent: "people first.", summary: "We explore technology driven opportunities that can contribute to better healthcare accessibility, efficiency and outcomes.", contact: "/healthcare", Icon: HeartPulse },
] as const;

const focusAreas = [
  { index: "01", title: "Technology", summary: "We explore and develop technology solutions that address real challenges and improve efficiency, accessibility and decision making.", image: "/images/sunex-home-future-city.jpg", alt: "Sustainable technology city landscape", href: "/product", Icon: Cpu },
  { index: "02", title: "Innovative projects", summary: "Ideas move into action through practical, sustainable and impactful initiatives that create value for communities and society.", image: "/images/sunex-home-urbantree-park.jpg", alt: "Innovative environmental infrastructure in a public park", href: "/product", Icon: Lightbulb },
  { index: "03", title: "Education", summary: "We bridge academic learning and real-world capabilities through practical learning, skill development and industry engagement.", image: "/images/sunex-home-learning-studio.jpg", alt: "Students in a technology-enabled learning environment", href: "/education", Icon: GraduationCap },
  { index: "04", title: "Healthcare", summary: "We explore technology-driven opportunities that can contribute to better healthcare accessibility, efficiency and outcomes.", image: "/images/sunex-home-healthcare-campus.jpg", alt: "Modern hospital campus with connected care infrastructure", href: "/healthcare", Icon: HeartPulse },
] as const;

const approachSteps = [
  ["01", "Understand", "We identify the challenge, its context, requirements, and the people or organisations it affects.", Search],
  ["02", "Explore", "We research relevant technologies, ideas, existing solutions and opportunities to find practical ways forward.", Compass],
  ["03", "Design", "We develop solution concepts and frameworks with feasibility, usability, sustainability and intended impact in view.", PenTool],
  ["04", "Build", "We transform concepts into working solutions through development, prototyping, testing and continuous iteration.", Wrench],
  ["05", "Implement", "We introduce solutions into real-world environments, evaluate performance and gather practical insights.", Rocket],
  ["06", "Improve", "We measure outcomes, identify gaps and refine solutions to improve effectiveness, reliability and impact.", RefreshCw],
  ["07", "Scale", "Solutions that demonstrate value are developed further through strategic partnerships, collaboration and scalable implementation.", Maximize2],
] as const;

const partnerPrinciples = [
  ["Multi-Domain Perspective", "Our work across technology, innovation, education, sustainability and healthcare enables us to approach challenges from multiple perspectives.", Network],
  ["Innovation & Technology", "We explore new ideas, emerging technologies and innovative approaches to identify opportunities and develop effective solutions.", Lightbulb],
  ["Practical Approach", "We focus on solutions that are feasible, applicable and designed for real-world implementation, moving beyond ideas and concepts.", Wrench],
  ["Collaborative Ecosystem", "We work with industry, academia, government, technology partners, healthcare institutions, environmental organisations, innovation ecosystems and communities to bring together knowledge, expertise and resources.", UsersRound],
  ["Impact Orientation", "We focus on practical value, measurable outcomes and meaningful impact, while continuously improving solutions based on real-world learning.", Target],
  ["Future Focus", "We look ahead to emerging technologies, evolving needs and new opportunities to develop solutions that remain relevant, adaptable and scalable.", Radar],
] as const;

const HERO_SCENE_DURATION = 4000;

export function HomeExperience({ forceReducedMotion }: { forceReducedMotion?: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sceneProgress, setSceneProgress] = useState(0);
  const systemReducedMotion = useReducedMotion();
  const reducedMotion = forceReducedMotion ?? systemReducedMotion;
  const active = slides[activeIndex] ?? slides[0];
  const ActiveIcon = active.Icon;

  useEffect(() => {
    if (reducedMotion) return;

    let startTime = Date.now();
    let animationFrameId: number;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      
      if (elapsed >= HERO_SCENE_DURATION) {
        setActiveIndex(prev => (prev + 1) % slides.length);
        startTime = Date.now();
        setSceneProgress(0);
      } else {
        setSceneProgress((elapsed / HERO_SCENE_DURATION) * 100);
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [reducedMotion]);

  return <>
    <section className="home-hero home-hero--controlled home-hero--cinematic content-wrap" aria-labelledby="home-title"><div className={`home-hero__stage home-hero__stage--${active.id}`}>
      {slides.map((slide, index) => <div className={`home-hero__reel ${index === activeIndex ? "is-active" : ""}`} aria-hidden={index !== activeIndex} key={slide.id}><img src={slide.image} alt={index === activeIndex ? slide.alt : ""} fetchPriority={slide.id === "future-city" ? "high" : "auto"} /></div>)}
      <div className="home-hero__veil" />
      <div className="home-hero__content home-hero__content--controlled" aria-live="off"><motion.div key={`${active.id}-badge`} initial={reducedMotion ? false : { opacity: 0, y: 12 }} animate={reducedMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: .48, ease: [0.22, 1, 0.36, 1] }} className={`hero-badge hero-badge--${active.id}`}><ActiveIcon size={active.badgeIconSize} /> {active.badgeLabel}</motion.div><motion.h1 key={`${active.id}-title`} id="home-title" initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={reducedMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: .58, delay: .04, ease: [0.22, 1, 0.36, 1] }}>{active.headline}<br />{" "}<strong className={active.id === "education" ? "hero-title__accent hero-title__accent--education" : "hero-title__accent"}>{active.accent}</strong></motion.h1><motion.p key={`${active.id}-summary`} initial={reducedMotion ? false : { opacity: 0 }} animate={reducedMotion ? undefined : { opacity: 1 }} transition={{ duration: .5, delay: .12, ease: [0.22, 1, 0.36, 1] }}>{active.summary}</motion.p><Link href={active.contact} className="hero-primary-action">Explore our area <span><ArrowUpRight size={15} /></span></Link></div>
      <div className="hero-corner hero-corner--controlled"><span className="hero-corner__icon"><Sparkles size={20} /></span><div><strong>SunEx, turning ideas into impact.</strong><span><small>{reducedMotion ? "First scene held" : `Next: ${slides[(activeIndex + 1) % slides.length]?.category}`}</small><i style={{ width: `${sceneProgress}%` }} /></span></div></div>
    </div></section>
    <section className="metrics content-wrap" aria-label="SunEx focus indicators"><div className="metrics__card">{[{ value: "15+", label: "Learning opportunities" }, { value: "10k+", label: "Students planned to train" }, { value: "5+", label: "Products under R & D" }, { value: "20+", label: "Industry professionals" }].map((metric, index) => <Reveal className="metric" delay={index * .07} key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></Reveal>)}</div></section>
    <section id="sunex-purpose" className="section section--mist sunex-overview"><div className="content-wrap editorial"><Reveal><p className="eyebrow">SunEx Technologies</p><h2 className="display">Innovation with<br /><em>a real-world purpose.</em></h2></Reveal><Reveal delay={.1} className="editorial__copy"><p className="copy copy--overview-primary">SunEx Technologies is a technology and innovation-driven organisation working across Education, Technology, Innovative Projects, Environmental Sustainability and Healthcare.</p><p className="copy copy--small">We bring together ideas, technology, people and partnerships to address real-world challenges and transform innovative ideas into practical solutions with meaningful impact.</p><p className="copy copy--small">Our focus is on empowering people, enabling innovation, developing sustainable solutions and creating lasting value for communities, organisations and society.</p><Link href="/about" className="text-link">About SunEx <ArrowUpRight size={15} /></Link></Reveal></div></section>
    <section className="section sunex-why-section" aria-labelledby="why-sunex-title"><div className="content-wrap"><Reveal className="sunex-why-card"><div className="sunex-why-card__copy"><p className="eyebrow">Why SunEx</p><h2 id="why-sunex-title">Technology with purpose.<br /><em>Innovation with impact.</em></h2><p>At SunEx, we believe technology can be a powerful enabler of progress, but technology alone is not enough. Meaningful solutions require purpose, innovation, expertise, collaboration and effective execution.</p><p>We bridge the gap between industry, academia, government, technology partners, healthcare institutions, environmental organisations, innovation ecosystems and communities, connecting the right people, knowledge, technology and resources to develop practical, responsible and scalable solutions that address real-world challenges and create measurable impact.</p><Link href="/contact?interest=partnership" className="action-pill">Partner with SunEx <span><ArrowUpRight size={16} /></span></Link></div><div className="sunex-why-card__media"><img src="/images/sunex-home-learning-studio.jpg" alt="Technology-enabled learning studio representing people and partnerships" loading="lazy" /><div className="sunex-why-card__veil" /><div className="sunex-why-card__note"><span>02</span><small>Together, we can turn ideas, capabilities and opportunities into meaningful action.</small></div></div></Reveal></div></section>
    <section className="section sunex-purpose-section sunex-purpose-section--vision" aria-labelledby="vision-title"><div className="content-wrap"><div className="sunex-mission sunex-mission--standalone"><Reveal><p className="eyebrow">Our vision</p><h3 id="vision-title">A smarter, healthier<br /><em>and more sustainable future.</em></h3></Reveal><Reveal delay={.08}><p>We envision a future where technology, education, healthcare and innovation come together to improve lives, empower people, strengthen communities and create a more sustainable environment.</p><p>We aspire to contribute to a world where technology creates opportunities, education builds capabilities, healthcare improves well-being, and innovation transforms ideas into meaningful solutions and lasting impact.</p></Reveal></div></div></section>
    <section className="section sunex-purpose-section" aria-labelledby="mission-title"><div className="content-wrap"><Reveal className="sunex-purpose-hero sunex-purpose-hero--mission"><div className="sunex-purpose-hero__copy"><p className="eyebrow">Our mission</p><h2 id="mission-title">Turning ideas into<br /><em>meaningful impact.</em></h2><p className="sunex-purpose-hero__mission-intro">We <strong>enable</strong>, <strong>develop</strong>, <strong>build</strong>, <strong>advance</strong>, <strong>collaborate</strong> and <strong>innovate</strong> to create practical solutions and opportunities that improve lives and support a sustainable future.</p><ul className="sunex-mission-list"><li><strong>Enable</strong> education, training, internships and skill development to build future-ready capabilities.</li><li><strong>Develop</strong> purposeful technology that addresses real-world needs.</li><li><strong>Build</strong> innovative projects that turn ideas into practical solutions.</li><li><strong>Advance</strong> sustainable technology for environmental challenges.</li><li><strong>Explore</strong> technology-enabled solutions that contribute to better healthcare and well-being.</li><li><strong>Collaborate</strong> with industry, academia, government, institutions and communities to combine expertise and resources.</li><li><strong>Foster</strong> innovation, entrepreneurship and continuous learning.</li></ul><Link href="#sunex-approach" className="action-pill">See our approach <span><ArrowUpRight size={16} /></span></Link></div><div className="sunex-purpose-hero__media"><img src="/images/sunex-home-future-city.jpg" alt="Sustainable future city with renewable energy" loading="lazy" /><div className="sunex-purpose-hero__veil" /></div></Reveal></div></section>
    <section id="sunex-areas" className="section sunex-areas-section" aria-labelledby="areas-title"><div className="content-wrap"><Reveal className="split-heading"><div><p className="eyebrow">Our verticals</p><h2 id="areas-title" className="display">Four areas.<br /><em>One purpose.</em></h2></div><p className="copy">SunEx operates across four connected areas where technology and innovation can create meaningful impact.</p></Reveal><div className="sunex-areas-grid">{focusAreas.map((area, index) => { const Icon = area.Icon; return <Reveal className={`sunex-area-card sunex-area-card--${area.index}`} delay={index * .05} key={area.title}><div className="sunex-area-card__media"><img src={area.image} alt={area.alt} loading="lazy" /><div className="sunex-area-card__top"><span>{area.index}</span><Icon size={18} /></div></div><div className="sunex-area-card__content"><h3>{area.title}</h3><p>{area.summary}</p><Link href={area.href}>Explore {area.title} <ArrowUpRight size={16} /></Link></div></Reveal>; })}</div></div></section>
    <section id="sunex-approach" className="section section--mist sunex-approach-section" aria-labelledby="approach-title"><div className="content-wrap"><Reveal className="split-heading"><div><p className="eyebrow">Our approach</p><h2 id="approach-title" className="display">From challenge<br /><em>to impact.</em></h2></div><div className="sunex-approach-intro"><p className="copy sunex-approach-intro__statement">At SunEx, we focus on moving beyond ideas - turning concepts into practical solutions, capabilities and initiatives that can create measurable and lasting impact.</p><div><motion.p className="sunex-approach-intro__pathway" aria-hidden="true" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} variants={{ visible: { transition: { staggerChildren: 0.35 } } }}>{["Understand", "→", "Innovate", "→", "Build", "→", "Collaborate", "→", "Implement", "→", "Create impact."].map((item, i) => <motion.span key={i} variants={{ hidden: { opacity: 0, x: -15 }, visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } }} className={item === "→" ? "pathway-arrow" : "pathway-word"}>{item}</motion.span>)}</motion.p><p className="sr-only">Understand, Innovate, Build, Collaborate, Implement, Create impact.</p></div></div></Reveal><div className="sunex-approach-grid sunex-approach-grid--layered">{approachSteps.map(([index, title, text, Icon], stepIndex) => <Reveal className="sunex-approach-card" delay={stepIndex * .04} key={title}><div className="sunex-approach-card__meta"><span className="sunex-approach-card__index">{index}</span><span className="sunex-approach-card__icon" aria-hidden="true"><Icon size={19} strokeWidth={1.8} /></span></div><h3>{title}</h3><p>{text}</p></Reveal>)}</div></div></section>
    <section className="section content-wrap"><Reveal className="large-cta large-cta--partner"><div className="large-cta__layout"><div className="large-cta__content"><p className="eyebrow">Why Partner with SunEx?</p><h2>Building Through<br /><em>Collaboration</em></h2><p>SunEx Technologies brings together technology, innovation, expertise and partnerships to address real-world challenges and develop practical solutions with meaningful impact.</p><p>We believe the strongest solutions are created when different perspectives, capabilities and resources come together.</p><Link href="/contact" className="action-pill large-cta__action">Start a conversation <span><ArrowUpRight size={16} /></span></Link></div><ul className="large-cta__principles">{partnerPrinciples.map(([title, text, Icon], index) => <li key={title}><span className="large-cta__principle-icon" aria-hidden="true"><Icon size={18} strokeWidth={1.8} /></span><div><small>{String(index + 1).padStart(2, "0")}</small><h3>{title}</h3><p>{text}</p></div></li>)}</ul></div></Reveal></section>
    <Testimonials />
  </>;
}

export default function Home() { return <HomeExperience />; }
