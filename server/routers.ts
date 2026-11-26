import { z } from "zod";
import { COOKIE_NAME } from "../shared/const";
import { createHmac } from "node:crypto";
import { TRPCError } from "@trpc/server";
import { submitContactInquiry } from "./dotnetApi";
import { createContactInquiry } from "./db";
import { isDotnetApiEnabled } from "./dotnetRuntime";
import { getSessionCookieOptions } from "./_core/cookies";
import { logger } from "./_core/logger";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { createRazorpayOrder, fetchRazorpayOrder, isValidPaymentSignature, razorpayConfig } from "./payments";
import { kidsSeoCourses } from "../shared/kidsSeo";
import { feeFor } from "../shared/kidsPricing";
import { sendEnquiryAlert } from "./enquiryAlerts";

export const contactInputSchema = z.object({
  name: z.string().trim().min(2, "Please provide your name.").max(120),
  organization: z.string().trim().max(160).optional().or(z.literal("")),
  email: z.string().trim().email("Please provide a valid email address.").max(320),
  phone: z.string().trim().max(60).optional().or(z.literal("")),
  solution: z.enum(["urbantree", "education", "healthcare", "partnership", "csr", "other"]),
  industry: z.enum(["gov", "smartcity", "edu", "health", "mfg", "realestate", "ngo", "other"]),
  message: z.string().trim().min(10, "Please share a little more about your project or challenge.").max(5000),
});

export const enrolmentInputSchema = z.object({
  courseId: z.string().trim().min(1).max(40),
  level: z.union([z.literal(1), z.literal(2)]),
  parentName: z.string().trim().min(2, "Please provide the parent's name.").max(120),
  email: z.string().trim().email("Please provide a valid email address.").max(320),
  phone: z.string().trim().min(8, "Please provide a valid phone number.").max(20),
  childName: z.string().trim().min(1, "Please provide the child's name.").max(80),
  childAge: z.number().int().min(7).max(16),
  consent: z.literal(true),
});

export const paymentVerifySchema = z.object({
  orderId: z.string().trim().min(1).max(64),
  paymentId: z.string().trim().min(1).max(64),
  signature: z.string().trim().min(1).max(256),
});

