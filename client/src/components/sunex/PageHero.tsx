import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { Reveal } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  action,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  image: string;
  action?: { label: string; href: string };
}) {
  return (
    <section className="page-hero content-wrap">
      <div className="page-hero__frame">
        <img src={image} alt="" />
        <div className="page-hero__veil" />
        <div className="page-hero__content">
          <Reveal><p className="eyebrow">{eyebrow}</p></Reveal>
          <Reveal delay={0.08}><h1>{title}</h1></Reveal>
          {description && <Reveal delay={0.18}><p className="page-hero__description">{description}</p></Reveal>}
          {action && <Reveal delay={0.25}><Link href={action.href} className="action-pill">{action.label}<span><ArrowUpRight className="sunex-action-glyph" size={16} /></span></Link></Reveal>}
        </div>
      </div>
    </section>
  );
}
