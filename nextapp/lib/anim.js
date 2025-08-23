// Animation utilities and shared variants for framer-motion
export const ENABLE_ANIMATIONS = process.env.NEXT_PUBLIC_ANIM === '1';

// Timing constants (ms)
export const duration = {
  xs: 150,
  sm: 220,
  md: 320,
  lg: 480,
};

// Easing function
export const easeOutQuint = [0.22, 1, 0.36, 1];

// Reusable animation variants
export const variants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: duration.sm / 1000, ease: easeOutQuint }
  },

  slideUp: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: duration.sm / 1000, ease: easeOutQuint }
  },

  scaleIn: {
    initial: { opacity: 0, scale: 0.94 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.94 },
    transition: { duration: duration.md / 1000, ease: easeOutQuint }
  },

  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.04
      }
    }
  }
};

// Helper function for creating fade-in-from variants
export const fadeInFrom = (y = 16) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: duration.sm / 1000, ease: easeOutQuint }
});

// Page transition variants
export const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: duration.md / 1000, ease: easeOutQuint }
};

// Modal variants
export const modalVariants = {
  backdrop: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: duration.sm / 1000 }
  },
  modal: {
    initial: { opacity: 0, scale: 0.94 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.94 },
    transition: { duration: duration.md / 1000, ease: easeOutQuint }
  }
};

// Utility function to conditionally enable animations
export const withAnimation = (component, fallback = null) => {
  return ENABLE_ANIMATIONS ? component : fallback;
};
