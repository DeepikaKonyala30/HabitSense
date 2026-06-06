/**
 * Framer Motion animation presets for StreakMate Premium UI
 * Consistent, reusable animations across the app
 */

export const animationPresets = {
  // Card animations
  cardEntry: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  
  cardHover: {
    whileHover: { y: -4, boxShadow: '0 8px 24px rgba(245, 110, 74, 0.12)' },
  },

  // Button animations
  buttonPress: {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  },

  // Page entry animations
  pageEntry: {
    container: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.4 },
    },
    item: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
    },
  },

  // Completion celebration
  completion: {
    checkmark: {
      initial: { scale: 0, rotate: -45 },
      animate: { scale: 1, rotate: 0 },
      transition: { type: 'spring', stiffness: 500, damping: 30, delay: 0.2 },
    },
    background: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.3 },
    },
  },

  // Loading animations
  skeletonPulse: {
    animate: { opacity: [1, 0.7, 1] },
    transition: { duration: 2, repeat: Infinity },
  },

  spinner: {
    animate: { rotate: 360 },
    transition: { duration: 1, repeat: Infinity, ease: 'linear' },
  },

  // Streak counter bounce
  streakBounce: {
    animate: { scale: [1, 1.1, 1] },
    transition: { duration: 0.6, type: 'spring' },
  },

  // Modal backdrop
  backdropFade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  },

  // Modal content
  modalSlideIn: {
    initial: { scale: 0.9, opacity: 0, y: 20 },
    animate: { scale: 1, opacity: 1, y: 0 },
    exit: { scale: 0.9, opacity: 0, y: 20 },
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },

  // List animations with stagger
  listContainer: {
    initial: 'hidden',
    animate: 'visible',
    variants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2,
        },
      },
    },
  },

  listItem: {
    variants: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    transition: { duration: 0.3 },
  },

  // Stat card animations
  statCardEntry: {
    initial: { opacity: 0, y: 20, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  },

  statCardHover: {
    whileHover: { scale: 1.05, y: -4 },
    whileTap: { scale: 0.98 },
  },

  // Icon rotation on hover
  iconHover: {
    whileHover: { rotate: 10 },
    whileTap: { rotate: -5 },
    transition: { type: 'spring' },
  },

  // Smooth color transition
  colorTransition: {
    transition: { duration: 0.3 },
  },

  // Empty state floating animation
  emptyStateFloat: {
    animate: { y: [0, -10, 0] },
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
};

// Reusable container for staggered children
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Reusable item for staggered animations
export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};
