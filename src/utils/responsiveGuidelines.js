/**
 * Responsive Design Guidelines for StreakMate
 * Mobile-first approach with breakpoint strategy
 */

/**
 * Tailwind Breakpoints Used:
 * sm: 640px (mobile landscape)
 * md: 768px (tablet)
 * lg: 1024px (laptop)
 * xl: 1280px (desktop)
 * 2xl: 1536px (large desktop)
 */

/**
 * Mobile-First Scaling Strategy:
 * 
 * Mobile (< 640px):
 * - Single column layouts
 * - Full-width cards (px-4 padding)
 * - Stacked navigation
 * - Larger touch targets (44x44px minimum)
 * - Simplified visualizations
 * 
 * Tablet (640px - 1024px):
 * - 2-column grids
 * - Drawer navigation
 * - Optimized spacing
 * 
 * Desktop (> 1024px):
 * - 3-4 column grids
 * - Fixed sidebar
 * - Full feature set
 * - Optimal spacing
 */

/**
 * Component-Specific Responsive Rules:
 */

// Habit Grid
export const habitGridClasses = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4';

// Stats Grid
export const statsGridClasses = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4';

// Modal Sizing
export const modalClasses = {
  container: 'fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm',
  content: 'bg-white rounded-2xl shadow-premium w-full max-w-sm',
};

// Card Padding (responsive)
export const cardPadding = {
  mobile: 'px-4 py-6',
  tablet: 'px-6 py-8',
  desktop: 'px-8 py-10',
};

// Container widths
export const containerClasses = 'container mx-auto px-4 sm:px-6 lg:px-8';

/**
 * Touch target sizes:
 * Mobile: 44x44px minimum (WCAG AAA standard)
 * All buttons use: min-h-[44px] min-w-[44px]
 */

/**
 * Typography scaling:
 * Mobile: Base 16px
 * Tablet: Base 18px
 * Desktop: Base 16px (normalized)
 */

/**
 * Spacing scale (8px base):
 * xs: 4px (0.5rem)
 * sm: 8px (1rem)
 * md: 12px (1.5rem)
 * lg: 16px (2rem)
 * xl: 24px (3rem)
 * 2xl: 32px (4rem)
 */

/**
 * Overflow prevention:
 * 1. Container always uses px-4 minimum
 * 2. Max-width set on large content
 * 3. Overflow-x hidden on body element
 * 4. Text truncation with line-clamp-X when needed
 */

export default {
  habitGridClasses,
  statsGridClasses,
  modalClasses,
  cardPadding,
  containerClasses,
};