export function contactClientFingerprint(headers: Record<string, string | string[] | undefined>) {
  const fingerprintSource = [headers["user-agent"], headers["accept-language"], headers.accept]
    .map(value => Array.isArray(value) ? value.join(",") : value ?? "")
    .join("|");
  // The private API receives only this HMAC-derived value. Raw browser headers
  // are not persisted in the enquiry database or emitted in application logs.
  return createHmac("sha256", process.env.SUNEX_RATE_LIMIT_SECRET || process.env.JWT_SECRET || "local-development-rate-limit-secret")
    .update(fingerprintSource)
    .digest("hex");
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      ctx.res.clearCookie(COOKIE_NAME, { ...getSessionCookieOptions(ctx.req), maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  contact: router({
    submit: publicProcedure.input(contactInputSchema).mutation(async ({ input, ctx }) => {
      const payload = { ...input, organization: input.organization || null, phone: input.phone || null };
      // Email alert goes out whether or not the database save works, so no enquiry is ever silently lost.
      const alert = (savedToDatabase: boolean) => void sendEnquiryAlert({ ...payload, savedToDatabase });
      if (!isDotnetApiEnabled()) {
        try {
          const legacyResult = await createContactInquiry(payload);
          alert(true);
          return { success: true as const, id: legacyResult.id };
        } catch (cause) {
          alert(false);
          throw cause;
        }
      }
      try {
        const result = await submitContactInquiry(payload, ctx.req.ip, contactClientFingerprint(ctx.req.headers));
        alert(true);
        return { success: true as const, id: result.id };
      } catch (cause) {
        alert(false);
        logger.warn({ event: "contact_submission_unavailable", errorType: cause instanceof Error ? cause.name : "unknown" }, "contact submission unavailable");
        throw new TRPCError({ code: "SERVICE_UNAVAILABLE", message: "The enquiry service is temporarily unavailable." });
      }
    }),
  }),
  payments: router({
    config: publicProcedure.query(() => {
      const config = razorpayConfig();
      return { enabled: Boolean(config), keyId: config?.keyId ?? null };
    }),
    createOrder: publicProcedure.input(enrolmentInputSchema).mutation(async ({ input }) => {
      const config = razorpayConfig();
      if (!config) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Online payment is not switched on yet." });
      const course = kidsSeoCourses.find((item) => item.id === input.courseId);
      const fee = course ? feeFor(course.id, input.level) : null;
      if (!course || !fee) throw new TRPCError({ code: "BAD_REQUEST", message: "This course level is not open for online payment yet." });
      try {
        const order = await createRazorpayOrder(config, {
          amountPaise: fee * 100,
          receipt: `kids-${course.id}-L${input.level}-${Date.now()}`.slice(0, 40),
          notes: {
            course: course.title,
            level: String(input.level),
            parent: input.parentName,
            email: input.email,
            phone: input.phone,
            child: `${input.childName}, ${input.childAge}`,
          },
        });
        return { orderId: order.id, amount: order.amount, currency: order.currency, keyId: config.keyId, courseTitle: course.title };
      } catch (cause) {
        logger.warn({ event: "razorpay_order_failed", errorType: cause instanceof Error ? cause.name : "unknown" }, "razorpay order failed");
        throw new TRPCError({ code: "SERVICE_UNAVAILABLE", message: "We could not start the payment. Please try again or call us." });
      }
    }),
    verify: publicProcedure.input(paymentVerifySchema).mutation(async ({ input, ctx }) => {
      const config = razorpayConfig();
      if (!config) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Online payment is not switched on yet." });
      if (!isValidPaymentSignature(input.orderId, input.paymentId, input.signature, config.keySecret)) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Payment could not be verified." });
      }
      // The order (amount and enrolment details) is read back from Razorpay, so nothing the browser sends is trusted.
      const order = await fetchRazorpayOrder(config, input.orderId).catch(() => null);
      const notes = order?.notes ?? {};
      const payload = {
        name: (notes.parent || "SkillConnect parent").slice(0, 120),
        organization: null,
        email: notes.email || "skillconnect@thesunex.com",
        phone: notes.phone || null,
        solution: "education" as const,
        industry: "other" as const,
        message: `PAID ENROLMENT (Razorpay). Course: ${notes.course ?? "unknown"}. Level: ${notes.level ?? "?"}. Child: ${notes.child ?? "?"}. Amount: ₹${order ? order.amount / 100 : "?"}. Order: ${input.orderId}. Payment: ${input.paymentId}. Order status: ${order?.status ?? "not checked"}.`,
      };
      try {
        if (!isDotnetApiEnabled()) await createContactInquiry({ ...payload, idempotencyKey: `rzp_${input.paymentId}`.slice(0, 72) });
        else await submitContactInquiry(payload, ctx.req.ip, contactClientFingerprint(ctx.req.headers));
        void sendEnquiryAlert({ ...payload, savedToDatabase: true, kind: "paid-enrolment" });
      } catch (cause) {
        void sendEnquiryAlert({ ...payload, savedToDatabase: false, kind: "paid-enrolment" });
        // The payment itself succeeded; never show the parent an error for a bookkeeping problem.
        logger.error({ event: "paid_enrolment_record_failed", orderId: input.orderId, paymentId: input.paymentId, errorType: cause instanceof Error ? cause.name : "unknown" }, "paid enrolment could not be recorded");
      }
      logger.info({ event: "paid_enrolment", orderId: input.orderId, paymentId: input.paymentId }, "paid enrolment verified");
      return { success: true as const, paymentId: input.paymentId };
    }),
  }),
});

export type AppRouter = typeof appRouter;
