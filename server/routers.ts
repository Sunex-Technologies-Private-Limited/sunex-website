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

export const contactInputSchema = z.object({
  name: z.string().trim().min(2, "Please provide your name.").max(120),
  organization: z.string().trim().max(160).optional().or(z.literal("")),
  email: z.string().trim().email("Please provide a valid email address.").max(320),
  phone: z.string().trim().max(60).optional().or(z.literal("")),
  solution: z.enum(["urbantree", "education", "healthcare", "partnership", "csr", "other"]),
  industry: z.enum(["gov", "smartcity", "edu", "health", "mfg", "realestate", "ngo", "other"]),
  message: z.string().trim().min(10, "Please share a little more about your project or challenge.").max(5000),
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
      if (!isDotnetApiEnabled()) {
        const legacyResult = await createContactInquiry(payload);
        return { success: true as const, id: legacyResult.id };
      }
      try {
        const result = await submitContactInquiry(payload, ctx.req.ip, contactClientFingerprint(ctx.req.headers));
        return { success: true as const, id: result.id };
      } catch (cause) {
        logger.warn({ event: "contact_submission_unavailable", errorType: cause instanceof Error ? cause.name : "unknown" }, "contact submission unavailable");
        throw new TRPCError({ code: "SERVICE_UNAVAILABLE", message: "The enquiry service is temporarily unavailable." });
      }
    }),
  }),
});

export type AppRouter = typeof appRouter;
