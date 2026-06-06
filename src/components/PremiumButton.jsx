import { motion } from 'framer-motion';

/**
 * Reusable Button component with premium styling
 * Variants: primary (warm orange), secondary (white), tertiary (ghost), danger (red)
 * Sizes: sm, md (default), lg
 */
export default function PremiumButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  className = '',
  type = 'button',
  ...props
}) {
  // Size-based padding and text
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  }[size];

  // Variant-based styling
  const variantClasses = {
    primary: `bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-lg hover:shadow-xl ${
      disabled ? 'opacity-50' : ''
    }`,
    secondary: `bg-white border-2 border-neutral-200 text-neutral-700 hover:border-primary-300 hover:bg-primary-50 ${
      disabled ? 'opacity-50' : ''
    }`,
    tertiary: `bg-transparent text-primary-600 hover:bg-primary-50 ${disabled ? 'opacity-50' : ''}`,
    danger: `bg-danger-500 text-white hover:bg-danger-600 shadow-lg hover:shadow-xl ${
      disabled ? 'opacity-50' : ''
    }`,
  }[variant];

  const baseClasses =
    'min-h-[44px] min-w-[44px] rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed';

  const fullWidthClass = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${fullWidthClass} ${className}`}
      whileHover={!disabled ? { scale: 1.02, y: -1 } : {}}
      whileTap={!disabled ? { scale: 0.98, y: 0 } : {}}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {loading && (
        <motion.span
          className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      )}
      {children}
    </motion.button>
  );
}
