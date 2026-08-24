import { randomUUID } from "node:crypto";

export type ContactInquiryPayload = {
  name: string;
  organization?: string | null;
  email: string;
  phone?: string | null;
  solution: "urbantree" | "education" | "healthcare" | "partnership" | "csr" | "other";
  industry: "gov" | "smartcity" | "edu" | "health" | "mfg" | "realestate" | "ngo" | "other";
  message: string;
};

type DotnetContactResponse = { success: boolean; id: number; requestId: string };

const apiBaseUrl = () => (process.env.SUNEX_API_URL || "http://127.0.0.1:5090").replace(/\/$/, "");

export async function submitContactInquiry(payload: ContactInquiryPayload, clientIp?: string, clientFingerprint?: string): Promise<DotnetContactResponse> {
  const headers: Record<string, string> = {
    "content-type": "application/json",
    "Idempotency-Key": randomUUID(),
  };
  if (clientIp) headers["X-Sunex-Client-IP"] = clientIp;
  if (clientFingerprint) headers["X-Sunex-Client-Fingerprint"] = clientFingerprint;

  const response = await fetch(`${apiBaseUrl()}/internal/v1/contact-inquiries`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(8_000),
  });

  if (!response.ok) {
    const requestId = response.headers.get("traceparent") || "unavailable";
    throw new Error(`SunEx .NET API request failed with ${response.status} (${requestId}).`);
  }

  return response.json() as Promise<DotnetContactResponse>;
}
