import { motion } from 'framer-motion';

/**
 * Reusable Card component with premium styling
 * Variants: default (white), gradient (for completion), elevated (with more shadow)
 */
export default function PremiumCard({
  children,
  variant = 'default',
  className = '',
  onClick,
  elevated = false,
  hover = true,
  gradient,
  ...props
}) {
  const variantClasses = {
    default: 'bg-white border border-neutral-200',
    gradient: gradient || 'bg-gradient-to-br from-primary-100 to-primary-200 border border-primary-300',
    elevated: 'bg-white border border-neutral-100 shadow-premium',
  }[variant];

  const baseClasses = `
    rounded-2xl p-6 transition-all duration-300 
    ${hover ? 'hover:shadow-elevated' : ''} 
    ${elevated ? 'shadow-elevated' : 'shadow-soft'}
    ${onClick ? 'cursor-pointer' : ''}
  `.trim();

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses} ${className}`}
      whileHover={hover ? { y: -4 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
}
