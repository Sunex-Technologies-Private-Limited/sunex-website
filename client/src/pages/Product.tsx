import { Activity, AirVent, ArrowUpRight, CircleGauge, Compass, Filter, Leaf, MapPin, ShieldCheck, Sun, Wind, Workflow } from "lucide-react";
import { Link } from "wouter";
import React, { useState } from "react";
import { PageHero } from "@/components/sunex/PageHero";
import { Reveal } from "@/components/sunex/Reveal";

const features = [
  [Wind, "Air Pocket Zones", "Clean air focused where people breathe."],
  [Leaf, "Bio + Mechanical", "Dual purification for a deeper clean."],
  [Activity, "Live Adaptation", "Analytics tune performance in real time."],
  [MapPin, "City-Ready Scale", "Modular design that grows with demand."],
  [Workflow, "Greener Cities", "Infrastructure built for cleaner air."],
] as const;

const stages = [
  { title: "Atmospheric Intake", label: "Capture", description: "Smart directional airflow channels collect polluted air efficiently from the surrounding urban environment.", note: "Directional intake flow", Icon: Wind },
  { title: "Mechanical Filtration", label: "Separate", description: "Captures heavy dust particles using patented centrifugal funnel dust collection technology for maximum separation.", note: "Centrifugal dust collection", Icon: CircleGauge },
  { title: "Prefilter Layer", label: "Screen", description: "Traps large airborne particles such as dust, lint, pet hair and dander before they reach the main filter stages.", note: "Large-particle screen", Icon: Filter },
  { title: "Carbon Filter", label: "Absorb", description: "Removes VOCs, odors, fumes, moisture and gaseous pollutants through advanced activated carbon adsorption.", note: "Activated carbon adsorption", Icon: AirVent },
  { title: "HEPA Filter", label: "Refine", description: "Primary defence against airborne contaminants, designed to trap 99.97% of particles as small as 0.3 micron.", note: "Fine-particle defence", Icon: ShieldCheck },
  { title: "Bio-Purification Core", label: "Regenerate", description: "Living moss chamber that kills airborne pollutants and improves air quality through natural biological absorption.", note: "Living moss absorption", Icon: Leaf },
  { title: "UV Chamber", label: "Protect", description: "Powerful disinfectant that inactivates and kills airborne microorganisms like bacteria, mold spores, and viruses.", note: "Final UV disinfection", Icon: Sun },
] as const;

