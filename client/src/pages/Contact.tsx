import { ArrowUpRight, BadgeCheck, Building2, CheckCircle2, Compass, GraduationCap, Leaf, Mail, MapPin, Stethoscope } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { Link } from "wouter";
import { PageHero } from "@/components/sunex/PageHero";
import { Reveal } from "@/components/sunex/Reveal";
import { trpc } from "@/lib/trpc";

type FormValues = {
  name: string;
  organization: string;
  email: string;
  phone: string;
  solution: "urbantree" | "education" | "healthcare" | "partnership" | "csr" | "other";
  industry: "gov" | "smartcity" | "edu" | "health" | "mfg" | "realestate" | "ngo" | "other";
  message: string;
};

const initialValues: FormValues = {
  name: "",
  organization: "",
  email: "",
  phone: "",
  solution: "urbantree",
  industry: "gov",
  message: "",
};

const guidedInterests = [
  { id: "urbantree", label: "UrbanTree", note: "Cleaner city air", Icon: Leaf },
  { id: "education", label: "SkillConnect", note: "Future-ready learning", Icon: GraduationCap },
  { id: "healthcare", label: "Healthcare", note: "Care across borders", Icon: Stethoscope },
  { id: "partnership", label: "Partnership", note: "Build together", Icon: Compass },
] as const;

