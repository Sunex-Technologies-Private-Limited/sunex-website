import { createHmac } from "node:crypto";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("./db", () => ({ createContactInquiry: vi.fn().mockResolvedValue({ id: 7 }) }));
vi.mock("./dotnetRuntime", () => ({ isDotnetApiEnabled: () => false }));
vi.mock("./enquiryAlerts", () => ({ sendEnquiryAlert: vi.fn().mockResolvedValue(true) }));

import { createContactInquiry } from "./db";
import { sendEnquiryAlert } from "./enquiryAlerts";
import { appRouter, enrolmentInputSchema } from "./routers";
import { createRazorpayOrder, isValidPaymentSignature, razorpayConfig } from "./payments";
import { kidsFees } from "../shared/kidsPricing";

const caller = () => appRouter.createCaller({ user: null, req: { ip: "203.0.113.9", headers: {} } as never, res: {} as never });
const enrolment = { courseId: "scratch", level: 1 as const, parentName: "Test Parent", email: "parent@example.com", phone: "9000000000", childName: "Asha", childAge: 9, consent: true as const };

afterEach(() => {
  delete process.env.RAZORPAY_KEY_ID;
  delete process.env.RAZORPAY_KEY_SECRET;
  kidsFees.scratch = {};
  vi.unstubAllGlobals();
});

describe("Razorpay helpers", () => {
  it("stays switched off until both keys are set", () => {
    expect(razorpayConfig({})).toBeNull();
    expect(razorpayConfig({ RAZORPAY_KEY_ID: "rzp_test_1" })).toBeNull();
    expect(razorpayConfig({ RAZORPAY_KEY_ID: "rzp_test_1", RAZORPAY_KEY_SECRET: "s" })).toEqual({ keyId: "rzp_test_1", keySecret: "s" });
  });

  it("accepts only a correct payment signature", () => {
    const good = createHmac("sha256", "secret").update("order_1|pay_1").digest("hex");
    expect(isValidPaymentSignature("order_1", "pay_1", good, "secret")).toBe(true);
    expect(isValidPaymentSignature("order_1", "pay_2", good, "secret")).toBe(false);
    expect(isValidPaymentSignature("order_1", "pay_1", "nonsense", "secret")).toBe(false);
  });

  it("creates the order in paise with basic auth", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ id: "order_9", amount: 499900, currency: "INR", status: "created" }) });
    await createRazorpayOrder({ keyId: "k", keySecret: "s" }, { amountPaise: 499900, receipt: "r", notes: {} }, fetchMock as never);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.razorpay.com/v1/orders");
    expect(JSON.parse(init.body)).toMatchObject({ amount: 499900, currency: "INR" });
    expect(init.headers.Authorization).toBe(`Basic ${Buffer.from("k:s").toString("base64")}`);
  });
});

describe("payments API", () => {
  it("reports payments as off while no keys are configured", async () => {
    await expect(caller().payments.config()).resolves.toEqual({ enabled: false, keyId: null });
    await expect(caller().payments.createOrder(enrolment)).rejects.toThrow(/not switched on/);
  });

  it("refuses a course level whose fee is not set", async () => {
    process.env.RAZORPAY_KEY_ID = "rzp_test_1";
    process.env.RAZORPAY_KEY_SECRET = "secret";
    await expect(caller().payments.createOrder(enrolment)).rejects.toThrow(/not open for online payment/);
  });

  it("charges the server-side fee, not anything from the browser", async () => {
    process.env.RAZORPAY_KEY_ID = "rzp_test_1";
    process.env.RAZORPAY_KEY_SECRET = "secret";
    kidsFees.scratch = { 1: 4999 };
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ id: "order_1", amount: 499900, currency: "INR", status: "created" }) });
    vi.stubGlobal("fetch", fetchMock);
    const order = await caller().payments.createOrder(enrolment);
    expect(order).toMatchObject({ orderId: "order_1", amount: 499900, keyId: "rzp_test_1" });
    expect(JSON.parse(fetchMock.mock.calls[0][1].body).amount).toBe(499900);
  });

  it("requires parental consent and a valid child age", () => {
    expect(enrolmentInputSchema.safeParse({ ...enrolment, consent: false }).success).toBe(false);
    expect(enrolmentInputSchema.safeParse({ ...enrolment, childAge: 5 }).success).toBe(false);
  });

  it("rejects a forged payment and records a verified one", async () => {
    process.env.RAZORPAY_KEY_ID = "rzp_test_1";
    process.env.RAZORPAY_KEY_SECRET = "secret";
    await expect(caller().payments.verify({ orderId: "order_1", paymentId: "pay_1", signature: "forged" })).rejects.toThrow(/could not be verified/);

    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ id: "order_1", amount: 499900, currency: "INR", status: "paid", notes: { course: "Programming in Scratch", level: "1", parent: "Test Parent", email: "parent@example.com", phone: "9000000000", child: "Asha, 9" } }) }));
    const signature = createHmac("sha256", "secret").update("order_1|pay_1").digest("hex");
    await expect(caller().payments.verify({ orderId: "order_1", paymentId: "pay_1", signature })).resolves.toEqual({ success: true, paymentId: "pay_1" });
    expect(createContactInquiry).toHaveBeenCalledWith(expect.objectContaining({ idempotencyKey: "rzp_pay_1", message: expect.stringContaining("PAID ENROLMENT") }));
    expect(sendEnquiryAlert).toHaveBeenCalledWith(expect.objectContaining({ kind: "paid-enrolment", savedToDatabase: true }));
  });
});
