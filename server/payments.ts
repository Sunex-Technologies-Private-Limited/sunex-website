import { createHmac, timingSafeEqual } from "node:crypto";

/*
 * Razorpay integration (Orders API + Checkout). No SDK is needed: we call the REST API directly.
 *
 * To switch payments on, add these environment variables in hPanel > thesunex.com > Environment variables:
 *   RAZORPAY_KEY_ID      e.g. rzp_test_xxx (test mode) or rzp_live_xxx (live mode)
 *   RAZORPAY_KEY_SECRET  the matching secret, never shown to the browser
 * The bank account that receives the money is set in the Razorpay dashboard (Settlements), not here.
 */
export type RazorpayConfig = { keyId: string; keySecret: string };

export function razorpayConfig(env: NodeJS.ProcessEnv = process.env): RazorpayConfig | null {
  const keyId = (env.RAZORPAY_KEY_ID ?? "").trim();
  const keySecret = (env.RAZORPAY_KEY_SECRET ?? "").trim();
  return keyId && keySecret ? { keyId, keySecret } : null;
}

const API = "https://api.razorpay.com/v1";
const authHeader = (config: RazorpayConfig) => `Basic ${Buffer.from(`${config.keyId}:${config.keySecret}`).toString("base64")}`;

export type RazorpayOrder = { id: string; amount: number; currency: string; status: string; notes?: Record<string, string> };

export async function createRazorpayOrder(
  config: RazorpayConfig,
  order: { amountPaise: number; receipt: string; notes: Record<string, string> },
  fetchImpl: typeof fetch = fetch,
): Promise<RazorpayOrder> {
  const response = await fetchImpl(`${API}/orders`, {
    method: "POST",
    headers: { Authorization: authHeader(config), "Content-Type": "application/json" },
    body: JSON.stringify({ amount: order.amountPaise, currency: "INR", receipt: order.receipt, notes: order.notes }),
  });
  if (!response.ok) throw new Error(`Razorpay order failed with status ${response.status}`);
  return (await response.json()) as RazorpayOrder;
}

export async function fetchRazorpayOrder(config: RazorpayConfig, orderId: string, fetchImpl: typeof fetch = fetch): Promise<RazorpayOrder> {
  const response = await fetchImpl(`${API}/orders/${encodeURIComponent(orderId)}`, { headers: { Authorization: authHeader(config) } });
  if (!response.ok) throw new Error(`Razorpay order lookup failed with status ${response.status}`);
  return (await response.json()) as RazorpayOrder;
}

/** Checks the signature Razorpay Checkout returns: HMAC-SHA256(order_id + "|" + payment_id) with the key secret. */
export function isValidPaymentSignature(orderId: string, paymentId: string, signature: string, keySecret: string): boolean {
  const expected = createHmac("sha256", keySecret).update(`${orderId}|${paymentId}`).digest("hex");
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(String(signature), "utf8");
  return a.length === b.length && timingSafeEqual(a, b);
}
