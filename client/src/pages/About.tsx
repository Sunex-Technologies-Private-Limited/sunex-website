import { ArrowUpRight, Compass as Sparkles, Globe2, CheckCircle2 } from "lucide-react";
import React from "react";
import { Link } from "wouter";
import { BentoCard } from "@/components/sunex/BentoCard";
import { PageHero } from "@/components/sunex/PageHero";
import { Reveal } from "@/components/sunex/Reveal";
import "./About.css";

const team = [
  { name: "Sanjeeth Suresh", badge: "Founder", role: "Co-Founder", image: "/manus-storage/sanjeeth_420f591e.jpg", portraitClass: "team-card--sanjeeth", description: "Visionary leader responsible for defining the company’s direction, identifying new opportunities, and transforming ideas into successful business initiatives. Leads strategic planning and organizational growth." },
  { name: "Umesh H", badge: "Founder", role: "Co-Founder | Innovator | Product Visionary", image: "/manus-storage/umesh_1435ca88.jpg", portraitClass: "team-card--umesh", description: "Focused on envisioning what comes next and bringing it to life through strategic thinking, design excellence, and technological innovation. Committed to creating solutions that leave a lasting impact on people, communities, and the future." },
  { name: "Dr. Raghavendra Deshpande", badge: "Mentor", role: "Mentor", image: "/manus-storage/raghavendra_c05f2baa.jpg", portraitClass: "team-card--raghavendra", description: "Scientific lead and domain expert guiding the engineering design, research frameworks, and bio-mechanical innovation at the core of UrbanTree." },
];

export default function About() {
  return <>
    <PageHero eyebrow="01 / About SunEx" title={<>Innovation <em>with purpose.</em></>} image="/images/about-values-studio.jpg" description="SunEx Technologies develops sustainable environmental solutions, future-ready talent, and healthcare access with real-world impact." action={{ label: "Explore our work", href: "/product" }} />

    <section className="section content-wrap editorial" style={{ paddingTop: '60px' }}>
      <Reveal>
        <p className="eyebrow">Who we are</p>
        <h2 className="display">Innovation with<br /><em>Purpose.</em></h2>
      </Reveal>
      <Reveal delay={0.1} className="editorial__copy">
        <p className="copy copy--overview-primary">
          SunEx Technologies Pvt. Ltd. is an innovation-driven company committed to solving real-world challenges through technology and strategic partnerships.
        </p>
        <p className="copy copy--small">
          Our focus lies in creating sustainable environmental solutions, developing future-ready talent through education, and enabling world-class healthcare access for international patients.
        </p>
        <div style={{ padding: '10px 0' }}>
          <p className="copy copy--small" style={{ marginBottom: '20px' }}>
            Every solution we build is guided by three principles:
          </p>
          <ul style={{ display: 'grid', gap: '16px', margin: '0', padding: '0', listStyle: 'none' }}>
            {['Innovation', 'Sustainability', 'Social Impact'].map((item) => (
              <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '17px', fontWeight: 600, color: 'var(--foreground)', letterSpacing: '-0.02em' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(255,106,18,0.12)', color: 'var(--sunex-orange)' }}>
                  <CheckCircle2 size={18} strokeWidth={2.5} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="copy copy--small">
          We believe technology should not only improve businesses but also improve lives.
        </p>
      </Reveal>
    </section>
    <section className="section section--mist"><div className="content-wrap"><div className="split-heading"><div><p className="eyebrow">Leadership</p><h2 className="display">Leaders who innovate.<br /><em>Leaders who transform.</em></h2></div><p className="copy">Each leader brings deep domain expertise and a proven track record.</p></div><div className="team-grid">{team.map((leader, index) => <Reveal className={`team-card ${leader.portraitClass}`} delay={index * .08} key={leader.name}><div className="team-card__media"><img src={leader.image} alt={leader.name} /></div><div className="team-card__body"><span>{leader.badge}</span><h3>{leader.name}</h3><p><strong>{leader.role}</strong><br />{leader.description}</p></div></Reveal>)}</div></div></section>

    <section className="section content-wrap"><Reveal className="large-cta"><p className="eyebrow">Work with SunEx</p><h2>Partner with us to build <em>what matters.</em></h2><p>Explore the products and capabilities designed to create more sustainable, skilled, and connected communities.</p><Link href="/contact" className="rivr-pill">Get in touch <span><ArrowUpRight size={16} /></span></Link></Reveal></section>
  </>;
}
