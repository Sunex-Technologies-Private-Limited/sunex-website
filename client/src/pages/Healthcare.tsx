import { Link } from "wouter";
import React, { useState } from "react";
import { ArrowRight, ArrowUpRight, FileCheck2, HeartPulse, Plane, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/sunex/PageHero";
import { Reveal } from "@/components/sunex/Reveal";

const careJourney = [
  { number: "01", title: "Share your care needs", text: "Start with the treatment context, location, and patient-support requirements that matter to you.", image: "/manus-storage/healthcare-share-needs_d2337c04.jpg", alt: "Patient discussing care needs with a healthcare professional" },
  { number: "02", title: "Shape the care pathway", text: "Explore the information and coordination requirements for a cross-border healthcare journey.", image: "/manus-storage/healthcare-pathway-coordination_3510ae49.png", alt: "Care team coordinating a patient pathway" },
  { number: "03", title: "Prepare the transition", text: "Plan the practical steps around travel, documentation, and patient support in a clear sequence.", image: "/manus-storage/healthcare-transition-support_7ed4217d.jpg", alt: "Healthcare travel support during a patient transition" },
  { number: "04", title: "Stay connected", text: "Create visibility across the journey from arrival through the next stage of care planning.", image: "/manus-storage/healthcare-stay-connected_38432972.png", alt: "Healthcare professional providing continuing digital support" },
];

export default function Healthcare() {
  const [activeCareStep, setActiveCareStep] = useState(0);
  const selectedCareStep = careJourney[activeCareStep];
  const supportPillars = [
    { Icon: HeartPulse, title: "Care context", text: "Bring treatment needs, timing, and support priorities into one clear starting point." },
    { Icon: FileCheck2, title: "Journey preparation", text: "Organize practical travel, documentation, and communication steps in sequence." },
    { Icon: Plane, title: "Transition support", text: "Plan for arrival and patient-support touchpoints across the cross-border journey." },
    { Icon: ShieldCheck, title: "Clear visibility", text: "Maintain a clearer view of the journey from initial planning through the next stage." },
  ];

  return <>
    <PageHero eyebrow="04 / SunEx Healthcare" title={<>Care planning<br /><em>without borders.</em></>} image="/manus-storage/healthcare_60e8d462.png" description="SunEx Healthcare is developing a clearer medical-tourism journey for international patients seeking high-quality, affordable healthcare in India." action={{ label: "Discuss your pathway", href: "/contact?interest=healthcare" }} />

    <section className="section healthcare-journey-section"><div className="content-wrap"><Reveal className="healthcare-journey"><div className="healthcare-journey__copy"><p className="eyebrow">Healthcare / Coming soon</p><h2>Care planning<br /><em>without borders.</em></h2><p>SunEx Healthcare is developing a clearer medical-tourism journey for international patients seeking high-quality, affordable healthcare in India.</p><span className="tag">Coming soon — Under development</span><div className="healthcare-journey__steps">{careJourney.map((step, index) => <button type="button" className={activeCareStep === index ? "is-active" : ""} key={step.number} onClick={() => setActiveCareStep(index)} aria-pressed={activeCareStep === index}><span>{step.number}</span><strong>{step.title}</strong><ArrowRight size={15} /></button>)}</div></div><div className="healthcare-journey__stage"><img className="healthcare-journey__image" key={selectedCareStep.number} src={selectedCareStep.image} alt={selectedCareStep.alt} /><div className="healthcare-journey__veil" /><div className="healthcare-journey__detail" aria-live="polite"><span>{selectedCareStep.number}</span><small>Journey moment</small><h3>{selectedCareStep.title}</h3><p>{selectedCareStep.text}</p><Link href="/contact?interest=healthcare">Discuss your pathway <ArrowUpRight size={15} /></Link></div></div></Reveal></div></section>

    <section className="section section--mist"><div className="content-wrap"><Reveal className="split-heading"><div><p className="eyebrow">A considered support layer</p><h2 className="display">A clearer care journey,<br /><em>one step at a time.</em></h2></div><p className="copy">The experience is designed around the practical moments that shape cross-border care planning: care context, preparation, transition, and continued visibility.</p></Reveal><div className="service-grid">{supportPillars.map(({ Icon, title, text }, index) => <Reveal className="service-card" delay={index * .06} key={title}><Icon size={29} /><h3>{title}</h3><p>{text}</p></Reveal>)}</div></div></section>

    <section className="section content-wrap"><Reveal className="large-cta"><p className="eyebrow">SunEx Healthcare</p><h2>Start a care conversation<br /><em>with more clarity.</em></h2><p>Share the treatment context and support priorities that matter to you. Our guided enquiry will direct the conversation to the right next step.</p><Link href="/contact?interest=healthcare" className="rivr-pill">Discuss your pathway <span><HeartPulse size={16} /></span></Link></Reveal></section>
  </>;
}
