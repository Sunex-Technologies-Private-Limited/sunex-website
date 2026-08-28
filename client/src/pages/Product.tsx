import { Activity, AirVent, ArrowUpRight, CircleGauge, Compass, Filter, Leaf, MapPin, ShieldCheck, Sun, Wind, Workflow } from "lucide-react";
import { Link } from "wouter";
import React from "react";
import { PageHero } from "@/components/sunex/PageHero";
import { Reveal } from "@/components/sunex/Reveal";

const features = [
  [Wind, "Air Pocket Zones", "Clean air focused where people breathe."],
  [Leaf, "Bio + Mechanical", "Dual purification for a deeper clean."],
  [Activity, "Live Adaptation", "Analytics tune performance in real time."],
  [MapPin, "City-Ready Scale", "Modular design that grows with demand."],
  [Workflow, "Greener Cities", "Infrastructure built for cleaner air."],
] as const;



export default function Product() {


  return (
    <>
      <PageHero eyebrow="02 / Product" title={<>Urban<em>Tree.</em></>} image="/manus-storage/urbantree-city-clean_b9b26676.png" description="The City. Reimagined. Advanced bio-mechanical air purification infrastructure for healthier urban environments." action={{ label: "Talk to UrbanTree", href: "/contact" }} />

      <section className="section section--mist" id="urbantree">
        <div className="content-wrap page-copy-grid product-system">
          <Reveal><div><p className="eyebrow">UrbanTree system</p><h2 className="display">An advanced bio-mechanical air purification ecosystem <em>for the city.</em></h2><p className="copy">UrbanTree combines nature-powered purification with advanced engineering to create healthier environments through localized breathable Air Pocket zones.</p><p className="copy copy--small">Powered by smart environmental analytics and energy-efficient infrastructure, it continuously monitors conditions, adapts in real time, and optimizes purification performance to improve AQI where people actually breathe.</p></div></Reveal>
          <Reveal delay={0.12} className="image-panel image-panel--urbantree product-system__media"><img src="/manus-storage/urbantree-city-clean_b9b26676.png" alt="SunEx UrbanTree city deployment" /><div className="image-panel__float image-panel__float--product"><small>System status</small><strong>Live & deployed<br />Bio + Mechanical Hybrid</strong></div></Reveal>
        </div>
      </section>

      <section className="section content-wrap"><div className="feature-list">{features.map(([Icon, title, description], index) => <Reveal className="feature-card" delay={index * 0.05} key={title}><Icon size={22} /><h3>{title}</h3><p>{description}</p></Reveal>)}</div></section>



      <section className="section urban-vision-section">
        <div className="content-wrap">
          <Reveal className="urban-vision-hero"><div className="urban-vision-hero__copy"><div className="urban-vision-hero__label"><span><Compass size={15} /></span><p>UrbanTree city vision</p></div><p className="eyebrow">Vision & mission / Viksit Bharat 2047</p><h2>Healthier city air,<br /><em>where life happens.</em></h2><p>UrbanTree brings sustainable biological systems and real-time environmental intelligence together to make the urban places people share more breathable, resilient, and future-ready.</p><p className="urban-vision-hero__detail">Our mission is to deploy advanced bio-mechanical engineering across dense city ecosystems—creating scalable clean-air pockets that support public health where people walk, wait, learn, work, and gather.</p><div className="urban-vision-hero__signals"><span><Wind size={15} /> Breathe locally</span><span><Activity size={15} /> Adapt continuously</span><span><Leaf size={15} /> Grow sustainably</span></div><Link href="/contact" className="rivr-pill">Build a city partnership <span><ArrowUpRight size={16} /></span></Link></div><div className="urban-vision-hero__media urban-vision-hero__media--device-portrait"><img src="/manus-storage/urbantree-device-solar-biofilter_08fc3e0d.png" alt="Supplied UrbanTree solar biofilter device in a city setting" /><div className="urban-vision-hero__veil" /><div className="urban-vision-hero__index"><span>02</span><i /> <small>Vision in practice</small></div><div className="urban-vision-hero__pulse"><span className="status-dot" /><div><small>UrbanTree impact</small><strong>Cleaner air, closer to people.</strong></div></div></div></Reveal>
          <div className="urban-vision-principles">{[[Wind, "01", "Air where it matters", "Localized clean-air pockets centered on the everyday spaces people use."], [Activity, "02", "Intelligence that responds", "Real-time environmental insights that guide performance as conditions change."], [Leaf, "03", "Systems that belong", "Biological balance and engineering precision designed for the long-term city."], [MapPin, "04", "Scale with the city", "Modular infrastructure built to move from one meaningful place to many."]].map(([Icon, number, title, description], index) => { const VisionIcon = Icon as typeof Wind; return <Reveal className="urban-vision-principle" delay={index * 0.05} key={title as string}><div><span>{number as string}</span><VisionIcon size={21} /></div><h3>{title as string}</h3><p>{description as string}</p></Reveal>; })}</div>
        </div>
      </section>

      <section className="section content-wrap"><Reveal className="large-cta"><p className="eyebrow">Explore UrbanTree</p><h2>Bring a cleaner air pocket <em>where people need it.</em></h2><p>Discuss an UrbanTree solution for your city, industry, school, hospital, or public space.</p><Link href="/contact" className="rivr-pill">Start a conversation <span><ArrowUpRight size={16} /></span></Link></Reveal></section>
    </>
  );
}
