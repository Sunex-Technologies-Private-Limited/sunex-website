/*
 * SKILLCONNECT KIDS FEES (in Indian rupees, per level). Used by both the website and the payment server,
 * so the price a parent pays always comes from here, never from the browser.
 *
 * Leave a level empty and its "Pay & Enrol" button stays off ("Fee to be announced").
 * Example:  scratch: { 1: 4999, 2: 5999 },
 */
export type PayableLevel = 1 | 2;

export const kidsFees: Record<string, Partial<Record<PayableLevel, number>>> = {
  scratch: {},
  electricity: {},
  python: {},
  prompt: {},
  iot: {},
  robotics: {},
};

/** Fee in rupees for a course level, or null when not set yet. */
export function feeFor(courseId: string, level: number): number | null {
  const fee = kidsFees[courseId]?.[level as PayableLevel];
  return typeof fee === "number" && Number.isFinite(fee) && fee > 0 ? Math.round(fee) : null;
}

export const formatRupees = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;
