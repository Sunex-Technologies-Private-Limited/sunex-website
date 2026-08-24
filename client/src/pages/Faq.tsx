import React from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import { Reveal } from "@/components/sunex/Reveal";

const faqGroups = [
  {
    label: "UrbanTree",
    href: "/contact?interest=urbantree",
    prompt: "Discuss UrbanTree",
    questions: [
      { question: "What is UrbanTree?", answer: "UrbanTree is SunEx’s advanced bio-mechanical air purification infrastructure, designed to explore healthier localized air environments in urban settings." },
      { question: "What should an organization share before an UrbanTree conversation?", answer: "The intended location, the type of space, the challenge you are trying to address, and the people or activities the project should support are useful starting points." },
    ],
  },
  {
    label: "SkillConnect",
    href: "/contact?interest=education",
    prompt: "Discuss learning options",
    questions: [
      { question: "Which courses are available through SkillConnect?", answer: "SkillConnect presents individual technology offerings across AI, automation, energy systems, connected systems, cybersecurity, cloud computing, and applied engineering." },
      { question: "Where can I confirm course duration, eligibility, and fees?", answer: "The learning team can share current availability, delivery details, eligibility, and approved fee information for the course you want to explore." },
    ],
  },
  {
    label: "SunEx Healthcare",
    href: "/contact?interest=healthcare",
    prompt: "Discuss a care pathway",
    questions: [
      { question: "What does SunEx Healthcare currently support?", answer: "SunEx Healthcare is developing a clearer medical-tourism journey for international patients, centred on planning, coordination, transition preparation, and continued visibility." },
      { question: "Does this website provide medical advice?", answer: "No. The website supports a care-planning conversation and does not replace advice from qualified medical professionals or healthcare providers." },
    ],
  },
  {
    label: "General enquiries",
    href: "/contact?interest=partnership",
    prompt: "Start a conversation",
    questions: [
      { question: "How do I contact the right SunEx team?", answer: "Use the guided enquiry form and choose UrbanTree, SkillConnect, Healthcare, Partnership, CSR, or another focus. This gives the team the context needed to route your conversation." },
      { question: "How quickly will SunEx respond?", answer: "The current contact page states a response target of within 24 hours. Response timing may vary for specialised or information-dependent enquiries." },
    ],
  },
] as const;

export default function Faq() {
  return <>
    <section className="section faq-hero"><div className="content-wrap"><Reveal><p className="eyebrow">Decision support</p><h1>Answers for the<br /><em>next good question.</em></h1><p>Browse practical starting points for UrbanTree, SkillConnect, SunEx Healthcare, and working with the SunEx team. If the answer you need is not here, start a guided enquiry.</p></Reveal></div></section>
    <section className="section section--mist faq-section"><div className="content-wrap"><div className="faq-section__intro"><div><p className="eyebrow">Browse by topic</p><h2 className="display">Find the context.<br /><em>Choose the conversation.</em></h2></div><p className="copy">Each topic keeps the next action close to the question, so you can move from an answer to the right SunEx team without losing your place.</p></div><div className="faq-groups">{faqGroups.map((group, index) => <Reveal className="faq-group" delay={index * .05} key={group.label}><div className="faq-group__heading"><span>{String(index + 1).padStart(2, "0")}</span><div><p>{group.label}</p><h3>{group.prompt}</h3></div><Link href={group.href}>Talk to the team <ArrowUpRight size={15} /></Link></div><div className="faq-group__items">{group.questions.map((item) => <details key={item.question}><summary>{item.question}<ChevronDown size={18} /></summary><p>{item.answer}</p></details>)}</div></Reveal>)}</div><Reveal className="faq-escalation"><div><p className="eyebrow">Still need help?</p><h3>Bring us the context<br /><em>that matters most.</em></h3></div><p>For a project, course, care-planning, partnership, or CSR conversation, the guided enquiry form will direct your message to the most relevant focus.</p><Link href="/contact" className="action-pill">Start a guided enquiry <span><ArrowUpRight size={16} /></span></Link></Reveal></div></section>
  </>;
}
