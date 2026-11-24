import React from "react";
import { PlayCircle, Quote, UserRound } from "lucide-react";
import { Reveal } from "@/components/sunex/Reveal";
import { kidsMentors, kidsProjects, kidsTestimonials } from "@/data/kidsProof";

/* Real student projects, parent reviews and mentor profiles. Each block renders only when kidsProof.ts has entries. */
export function KidsProof({ projects = kidsProjects, testimonials = kidsTestimonials, mentors = kidsMentors }) {
  if (!projects.length && !testimonials.length && !mentors.length) return null;
  return (
    <section className="section" aria-labelledby="kids-proof-title"><div className="content-wrap">
      <Reveal>
        <div className="kids-section-head kids-section-head--center">
          <p className="eyebrow">SEE THE RESULTS</p>
          <h2 id="kids-proof-title" className="display" style={{ margin: 0 }}>Made by Our <em>Students</em></h2>
        </div>
      </Reveal>
      {projects.length > 0 && (
        <div className="kids-builds">
          {projects.map((item) => (
            <a key={item.video} href={item.video} target="_blank" rel="noreferrer" className="kids-build">
              <span><PlayCircle size={30} strokeWidth={1.8} /></span><small>{item.course} · {item.child}</small><b>{item.title}</b>
            </a>
          ))}
        </div>
      )}
      {testimonials.length > 0 && (
        <div className="kids-builds" style={{ marginTop: 18 }}>
          {testimonials.map((item) => (
            <figure key={item.quote} className="kids-build" style={{ margin: 0 }}>
              <span><Quote size={26} strokeWidth={1.8} /></span><b>&ldquo;{item.quote}&rdquo;</b><small>{item.parent} · {item.course}</small>
            </figure>
          ))}
        </div>
      )}
      {mentors.length > 0 && (
        <div className="kids-builds" style={{ marginTop: 18 }}>
          {mentors.map((item) => (
            <div key={item.name} className="kids-build">
              {item.photo ? <img src={item.photo} alt={item.name} loading="lazy" style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover" }} /> : <span><UserRound size={28} /></span>}
              <b>{item.name}</b><small>{item.role}</small><p style={{ margin: 0, fontSize: 14 }}>{item.bio}</p>
            </div>
          ))}
        </div>
      )}
    </div></section>
  );
}
