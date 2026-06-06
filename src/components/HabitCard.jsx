import { useState } from 'react';
import { motion } from 'framer-motion';
import { format, isSameDay } from 'date-fns';
import { Flame, Trash2, Check, AlertTriangle, Clock, XCircle } from 'lucide-react';

function HabitCard({ habit, selectedDate, refetch, completeHabit, deleteHabit }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isToday = isSameDay(selectedDate, new Date());
  const isCompleted = habit.completedDates.some(date =>
    isSameDay(new Date(date), selectedDate)
  );

  const weeklyProgress = habit.frequency === 'weekly'
    ? Math.min((habit.completedDates.length / habit.target) * 100, 100)
    : 0;

  const handleCompletion = async () => {
    if (!isToday) return;
    await completeHabit(habit._id, selectedDate);
    refetch();
  };

const handleDelete = async () => {
  setIsDeleting(true);
  setShowConfirm(false);

  try {
    const success = await deleteHabit(habit._id);
    if (success) {
      // State is updated immediately in deleteHabit function
      refetch(); // Refresh to update UI and stats
    }
  } catch (error) {
    console.error('Error during deletion:', error);
  } finally {
    setIsDeleting(false);
  }
};

  return (
    <motion.div
      className={`rounded-2xl p-6 transition-all duration-300 border ${
        isCompleted 
          ? 'bg-gradient-to-br from-success-50 to-primary-50 border-success-200 shadow-soft' 
          : 'bg-white border-neutral-200 shadow-soft hover:shadow-elevated'
      } ${isDeleting ? 'opacity-50 pointer-events-none' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={!isDeleting ? { y: -4, boxShadow: '0 8px 24px rgba(245, 110, 74, 0.12)' } : {}}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4 flex-1">
          {/* Premium emoji circle with gradient animation */}
          <motion.div
            className={`w-16 h-16 rounded-full flex items-center justify-center text-4xl font-bold ${
              isCompleted 
                ? 'bg-gradient-to-br from-success-400 to-success-500 shadow-lg' 
                : 'bg-gradient-to-br from-primary-100 to-primary-200 shadow-soft'
            }`}
            animate={isCompleted ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.6 }}
          >
            <span role="img" aria-label="habit emoji">{habit.emoji || '🎯'}</span>
          </motion.div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-lg text-neutral-900 leading-tight">{habit.name}</h3>
            <p className="text-sm font-medium text-neutral-600">
              {habit.frequency === 'daily' ? 'Daily' : `${habit.target}x per week`}
            </p>
            {(habit.timeFrom || habit.time) && (
              <div className="flex items-center gap-1 mt-1 text-xs text-neutral-500">
                <Clock size={12} />
                <span>
                  {habit.timeFrom && habit.timeTo ? `${habit.timeFrom} - ${habit.timeTo}` : habit.time}
                </span>
              </div>
            )}
            {habit.description && (
              <p className="text-xs text-neutral-500 italic mt-1 truncate">{habit.description}</p>
            )}
          </div>
        </div>
        {/* Delete button */}
        <motion.button
          className="p-2 text-neutral-400 hover:text-danger-600 rounded-full hover:bg-danger-50 transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={() => setShowConfirm(true)}
          disabled={isDeleting}
          aria-label={`Delete ${habit.name} habit`}
          title={`Delete ${habit.name}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Trash2 size={18} aria-hidden="true" />
        </motion.button>
      </div>

      {showConfirm && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="presentation"
          onClick={() => !isDeleting && setShowConfirm(false)}
        >
          <motion.div 
            className="bg-white rounded-2xl shadow-premium p-6 w-full max-w-sm flex flex-col"
            role="alertdialog"
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-desc"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-danger-100 flex items-center justify-center">
                <AlertTriangle size={24} className="text-danger-600" />
              </div>
              <h2 id="delete-dialog-title" className="text-lg font-display font-bold text-neutral-900">
                Delete Habit?
              </h2>
            </div>
            
            <p id="delete-dialog-desc" className="mb-2 text-neutral-700">
              Are you sure you want to delete <span className="font-semibold text-primary-600">{habit.name}</span>?
            </p>
            <p className="mb-6 text-sm text-neutral-500">
              This action cannot be undone. All progress and streak data will be lost.
            </p>
            
            <div className="flex gap-3">
              <motion.button
                className="flex-1 bg-neutral-100 text-neutral-700 py-3 px-4 rounded-xl font-semibold hover:bg-neutral-200 transition-colors min-h-[44px]"
                onClick={() => setShowConfirm(false)}
                disabled={isDeleting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              <motion.button
                className="flex-1 bg-danger-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-danger-600 transition-all min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleDelete}
                disabled={isDeleting}
                whileHover={!isDeleting ? { scale: 1.02 } : {}}
                whileTap={!isDeleting ? { scale: 0.98 } : {}}
              >
                {isDeleting ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Delete'
                )}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Streak and progress section */}
      <div className="mb-4 space-y-3">
        {/* Streak counter */}
        <motion.div 
          className="flex items-center gap-2"
          animate={isCompleted ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          <Flame size={18} className="text-primary-600" />
          <span className="font-display font-bold text-lg text-primary-600">{habit.streak}</span>
          <span className="text-sm font-medium text-neutral-600">day streak</span>
        </motion.div>

        {/* Status indicator with premium styling */}
        <div className="flex items-center gap-2">
          {habit.status === 'completed' ? (
            <motion.div 
              className="flex items-center gap-2 px-3 py-1 bg-success-100 rounded-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring' }}
            >
              <Check size={14} className="text-success-600" />
              <span className="text-xs font-semibold text-success-600">Completed</span>
            </motion.div>
          ) : habit.status === 'missed' ? (
            <div className="flex items-center gap-2 px-3 py-1 bg-danger-100 rounded-full">
              <XCircle size={14} className="text-danger-600" />
              <span className="text-xs font-semibold text-danger-600">Missed</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1 bg-warning-100 rounded-full">
              <Clock size={14} className="text-warning-600" />
              <span className="text-xs font-semibold text-warning-600">Pending</span>
            </div>
          )}
        </div>

        {/* Weekly progress bar */}
        {habit.frequency === 'weekly' && (
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-neutral-600">Weekly Progress</span>
              <span className="text-xs font-semibold text-primary-600">
                {Math.round(habit.completedDates.length)}/{habit.target}
              </span>
            </div>
            <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${weeklyProgress}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Completion button with premium styling */}
      <motion.button
        onClick={handleCompletion}
        disabled={!isToday || isCompleted || isDeleting}
        className={`w-full px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 min-h-[48px] ${
          isCompleted
            ? 'bg-gradient-to-r from-success-400 to-success-500 text-white border border-success-300'
            : isToday
            ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg hover:shadow-xl'
            : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
        }`}
        whileHover={isToday && !isCompleted ? { scale: 1.02, y: -2 } : {}}
        whileTap={isToday && !isCompleted ? { scale: 0.98 } : {}}
        animate={isCompleted ? { completion: [0, 0.5, 1] } : {}}
        transition={isCompleted ? { duration: 0.6 } : {}}
        aria-label={isCompleted ? `${habit.name} - Completed` : isToday ? `Mark ${habit.name} as completed` : `${habit.name} - Not available for this date`}
        type="button"
      >
        {isCompleted ? (
          <motion.div 
            className="flex items-center gap-2"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <Check size={20} className="text-white" />
            <span>Completed Today!</span>
          </motion.div>
        ) : isToday ? (
          <span>✓ Mark as Completed</span>
        ) : (
          <>
            <AlertTriangle size={16} />
            <span>Not Available Today</span>
          </>
        )}
      </motion.button>
    </motion.div>
  );
}

export default HabitCard;