export default function Product() {
  const [activeStage, setActiveStage] = useState(0);

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

      <section className="section section--mist purification-section">
        <div className="content-wrap">
          <Reveal className="purification-heading"><div><p className="eyebrow">7-stage purification stack</p><h2 className="display">One intelligent air journey.<br /><em>Seven layers of defence.</em></h2></div><p className="copy">Select a treatment stage to follow the path through capture, separation, filtration, absorption, and biological protection.</p></Reveal>
          <div className="purification-experience">
            <Reveal className="urban-airfield" delay={0.08}>
              <div className="urban-airfield__topbar"><div><span className="status-dot" /> Interactive treatment field</div><span>Seven live layers</span></div>
              <div className="urban-airfield__stage-map">
                <div className="urban-airfield__device-stage" aria-live="polite">
                  <div className="urban-airfield__device-halo" />
                  <div className="urban-airfield__device-frame">
                    <img src="/manus-storage/urbantree-single-device_d3285164.png" alt="SunEx UrbanTree device" />
                  </div>
                </div>
                {stages.map((stage, index) => {
                  const StageIcon = stage.Icon;
                  const isActive = activeStage === index;
                  return (
                    <button type="button" className={`urban-airfield__node ${isActive ? "is-active" : ""}`} key={stage.title} onClick={() => setActiveStage(index)} aria-label={`View ${stage.title}`} aria-pressed={isActive}>
                      <span className="urban-airfield__node-icon"><StageIcon size={18} /></span><span className="urban-airfield__node-copy"><small>{String(index + 1).padStart(2, "0")} · {stage.label}</small><strong>{stage.title}</strong></span>
                    </button>
                  );
                })}
              </div>
              <div className="urban-airfield__flowline"><span>City atmosphere</span><i /><span>Refined local air</span></div>
            </Reveal>

            <div className="purification-stack">
              {stages.map((stage, index) => {
                const StageIcon = stage.Icon;
                const isActive = activeStage === index;
                return (
                  <Reveal className="purification-stage-wrap" delay={(index % 3) * 0.05} key={stage.title}>
                    <button type="button" className={`purification-stage ${isActive ? "is-active" : ""}`} onClick={() => setActiveStage(index)} aria-pressed={isActive}>
                      <div className="purification-stage__index">{String(index + 1).padStart(2, "0")}</div>
                      <div className="purification-stage__icon"><StageIcon size={21} /></div>
                      <div className="purification-stage__copy"><span>{stage.label}</span><h3>{stage.title}</h3><p>{stage.description}</p></div>
                      <div className="purification-stage__note">{stage.note}</div>
                    </button>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section urban-vision-section">
        <div className="content-wrap">
          <Reveal className="urban-vision-hero"><div className="urban-vision-hero__copy"><div className="urban-vision-hero__label"><span><Compass size={15} /></span><p>UrbanTree city vision</p></div><p className="eyebrow">Vision & mission / Viksit Bharat 2047</p><h2>Healthier city air,<br /><em>where life happens.</em></h2><p>UrbanTree brings sustainable biological systems and real-time environmental intelligence together to make the urban places people share more breathable, resilient, and future-ready.</p><p className="urban-vision-hero__detail">Our mission is to deploy advanced bio-mechanical engineering across dense city ecosystems—creating scalable clean-air pockets that support public health where people walk, wait, learn, work, and gather.</p><div className="urban-vision-hero__signals"><span><Wind size={15} /> Breathe locally</span><span><Activity size={15} /> Adapt continuously</span><span><Leaf size={15} /> Grow sustainably</span></div><Link href="/contact" className="action-pill">Build a city partnership <span><ArrowUpRight size={16} /></span></Link></div><div className="urban-vision-hero__media urban-vision-hero__media--device-portrait"><img src="/manus-storage/urbantree-device-solar-biofilter_08fc3e0d.png" alt="Supplied UrbanTree solar biofilter device in a city setting" /><div className="urban-vision-hero__veil" /><div className="urban-vision-hero__index"><span>02</span><i /> <small>Vision in practice</small></div><div className="urban-vision-hero__pulse"><span className="status-dot" /><div><small>UrbanTree impact</small><strong>Cleaner air, closer to people.</strong></div></div></div></Reveal>
          <div className="urban-vision-principles">{[[Wind, "01", "Air where it matters", "Localized clean-air pockets centered on the everyday spaces people use."], [Activity, "02", "Intelligence that responds", "Real-time environmental insights that guide performance as conditions change."], [Leaf, "03", "Systems that belong", "Biological balance and engineering precision designed for the long-term city."], [MapPin, "04", "Scale with the city", "Modular infrastructure built to move from one meaningful place to many."]].map(([Icon, number, title, description], index) => { const VisionIcon = Icon as typeof Wind; return <Reveal className="urban-vision-principle" delay={index * 0.05} key={title as string}><div><span>{number as string}</span><VisionIcon size={21} /></div><h3>{title as string}</h3><p>{description as string}</p></Reveal>; })}</div>
        </div>
      </section>

      <section className="section content-wrap"><Reveal className="large-cta"><p className="eyebrow">Explore UrbanTree</p><h2>Bring a cleaner air pocket <em>where people need it.</em></h2><p>Discuss an UrbanTree solution for your city, industry, school, hospital, or public space.</p><Link href="/contact" className="action-pill">Start a conversation <span><ArrowUpRight size={16} /></span></Link></Reveal></section>
    </>
  );
}
