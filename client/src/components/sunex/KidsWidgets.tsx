import React from "react";
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Award, Flag, Lock, MonitorPlay, PartyPopper, Trophy, Video } from "lucide-react";
import { kidsCourses, levelNames, type Band, type KidsCourse } from "@/data/kidsCourses";

const levelColors = { 1: "#22c55e", 2: "#ff6a12", 3: "#8b5cf6" } as const;

/* ---------- Interactive level ladder for one course ---------- */
export function LevelLadder({ course }: { course: KidsCourse }) {
  const [selected, setSelected] = useState<1 | 2 | 3>(1);
  const level = course.levels.find((item) => item.n === selected)!;
  const weeks = level.weeks[1] - level.weeks[0] + 1;
  const topics = course.weekTitles.slice(level.weeks[0] - 1, level.weeks[1]);

  return (
    <div className="kw-ladder" style={{ ["--kid-accent" as string]: course.accent }}>
      <div className="kw-ladder__steps" aria-label={`${course.title} levels`}>
        {course.levels.map((item) => (
          <button
            type="button" key={item.n} aria-pressed={selected === item.n}
            className={`kw-step kw-step--${item.n} ${selected === item.n ? "is-active" : ""} ${item.status === "soon" ? "is-soon" : ""}`}
            style={{ ["--lvl" as string]: levelColors[item.n], height: 96 + item.n * 44 }}
            onClick={() => setSelected(item.n)}
          >
            <small>Level {item.n}</small>
            <strong>{levelNames[item.n]}</strong>
            <span>{item.title}</span>
            {item.status === "soon" && <em><Lock size={12} /> Coming soon</em>}
          </button>
        ))}
      </div>
      <div className="kw-ladder__panel" style={{ ["--lvl" as string]: levelColors[selected] }} key={selected}>
        <p className="kw-ladder__eyebrow">Level {level.n} · {level.name}</p>
        <h3>{level.title}</h3>
        <p>{level.blurb}</p>
        {level.status === "live" ? (
          <>
            <div className="kw-chips"><span>Weeks {level.weeks[0]}–{level.weeks[1]}</span><span>{weeks * 4} hours</span><span>Learn at your own pace + live</span></div>
            <ul className="kw-topics">{topics.map((topic, index) => <li key={topic}><i>{level.weeks[0] + index}</i>{topic}</li>)}</ul>
            <p className="kw-ladder__meta"><Trophy size={15} /> Level project: <b>{level.project}</b></p>
            <p className="kw-ladder__meta"><Award size={15} /> Earn a Level {level.n} {level.name} certificate</p>
          </>
        ) : (
          <p className="kw-ladder__soon"><Lock size={15} /> This level is being designed. Tell us if your child would join and we will notify you.</p>
        )}
      </div>
    </div>
  );
}

/* ---------- Week-by-week journey map ---------- */
export function JourneyMap({ course }: { course: KidsCourse }) {
  const [active, setActive] = useState(0);
  const levelOf = (week: number) => course.levels.find((l) => l.status === "live" && week >= l.weeks[0] && week <= l.weeks[1])?.n ?? 1;
  const last = course.weekTitles.length;
  return (
    <div className="kw-journey">
      <div className="kw-journey__track" role="list">
        {course.weekTitles.map((title, index) => {
          const week = index + 1;
          const lvl = levelOf(week) as 1 | 2 | 3;
          const flag = course.checkpointWeeks.includes(week);
          return (
            <button type="button" role="listitem" key={title} className={`kw-node ${active === index ? "is-active" : ""}`}
              style={{ ["--lvl" as string]: levelColors[lvl] }} onClick={() => setActive(index)} aria-label={`Week ${week}: ${title}`}>
              <span>{week === last ? <Trophy size={16} /> : flag ? <Flag size={16} /> : week}</span>
            </button>
          );
        })}
      </div>
      <div className="kw-journey__detail" style={{ ["--lvl" as string]: levelColors[levelOf(active + 1) as 1 | 2 | 3] }} key={active}>
        <small>Week {active + 1} · Level {levelOf(active + 1)} {levelNames[levelOf(active + 1) as 1 | 2 | 3]}</small>
        <strong>{course.weekTitles[active]}</strong>
        <p>
          {course.checkpointWeeks.includes(active + 1) ? "Mid-course checkpoint project with a short viva. " : ""}
          {active + 1 === last ? "Capstone and live showcase to parents. " : ""}
          Learn at your own pace all week, plus a weekend Lab and Studio with a mentor.
        </p>
      </div>
      <div className="kw-legend"><span style={{ ["--lvl" as string]: levelColors[1] }}>Level 1 Basic</span><span style={{ ["--lvl" as string]: levelColors[2] }}>Level 2 Intermediate</span><span><Flag size={13} /> Checkpoint</span><span><Trophy size={13} /> Capstone</span></div>
    </div>
  );
}

