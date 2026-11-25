import React, { FormEvent, useState } from "react";
import { CheckCircle2, CreditCard, Lock, ShieldCheck } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { feeFor, formatRupees, type PayableLevel } from "@shared/kidsPricing";
import { levelNames, type KidsCourse } from "@/data/kidsCourses";
import { skillconnectContact } from "@/data/skillconnectContact";

type RazorpayResponse = { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string };
type RazorpayInstance = { open: () => void; on: (event: string, handler: (response: { error?: { description?: string } }) => void) => void };
declare global {
  interface Window { Razorpay?: new (options: Record<string, unknown>) => RazorpayInstance }
}

function loadRazorpayCheckout(): Promise<boolean> {
  if (window.Razorpay) return Promise.resolve(true);
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

/* "Pay & Enrol" panel for one course. Uses Razorpay Checkout; switches itself off until keys and fees are set. */
export function KidsEnrolPay({ course }: { course: KidsCourse }) {
  const payableLevels = course.levels.filter((level) => level.status === "live").map((level) => level.n as PayableLevel);
  const [level, setLevel] = useState<PayableLevel>(payableLevels[0] ?? 1);
  const [form, setForm] = useState({ parentName: "", email: "", phone: "", childName: "", childAge: "" });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<{ kind: "idle" | "working" | "paid" | "error"; message?: string; paymentId?: string }>({ kind: "idle" });
  const config = trpc.payments.config.useQuery(undefined, { staleTime: 60_000 });
  const createOrder = trpc.payments.createOrder.useMutation();
  const verify = trpc.payments.verify.useMutation();
  const fee = feeFor(course.id, level);
  const enabled = Boolean(config.data?.enabled) && fee !== null;
  const set = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!enabled) return;
    setStatus({ kind: "working" });
    try {
      const order = await createOrder.mutateAsync({ courseId: course.id, level, ...form, childAge: Number(form.childAge), consent: true });
      if (!(await loadRazorpayCheckout()) || !window.Razorpay) throw new Error("The payment window could not load. Please check your connection.");
      const checkout = new window.Razorpay({
        key: order.keyId,
        order_id: order.orderId,
        amount: order.amount,
        currency: order.currency,
        name: "SkillConnect by SunEx",
        description: `${order.courseTitle} · Level ${level} ${levelNames[level]}`,
        prefill: { name: form.parentName, email: form.email, contact: form.phone },
        notes: { course: course.id, level: String(level) },
        theme: { color: "#ff6a12" },
        handler: async (response: RazorpayResponse) => {
          try {
            const result = await verify.mutateAsync({ orderId: response.razorpay_order_id, paymentId: response.razorpay_payment_id, signature: response.razorpay_signature });
            setStatus({ kind: "paid", paymentId: result.paymentId });
          } catch {
            setStatus({ kind: "error", message: `Your payment went through, but we could not confirm it automatically. Please share payment ID ${response.razorpay_payment_id} with us at ${skillconnectContact.phone}.` });
          }
        },
        modal: { ondismiss: () => setStatus({ kind: "idle" }) },
      });
      checkout.on("payment.failed", (response) => setStatus({ kind: "error", message: response.error?.description || "The payment did not go through. No money was taken. Please try again." }));
      checkout.open();
    } catch (cause) {
      setStatus({ kind: "error", message: cause instanceof Error ? cause.message : "Something went wrong. Please try again." });
    }
  };

  if (status.kind === "paid") {
    return (
      <div className="kd-card kp-card" role="status">
        <div className="kd-done"><CheckCircle2 size={36} /><h3>Payment successful. You're enrolled!</h3>
          <p>{course.title}, Level {level} {levelNames[level]}. Payment ID: <b>{status.paymentId}</b>. We will call you {skillconnectContact.response.toLowerCase()} with your batch details.</p>
        </div>
      </div>
    );
  }

  return (
    <form className="kd-card kp-card" onSubmit={onSubmit} aria-label={`Pay and enrol in ${course.title}`}>
      <div className="kd-head"><span><CreditCard size={20} /></span><div><h3>Pay &amp; Enrol</h3><p>Secure online payment by Razorpay</p></div></div>

      <div className="kp-levels" role="radiogroup" aria-label="Choose a level">
        {payableLevels.map((n) => {
          const levelFee = feeFor(course.id, n);
          return (
            <button type="button" role="radio" aria-checked={level === n} key={n} className={level === n ? "is-on" : ""} onClick={() => setLevel(n)}>
              <small>Level {n}</small><b>{levelNames[n]}</b><span>{levelFee ? formatRupees(levelFee) : "Fee to be announced"}</span>
            </button>
          );
        })}
      </div>

      <div className="kp-total"><span>Amount to pay</span><strong>{fee ? formatRupees(fee) : "—"}</strong></div>

      <div className="kp-grid">
        <label>Parent&apos;s name<input required minLength={2} autoComplete="name" value={form.parentName} onChange={(e) => set("parentName", e.target.value)} /></label>
        <label>Phone number<input required type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} /></label>
        <label className="kp-wide">Email<input required type="email" autoComplete="email" value={form.email} onChange={(e) => set("email", e.target.value)} /></label>
        <label>Child&apos;s name<input required value={form.childName} onChange={(e) => set("childName", e.target.value)} /></label>
        <label>Child&apos;s age
          <select required value={form.childAge} onChange={(e) => set("childAge", e.target.value)}>
            <option value="">Select age</option>
            {Array.from({ length: 10 }, (_, index) => <option key={index} value={index + 7}>{index + 7} years</option>)}
          </select>
        </label>
      </div>

      <label className="kd-consent">
        <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>I am the parent or legal guardian. I agree to the fee shown and that SkillConnect may use these details to enrol my child and contact me. <a href="/privacy" target="_blank" rel="noreferrer">Privacy information</a></span>
      </label>

      {status.kind === "error" && <p className="kd-error" role="alert">{status.message}</p>}

      {enabled ? (
        <button className="kd-submit" type="submit" disabled={status.kind === "working"}>
          <Lock size={17} /> {status.kind === "working" ? "Opening secure payment..." : `Pay ${fee ? formatRupees(fee) : ""} & Enrol`}
        </button>
      ) : (
        <>
          <button className="kd-submit" type="button" disabled><Lock size={17} /> Online payment opens soon</button>
          <p className="kp-soon">{config.data?.enabled ? "Fees for this course will be announced soon." : "Online payment is being set up."} Book a free demo or call <a href={`tel:${skillconnectContact.phone.replace(/\s/g, "")}`}>{skillconnectContact.phone}</a> to enrol now.</p>
        </>
      )}
      <p className="kp-secure"><ShieldCheck size={15} /> UPI, cards, net banking and wallets. Payments are processed by Razorpay; we never see your card details.</p>
    </form>
  );
}
