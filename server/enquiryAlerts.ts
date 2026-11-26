import { promises as dns } from "node:dns";
import { isIP } from "node:net";
import nodemailer from "nodemailer";
import { logger } from "./_core/logger";

/*
 * Email alert for every new enquiry, demo request and paid enrolment.
 *
 * Uses the SMTP settings already stored in hPanel > thesunex.com > Environment variables:
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
 * Recipients (optional overrides, comma-separated):
 *   ENQUIRY_ALERT_EDUCATION_TO  default skillconnect@thesunex.com  (SkillConnect, Kids, college, payments)
 *   ENQUIRY_ALERT_GENERAL_TO    default info@thesunex.com          (everything else)
 *   ENQUIRY_ALERT_FROM          default SMTP_USER
 * If SMTP is not configured, alerts are skipped and enquiries are still saved as before.
 */
export const EDUCATION_ALERT_TO = "skillconnect@thesunex.com";
export const GENERAL_ALERT_TO = "info@thesunex.com";

export type EnquiryAlert = {
  name: string;
  email: string;
  phone?: string | null;
  organization?: string | null;
  solution: string;
  industry?: string;
  message: string;
  savedToDatabase: boolean;
  kind?: "enquiry" | "paid-enrolment";
};

type SmtpEnv = { host: string; port: number; user: string; pass: string };

export function smtpSettings(env: NodeJS.ProcessEnv = process.env): SmtpEnv | null {
  const host = (env.SMTP_HOST ?? "").trim();
  const user = (env.SMTP_USER ?? "").trim();
  const pass = env.SMTP_PASS ?? "";
  if (!host || !user || !pass) return null;
  const port = Number(env.SMTP_PORT) || 465;
  return { host, port, user, pass };
}

export function alertRecipients(solution: string, env: NodeJS.ProcessEnv = process.env): string {
  const education = (env.ENQUIRY_ALERT_EDUCATION_TO ?? "").trim() || EDUCATION_ALERT_TO;
  const general = (env.ENQUIRY_ALERT_GENERAL_TO ?? "").trim() || GENERAL_ALERT_TO;
  return solution === "education" ? education : general;
}

const line = (value: string | null | undefined) => (value ?? "").replace(/[\r\n]+/g, " ").trim();

