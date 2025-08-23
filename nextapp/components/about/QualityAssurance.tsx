"use client";
import { motion } from "framer-motion";

export default function QualityAssurance() {
  return (
    <section className="py-14 md:py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true, amount: 0.5 }}
            className="rounded-2xl border border-black/5 dark:border-white/10 p-6 bg-white dark:bg-neutral-900 shadow-sm"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">Quality & Compliance</h2>
            <ul className="mt-4 space-y-2 text-neutral-700 dark:text-neutral-300">
              {[
                "Incoming cell audits and capacity sampling per batch",
                "UN38.3 shipping certification + MSDS available on request",
                "RoHS/REACH statements for materials where applicable",
                "Thermal + cycle tests on representative SKUs",
              ].map((pt) => (
                <li key={pt} className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">No external brand references; keep copy Sumo Power–centric.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            viewport={{ once: true, amount: 0.5 }}
            className="rounded-2xl border border-black/5 dark:border-white/10 p-6 bg-white dark:bg-neutral-900 shadow-sm"
          >
            <h3 className="font-semibold text-neutral-900 dark:text-white">Process</h3>
            {/* Simple infographic substitute */}
            <div className="mt-4 grid grid-cols-5 items-center text-center gap-2 text-sm">
              {['Cells', 'BMS', 'Pack', 'Test', 'Ship'].map((s, i) => (
                <div key={s} className="rounded-xl border border-black/5 dark:border-white/10 p-3">
                  {s}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