/* ---------- Weekly rhythm and session anatomy ---------- */
const days = [
  { id: "r1", label: "Mon", name: "Lesson 1", kind: "rec", detail: "A self-paced video lesson of about 30 minutes, made of 5 short clips. Watch it whenever suits you, pause and build along." },
  { id: "r2", label: "Tue", name: "Lesson 2", kind: "rec", detail: "Another 30-minute session. Each ends with a 3-question exit quiz and a Level-up challenge." },
  { id: "r3", label: "Wed", name: "Lesson 3", kind: "rec", detail: "The week's Hard Concept is introduced here. If it feels tricky, flag it with a Stuck Card." },
  { id: "r4", label: "Thu", name: "Lesson 4", kind: "rec", detail: "Final lesson of the week. Finish your weekly challenge and post a 60-second demo video." },
  { id: "lab", label: "Sat", name: "Live A · Lab", kind: "live", detail: "60 minutes live. Doubt clinic from Stuck Cards, the Hard Concept re-taught a new way, then a guided challenge in small breakout rooms." },
  { id: "studio", label: "Sun", name: "Live B · Studio", kind: "live", detail: "60 minutes live. Spotlight demos, project mentoring, peer feedback (two stars and a wish) and the weekly badge." },
];
const clips = [
  { name: "Spark", min: 4.5, text: "A story, puzzle or real-world hook that sets today's mission." },
  { name: "Learn", min: 6, text: "One idea with visuals and an analogy, then a 1-question checkpoint." },
  { name: "Watch me", min: 6, text: "The mentor builds it while thinking aloud and makes one planned mistake to fix." },
  { name: "Your turn", min: 7, text: "A guided build-along with “pause here” cues and a starter file." },
  { name: "Level up", min: 5, text: "Easy, Medium or Spicy challenge, a short quiz and tomorrow's teaser." },
];

export function WeekRhythm() {
  const [day, setDay] = useState("lab");
  const [clip, setClip] = useState(0);
  const current = days.find((item) => item.id === day)!;
  const total = clips.reduce((sum, item) => sum + item.min, 0);
  return (
    <div className="kw-rhythm">
      <div className="kw-rhythm__week" aria-label="A learning week">
        {days.map((item) => (
          <button type="button" key={item.id} aria-pressed={day === item.id} className={`kw-day kw-day--${item.kind} ${day === item.id ? "is-active" : ""}`} onClick={() => setDay(item.id)}>
            <span>{item.kind === "rec" ? <MonitorPlay size={20} /> : <Video size={20} />}</span>
            <b>{item.label}</b><small>{item.name}</small>
          </button>
        ))}
      </div>
      <div className={`kw-rhythm__detail kw-rhythm__detail--${current.kind}`} key={current.id}>
        <strong>{current.name}</strong>
        <p>{current.detail}</p>
      </div>

      <h4 className="kw-rhythm__sub">Inside one self-paced lesson (about 30 minutes)</h4>
      <div className="kw-clips" aria-label="Clips in a session">
        {clips.map((item, index) => (
          <button type="button" key={item.name} aria-pressed={clip === index} className={clip === index ? "is-active" : ""} style={{ flexGrow: item.min / total * 10 }} onClick={() => setClip(index)}>
            <b>{index + 1}</b><span>{item.name}</span><small>{item.min} min</small>
          </button>
        ))}
      </div>
      <p className="kw-clips__text" key={clip}><b>{clips[clip].name}:</b> {clips[clip].text}</p>
    </div>
  );
}

/* ---------- Find my course ---------- */
const interestOptions = [
  { id: "games", label: "🎮 Games" }, { id: "stories", label: "📖 Stories" }, { id: "making", label: "🛠️ Making things" },
  { id: "science", label: "🔬 Science" }, { id: "ai", label: "🤖 AI" }, { id: "robots", label: "🦾 Robots" }, { id: "coding", label: "💻 Coding" },
];

export function CourseFinder() {
  const [band, setBand] = useState<Band | null>(null);
  const [picked, setPicked] = useState<string[]>([]);
  const results = useMemo(() => {
    if (!band) return [];
    return kidsCourses
      .filter((course) => course.bands.includes(band))
      .map((course) => ({ course, score: course.interests.filter((interest) => picked.includes(interest)).length + (picked.includes(course.interests[0]) ? 0.5 : 0) + (course.id === "scratch" && band === "7-9" ? 0.5 : 0) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 2);
  }, [band, picked]);

  return (
    <div className="kw-finder">
      <div>
        <p className="kw-finder__q">1. How old is your child?</p>
        <div className="kw-pills">
          {(["7-9", "10-12", "13-16"] as Band[]).map((item) => (
            <button type="button" key={item} className={band === item ? "is-on" : ""} onClick={() => setBand(item)}>{item.replace("-", "–")} years</button>
          ))}
        </div>
        <p className="kw-finder__q">2. What do they love? <small>(pick any)</small></p>
        <div className="kw-pills">
          {interestOptions.map((item) => (
            <button type="button" key={item.id} className={picked.includes(item.id) ? "is-on" : ""} aria-pressed={picked.includes(item.id)}
              onClick={() => setPicked((prev) => prev.includes(item.id) ? prev.filter((x) => x !== item.id) : [...prev, item.id])}>{item.label}</button>
          ))}
        </div>
      </div>
      <div className="kw-finder__out">
        {!band ? (
          <div className="kw-finder__empty"><PartyPopper size={34} /><p>Pick an age to see where your child should start.</p></div>
        ) : (
          results.map(({ course }, index) => (
            <Link key={course.id} href={`/education/kids/${course.id}`} className="kw-result" style={{ ["--kid-accent" as string]: course.accent }}>
              <span className="kw-result__icon"><course.Icon size={26} /></span>
              <span className="kw-result__body"><small>{index === 0 ? "Best match" : "Also great"}</small><b>{course.title}</b><i>Start at Level 1 · {course.weeks} weeks</i></span>
              <ArrowRight size={18} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
