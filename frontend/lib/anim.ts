import type { Variants, Transition } from 'framer-motion';

// Apple-style expo-out easing: fast start, slow finish
export const appleEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Legacy alias kept so existing imports don't break
export const easeOutQuint = appleEase;

// Timing constants (ms)
export const duration = {
  xs: 150,
  sm: 220,
  md: 350,
  lg: 500,
} as const;

const _t = (ms: number): Transition => ({ duration: ms / 1000, ease: appleEase });

// Reusable animation variants
export const variants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit:    { opacity: 0 },
    transition: _t(duration.sm),
  },

  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: -10 },
    transition: _t(duration.md),
  },

  scaleIn: {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    exit:    { opacity: 0, scale: 0.96 },
    transition: _t(duration.md),
  },

  staggerContainer: {
    animate: {
      transition: { staggerChildren: 0.06, delayChildren: 0.04 },
    },
  },
} as const;

export const fadeInFrom = (y = 20) => ({
  initial:    { opacity: 0, y },
  animate:    { opacity: 1, y: 0 },
  transition: _t(duration.md),
});

export const pageTransition = {
  initial:    { opacity: 0, y: 6 },
  animate:    { opacity: 1, y: 0 },
  exit:       { opacity: 0, y: -4 },
  transition: _t(duration.sm),
};

export const modalVariants = {
  backdrop: {
    initial:    { opacity: 0 },
    animate:    { opacity: 1 },
    exit:       { opacity: 0 },
    transition: { duration: duration.sm / 1000 } satisfies Transition,
  },
  modal: {
    initial:    { opacity: 0, scale: 0.96, y: 16 },
    animate:    { opacity: 1, scale: 1,    y: 0  },
    exit:       { opacity: 0, scale: 0.96, y: 8  },
    transition: _t(duration.md),
  },
};

// --- Scroll-reveal variants (use with whileInView) ---

export const staggerReveal: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

// Fast stagger for dense grids
export const staggerFast: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.045, delayChildren: 0.02 },
  },
};

// Child item: fade up
export const revealItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.48, ease: appleEase } },
};

// Child item: lighter lift for smaller elements
export const revealItemSmall: Variants = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.38, ease: appleEase } },
};

// Single element scroll reveal (spread into motion props)
export const scrollReveal = (delay = 0) => ({
  initial:       { opacity: 0, y: 24 },
  whileInView:   { opacity: 1, y: 0 },
  viewport:      { once: true, margin: '-80px' as const },
  transition:    { duration: 0.5, ease: appleEase, delay } satisfies Transition,
});

// Hover lift for interactive cards / buttons
export const hoverLift = {
  whileHover: { y: -3, transition: { duration: 0.2, ease: appleEase } satisfies Transition },
  whileTap:   { scale: 0.98, transition: { duration: 0.1 } satisfies Transition },
};
