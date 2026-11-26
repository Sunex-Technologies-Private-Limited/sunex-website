import { describe, expect, it, vi } from "vitest";
import { alertRecipients, buildAlert, createSmtpTransport, mailErrorDetails, sendEnquiryAlert, smtpSettings } from "./enquiryAlerts";

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

  it("connects to the looked-up IP but keeps the host name for TLS (Hostinger hides network interfaces)", async () => {
    const lookup = vi.fn().mockResolvedValue("203.0.113.10");
    const mailer = (await createSmtpTransport({ host: "smtp.zoho.in", port: 465, user: "info@thesunex.com", pass: "x" }, lookup)) as unknown as {
      options: { host: string; servername: string; tls: { servername: string }; secure: boolean };
    };
    expect(lookup).toHaveBeenCalledWith("smtp.zoho.in");
    expect(mailer.options.host).toBe("203.0.113.10");
    expect(mailer.options.servername).toBe("smtp.zoho.in");
    expect(mailer.options.tls.servername).toBe("smtp.zoho.in");
    expect(mailer.options.secure).toBe(true);
  });

  it("logs useful mail error details without the password", () => {
    const details = mailErrorDetails(Object.assign(new Error("Invalid login: 535 Authentication Failed"), { code: "EAUTH", command: "AUTH PLAIN", responseCode: 535 }));
    expect(details).toMatchObject({ code: "EAUTH", command: "AUTH PLAIN", responseCode: 535 });
    expect(JSON.stringify(details)).not.toContain("pass");
  });
});
