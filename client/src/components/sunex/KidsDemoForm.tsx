import React from "react";
import { FormEvent, useState } from "react";
import { ArrowUpRight, CalendarCheck, CheckCircle2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { kidsCourses } from "@/data/kidsCourses";
import { skillconnectContact, skillconnectMapsUrl } from "@/data/skillconnectContact";

/* Above-the-fold "Book a Free Demo Class" lead form. Sends through the same enquiry service as the contact page. */
export function KidsDemoForm({ course = "", id = "demo-form" }: { course?: string; id?: string }) {
  const [form, setForm] = useState({ age: "", name: "", phone: "", email: "", course });
  const [done, setDone] = useState(false);
  const [consent, setConsent] = useState(false);
  const submit = trpc.contact.submit.useMutation({ onSuccess: () => setDone(true) });
  const set = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    submit.mutate({
      name: form.name,
      email: form.email,
      phone: form.phone,
      organization: "",
      solution: "education",
      industry: "other",
      message: `Free demo class request (SkillConnect Kids, ages 7–16). Child's age: ${form.age}. Course: ${form.course || "not sure yet"}. Parent phone: ${form.phone}.`,
    });
  };

  if (done) {
    return (
      <div className="kd-card" id={id} role="status">
        <div className="kd-done"><CheckCircle2 size={34} /><h3>Demo class requested!</h3><p>Thank you. We will call you {skillconnectContact.response.toLowerCase()} to fix a time.</p></div>
        <p className="kd-next">Want to talk right now?</p>
        <div className="kd-actions">
          {skillconnectContact.whatsapp && <a className="kd-btn kd-btn--wa" href={`https://wa.me/${skillconnectContact.whatsapp}?text=${encodeURIComponent("Hi SkillConnect, I just requested a free demo class.")}`} target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp us</a>}
          {skillconnectContact.phone && <a className="kd-btn" href={`tel:${skillconnectContact.phone.replace(/\s/g, "")}`}><Phone size={16} /> {skillconnectContact.phone}</a>}
          <a className="kd-btn kd-btn--ghost" href={`mailto:${skillconnectContact.email}?subject=${encodeURIComponent("Free demo class")}`}><Mail size={16} /> {skillconnectContact.email}</a>
          <a className="kd-btn kd-btn--ghost" href={skillconnectMapsUrl} target="_blank" rel="noreferrer"><MapPin size={16} /> Visit our Mysuru centre</a>
        </div>
        <small className="kd-note">{skillconnectContact.centre.address}. {skillconnectContact.centre.landmark}.</small>
      </div>
    );
  }

  return (
    <form className="kd-card" id={id} onSubmit={onSubmit}>
      <div className="kd-head"><span><CalendarCheck size={20} /></span><div><h3>Book a Free Demo Class</h3><p>Takes 30 seconds. No payment needed.</p></div></div>
      <label>Child&apos;s age
        <select required value={form.age} onChange={(event) => set("age", event.target.value)}>
          <option value="">Select age</option>
          {Array.from({ length: 10 }, (_, index) => <option key={index} value={index + 7}>{index + 7} years</option>)}
        </select>
      </label>
      <label>Parent&apos;s name<input required minLength={2} autoComplete="name" value={form.name} onChange={(event) => set("name", event.target.value)} /></label>
      <label>Phone number<input required type="tel" autoComplete="tel" inputMode="tel" value={form.phone} onChange={(event) => set("phone", event.target.value)} /></label>
      <label>Email<input required type="email" autoComplete="email" value={form.email} onChange={(event) => set("email", event.target.value)} /></label>
      <label>Course
        <select value={form.course} onChange={(event) => set("course", event.target.value)}>
          <option value="">Not sure yet, please advise</option>
          {kidsCourses.map((item) => <option key={item.id} value={item.title}>{item.title}</option>)}
        </select>
      </label>
      <label className="kd-consent">
        <input type="checkbox" required checked={consent} onChange={(event) => setConsent(event.target.checked)} />
        <span>I am the parent or legal guardian, and I agree that SkillConnect may contact me about my child&apos;s demo class and use these details only for this enquiry. <a href="/privacy" target="_blank" rel="noreferrer">Privacy information</a></span>
      </label>
      {submit.error && <p className="kd-error">{submit.error.message || "We could not send this. Please try again."}</p>}
      <button className="kd-submit" type="submit" disabled={submit.isPending}>{submit.isPending ? "Sending..." : <>Book My Free Demo <ArrowUpRight size={18} /></>}</button>
    </form>
  );
}

/* Always-visible call to action: bottom bar on phones, floating pill on desktop, plus WhatsApp when a number is set. */
export function KidsStickyCta() {
  const jump = () => document.getElementById("demo-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  return (
    <>
      <button type="button" className="kd-sticky" onClick={jump}><CalendarCheck size={18} /> Book a Free Demo Class</button>
      {skillconnectContact.whatsapp && (
        <a className="kd-wa" aria-label="Chat on WhatsApp" href={`https://wa.me/${skillconnectContact.whatsapp}`} target="_blank" rel="noreferrer"><MessageCircle size={26} /></a>
      )}
    </>
  );
}
