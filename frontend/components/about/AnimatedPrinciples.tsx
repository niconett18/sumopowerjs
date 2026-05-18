'use client';
import { motion } from 'framer-motion';
import { staggerReveal, revealItem } from '../../lib/anim';

interface Principle {
  num: string;
  title: string;
  desc: string;
}

export function AnimatedPrinciples({ principles }: { principles: Principle[] }) {
  return (
    <motion.div
      variants={staggerReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
    >
      {principles.map((p) => (
        <motion.div
          key={p.num}
          variants={revealItem}
          className="grid grid-cols-1 lg:grid-cols-[60px_1.2fr_1.5fr] gap-8 py-7 border-b border-hairline items-start"
        >
          <span className="font-mono text-[13px] text-ink-mute">{p.num}</span>
          <h3 className="font-medium text-[20px] text-ink leading-snug">{p.title}</h3>
          <p className="text-[15px] text-ink-3 leading-relaxed">{p.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
