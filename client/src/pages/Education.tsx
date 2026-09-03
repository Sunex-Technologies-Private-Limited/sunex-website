import { Link } from "wouter";
import React, { useState } from "react";
import { ArrowRight, ArrowUpRight, BookOpenCheck, BriefcaseBusiness, Building2, Compass, Cpu, GraduationCap, Lightbulb, MessagesSquare, Presentation, School, UserRound, Wrench, Clock, BarChart, BookOpen, UsersRound, Code, Target, ShieldCheck, TerminalSquare, Settings, Leaf, CheckCircle2, HeartPulse, Sparkles, BrainCircuit, Cloud, Server, Network } from "lucide-react";
import "./EducationFocus.css";
import "./EducationAudience.css";
import "./EducationMetrics.css";
import { Reveal } from "@/components/sunex/Reveal";
import { Testimonials } from "@/components/sunex/Testimonials";

const courseCatalog = [
  { title: "Responsible and Safe AI Systems", area: "AI & emerging technology", briefTitle: "Design and deployment considerations for modern AI", description: "Explore responsible design and deployment considerations for modern AI systems.", level: "Beginner", duration: "4 Weeks", format: "Online / Offline", image: "/images/course_safe_ai_1788432194154.jpg", lessons: "8" },
  { title: "Agentic AI Intern & generative AI", area: "AI & emerging technology", briefTitle: "Agent-led workflows for changing environments", description: "Explore agent-led and generative AI workflows for changing technology environments.", level: "Intermediate", duration: "5 Weeks", format: "Online / Offline", image: "/images/course_agentic_ai_1788432236466.jpg", lessons: "9" },
  { title: "LLM fine tuning", area: "AI & emerging technology", briefTitle: "Adapting large language models for focused use", description: "Explore approaches to adapting and refining large language models for focused use cases.", level: "Advanced", duration: "6 Weeks", format: "Online / Offline", image: "/images/course_llm_tuning_1788432278947.jpg", lessons: "10" },
  { title: "Quantum computing", area: "AI & emerging technology", briefTitle: "Foundational quantum-computing concepts", description: "Explore foundational quantum-computing concepts and their place in future technology work.", level: "Beginner", duration: "7 Weeks", format: "Online / Offline", image: "/images/course_quantum_1788432321434.jpg", lessons: "11" },
  { title: "AI for Electrical Power systems", area: "Energy systems", briefTitle: "AI applications in power systems", description: "Explore AI applications in electrical power systems and connected energy environments.", level: "Advanced", duration: "4 Weeks", format: "Online / Offline", image: "/images/course_power_systems_1788432358170.jpg", lessons: "12" },
  { title: "Industrial Programmable Logic Controllers", area: "Industrial automation", briefTitle: "Programmable control foundations", description: "Explore programmable control foundations for industrial systems and operations.", level: "Intermediate", duration: "5 Weeks", format: "Online / Offline", image: "/images/course_plc_1788432399650.jpg", lessons: "8" },
  { title: "Battery management systems", area: "Energy systems", briefTitle: "Battery monitoring and management", description: "Explore the systems thinking behind battery monitoring and management.", level: "Beginner", duration: "6 Weeks", format: "Online / Offline", image: "/images/course_battery_1788432437952.jpg", lessons: "9" },
  { title: "Industrial IOT", area: "Industrial automation", briefTitle: "Connected-device concepts for operations", description: "Explore connected-device concepts for industrial operations and data-aware systems.", level: "Intermediate", duration: "7 Weeks", format: "Online / Offline", image: "/images/course_iot_1788432480704.jpg", lessons: "10" },
  { title: "Cyber physical system Intern", area: "Connected systems", briefTitle: "Connection between software and physical processes", description: "Explore the connection between physical processes, sensing, software, and systems engineering.", level: "Advanced", duration: "4 Weeks", format: "Online / Offline", image: "/images/course_cyber_physical_1788432523724.jpg", lessons: "11" },
  { title: "Forward deployed engineering", area: "Applied engineering", briefTitle: "Engineering patterns for real operations", description: "Explore engineering patterns that take technical work into real operational environments.", level: "Beginner", duration: "5 Weeks", format: "Online / Offline", image: "/images/course_forward_deployed_1788432568636.jpg", lessons: "12" },
  { title: "Ethical Hacking & Cyber security", area: "Digital security", briefTitle: "Foundational cybersecurity concepts", description: "Explore foundational ethical-hacking and cybersecurity concepts for modern technology systems.", level: "Advanced", duration: "6 Weeks", format: "Online / Offline", image: "/images/course_cybersec_1788432611715.jpg", lessons: "8" },
  { title: "Cloud computing", area: "Digital platforms", briefTitle: "Core cloud-computing foundations", description: "Explore core cloud-computing foundations for scalable digital technology work.", level: "Intermediate", duration: "7 Weeks", format: "Online / Offline", image: "/images/course_cloud_1788432649210.jpg", lessons: "9" },
  { title: "Block chain", area: "Digital platforms", briefTitle: "Distributed-ledger concepts", description: "Explore distributed-ledger concepts and their role in connected digital systems.", level: "Beginner", duration: "4 Weeks", format: "Online / Offline", image: "/images/technology-digital-systems.jpg", lessons: "10" },
  { title: "Loop engineering, harness", area: "Applied engineering", briefTitle: "Practical foundations for structured systems", description: "Explore practical engineering foundations for structured electronic systems and harness work.", level: "Intermediate", duration: "5 Weeks", format: "Online / Offline", image: "/images/sunex_about_innovation_new.jpg", lessons: "11" },
];

