import { describe, expect, it, vi } from "vitest";
import { alertRecipients, buildAlert, sendEnquiryAlert, smtpSettings } from "./enquiryAlerts";

const env = { SMTP_HOST: "smtp.example.com", SMTP_PORT: "465", SMTP_USER: "alerts@thesunex.com", SMTP_PASS: "x" } as NodeJS.ProcessEnv;
const demo = {
  name: "Test Parent",
  email: "parent@example.com",
  phone: "9000000000",
  solution: "education",
  industry: "other",
  message: "Free demo class request (SkillConnect Kids, ages 7–16). Child's age: 11. Course: Programming in Python.",
  savedToDatabase: true,
};

describe("enquiry email alerts", () => {
  it("routes education enquiries to SkillConnect and everything else to info", () => {
    expect(alertRecipients("education", {})).toBe("skillconnect@thesunex.com");
    expect(alertRecipients("urbantree", {})).toBe("info@thesunex.com");
    expect(alertRecipients("healthcare", {})).toBe("info@thesunex.com");
    expect(alertRecipients("education", { ENQUIRY_ALERT_EDUCATION_TO: "team@thesunex.com" })).toBe("team@thesunex.com");
  });

  it("builds a readable email the team can reply to", () => {
    const mail = buildAlert(demo, env);
    expect(mail.to).toBe("skillconnect@thesunex.com");
    expect(mail.replyTo).toBe("parent@example.com");
    expect(mail.subject).toBe("[SkillConnect] Free demo request: Test Parent (9000000000)");
    expect(mail.text).toContain("Phone:         9000000000");
    expect(mail.text).toContain("Course: Programming in Python");
    expect(mail.from).toContain("alerts@thesunex.com");
  });

  it("labels paid enrolments and warns when the database save failed", () => {
    const mail = buildAlert({ ...demo, kind: "paid-enrolment", savedToDatabase: false, message: "PAID ENROLMENT (Razorpay)." }, env);
    expect(mail.subject).toContain("PAID ENROLMENT");
    expect(mail.text).toContain("could NOT be saved");
  });

  it("keeps header fields on one line", () => {
    const mail = buildAlert({ ...demo, name: "Evil\r\nBcc: someone@example.com" }, env);
    expect(mail.subject).not.toMatch(/[\r\n]/);
  });

  it("skips quietly when SMTP is not configured", async () => {
    expect(smtpSettings({})).toBeNull();
    await expect(sendEnquiryAlert(demo, { env: {} })).resolves.toBe(false);
  });

  it("sends through the transport and never throws on mail errors", async () => {
    const sendMail = vi.fn().mockResolvedValue({});
    await expect(sendEnquiryAlert(demo, { env, transport: { sendMail } })).resolves.toBe(true);
    expect(sendMail).toHaveBeenCalledWith(expect.objectContaining({ to: "skillconnect@thesunex.com" }));
    const failing = { sendMail: vi.fn().mockRejectedValue(new Error("SMTP down")) };
    await expect(sendEnquiryAlert(demo, { env, transport: failing })).resolves.toBe(false);
  });
});
