import { ArrowUpRight, BrainCircuit, ChartNoAxesCombined, CloudCog, Lightbulb, Network, PencilRuler, Rocket, SearchCheck, Settings2, Waypoints } from "lucide-react";
import React from "react";
import { Link } from "wouter";
import { PageHero } from "@/components/sunex/PageHero";
import { Reveal } from "@/components/sunex/Reveal";
import "./Technology.css";

const focusAreas = [
  { number: "01", title: "Artificial Intelligence", description: "Exploring AI-driven solutions to address real-world challenges, improve decision-making and create new opportunities across domains.", icon: BrainCircuit },
  { number: "02", title: "Digital Solutions", description: "Developing scalable digital solutions that improve accessibility, efficiency and user experience.", icon: CloudCog },
  { number: "03", title: "Automation", description: "Applying intelligent automation to simplify processes, improve productivity and enable more efficient operations.", icon: Settings2 },
  { number: "04", title: "Smart Systems", description: "Developing connected and intelligent systems that respond to real-world needs and enable smarter ways of working.", icon: Network },
  { number: "05", title: "Data-Driven Solutions", description: "Using data, analytics and insights to support informed decisions, improve performance and deliver better outcomes.", icon: ChartNoAxesCombined },
] as const;

const impactQuestions = [
  "What problem are we solving?",
  "Who will benefit?",
  "Can it work in the real world?",
  "Can its impact be measured?",
  "Can it scale?",
] as const;

const approachSteps = [
  { label: "Understand", icon: SearchCheck },
  { label: "Design", icon: PencilRuler },
  { label: "Build", icon: Settings2 },
  { label: "Implement", icon: Rocket },
  { label: "Improve", icon: Waypoints },
] as const;

export default function Technology() {
  return <>
    <PageHero
      eyebrow="01 / Technology"
      title={<>Technology <em>with purpose.</em></>}
      image="/images/technology-water-city.jpg"
      description="Technology is at the core of SunEx Technologies."
      action={{ label: "Explore our approach", href: "/technology#approach" }}
    />

    <section className="section tech-intro-section"><div className="content-wrap">
      <div className="tech-intro-grid">
        <Reveal className="tech-intro-copy"><p className="eyebrow">Technology</p><h2 className="display">The problem comes first.<br /><em>Impact is the goal.</em></h2><p className="copy">We explore, develop and implement technology-driven solutions that address real-world challenges and create practical, measurable value.</p><p className="copy copy--small">Our approach starts with understanding the problem, identifying the right opportunity and then applying the right technology to build an effective solution.</p></Reveal>
        <Reveal delay={.1} className="tech-intro-visual"><img src="/images/technology-sustainable-city.jpg" alt="A sustainable city connected through environmental technology" /><div className="tech-intro-visual__note"><span>SunEx principle</span><strong>Technology comes next.<br />Impact is the goal.</strong></div></Reveal>
      </div>
    </div></section>

    <section id="approach" className="section tech-approach-section"><div className="content-wrap">
      <Reveal className="tech-section-heading tech-section-heading--light"><div><p className="eyebrow">Our approach</p><h2 className="display">A practical route from<br /><em>challenge to capability.</em></h2></div><p>We work through a structured process that helps transform challenges into practical technology solutions.</p></Reveal>
      <div className="tech-process-line" aria-label="Understand, design, build, implement, improve">
        {approachSteps.map(({ label, icon: Icon }, index) => <Reveal className="tech-process-step" delay={index * .06} key={label}><div className="tech-process-step__top"><span>{String(index + 1).padStart(2, "0")}</span><div className="tech-process-step__icon"><Icon size={21} strokeWidth={1.7} /></div></div><strong>{label}</strong><small>{index === approachSteps.length - 1 ? "Refine with what we learn" : "Move with intention"}</small></Reveal>)}
      </div>
    </div></section>

    <section className="section section--mist tech-focus-section"><div className="content-wrap">
      <Reveal className="tech-section-heading"><div><p className="eyebrow">Areas of focus</p><h2 className="display">Capability built for<br /><em>what comes next.</em></h2></div><p>Applied technology areas that help people and organisations work more intelligently, efficiently and confidently.</p></Reveal>
      <div className="tech-focus-grid">{focusAreas.map(({ number, title, description, icon: Icon }, index) => <Reveal className="tech-focus-card" delay={index * .05} key={title}><div className="tech-focus-card__top"><span>{number}</span><i><Icon size={20} strokeWidth={1.7} /></i></div><h3>{title}</h3><p>{description}</p></Reveal>)}</div>
    </div></section>

    <section className="section tech-impact-section"><div className="content-wrap">
      <div className="tech-impact-grid">
        <div className="tech-impact-top">
          <Reveal className="tech-impact-copy"><div className="tech-impact-copy__mark"><Lightbulb size={18} /></div><p className="eyebrow">Technology for impact</p><h2>Technology <em>with purpose.</em></h2><p>At SunEx, we believe technology should be applied with purpose, relevance and measurable outcomes. Innovation creates value when it addresses meaningful challenges and delivers practical benefits.</p></Reveal>
          <Reveal delay={.08} className="tech-impact-visual"><img src="/images/technology-water-city.jpg" alt="Water technology and sustainable urban infrastructure" /><div className="tech-impact-visual__index"><Lightbulb size={15} /><span>Technology in action</span></div></Reveal>
        </div>
        <Reveal delay={.14} className="tech-impact-details"><div><p className="tech-impact-copy__intro">Our approach is guided by five questions:</p><ol>{impactQuestions.map(question => <li key={question}>{question}</li>)}</ol></div><p>We combine the experience of seasoned professionals with the energy, creativity and fresh perspectives of young technology talent to evaluate, develop and implement solutions that move beyond ideas and create practical, lasting impact.</p></Reveal>
      </div>
    </div></section>

    <section className="section tech-ecosystem-section"><div className="content-wrap">
      <Reveal className="tech-ecosystem-card"><div className="tech-ecosystem-card__visual"><img src="/images/technology-digital-systems.jpg" alt="Digital systems and cloud infrastructure in a modern technology workspace" /><div className="tech-ecosystem-card__badge"><span>01</span><small>Connected capability</small></div></div><div className="tech-ecosystem-card__copy"><p className="eyebrow">Our technology ecosystem</p><h2>Connecting Experience,<br /><em>Ideas and Innovation.</em></h2><p>Technology solutions become stronger when experience, fresh thinking and diverse capabilities come together.</p><p>SunEx brings together experienced professionals with decades of industry knowledge, young technology talent, innovators, institutions, businesses and ecosystem partners to share expertise, explore opportunities and develop practical solutions.</p><p>Through this collaborative ecosystem, we aim to combine proven experience with emerging ideas and technologies to build solutions that are relevant, responsible and ready for real-world application.</p><Link href="/contact" className="rivr-pill">Work with SunEx <span><ArrowUpRight size={16} /></span></Link></div></Reveal>
    </div></section>
  </>;
}