const learningCategories = [
  { title: "AI & emerging technology", Icon: BrainCircuit, description: "Master artificial intelligence and emerging tech." },
  { title: "Energy systems", Icon: Lightbulb, description: "Explore sustainable power and electrical systems." },
  { title: "Industrial automation", Icon: Settings, description: "Learn programmable control and industrial operations." },
  { title: "Connected systems", Icon: Network, description: "Discover sensors, physical processes and data-aware systems." },
  { title: "Applied engineering", Icon: Wrench, description: "Build structured electronic systems for the real world." },
  { title: "Digital security", Icon: ShieldCheck, description: "Learn ethical hacking and digital security concepts." },
  { title: "Digital platforms", Icon: Cloud, description: "Explore scalable cloud and distributed-ledger networks." }
];

const successFeatures = [
  { title: "Expert Trainers", description: "Learn from experienced industry professionals who bring real-world knowledge to the classroom.", Icon: UsersRound },
  { title: "Practical Learning", description: "Hands-on projects and assignments designed to provide real-world experience and capability.", Icon: Code },
  { title: "Certification", description: "Industry-recognized completion certificates that validate your skills and knowledge.", Icon: GraduationCap },
  { title: "Placement Assistance", description: "Resume building, mock interviews, and dedicated job support to launch your career.", Icon: Target },
  { title: "Small Batch Sizes", description: "Personalized attention and an interactive learning environment for better understanding.", Icon: UserRound },
  { title: "Student Support", description: "Dedicated support and guidance at every step of your learning journey and beyond.", Icon: CheckCircle2 },
];

