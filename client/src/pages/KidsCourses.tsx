import React from "react";
import { Link } from "wouter";
import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Award, CalendarCheck, ExternalLink, HeartHandshake, Lightbulb, MonitorPlay, ShieldCheck, Sparkles, Trophy, Users, Zap, Code } from "lucide-react";
import { KidsDemoForm, KidsStickyCta } from "@/components/sunex/KidsDemoForm";
import { KidsProof } from "@/components/sunex/KidsProof";
import "./KidsCourses.css";
import "./KidsWidgets.css";
import "./KidsDemo.css";
import { Reveal } from "@/components/sunex/Reveal";
import { CourseFinder, LevelLadder, WeekRhythm } from "@/components/sunex/KidsWidgets";
import { bandLabels, batchText, feeText, kidsCourses, levelNames, type Band } from "@/data/kidsCourses";

const levelColors = { 1: "#22c55e", 2: "#ff6a12", 3: "#8b5cf6" } as const;

const bandCards = [
  { ages: "Ages 7–9", name: "Junior", Icon: Sparkles, text: "Story-driven and hands-on. Drag-and-drop tools, short clips, stars and show-and-tell." },
  { ages: "Ages 10–12", name: "Middle", Icon: Lightbulb, text: "Rules and patterns. Blocks that bridge to text, badges, checklists and short quizzes." },
  { ages: "Ages 13–16", name: "Senior", Icon: Code, text: "Text-first and “why does it work?” thinking. Real tools, rubric feedback and a viva." },
];

const highlights = [
  { title: "No expensive kits", description: "Most of every course runs in free browser simulators. Real hardware is an optional extra.", Icon: Zap },
  { title: "Mastery, not marks", description: "Children can retry until they get it. Progress is shown with badges, and parents get a report every two weeks.", Icon: HeartHandshake },
  { title: "Safe by design", description: "Parent-owned accounts, moderated live classes and clear AI-safety rules for every age.", Icon: ShieldCheck },
  { title: "Level certificates", description: "A certificate at every level, with a live showcase and viva so each one is earned.", Icon: Trophy },
];

const faqs = [
  { q: "What are the levels?", a: "Every course is a ladder: Level 1 Basic, Level 2 Intermediate and Level 3 Advanced. Each level has its own project and certificate. Levels 1 and 2 are open now. Level 3 is being designed." },
  { q: "Which age group should my child join?", a: "Children aged 7 to 16 learn in three age-matched groups: 7–9, 10–12 and 13–16. Use the course finder above, or talk to us and we will suggest the right fit." },
  { q: "How do classes work?", a: "Learn at your own pace: each week has four short video lessons you can watch whenever suits you, plus two live weekend classes with a mentor for doubts, hard concepts, project work and feedback." },
  { q: "Are the classes live?", a: "Both. The weekday lessons are self-paced videos, so your child learns at their own speed and can replay anything. The two weekend classes are live with a mentor, in small groups of up to 20, for doubts, hard concepts and feedback." },
  { q: "Do we need to buy a kit or special equipment?", a: "No. A laptop or computer with internet is enough. Most courses run in free browser simulators, and hardware is optional." },
  { q: "Is it safe for my child?", a: "Yes. Live classes always have two adults, chat is moderated, accounts are parent-owned, and children under 13 never create accounts on public AI chatbots." },
  { q: "Can we try before joining?", a: "Please contact us about free demo classes and upcoming batches." },
];

