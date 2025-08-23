'use client';

import { motion } from 'framer-motion';
import { ENABLE_ANIMATIONS, pageTransition } from '../lib/anim';

export default function PageTransition({ children }) {
  if (!ENABLE_ANIMATIONS) {
    return <div>{children}</div>;
  }

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
