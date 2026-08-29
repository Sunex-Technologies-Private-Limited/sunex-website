import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";

const testimonials = [
  ["Dr. Ranganath H B", "Owner", "HSR Digital Hub, Mysuru", "SunEx Technologies helped us develop our website and strengthen our digital presence through SEO and social media marketing. Their team was professional, responsive and understood our requirements well. We are happy with the results and their support."],
  ["Dr. Manjunath H M", "Faculty", "BIET, Davanagere", "Working with SunEx Technologies on the data analysis component of a rural electrification project was a valuable experience. The team demonstrated a practical approach to understanding project requirements and working with data to support meaningful outcomes. I appreciate their professional and collaborative approach."],
  ["Dr. Raghvendraprasad Deshpande", "Faculty", "GSSSIETW, Mysuru", "What I appreciate about SkillConnect is the enthusiasm to take on challenging societal problems. Mentoring such a motivated team has been a rewarding experience, with opportunities to share ideas, learn from each other and grow together."],
  ["Divyashree M S", "Administrative Executive", "HSR Coaching Centre, Mysuru", "SunEx Technologies helped us develop a professional website and automate our weekly tests, making our assessment process much easier. Their team understood our needs well and delivered a practical solution with excellent support."],
  ["Rakshith", "Student", "SJBIT, Bengaluru", "My experience with SkillConnect by SunEx Technologies gave me valuable practical exposure to DevOps and related technologies. The hands-on learning and guidance helped me better understand real-world applications and build confidence in my technical skills."],
  ["Deepak N", "Student", "Malnad College of Engineering, Hassan", "My experience with SkillConnect by SunEx Technologies was a great learning experience. The practical training in software testing and test automation using Java and Selenium helped me understand industry practices better and improve my technical confidence."],
  ["Omkar Chaithanya R", "CSE B.Tech", "Dayananda Sagar University", "My experience with SkillConnect by SunEx Technologies gave me practical exposure beyond academics. I improved my skills in Python, website development and cybersecurity, while learning how they are applied in real-world projects. The guidance and hands-on learning helped me build confidence and strengthen my technical skills."],
  ["Sushma B S", "Student", "SJBIT, Bengaluru", "SkillConnect by SunEx Technologies helped me gain a clearer understanding of DevOps practices and modern development tools. The training was engaging and easy to follow, and it gave me a better perspective on how DevOps is used in professional software environments."],
  ["Padmanabha N", "3rd Year BVA", "The College of Fine Arts, Chitrakala Parishat, Bengaluru", "My experience with SkillConnect by SunEx Technologies gave me great practical exposure and helped me improve my skills in design and composition, animation and applied art. I also learned how creativity and technology can come together to create meaningful work. The experience really helped me grow in confidence and creativity."],
  ["Keerthana K M", "Student", "PES College, Mandya", "My experience with SkillConnect by SunEx Technologies helped me understand IoT concepts and their practical applications. The training was informative and gave me a better understanding of how connected technologies can be used to build real-world solutions."],
  ["Ashwini V", "Student", "RNSIT, Bengaluru", "The training with SkillConnect by SunEx Technologies helped me better understand power system data analytics, load flow analysis and SciLab. The practical sessions made complex concepts easier to understand and gave me a better idea of their application in real engineering problems."],
] as const;

export function Testimonials() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const testimonial = testimonials[testimonialIndex] ?? testimonials[0];

  return (
    <section className="section sunex-testimonials-section" aria-labelledby="testimonials-title">
      <div className="content-wrap">
        <Reveal className="sunex-testimonials-heading">
          <div>
            <p className="eyebrow">Testimonials</p>
            <h2 id="testimonials-title">Built through<br /><em>real experience.</em></h2>
          </div>
          <p>The strongest measure of our work is the experience of the people and organisations we work with.</p>
        </Reveal>

        <Reveal className="sunex-testimonial-showcase" aria-roledescription="carousel" aria-label="Approved SunEx testimonials">
          {testimonial && (
            <motion.article 
              key={testimonial[0]} 
              className="sunex-testimonial" 
              role="group" 
              aria-roledescription="slide" 
              aria-label={`Testimonial ${testimonialIndex + 1} of ${testimonials.length}`} 
              initial={reducedMotion ? false : { opacity: 0, y: 15, scale: .985 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              transition={{ duration: reducedMotion ? 0 : .45, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="sunex-testimonial__quote-area">
                <div className="sunex-testimonial__quote-row">
                  <span className="sunex-testimonial__quote" aria-hidden="true">“</span>
                  <span className="sunex-testimonial__slide-count">
                    {String(testimonialIndex + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
                  </span>
                </div>
                <blockquote>{testimonial[3]}</blockquote>
              </div>
              
              <div className="sunex-testimonial__attribution">
                <div>
                  <span className="sunex-testimonial__kicker">SunEx testimonial</span>
                  <strong>{testimonial[0]}</strong>
                  <p><span>{testimonial[1]}</span><i aria-hidden="true">•</i><span>{testimonial[2]}</span></p>
                </div>
              </div>
            </motion.article>
          )}

          <div className="sunex-testimonial-showcase__controls" aria-label="Testimonial selection">
            {testimonials.map(([name], index) => (
              <button 
                key={name} 
                type="button" 
                className={index === testimonialIndex ? "is-active" : ""} 
                onClick={() => setTestimonialIndex(index)} 
                aria-label={`Show testimonial from ${name}`} 
                aria-current={index === testimonialIndex ? "true" : undefined}
              ></button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
