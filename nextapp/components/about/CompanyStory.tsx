"use client";
import { motion } from "framer-motion";

const fade = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function CompanyStory() {
  return (
    <section className="py-14 md:py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <motion.div
            variants={fade}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.4 }}
            className="md:col-span-7"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">Our story</h2>
            <p className="mt-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Founded to make battery replacement simple and dependable, Sumo Power focuses on safe chemistry, accurate
              capacity claims, and consistent fit across models. We partner with audited manufacturing lines and test
              every batch before it ships.
            </p>
            <h3 className="mt-8 text-xl md:text-2xl font-semibold text-neutral-900 dark:text-white">What we do</h3>
            <p className="mt-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
              We curate cells, design protection circuits, and package them with quality control documentation. Each
              model is validated for size tolerances, connector alignment, and charge/discharge cycles.
            </p>
          </motion.div>
          <motion.aside
            variants={fade}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.4 }}
            className="md:col-span-5 rounded-2xl border border-black/5 dark:border-white/10 p-6 bg-white dark:bg-neutral-900 shadow-sm"
          >
            <h4 className="font-semibold text-neutral-900 dark:text-white">Focus areas</h4>
            <ul className="mt-3 space-y-2 text-neutral-700 dark:text-neutral-300">
              {[
                "Cycle life targets: 500+ cycles to ≥80% capacity",
                "IC protection: Over-charge, over-discharge, short-circuit",
                "Compliance: UN38.3, MSDS, RoHS (if applicable)",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}