export default function Education() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(courseCatalog.map(c => c.area)))];
  const filteredCourses = activeCategory === "All" ? courseCatalog : courseCatalog.filter(c => c.area === activeCategory);

  return <>
    {/* Custom Hero Section matching the home-hero cinematic perception */}
    <section className="home-hero home-hero--controlled home-hero--cinematic content-wrap" style={{ marginBottom: '60px' }} aria-labelledby="education-title">
      <div className="home-hero__stage home-hero__stage--education" style={{ minHeight: '600px', borderRadius: '32px' }}>
        <div className="home-hero__reel is-active" aria-hidden="false">
          <img src="/images/sunex-home-learning-studio.jpg" alt="Students learning in a modern studio" />
        </div>
        <div className="home-hero__veil" />
        <div className="home-hero__content home-hero__content--controlled">
          <Reveal>
            <div className="hero-badge hero-badge--education" style={{ marginBottom: '24px' }}>
              <GraduationCap size={15} /> Education
            </div>
            <h1 id="education-title">
              Learn. Build.<br />
              <strong className="hero-title__accent hero-title__accent--education">Grow Your Future.</strong>
            </h1>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: 'clamp(16px, 1.5vw, 19px)', textShadow: '0 2px 20px rgba(4, 20, 35, .25)' }}>
              Industry-oriented training and practical learning that helps you build skills, confidence and a successful career.
            </p>
            
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '48px' }}>
              <Link href="/contact?interest=education" className="hero-primary-action" style={{ textDecoration: 'none' }}>
                Explore Courses <span><ArrowUpRight size={15} /></span>
              </Link>
              <Link href="/contact?interest=education" className="hero-primary-action" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: 'white', textDecoration: 'none' }}>
                Find Your Course
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', paddingRight: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(255, 255, 255, 0.05)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
                <div style={{ background: 'rgba(255, 106, 18, 0.15)', color: 'var(--sunex-orange)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <UsersRound size={24} />
                </div>
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'white', lineHeight: 1.3 }}>Industry Expert<br/>Trainers</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(255, 255, 255, 0.05)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
                <div style={{ background: 'rgba(255, 106, 18, 0.15)', color: 'var(--sunex-orange)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Code size={24} />
                </div>
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'white', lineHeight: 1.3 }}>Practical Learning<br/>Hands-on Projects</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(255, 255, 255, 0.05)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
                <div style={{ background: 'rgba(255, 106, 18, 0.15)', color: 'var(--sunex-orange)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Target size={24} />
                </div>
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'white', lineHeight: 1.3 }}>Placement<br/>Assistance</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    {/* Popular Courses Section */}
    <section className="section course-showcase-section"><div className="content-wrap">
      <Reveal>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <p className="eyebrow">POPULAR COURSES</p>
            <h2 className="display" style={{ margin: 0 }}>Explore Our Most<br /><em>In-Demand Courses</em></h2>
          </div>
          <Link href="/contact?interest=education" className="rivr-pill rivr-pill--outline" style={{ background: 'transparent' }}>
            View All Courses <span><ArrowRight size={16} /></span>
          </Link>
        </div>
      </Reveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
        {filteredCourses.map((course, index) => (
          <Reveal delay={(index % 3) * .05} key={course.title}>
            <div style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ position: 'relative', height: '200px' }}>
                <img src={course.image} alt={course.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '8px' }}>
                  <span style={{ background: 'rgba(255,255,255,0.9)', color: 'var(--foreground)', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>{course.duration}</span>
                </div>
              </div>
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 8px', color: 'var(--foreground)' }}>{course.title}</h3>
                <p style={{ margin: '0 0 20px', color: 'var(--muted-foreground)', fontSize: '14px', lineHeight: 1.5, flex: 1 }}>{course.description}</p>
                
                <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--muted-foreground)', marginBottom: '24px', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><UserRound size={14}/> {course.level}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><BookOpen size={14}/> {course.lessons} Lessons</span>
                </div>
                
                <Link href={`/contact?interest=education&course=${encodeURIComponent(course.title)}`} className="rivr-pill rivr-pill--outline" style={{ justifyContent: 'space-between', width: '100%' }}>
                  Enroll Now <span><ArrowRight size={16} /></span>
                </Link>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div></section>

    {/* Categories Section */}
    <section className="section section--mist" aria-labelledby="education-focus-title"><div className="content-wrap">
      <Reveal>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p className="eyebrow">EXPLORE BY CATEGORY</p>
          <h2 id="education-focus-title" className="display" style={{ margin: 0 }}>What Do You Want To <em>Learn?</em></h2>
        </div>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
        {learningCategories.map(({ title, description, Icon }, index) => 
          <Reveal delay={(index % 3) * .05} key={title}>
            <div style={{ background: 'white', borderRadius: '24px', padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: '100%', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}>
              <div style={{ background: 'rgba(255, 106, 18, 0.08)', color: 'var(--sunex-orange)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Icon size={32} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 16px', color: 'var(--foreground)' }}>{title}</h3>
              <Link href="/contact?interest=education" className="text-link" style={{ fontSize: '14px', marginTop: 'auto', justifyContent: 'center', color: 'var(--muted-foreground)' }}>Explore Courses <ArrowRight size={14} /></Link>
            </div>
          </Reveal>
        )}
      </div>
    </div></section>

    {/* Approach Section */}
    <section className="section education-approach-section" aria-labelledby="education-approach-title"><div className="content-wrap">
      <Reveal>
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', color: 'white' }}>
          <p className="eyebrow" style={{ color: '#ffd1b5', marginBottom: '16px' }}>OUR LEARNING APPROACH</p>
          <h2 id="education-approach-title" className="display" style={{ color: 'white', marginBottom: '16px' }}>Learn. Build. Grow.</h2>
          <p className="copy" style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '48px' }}>A practical learning path designed for real-world success.</p>
        </div>
      </Reveal>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginTop: '24px' }}>
        <Reveal delay={0}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '40px', position: 'relative', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '180px', fontWeight: 900, color: 'rgba(255,255,255,0.03)', lineHeight: 1, zIndex: 0, userSelect: 'none' }}>1</div>
            <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginBottom: '24px' }}>
                <BookOpen size={28} />
              </div>
              <h3 style={{ color: 'white', fontSize: '28px', fontWeight: 700, marginBottom: '16px', letterSpacing: '-0.02em' }}>Learn</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, fontSize: '16px', margin: 0 }}>Master the fundamentals and advanced concepts through expert-led, interactive online and offline sessions tailored for real-world application.</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ background: 'rgba(255, 106, 18, 0.05)', border: '1px solid rgba(255, 106, 18, 0.2)', borderRadius: '24px', padding: '40px', position: 'relative', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '180px', fontWeight: 900, color: 'rgba(255,106,18,0.05)', lineHeight: 1, zIndex: 0, userSelect: 'none' }}>2</div>
            <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--sunex-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginBottom: '24px' }}>
                <Code size={28} />
              </div>
              <h3 style={{ color: 'white', fontSize: '28px', fontWeight: 700, marginBottom: '16px', letterSpacing: '-0.02em' }}>Build</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, fontSize: '16px', margin: 0 }}>Apply your knowledge immediately by working on hands-on industry projects, building a robust portfolio of practical solutions.</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div style={{ background: 'rgba(34, 197, 94, 0.05)', border: '1px solid rgba(34, 197, 94, 0.2)', borderRadius: '24px', padding: '40px', position: 'relative', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '180px', fontWeight: 900, color: 'rgba(34,197,94,0.05)', lineHeight: 1, zIndex: 0, userSelect: 'none' }}>3</div>
            <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginBottom: '24px' }}>
                <BarChart size={28} />
              </div>
              <h3 style={{ color: 'white', fontSize: '28px', fontWeight: 700, marginBottom: '16px', letterSpacing: '-0.02em' }}>Grow</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, fontSize: '16px', margin: 0 }}>Accelerate your career with our dedicated placement support, interview prep, and industry-recognized certifications.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </div></section>

    {/* Everything You Need Section */}
    <section className="section section--mist" aria-labelledby="why-sunex-title"><div className="content-wrap">
      <Reveal>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p className="eyebrow">WHY SUNEX EDUCATION?</p>
          <h2 id="why-sunex-title" className="display" style={{ margin: 0 }}>Everything You Need To <em>Succeed</em></h2>
        </div>
      </Reveal>
      <div className="success-features-grid">
        {successFeatures.map(({ title, description, Icon }, index) => 
          <Reveal delay={(index % 3) * .05} key={title}>
            <div style={{ background: 'white', borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--sunex-orange)' }}>{String(index + 1).padStart(2, '0')}</span>
                <span style={{ background: 'rgba(255, 106, 18, 0.08)', color: 'var(--sunex-orange)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={22} strokeWidth={1.8} />
                </span>
              </div>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 12px', color: 'var(--foreground)' }}>{title}</h3>
                <p style={{ margin: 0, color: 'var(--muted-foreground)', fontSize: '15px', lineHeight: 1.5 }}>{description}</p>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </div></section>

    {/* Metrics Bar Section */}
    <section className="section skillconnect-section"><div className="content-wrap">
      <div className="metrics__card" style={{ background: 'linear-gradient(145deg, #193f68, #103054)', border: '1px solid rgba(255,255,255,0.1)' }}>
        {[{ value: "10000+", label: "Students Trained", Icon: UsersRound }, 
          { value: "500+", label: "Placement Partners", Icon: Building2 }, 
          { value: "95%+", label: "Placement Record", Icon: Target }, 
          { value: "200+", label: "Expert Trainers", Icon: GraduationCap }
         ].map(({ value, label, Icon }, index) => 
          <Reveal className="metric" delay={index * .05} key={label}>
            <div style={{ color: 'white', alignItems: 'center', textAlign: 'center', display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
              <Icon size={28} style={{ color: '#93c5fd', opacity: 1, marginBottom: '16px' }} />
              <strong style={{ color: 'white', fontSize: '36px', marginBottom: '8px' }}>{value}</strong>
              <span style={{ color: '#bfdbfe', fontSize: '15px' }}>{label}</span>
            </div>
          </Reveal>
        )}
      </div>
    </div></section>

    <Testimonials />

    {/* Footer CTA */}
    <section className="section content-wrap"><Reveal className="large-cta">
      <div style={{ position: 'relative', zIndex: 2 }}>
        <p className="eyebrow">Build your next step</p>
        <h2>Your Next Skill Could<br /><em>Change Your Future.</em></h2>
        <p>Choose a course, start learning and build the career you've always wanted.</p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '16px' }}>
          <Link href="/contact?interest=education" className="rivr-pill">
            Explore Courses <span><ArrowUpRight size={16} /></span>
          </Link>
          <Link href="/contact?interest=education" className="rivr-pill" style={{ background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
            Talk To Our Expert
          </Link>
        </div>
      </div>
    </Reveal></section>
  </>;
}
