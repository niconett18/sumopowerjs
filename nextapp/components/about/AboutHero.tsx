"use client";
import { motion, useReducedMotion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function AboutHero() {
  const prefersReduced = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-900 py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-5xl text-center">
        <motion.p
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.6 }}
          className="text-sm font-semibold tracking-wide text-primary uppercase"
        >
          About Sumo Power
        </motion.p>
        <motion.h1
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.6 }}
          className="mt-3 text-3xl md:text-5xl font-extrabold text-neutral-900 dark:text-white"
        >
          Reliable replacement batteries—engineered for everyday performance
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.6 }}
          className="mt-4 text-base md:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed"
        >
          We design, test, and distribute high-quality mobile batteries with consistent capacity, safety, and
          after-sales support.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.6 }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            { label: "Active SKUs", value: "400+" },
            { label: "Avg. defect rate", value: "< 0.5%" },
            { label: "Warranty", value: "6–12 months" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-black/5 dark:border-white/10 bg-white/90 dark:bg-neutral-900/60 backdrop-blur p-4 shadow-sm relative"
            >
              <span className="absolute -top-1 left-4 h-1.5 w-10 rounded-full bg-primary" />
              <div className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">{s.value}</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-300">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute bottom-[-80px] right-[-80px] h-56 w-56 rounded-full bg-primary/20 blur-2xl" />
      </div>
    </section>
  );
}