export function buildAlert(alert: EnquiryAlert, env: NodeJS.ProcessEnv = process.env) {
  const isKidsDemo = /Free demo class request/i.test(alert.message);
  const isKids = /SkillConnect Kids|Kids \(ages 7/i.test(alert.message);
  const label = alert.kind === "paid-enrolment" ? "PAID ENROLMENT" : isKidsDemo ? "Free demo request" : isKids ? "Kids enquiry" : "New enquiry";
  const area = alert.solution === "education" ? "SkillConnect" : alert.solution;
  const subject = line(`[${area}] ${label}: ${alert.name}${alert.phone ? ` (${alert.phone})` : ""}`).slice(0, 180);
  const text = [
    `${label} from thesunex.com`,
    "",
    `Name:          ${line(alert.name)}`,
    `Phone:         ${line(alert.phone) || "not given"}`,
    `Email:         ${line(alert.email)}`,
    alert.organization ? `Organisation:  ${line(alert.organization)}` : null,
    `Interest:      ${line(alert.solution)}${alert.industry ? ` / ${line(alert.industry)}` : ""}`,
    "",
    "Message:",
    alert.message,
    "",
    alert.savedToDatabase ? "Saved in the website database (contact_inquiries)." : "WARNING: this enquiry could NOT be saved in the database. This email is the only copy.",
    "Reply to this email to answer the sender directly.",
  ].filter((value) => value !== null).join("\n");
  return {
    from: (env.ENQUIRY_ALERT_FROM ?? "").trim() || `"SunEx Website" <${(env.SMTP_USER ?? "").trim()}>`,
    to: alertRecipients(alert.solution, env),
    replyTo: line(alert.email) || undefined,
    subject,
    text,
  };
}

type Transport = { sendMail: (mail: ReturnType<typeof buildAlert>) => Promise<unknown> };
type Lookup = (host: string) => Promise<string>;

/*
 * Hostinger's Node.js containers hide their network interfaces from the app, so nodemailer's own
 * resolver decides "no IPv4 network" and fails ("Failed to resolve IPv4 addresses with current network").
 * We look the SMTP host up with the system resolver ourselves and hand nodemailer the IP address,
 * keeping the real host name for the TLS certificate check.
 */
const systemLookup: Lookup = async (host) => (await dns.lookup(host, { family: 4 })).address;

export async function createSmtpTransport(settings: SmtpEnv, lookup: Lookup = systemLookup): Promise<Transport> {
  const address = isIP(settings.host) ? settings.host : await lookup(settings.host);
  return nodemailer.createTransport({
    host: address,
    port: settings.port,
    secure: settings.port === 465,
    requireTLS: settings.port !== 465,
    servername: settings.host,
    tls: { servername: settings.host },
    auth: { user: settings.user, pass: settings.pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  }) as unknown as Transport;
}

/** Safe details for the logs: never includes the password or the email content. */
export function mailErrorDetails(cause: unknown) {
  const error = (cause ?? {}) as { name?: string; code?: string; command?: string; responseCode?: number; message?: string };
  return {
    errorType: cause instanceof Error ? cause.name : "unknown",
    code: error.code,
    command: error.command,
    responseCode: error.responseCode,
    detail: typeof error.message === "string" ? error.message.slice(0, 200) : undefined,
  };
}

/** One-line summary for log viewers (like Hostinger's) that show only the message text. */
export function describeMailError(cause: unknown) {
  const d = mailErrorDetails(cause);
  return [d.code, d.command, d.responseCode, d.detail].filter((part) => part !== undefined && part !== "").join(" | ") || d.errorType;
}

/** Errors that mean "could not reach the server on this port", as opposed to a login or message problem. */
const CONNECTION_ERRORS = new Set(["ECONNECTION", "ECONNREFUSED", "ETIMEDOUT", "ESOCKET", "ECONNRESET", "EHOSTUNREACH", "ENETUNREACH", "EDNS"]);
export const isConnectionError = (cause: unknown) => CONNECTION_ERRORS.has(String((cause as { code?: string })?.code ?? ""));

type TransportFactory = (settings: SmtpEnv) => Promise<Transport>;

/** Sends the alert. Never throws: a mail problem must not break the form for the visitor. */
export async function sendEnquiryAlert(
  alert: EnquiryAlert,
  options: { env?: NodeJS.ProcessEnv; transport?: Transport; createTransport?: TransportFactory } = {},
): Promise<boolean> {
  const env = options.env ?? process.env;
  const settings = smtpSettings(env);
  if (!settings && !options.transport) {
    logger.warn({ event: "enquiry_alert_skipped", reason: "smtp_not_configured" }, "enquiry alert skipped");
    return false;
  }
  const mail = buildAlert(alert, env);
  const factory = options.createTransport ?? ((s: SmtpEnv) => createSmtpTransport(s));
  try {
    const mailer = options.transport ?? (await factory(settings!));
    await mailer.sendMail(mail);
    logger.info({ event: "enquiry_alert_sent", solution: alert.solution, port: settings?.port }, "enquiry alert sent");
    return true;
  } catch (cause) {
    // Some hosts block port 465 but allow 587 (STARTTLS); try once more before giving up.
    if (!options.transport && settings && settings.port === 465 && isConnectionError(cause)) {
      logger.warn({ event: "enquiry_alert_retry", ...mailErrorDetails(cause) }, `enquiry alert retrying on port 587 after: ${describeMailError(cause)}`);
      try {
        await (await factory({ ...settings, port: 587 })).sendMail(mail);
        logger.info({ event: "enquiry_alert_sent", solution: alert.solution, port: 587 }, "enquiry alert sent (port 587)");
        return true;
      } catch (retryCause) {
        logger.error({ event: "enquiry_alert_failed", ...mailErrorDetails(retryCause) }, `enquiry alert failed on 465 and 587: ${describeMailError(retryCause)}`);
        return false;
      }
    }
    logger.error({ event: "enquiry_alert_failed", ...mailErrorDetails(cause) }, `enquiry alert failed: ${describeMailError(cause)}`);
    return false;
  }
}
