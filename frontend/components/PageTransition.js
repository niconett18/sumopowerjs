'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { pageTransition } from '../lib/anim';

export default function PageTransition({ children }) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) return <div>{children}</div>;

  return (
    <motion.div
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={pageTransition.transition}
    >
      {children}
    </motion.div>
  );
}
