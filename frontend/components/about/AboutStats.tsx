'use client';
import { motion } from 'framer-motion';
import { CountUp } from '../ui/CountUp';
import { staggerReveal, revealItem } from '../../lib/anim';

export function AboutStats() {
  return (
    <motion.div
      className="grid grid-cols-2 gap-6 pt-8 border-t border-hairline"
      variants={staggerReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
    >
      <motion.div variants={revealItem}>
        <div className="text-2xl font-semibold text-ink">
          <CountUp to={211} suffix="+" />
        </div>
        <div className="text-[13px] text-ink-3 mt-1">Tipe baterai tersedia</div>
      </motion.div>
      <motion.div variants={revealItem}>
        <div className="text-2xl font-semibold text-ink">
          <CountUp to={34} />
        </div>
        <div className="text-[13px] text-ink-3 mt-1">Kota jangkauan kirim</div>
      </motion.div>
    </motion.div>
  );
}
