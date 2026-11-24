import React from "react";
import { Link, useRoute } from "wouter";
import { ArrowLeft, ArrowRight, ArrowUpRight, Award, CheckCircle2, ExternalLink, MonitorPlay, Trophy, UsersRound, Video } from "lucide-react";
import "./KidsCourses.css";
import "./KidsWidgets.css";
import "./KidsDemo.css";
import { Reveal } from "@/components/sunex/Reveal";
import { JourneyMap, LevelLadder } from "@/components/sunex/KidsWidgets";
import { KidsDemoForm, KidsStickyCta } from "@/components/sunex/KidsDemoForm";
import { batchText, feeText, findCourse, kidsCourses } from "@/data/kidsCourses";
import NotFound from "@/pages/NotFound";

export default function KidsCourseDetail() {
  const [, params] = useRoute("/education/kids/:slug");
  const course = params ? findCourse(params.slug) : undefined;
  if (!course) return <NotFound />;
  const { Icon } = course;
  const enquire = `/contact?interest=education&audience=kids&course=${encodeURIComponent(course.title)}`;
  const others = kidsCourses.filter((item) => item.id !== course.id).slice(0, 3);

  return <>
    <section className="kids-hero kids-hero--course content-wrap" style={{ ["--kid-accent" as string]: course.accent }} aria-labelledby="course-title">
      <Reveal>
        <Link href="/education/kids" className="kids-back"><ArrowLeft size={16} /> All kids courses</Link>
        <p className="kids-badge"><Icon size={15} /> {course.entryAge} · {course.weeks} weeks · {course.hours} hours</p>
        <h1 id="course-title" style={{ fontSize: "clamp(34px, 6vw, 62px)" }}>{course.title}</h1>
        <p className="kids-hero__lead">{course.summary}</p>
        <div className="kids-hero__actions">
          <Link href={enquire} className="rivr-pill kids-cta">Book a Free Demo <span><ArrowUpRight size={15} /></span></Link>
          <a href="#course-levels" className="rivr-pill kids-cta kids-cta--ghost">See the Levels</a>
        </div>
        <div className="kids-hero__chips"><span>{feeText(course.id)}</span><span>{batchText(course.id)}</span><span>3 levels</span><span>Learn at your own pace</span><span>Max 20 per live class</span><span>Certificate at every level</span></div>
      </Reveal>
    </section>

    <section className="section" aria-labelledby="course-about"><div className="content-wrap">
      <div className="kids-about">
        <Reveal>
          <p className="eyebrow">ABOUT THIS COURSE</p>
          <h2 id="course-about" className="display" style={{ margin: "0 0 16px" }}>{course.bigIdea}</h2>
          <p className="kids-about__text">{course.about}</p>
          {course.note && <p className="kids-about__note"><CheckCircle2 size={16} /> {course.note}</p>}
          <div className="kids-about__tools"><b>Tools:</b> {course.tools}</div>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="kids-outcomes">
            <h3>By the end, your child can…</h3>
            <ul>{course.outcomes.map((outcome) => <li key={outcome}><CheckCircle2 size={18} /> {outcome}</li>)}</ul>
          </div>
        </Reveal>
      </div>
    </div></section>

    <section id="course-levels" className="section section--mist" aria-labelledby="course-levels-title"><div className="content-wrap">
      <Reveal>
        <div className="kids-section-head kids-section-head--center">
          <p className="eyebrow">CHOOSE YOUR LEVEL</p>
          <h2 id="course-levels-title" className="display" style={{ margin: 0 }}>Three Levels. <em>One Big Journey.</em></h2>
          <p className="kids-section-sub">Tap a level to see its topics, project and certificate.</p>
        </div>
        <LevelLadder course={course} />
      </Reveal>
    </div></section>

    <section className="section" aria-labelledby="course-journey-title"><div className="content-wrap">
      <Reveal>
        <div className="kids-section-head kids-section-head--center">
          <p className="eyebrow">WEEK BY WEEK</p>
          <h2 id="course-journey-title" className="display" style={{ margin: 0 }}>Your Child&apos;s <em>{course.weeks}-Week Journey</em></h2>
          <p className="kids-section-sub">Tap a week to see what happens.</p>
        </div>
        <JourneyMap course={course} />
      </Reveal>
    </div></section>

    <section className="section section--mist" aria-labelledby="course-format-title"><div className="content-wrap">
      <Reveal>
        <div className="kids-section-head kids-section-head--center">
          <p className="eyebrow">HOW IT WORKS</p>
          <h2 id="course-format-title" className="display" style={{ margin: 0 }}>Right for <em>Every Age</em></h2>
        </div>
      </Reveal>
      <div className="kids-highlights">
        {[{ t: "Junior · 7–9", d: course.tracks.junior, I: MonitorPlay }, { t: "Middle · 10–12", d: course.tracks.middle, I: UsersRound }, { t: "Senior · 13–16", d: course.tracks.senior, I: Video }].map(({ t, d, I }, index) => (
          <Reveal delay={index * .05} key={t}><div className="kids-highlight"><span><I size={26} strokeWidth={1.8} /></span><h3>{t}</h3><p>{d}</p></div></Reveal>
        ))}
      </div>
      <Reveal>
        <div className="kids-capstone">
          <Trophy size={28} />
          <div><small>FINAL PROJECT</small><strong>{course.capstone}</strong><span>Presented at a live showcase to parents. A short viva checks understanding, so every certificate is earned.</span></div>
          <span className="kids-capstone__cert"><Award size={18} /> Level certificates</span>
        </div>
      </Reveal>
    </div></section>

    <section className="section" aria-labelledby="course-platform"><div className="content-wrap">
      <Reveal>
        <div className="kids-section-head kids-section-head--center">
          <p className="eyebrow">THE LEARNING PLATFORM</p>
          <h2 id="course-platform" className="display" style={{ margin: 0 }}>See How Your Child <em>Will Learn</em></h2>
        </div>
        <div className="kids-platform"><iframe src="/lms-preview/index.html" title="SkillConnect Kids learning platform preview" loading="lazy" /></div>
        <p style={{ textAlign: "center", marginTop: 16 }}><a href="/lms-preview/index.html" target="_blank" rel="noreferrer" className="text-link">Open the full preview <ExternalLink size={14} /></a></p>
      </Reveal>
    </div></section>

    <section className="section section--mist" aria-labelledby="course-more"><div className="content-wrap">
      <Reveal><div className="kids-section-head"><p className="eyebrow">KEEP EXPLORING</p><h2 id="course-more" className="display" style={{ margin: 0 }}>More <em>Kids Courses</em></h2></div></Reveal>
      <div className="kids-grid">
        {others.map((item) => (
          <Reveal key={item.id}>
            <Link href={`/education/kids/${item.id}`} className="kids-card kids-card--link" style={{ ["--kid-accent" as string]: item.accent }}>
              <span className="kids-card__icon"><item.Icon size={28} strokeWidth={1.8} /></span>
              <span className="kids-card__age">{item.entryAge}</span>
              <h4>{item.title}</h4><p>{item.summary}</p>
              <span className="kids-card__go">View levels <ArrowRight size={15} /></span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div></section>

    <section className="section" aria-labelledby="course-demo"><div className="content-wrap kids-demo-band">
      <Reveal>
        <p className="eyebrow">TRY IT FREE</p>
        <h2 id="course-demo" className="display" style={{ margin: "0 0 12px" }}>Book a Free <em>Demo Class</em></h2>
        <p className="kids-about__text">See the teaching style, meet the mentor and find the right level for your child. No payment needed.</p>
      </Reveal>
      <KidsDemoForm course={course.title} />
    </div></section>
    <KidsStickyCta />

    <section className="section content-wrap"><Reveal className="large-cta">
      <div style={{ position: "relative", zIndex: 2 }}>
        <p className="eyebrow">Start with Level 1</p>
        <h2>Ready to Try<br /><em>{course.short}?</em></h2>
        <p>Book a free demo class and we will confirm the right age group and level.</p>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "16px" }}>
          <Link href={enquire} className="rivr-pill">Book a Free Demo <span><ArrowUpRight size={16} /></span></Link>
          <Link href="/education/kids" className="rivr-pill" style={{ background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.3)" }}>All kids courses</Link>
        </div>
      </div>
    </Reveal></section>
  </>;
}
