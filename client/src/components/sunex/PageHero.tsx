import { ArrowUpRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import { Reveal } from "./Reveal";

const PAGE_HERO_SLIDE_DURATION = 5800;

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  backgroundImages,
  action,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  image: string;
  backgroundImages?: readonly string[];
  action?: { label: string; href: string };
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const images = backgroundImages && backgroundImages.length > 0 ? backgroundImages : [image];

  useEffect(() => {
    setActiveImageIndex(0);
    if (reducedMotion || images.length < 2) return;

    const timer = window.setInterval(() => setActiveImageIndex((current) => (current + 1) % images.length), PAGE_HERO_SLIDE_DURATION);
    return () => window.clearInterval(timer);
  }, [images, reducedMotion]);

  return (
    <section className="page-hero content-wrap">
      <div className="page-hero__frame">
        {images.map((backgroundImage, index) => <img className={index === activeImageIndex ? "is-active" : ""} src={backgroundImage} alt="" aria-hidden={index !== activeImageIndex} fetchPriority={index === 0 ? "high" : "auto"} key={backgroundImage} />)}
        <div className="page-hero__veil" />
        <div className="page-hero__content">
          <Reveal><p className="eyebrow">{eyebrow}</p></Reveal>
          <Reveal delay={0.08}><h1>{title}</h1></Reveal>
          {description && <Reveal delay={0.18}><p className="page-hero__description">{description}</p></Reveal>}
          {action && <Reveal delay={0.25}><Link href={action.href} className="rivr-pill">{action.label}<span><ArrowUpRight className="sunex-action-glyph" size={16} /></span></Link></Reveal>}
        </div>
      </div>
    </section>
  );
}
