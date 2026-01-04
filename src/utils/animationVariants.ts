import type { Variants } from 'framer-motion';

/**
 * Mobile-optimized animation variants for Framer Motion
 * All animations use GPU-accelerated properties (transform, opacity) only
 */

// Tap animation for buttons and interactive elements
export const tapAnimation = {
  scale: 0.95,
  transition: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 17,
  },
};

// Button press with subtle rotation
export const buttonPress = {
  scale: 0.95,
  rotate: 2,
  transition: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 17,
  },
};

// Fade in with slide up
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
      duration: 0.4,
    },
  },
};

// Fade in with slide from left
export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
};

// Stagger container for lists
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// List item animation
export const listItem: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
};

// Modal animations
export const modalBackdrop: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
};

export const modalContent: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.15,
    },
  },
};

// Checkbox animations
export const checkboxVariants: Variants = {
  unchecked: {
    scale: 1,
    rotate: 0,
  },
  checked: {
    scale: [1, 1.2, 1],
    rotate: [0, 10, 0],
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

// Input focus animation
export const inputFocus = {
  scale: 1.02,
  transition: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 20,
  },
};

// Page transition variants
export const pageTransition = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 100 : -100,
  }),
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 30,
      duration: 0.3,
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -100 : 100,
    transition: {
      duration: 0.2,
    },
  }),
};

// Shake animation for errors
export const shakeAnimation = {
  x: [0, -10, 10, -10, 10, 0],
  transition: {
    duration: 0.4,
  },
};

// Pulse animation
export const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 0.3,
    ease: 'easeInOut',
  },
};

// Success animation
export const successAnimation = {
  scale: [1, 1.1, 1],
  transition: {
    duration: 0.5,
    ease: 'easeOut' as const,
  },
};

// Bottom nav item animation
export const navItemVariants: Variants = {
  inactive: {
    scale: 1,
    y: 0,
  },
  active: {
    scale: 1.1,
    y: -16,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 20,
    },
  },
};

// Card entrance animation
export const cardEntrance: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
};
