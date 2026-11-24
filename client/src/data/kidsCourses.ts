import { Bot, BrainCircuit, Code, Gamepad2, Radio, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/*
 * Source of truth: projects/2026-11-24_kids-skills-curriculum (Kids Skill-Enhancement Curriculum Pack).
 * Level 1 and Level 2 are the two halves of each syllabus. Level 3 is PROPOSED (status "soon") and still to be designed.
 * Keep in sync with the syllabus PDFs. Fees and batch dates are not set yet, so they are not shown.
 */
export type Band = "7-9" | "10-12" | "13-16";
export type LevelName = "Basic" | "Intermediate" | "Advanced";

export type CourseLevel = {
  n: 1 | 2 | 3;
  name: LevelName;
  title: string;
  weeks: [number, number];
  status: "live" | "soon";
  blurb: string;
  project: string;
};

export type KidsCourse = {
  id: string;
  title: string;
  short: string;
  Icon: LucideIcon;
  accent: string;
  weeks: number;
  hours: number;
  entryAge: string;
  bands: Band[];
  interests: string[];
  summary: string;
  about: string;
  bigIdea: string;
  outcomes: string[];
  capstone: string;
  tools: string;
  note?: string;
  tracks: { junior: string; middle: string; senior: string };
  weekTitles: string[];
  checkpointWeeks: number[];
  levels: CourseLevel[];
};

export const bandLabels: { id: Band | "all"; label: string }[] = [
  { id: "all", label: "All Ages" },
  { id: "7-9", label: "Ages 7–9" },
  { id: "10-12", label: "Ages 10–12" },
  { id: "13-16", label: "Ages 13–16" },
];

export const levelNames: Record<1 | 2 | 3, LevelName> = { 1: "Basic", 2: "Intermediate", 3: "Advanced" };

export const kidsCourses: KidsCourse[] = [
  {
    id: "scratch", title: "Programming in Scratch", short: "Scratch", Icon: Gamepad2, accent: "#22c55e",
    weeks: 8, hours: 32, entryAge: "Ages 7+", bands: ["7-9", "10-12", "13-16"], interests: ["games", "stories", "coding"],
    summary: "Computers do exactly what you tell them. Learn sequences, loops, decisions, variables and clones by building games and stories.",
    about: "Children start with simple block coding and quickly make things that move, talk and react. Every idea is met inside a build, so a game or story is always taking shape.",
    bigIdea: "Giving clear instructions is a superpower.",
    outcomes: ["Put instructions in the right order and predict what a script does", "Use loops and decisions to make interactive games", "Keep score and lives with variables", "Make sprites work together with messages and clones", "Find and fix bugs by predicting, testing and isolating", "Plan, test with real players, improve and present a project"],
    capstone: "An original game, story or quiz that teaches a younger child something.", tools: "ScratchJr, Scratch 3, Snap! (13+)",
    tracks: { junior: "ScratchJr for weeks 1–2, then Scratch 3. Variables as score only.", middle: "Scratch 3 as written.", senior: "Snap! bridge with lists, custom blocks with parameters and recursion." },
    weekTitles: ["Meet Scratch", "Repeat it!", "Tell a story", "Smart sprites", "Remember it!", "Many sprites", "Build your own blocks", "Studio week"],
    checkpointWeeks: [4],
    levels: [
      { n: 1, name: "Basic", title: "Scratch Starter", weeks: [1, 4], status: "live", blurb: "Sequencing, loops, stories and decisions.", project: "Maze Runner game" },
      { n: 2, name: "Intermediate", title: "Game Maker", weeks: [5, 8], status: "live", blurb: "Variables, clones, custom blocks and a capstone.", project: "Original game or story for a younger child" },
      { n: 3, name: "Advanced", title: "Game Studio", weeks: [9, 12], status: "soon", blurb: "Proposed: larger games with lists and a bridge to text coding.", project: "To be designed" },
    ],
  },
  {
    id: "electricity", title: "Everyday Electricity", short: "Electricity", Icon: Zap, accent: "#f59e0b",
    weeks: 6, hours: 24, entryAge: "Ages 7+", bands: ["7-9", "10-12", "13-16"], interests: ["science", "making", "home"],
    summary: "Understand circuits, series and parallel, and home electrical safety, then find out how to waste less energy.",
    about: "A safe, simulator-first tour of the electricity around us. Children build virtual circuits, learn what keeps a home safe, and measure how much energy their own home uses.",
    bigIdea: "Electricity is powerful. When we understand it, we use it safely and waste less of it.",
    outcomes: ["Explain why a circuit must be a complete loop", "Tell conductors from insulators and say why it matters for safety", "Build and compare series and parallel circuits", "Describe voltage, current and resistance (V = IR for 13+)", "Read an appliance label and estimate energy use and cost", "Suggest practical energy-saving ideas backed by their own data"],
    capstone: "“My Electric Home”: a safe, energy-saving design plus a real energy audit of your own home.", tools: "PhET, Tinkercad Circuits (13+)",
    note: "No kit needed. Mains electricity is never an activity.",
    tracks: { junior: "PhET with everyday analogies.", middle: "PhET with measured experiments.", senior: "Tinkercad Circuits, V = IR and an optional KiCad taster." },
    weekTitles: ["What is electricity?", "Circuits", "Series and parallel", "Voltage, current, resistance", "Electricity at home", "My Electric Home"],
    checkpointWeeks: [3],
    levels: [
      { n: 1, name: "Basic", title: "Circuit Explorer", weeks: [1, 3], status: "live", blurb: "Safety, circuits, series and parallel.", project: "Circuit challenge" },
      { n: 2, name: "Intermediate", title: "Energy Detective", weeks: [4, 6], status: "live", blurb: "Voltage, current, home electricity and an energy audit.", project: "My Electric Home" },
      { n: 3, name: "Advanced", title: "Electronics Lab", weeks: [7, 10], status: "soon", blurb: "Proposed: simulate and design real electronic circuits.", project: "To be designed" },
    ],
  },
  {
    id: "python", title: "Programming in Python", short: "Python", Icon: Code, accent: "#3b82f6",
    weeks: 12, hours: 48, entryAge: "Ages 10+", bands: ["10-12", "13-16"], interests: ["coding", "games", "data"],
    summary: "Move from blocks to real code: variables, loops, lists, functions, files and games. Two 6-week modules, each with its own certificate.",
    about: "Real Python, introduced gently with turtle graphics and finishing with a game. The same ideas learned in blocks now run on every computer in the world.",
    bigIdea: "Python lets you write real instructions that run everywhere.",
    outcomes: ["Read and write simple Python: print, input, variables", "Make programs decide and repeat", "Store collections in lists and dictionaries", "Write functions with parameters and return values", "Read an error message and fix the bug systematically", "Save and load data from files and build a small game"],
    capstone: "A complete original program or game, presented and explained live.", tools: "EduBlocks, Thonny, Pygame Zero",
    note: "Best after Scratch, or a short placement check.",
    tracks: { junior: "Not advised. Start with Scratch.", middle: "EduBlocks for weeks 1–3, then Thonny.", senior: "Thonny from day one, classes, CSV and basic statistics." },
    weekTitles: ["Hello, Python", "Variables and input", "Decisions", "Loops", "Lists and dictionaries", "Functions", "Tools of the trade", "Data and files", "Pygame Zero basics", "Game logic", "Organising bigger programs", "Capstone and showcase"],
    checkpointWeeks: [6],
    levels: [
      { n: 1, name: "Basic", title: "Python Foundations", weeks: [1, 6], status: "live", blurb: "Variables, decisions, loops, lists and functions.", project: "Module A project" },
      { n: 2, name: "Intermediate", title: "Python Builder", weeks: [7, 12], status: "live", blurb: "Modules, files, Pygame Zero and a capstone game.", project: "Original program or game" },
      { n: 3, name: "Advanced", title: "Python for Data & AI", weeks: [13, 20], status: "soon", blurb: "Proposed: data projects and a first look at machine learning.", project: "To be designed" },
    ],
  },
  {
    id: "prompt", title: "Prompt Engineering & AI Literacy", short: "AI & Prompting", Icon: BrainCircuit, accent: "#8b5cf6",
    weeks: 6, hours: 24, entryAge: "Ages 10+ (7–9: AI Explorers)", bands: ["7-9", "10-12", "13-16"], interests: ["ai", "writing", "science"],
    summary: "Learn how AI learns, why it can be confidently wrong, and how to ask clearly, check carefully and use it responsibly.",
    about: "A short, high-impact course in clear thinking. Children train tiny AI models, write better prompts, and learn to test AI answers instead of trusting them.",
    bigIdea: "AI is a pattern machine that does not know what is true. We ask clearly, check carefully and decide wisely.",
    outcomes: ["Explain simply how AI learns from examples", "Spot when AI is wrong or biased", "Write clear prompts with context, task and format", "Improve results with examples", "Check AI answers before trusting them", "Protect personal data and use AI responsibly"],
    capstone: "“My AI Helper”: a prompt playbook or small AI helper with an evidence log of testing and improvement.", tools: "Teachable Machine, ML for Kids, mentor-led playground",
    note: "Safe by design: no public chatbot accounts for under-13s.",
    tracks: { junior: "AI Explorers: sandboxed tools, no chatbots.", middle: "Sandboxed tools plus a mentor-led, screen-shared prompt playground.", senior: "Hosted open models and an optional local model." },
    weekTitles: ["What is AI?", "Anatomy of a good prompt", "Show, don't just tell", "Check, don't just trust", "AI as a study buddy", "My AI Helper"],
    checkpointWeeks: [4],
    levels: [
      { n: 1, name: "Basic", title: "AI Explorer", weeks: [1, 3], status: "live", blurb: "What AI is, and how to write a clear prompt.", project: "Prompt challenge" },
      { n: 2, name: "Intermediate", title: "AI Thinker", weeks: [4, 6], status: "live", blurb: "Checking AI, study and creative uses, and a capstone helper.", project: "My AI Helper" },
      { n: 3, name: "Advanced", title: "AI Builder", weeks: [7, 12], status: "soon", blurb: "Proposed: build small AI-powered tools with open models.", project: "To be designed" },
    ],
  },
  {
    id: "iot", title: "IoT Basics", short: "IoT", Icon: Radio, accent: "#06b6d4",
    weeks: 8, hours: 32, entryAge: "Ages 9+ (7–8: lite)", bands: ["7-9", "10-12", "13-16"], interests: ["making", "science", "robots"],
    summary: "Everyday objects can sense, think and talk. Build smart systems with sensors, rules, data and dashboards in a browser simulator.",
    about: "Children learn the Sense, Think, Act, Communicate loop by building virtual devices, then connect them and show live data on a dashboard.",
    bigIdea: "Everyday objects can sense, think and talk. We decide what they should and should not know.",
    outcomes: ["Explain IoT with Sense, Think, Act, Communicate", "Use buttons, LEDs, buzzers and sensors", "Write automation rules with thresholds", "Log data and read a graph", "Send data between devices and show it on a dashboard", "Reason about privacy, security and power"],
    capstone: "A smart system for a real place: plant waterer, weather station or classroom monitor.", tools: "MakeCode micro:bit, Wokwi + Node-RED (13+)",
    note: "About 75% simulator-based. Hardware is an optional extra.",
    tracks: { junior: "MakeCode micro:bit with extra guidance and radio games.", middle: "MakeCode with data and alerts.", senior: "Wokwi ESP32, MQTT and a Node-RED dashboard." },
    weekTitles: ["What is IoT?", "Inputs and outputs", "Sensors", "Decisions and automation", "Making devices talk", "Cloud and dashboards", "Design a smart system", "Capstone and showcase"],
    checkpointWeeks: [4],
    levels: [
      { n: 1, name: "Basic", title: "Smart Starter", weeks: [1, 4], status: "live", blurb: "Inputs, outputs, sensors and automation rules.", project: "Checkpoint smart device" },
      { n: 2, name: "Intermediate", title: "Smart Builder", weeks: [5, 8], status: "live", blurb: "Connect devices, dashboards and a full smart system.", project: "Smart system for a real place" },
      { n: 3, name: "Advanced", title: "Hardware Lab", weeks: [9, 14], status: "soon", blurb: "Proposed: real micro:bit or ESP32 builds.", project: "To be designed" },
    ],
  },
  {
    id: "robotics", title: "Robotics Basics", short: "Robotics", Icon: Bot, accent: "#ff6a12",
    weeks: 10, hours: 40, entryAge: "Ages 8+", bands: ["7-9", "10-12", "13-16"], interests: ["robots", "making", "games"],
    summary: "A robot senses, decides and acts. Program virtual robots for motion, sensors, line following and missions, and design real-world robots.",
    about: "From first movements to mission strategy, children program virtual robots in a browser, then build mechanisms from household materials and design a robot that solves a real problem.",
    bigIdea: "A robot senses, decides and acts. Good robots come from good decisions, not just good motors.",
    outcomes: ["Explain a robot as Sense, Decide, Act", "Program precise motion and turns", "Use touch, distance, light and colour sensors", "Build obstacle avoidance and line following", "Debug by changing one thing at a time", "Plan a mission strategy under the rules"],
    capstone: "An autonomous robot that completes a mission course, plus a design portfolio for a real-world robot idea.", tools: "Open Roberta Lab, Webots (13+)",
    note: "No hardware needed. Mechanisms use household materials.",
    tracks: { junior: "Open Roberta blocks with simple missions.", middle: "Open Roberta with mission scoring.", senior: "Webots 3D with Python controllers and proportional control." },
    weekTitles: ["What is a robot?", "Moving", "Sensors I", "Sensors II", "Line following", "Smarter control", "Mechanisms", "Missions and strategy", "Robots for real problems", "Capstone challenge day"],
    checkpointWeeks: [4],
    levels: [
      { n: 1, name: "Basic", title: "Robot Rookie", weeks: [1, 5], status: "live", blurb: "Motion, sensors and line following.", project: "Checkpoint robot challenge" },
      { n: 2, name: "Intermediate", title: "Robot Engineer", weeks: [6, 10], status: "live", blurb: "Smart control, mechanisms, missions and a capstone.", project: "Autonomous mission robot" },
      { n: 3, name: "Advanced", title: "Robot Champion", weeks: [11, 16], status: "soon", blurb: "Proposed: Python control and competition preparation.", project: "To be designed" },
    ],
  },
];

/*
 * FEES AND DATES: fill these in when they are decided. Anything left empty shows a friendly default.
 * Example:  scratch: { fee: "₹6,000 per level", nextBatch: "5 January 2027", seats: "12 seats left" },
 */
export const kidsSchedule: Record<string, { fee?: string; nextBatch?: string; seats?: string }> = {
  scratch: {},
  electricity: {},
  python: {},
  prompt: {},
  iot: {},
  robotics: {},
};

export const feeText = (id: string) => kidsSchedule[id]?.fee || "Contact us for fees";
export const batchText = (id: string) => kidsSchedule[id]?.nextBatch || "Dates coming soon";

export const findCourse =(id: string) => kidsCourses.find((course) => course.id === id);
