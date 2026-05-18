'use client';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { duration, appleEase } from '../lib/anim';

export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  once = true,
  className = '',
  ...props
}) {
  const ref = useRef(null);
  const shouldReduce = useReducedMotion();
  const isInView = useInView(ref, { once, margin: '0px 0px -12% 0px' });
  const MotionComponent = motion[as] || motion.div;

  return (
    <MotionComponent
      ref={ref}
      className={className}
      initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
      animate={isInView
        ? (shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0 })
        : (shouldReduce ? { opacity: 0 } : { opacity: 0, y: 18 })}
      transition={{ duration: duration.md / 1000, ease: appleEase, delay }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