export default function Contact() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [submitted, setSubmitted] = useState(false);
  const submit = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setValues(initialValues);
    },
    onError: () => setSubmitted(false),
  });

  const change = (field: keyof FormValues, value: string) => setValues((current) => ({ ...current, [field]: value }));
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(false);
    submit.mutate(values);
  };

  useEffect(() => {
    const interest = new URLSearchParams(window.location.search).get("interest");
    if (!interest || !guidedInterests.some((item) => item.id === interest)) return;
    change("solution", interest);
  }, []);

  return (
    <>
      <PageHero
        eyebrow="05 / Contact"
        title={<>Let’s build a better <em>tomorrow.</em></>}
        image="/manus-storage/sunex-partnership-studio_691e7bdd.jpg"
        description="Whether you’re looking to improve environmental sustainability, empower future talent, or access world-class healthcare — SunEx is your partner in innovation."
      />

      <section className="section section--mist">
        <div className="content-wrap">
          <div className="split-heading">
            <div>
              <p className="eyebrow">Submit inquiry</p>
              <h2 className="display">Tell us your <em>challenge.</em></h2>
            </div>
            <p className="copy">Choose the conversation that fits your focus, then share the context that will help the SunEx team understand what comes next.</p>
          </div>

          <div className="contact-grid">
            <Reveal className="contact-form">
              <div className="contact-intent" id="guided-focus">
                <div>
                  <span className="status-dot" />
                  <p>Start with a focus</p>
                </div>
                <div className="contact-intent__choices">
                  {guidedInterests.map((interest) => {
                    const isActive = values.solution === interest.id;
                    const InterestIcon = interest.Icon;
                    return (
                      <button type="button" className={isActive ? "is-active" : ""} key={interest.id} onClick={() => change("solution", interest.id)} aria-pressed={isActive}>
                        <InterestIcon className="contact-intent__icon" size={16} />
                        <strong>{interest.label}</strong>
                        <small>{interest.note}</small>
                      </button>
                    );
                  })}
                </div>
              </div>

              <form onSubmit={onSubmit}>
                <div className="form-grid">
                  <Field label="Your name" value={values.name} onChange={(value) => change("name", value)} required />
                  <Field label="Organization" value={values.organization} onChange={(value) => change("organization", value)} />
                  <Field label="Email address" type="email" value={values.email} onChange={(value) => change("email", value)} required />
                  <Field label="Phone number" type="tel" value={values.phone} onChange={(value) => change("phone", value)} />
                  <SelectField label="Solution interest" value={values.solution} onChange={(value) => change("solution", value)} options={[["urbantree", "UrbanTree — Air Purification"], ["education", "SkillConnect — Training Programs"], ["healthcare", "SunEx Healthcare — Medical Tourism"], ["partnership", "Strategic Partnership"], ["csr", "CSR Initiative"], ["other", "Other"]]} />
                  <SelectField label="Your industry" value={values.industry} onChange={(value) => change("industry", value)} options={[["gov", "Government"], ["smartcity", "Smart City"], ["edu", "Educational Institution"], ["health", "Healthcare Provider"], ["mfg", "Manufacturing"], ["realestate", "Real Estate"], ["ngo", "NGO"], ["other", "Other"]]} />
                  <label className="form-field form-field--wide">
                    <span>Project or challenge</span>
                    <textarea required value={values.message} onChange={(event) => change("message", event.target.value)} placeholder={`Tell us what you would like to explore with ${guidedInterests.find((interest) => interest.id === values.solution)?.label || "SunEx"}`} />
                  </label>
                </div>
                {submit.error && <p className="form-error">{submit.error.message || "We could not submit your inquiry. Please try again."}</p>}
                <button className="action-pill form-submit" type="submit" disabled={submit.isPending}>
                  {submit.isPending ? "Submitting..." : <>Submit inquiry <span><ArrowUpRight className="sunex-action-glyph" size={16} /></span></>}
                </button>
                <p className="contact-privacy-note">Your submitted details are used to respond to and route this enquiry. Read our <Link href="/privacy">privacy information</Link>.</p>
              </form>

              {submitted && (
                <div className="contact-success" style={{ marginTop: 20 }}>
                  <CheckCircle2 size={21} />
                  <h3>Inquiry submitted</h3>
                  <p>Thank you for reaching out. The SunEx team will be in touch.</p>
                </div>
              )}
            </Reveal>

            <div className="contact-side">
              <ContactSideCard Icon={BadgeCheck} title="Why choose SunEx" delay={0.05}>
                <ul>{["Innovation-Driven Solutions", "Experienced Leadership", "Trusted Industry Partnerships", "Technology with Social Impact", "Customer-Centric Approach", "Scalable & Sustainable", "Quality & Transparency", "Global Standards"].map((item) => <li key={item}>{item}</li>)}</ul>
              </ContactSideCard>
              <ContactSideCard Icon={Mail} title="Direct contact" delay={0.1}>
                <p><strong>Email</strong><br />contact@sunextech.com</p>
                <p><strong>Location</strong><br /><MapPin size={13} /> India</p>
                <p><strong>Response time</strong><br />Within 24 Hours</p>
              </ContactSideCard>
              <ContactSideCard Icon={Building2} title="Industries we serve" delay={0.15}>
                <p>Government · Smart Cities · Education · Healthcare · Manufacturing · CSR · Real Estate · NGOs</p>
              </ContactSideCard>
            </div>
          </div>
        </div>
      </section>

      <section className="section content-wrap">
        <Reveal className="large-cta">
          <p className="eyebrow">Based in India. Serving globally.</p>
          <h2>One conversation can open <em>the next possibility.</em></h2>
          <p>Our headquarters in India serves as the innovation hub for UrbanTree, SunEx Education, and SunEx Healthcare.</p>
        </Reveal>
      </section>
    </>
  );
}

function ContactSideCard({ Icon, title, delay, children }: { Icon: typeof BadgeCheck; title: string; delay: number; children: React.ReactNode }) {
  return (
    <Reveal className="contact-side__card" delay={delay}>
      <div className="contact-side__heading"><span><Icon size={17} /></span><h3>{title}</h3></div>
      {children}
    </Reveal>
  );
}

function Field({ label, value, onChange, type = "text", required = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean }) {
  return <label className="form-field"><span>{label}</span><input required={required} type={type} value={value} onChange={(event) => onChange(event.target.value)} /></label>;
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[][] }) {
  return <label className="form-field"><span>{label}</span><select value={value} onChange={(event) => onChange(event.target.value)}>{options.map(([id, text]) => <option value={id} key={id}>{text}</option>)}</select></label>;
}