export default function KidsCourses() {
  const [band, setBand] = useState<Band | "all">("all");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [ladderCourse, setLadderCourse] = useState("scratch");
  const visibleCourses = band === "all" ? kidsCourses : kidsCourses.filter((course) => course.bands.includes(band));
  const ladder = kidsCourses.find((course) => course.id === ladderCourse)!;

  return <>
    <section className="kids-hero kids-hero--light content-wrap" aria-labelledby="kids-title">
      <div className="kids-hero__split">
        <div className="kids-hero__copy">
          <Link href="/education" className="kids-back"><ArrowLeft size={16} /> Back to SkillConnect</Link>
          <p className="kids-badge"><Sparkles size={15} /> SkillConnect Kids · Ages 7–16</p>
          <h1 id="kids-title">Little Minds.<br /><span>Big Ideas.</span></h1>
          <p className="kids-hero__lead">Coding, electricity, AI, IoT and robotics, taught step by step. Learn at your own pace with short video lessons, then meet your mentor live every weekend and finish with a real project.</p>
          <ul className="kids-trust">
            {[{ t: "Free demo class", I: CalendarCheck }, { t: "Certificate at every level", I: Award }, { t: "Learn at your own pace", I: MonitorPlay }, { t: "Live mentor class every weekend", I: Users }].map(({ t, I }) => <li key={t}><span><I size={18} /></span>{t}</li>)}
          </ul>
          <div className="kids-agepills" aria-label="Age groups">
            {[{ n: "Explorers", a: "7–9", c: "#22c55e" }, { n: "Makers", a: "10–12", c: "#ff6a12" }, { n: "Innovators", a: "13–16", c: "#8b5cf6" }].map((g) => <a key={g.n} href="#kids-finder" style={{ ["--c" as string]: g.c }}><b>{g.n}</b><small>Ages {g.a}</small></a>)}
          </div>
        </div>
        <KidsDemoForm />
      </div>
      <div className="kids-stats">
        {[{ v: "6", l: "Skill courses" }, { v: "3", l: "Levels in each" }, { v: "7–16", l: "Years old" }, { v: "20", l: "Max per live class" }].map((s) => <div key={s.l}><strong>{s.v}</strong><span>{s.l}</span></div>)}
      </div>
    </section>
    <KidsStickyCta />

    <section id="kids-finder" className="section" aria-labelledby="kids-finder-title"><div className="content-wrap">
      <Reveal>
        <div className="kids-section-head kids-section-head--center">
          <p className="eyebrow">NOT SURE WHERE TO START?</p>
          <h2 id="kids-finder-title" className="display" style={{ margin: 0 }}>Find the Perfect <em>First Course</em></h2>
        </div>
        <CourseFinder />
      </Reveal>
    </div></section>

    <section id="kids-courses" className="section section--mist"><div className="content-wrap">
      <Reveal>
        <div className="kids-section-head">
          <p className="eyebrow">OUR COURSES</p>
          <h2 className="display" style={{ margin: 0 }}>Six Ways to <em>Build Skills</em></h2>
        </div>
        <div className="kids-filter" aria-label="Filter by age group">
          {bandLabels.map(({ id, label }) => (
            <button type="button" aria-pressed={band === id} key={id} className={band === id ? "is-active" : ""} onClick={() => setBand(id)}>{label}</button>
          ))}
        </div>
      </Reveal>

      <div className="kids-grid" style={{ marginTop: 28 }}>
        {visibleCourses.map((course, index) => {
          const { Icon } = course;
          return (
            <Reveal delay={(index % 3) * .05} key={course.id}>
              <article className="kids-card" style={{ ["--kid-accent" as string]: course.accent }}>
                <span className="kids-card__icon"><Icon size={28} strokeWidth={1.8} /></span>
                <span className="kids-card__age">{course.entryAge}</span>
                <h4>{course.title}</h4>
                <p>{course.summary}</p>
                <div className="kids-card__levels" aria-label="Levels">
                  {course.levels.map((level) => (
                    <span key={level.n} className={level.status === "soon" ? "is-soon" : ""} style={{ ["--lvl" as string]: levelColors[level.n] }}>
                      <b>L{level.n}</b> {levelNames[level.n]}
                    </span>
                  ))}
                </div>
                <div className="kids-card__meta"><span>{course.weeks} weeks</span><span>{course.hours} hours</span><span>Self-paced + Live</span></div>
                <div className="kids-card__price"><span>{feeText(course.id)}</span><span>{batchText(course.id)}</span></div>
                {course.note && <p className="kids-card__note">{course.note}</p>}
                <Link href={`/education/kids/${course.id}`} className="rivr-pill kids-card__cta">
                  View Levels &amp; Syllabus <span><ArrowRight size={16} /></span>
                </Link>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div></section>

    <section className="section" aria-labelledby="kids-build-title"><div className="content-wrap">
      <Reveal>
        <div className="kids-section-head kids-section-head--center">
          <p className="eyebrow">PROJECTS THEY WILL BUILD</p>
          <h2 id="kids-build-title" className="display" style={{ margin: 0 }}>Real Projects. <em>Real Pride.</em></h2>
          <p className="kids-section-sub">Every course ends with a final project, shown live to parents on Showcase Day.</p>
        </div>
      </Reveal>
      <div className="kids-builds">
        {kidsCourses.map((course) => (
          <Link key={course.id} href={`/education/kids/${course.id}`} className="kids-build" style={{ ["--kid-accent" as string]: course.accent }}>
            <span><course.Icon size={30} strokeWidth={1.8} /></span>
            <small>{course.short}</small>
            <b>{course.capstone.replace(/^“([^”]+)”:?\s*/, "$1: ")}</b>
          </Link>
        ))}
      </div>
    </div></section>

    <KidsProof />

    <section className="section section--mist" aria-labelledby="kids-levels-title"><div className="content-wrap">
      <Reveal>
        <div className="kids-section-head kids-section-head--center">
          <p className="eyebrow">LEVEL UP</p>
          <h2 id="kids-levels-title" className="display" style={{ margin: 0 }}>Every Course is a <em>Ladder</em></h2>
          <p className="kids-section-sub">Pick a course, then tap a level to see what your child will learn, build and earn.</p>
        </div>
        <div className="kids-filter kids-filter--center" aria-label="Choose a course">
          {kidsCourses.map((course) => (
            <button type="button" aria-pressed={ladderCourse === course.id} key={course.id} className={ladderCourse === course.id ? "is-active" : ""} onClick={() => setLadderCourse(course.id)}>{course.short}</button>
          ))}
        </div>
        <LevelLadder key={ladder.id} course={ladder} />
        <p style={{ textAlign: "center", marginTop: 20 }}><Link href={`/education/kids/${ladder.id}`} className="text-link">See the full {ladder.short} syllabus <ArrowRight size={14} /></Link></p>
      </Reveal>
    </div></section>

    <section className="section section--mist" aria-labelledby="kids-how-title"><div className="content-wrap">
      <Reveal>
        <div className="kids-section-head kids-section-head--center">
          <p className="eyebrow">HOW A WEEK WORKS</p>
          <h2 id="kids-how-title" className="display" style={{ margin: 0 }}>Learn at Home. <em>Meet at the Weekend.</em></h2>
          <p className="kids-section-sub">Learn at your own pace on weekdays, then join two live classes with a mentor. Tap any day to explore.</p>
        </div>
        <WeekRhythm />
      </Reveal>
    </div></section>

    <section className="section" aria-labelledby="kids-platform-title"><div className="content-wrap">
      <Reveal>
        <div className="kids-section-head kids-section-head--center">
          <p className="eyebrow">THE LEARNING PLATFORM</p>
          <h2 id="kids-platform-title" className="display" style={{ margin: 0 }}>One Place for Child, <em>Parent &amp; Mentor</em></h2>
          <p className="kids-section-sub">A first look at the SkillConnect Kids platform. Switch between the child, parent and mentor views.</p>
        </div>
        <div className="kids-platform">
          <iframe src="/lms-preview/index.html" title="SkillConnect Kids learning platform preview" loading="lazy" />
        </div>
        <p style={{ textAlign: "center", marginTop: 16 }}>
          <a href="/lms-preview/index.html" target="_blank" rel="noreferrer" className="text-link">Open the full preview <ExternalLink size={14} /></a>
          <span className="kids-section-sub" style={{ display: "block", marginTop: 6 }}>Design preview with sample data. The live platform is in development.</span>
        </p>
      </Reveal>
    </div></section>

    <section className="section section--mist" aria-labelledby="kids-bands-title"><div className="content-wrap">
      <Reveal>
        <div className="kids-section-head kids-section-head--center">
          <p className="eyebrow">AGE-MATCHED LEARNING</p>
          <h2 id="kids-bands-title" className="display" style={{ margin: 0 }}>The Right Pace for <em>Every Age</em></h2>
        </div>
      </Reveal>
      <div className="kids-highlights">
        {bandCards.map(({ ages, name, Icon, text }, index) => (
          <Reveal delay={index * .05} key={ages}>
            <div className="kids-highlight"><span><Icon size={26} strokeWidth={1.8} /></span><h3>{name} · {ages}</h3><p>{text}</p></div>
          </Reveal>
        ))}
      </div>
      <div className="kids-highlights" style={{ marginTop: 24 }}>
        {highlights.map(({ title, description, Icon }, index) => (
          <Reveal delay={index * .05} key={title}>
            <div className="kids-highlight"><span><Icon size={26} strokeWidth={1.8} /></span><h3>{title}</h3><p>{description}</p></div>
          </Reveal>
        ))}
      </div>
    </div></section>

    <section className="section" aria-labelledby="kids-faq-title"><div className="content-wrap kids-faq">
      <Reveal>
        <div className="kids-section-head kids-section-head--center">
          <p className="eyebrow">PARENT FAQ</p>
          <h2 id="kids-faq-title" className="display" style={{ margin: 0 }}>Questions <em>Parents Ask</em></h2>
        </div>
      </Reveal>
      <div className="kids-faq__list">
        {faqs.map(({ q, a }, index) => (
          <div className={`kids-faq__item ${openFaq === index ? "is-open" : ""}`} key={q}>
            <button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}>{q}<span aria-hidden="true">{openFaq === index ? "−" : "+"}</span></button>
            {openFaq === index && <p>{a}</p>}
          </div>
        ))}
      </div>
    </div></section>

    <section className="section content-wrap"><Reveal className="large-cta">
      <div style={{ position: "relative", zIndex: 2 }}>
        <p className="eyebrow">Start their journey</p>
        <h2>Help Your Child Build<br /><em>Something Amazing.</em></h2>
        <p>Book a free demo class and we will suggest the right course and level.</p>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "16px" }}>
          <Link href="/contact?interest=education&audience=kids" className="rivr-pill">Book a Free Demo <span><ArrowUpRight size={16} /></span></Link>
          <Link href="/education" className="rivr-pill" style={{ background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.3)" }}>Back to SkillConnect</Link>
        </div>
      </div>
    </Reveal></section>
  </>;
}
