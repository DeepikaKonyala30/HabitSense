import { motion } from 'framer-motion';
import PremiumButton from './PremiumButton';

/**
 * Empty state component for when no habits exist
 */
export default function EmptyState({ onAddHabit, title = 'No habits yet', description = 'Start your streak journey by creating your first habit!' }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Decorative emoji area */}
      <motion.div
        className="text-6xl mb-6"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        🎯
      </motion.div>

      <h3 className="text-2xl font-display font-bold text-neutral-900 mb-2 text-center">
        {title}
      </h3>

      <p className="text-neutral-600 text-center max-w-sm mb-8">
        {description}
      </p>

      <PremiumButton
        onClick={onAddHabit}
        size="lg"
        className="gap-2"
      >
        <span>+</span>
        Add Your First Habit
      </PremiumButton>

      {/* Decorative elements */}
      <div className="mt-12 grid grid-cols-3 gap-4 text-center w-full max-w-md">
        <motion.div
          className="p-4 bg-primary-50 rounded-xl"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-2xl mb-1">🔥</div>
          <p className="text-xs font-semibold text-primary-600">Build Streaks</p>
        </motion.div>
        <motion.div
          className="p-4 bg-success-50 rounded-xl"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-2xl mb-1">✅</div>
          <p className="text-xs font-semibold text-success-600">Stay Consistent</p>
        </motion.div>
        <motion.div
          className="p-4 bg-purple-50 rounded-xl"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-2xl mb-1">🏆</div>
          <p className="text-xs font-semibold text-purple-600">Achieve Goals</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
