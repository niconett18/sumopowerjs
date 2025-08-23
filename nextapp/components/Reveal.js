'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ENABLE_ANIMATIONS, duration, easeOutQuint } from '../lib/anim';

export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  once = true,
  className = '',
  ...props
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    margin: '0px 0px -12% 0px'
  });

  if (!ENABLE_ANIMATIONS) {
    const Component = as;
    return (
      <Component className={className} {...props}>
        {children}
      </Component>
    );
  }

  const MotionComponent = motion[as] || motion.div;

  return (
    <MotionComponent
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{
        duration: duration.sm / 1000,
        ease: easeOutQuint,
        delay
      }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
