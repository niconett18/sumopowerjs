"use client";
import { motion } from "framer-motion";

const fade = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const pillars = [
  { title: "Honest capacity", desc: "Capacity claims reflect tested nominal performance—no inflated numbers." },
  { title: "Batch testing", desc: "Random-sample QC with report IDs and traceability." },
  { title: "Safe by design", desc: "Cell selection + BMS tuned for everyday temperature and load." },
  { title: "Clear fitment", desc: "Per-model fit checks and connector alignment to reduce returns." },
  { title: "Responsive support", desc: "Setup help, troubleshooting, and fast warranty processing." },
];

export default function ValuePillars() {
  return (
    <section className="py-14 md:py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white text-center">What we stand for</h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              variants={fade}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-black/5 dark:border-white/10 p-5 bg-white dark:bg-neutral-900 shadow-sm"
            >
              <h3 className="font-semibold text-neutral-900 dark:text-white">{p.title}</h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">{p.desc}</p>
              <span className="mt-3 inline-block h-1 w-12 rounded-full bg-primary" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


