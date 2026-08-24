import { motion, useReducedMotion } from "framer-motion";
import React, { type ReactNode } from "react";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={`reveal ${className ?? ""}`.trim()}
      initial={false}
      whileInView={reducedMotion ? undefined : { opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -7% 0px", amount: 0.16 }}
      transition={{ duration: 0.58, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {!reducedMotion && <motion.span className="reveal__solar-disc" aria-hidden="true" initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: [0, 0.66, 0.42], scale: [0.92, 1, 1.03] }} viewport={{ once: true, margin: "0px 0px -7% 0px", amount: 0.16 }} transition={{ duration: 1.05, delay, ease: [0.16, 1, 0.3, 1] }} />}
      {!reducedMotion && <motion.span className="reveal__solar-sweep" aria-hidden="true" initial={{ x: "-120%", opacity: 0 }} whileInView={{ x: "120%", opacity: [0, 0.42, 0] }} viewport={{ once: true, margin: "0px 0px -7% 0px", amount: 0.16 }} transition={{ duration: 0.74, delay: delay + 0.03, ease: [0.16, 1, 0.3, 1] }} />}
      {children}
    </motion.div>
  );
}
