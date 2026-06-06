import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import StreakRestore from '../models/streakRestore.js';
import Habit from '../models/habit.js';

const router = express.Router();

// Get user's restore chances for current month
router.get('/chances', authMiddleware, async (req, res) => {
  try {
    const now = new Date();
    const currentMonth = now.getMonth() + 1; // getMonth() returns 0-11
    const currentYear = now.getFullYear();

    let restoreRecord = await StreakRestore.findOne({
      user: req.user.id,
      month: currentMonth,
      year: currentYear
    });

    // If no record exists for this month, create one with 0 used chances
    if (!restoreRecord) {
      restoreRecord = new StreakRestore({
        user: req.user.id,
        month: currentMonth,
        year: currentYear,
        usedChances: 0
      });
      await restoreRecord.save();
    }

    const remainingChances = 5 - restoreRecord.usedChances;

    res.json({
      success: true,
      restoreChances: remainingChances,
      usedChances: restoreRecord.usedChances,
      month: currentMonth,
      year: currentYear
    });
  } catch (err) {
    console.error('Error fetching restore chances:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch restore chances' });
  }
});

// Restore a streak (use one chance)
// Restore a streak (use one chance)
router.post('/restore', authMiddleware, async (req, res) => {
  try {
    const { habitId, missedDate } = req.body;
    const userId = req.user.id;

    if (!habitId || !missedDate) {
      return res.status(400).json({
        success: false,
        message: 'habitId and missedDate are required'
      });
    }

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    let restoreRecord = await StreakRestore.findOne({
      user: userId,
      month: currentMonth,
      year: currentYear
    });

    if (!restoreRecord) {
      restoreRecord = new StreakRestore({
        user: userId,
        month: currentMonth,
        year: currentYear,
        usedChances: 0
      });
    }

    if (restoreRecord.usedChances >= 5) {
      return res.status(400).json({
        success: false,
        message: 'No restore chances remaining this month'
      });
    }

    const habit = await Habit.findOne({ _id: habitId, user: userId });
    if (!habit) {
      return res.status(404).json({ success: false, message: 'Habit not found' });
    }

    // ✅ Treat restore as COMPLETION of the missed date
    const alreadyCompleted = habit.completedDates.some(
      d => d.toISOString().split('T')[0] === missedDate
    );

    if (!alreadyCompleted) {
      habit.completedDates.push(new Date(missedDate));
    }

    // Increment restore usage
    restoreRecord.usedChances += 1;

    await habit.save();
    await restoreRecord.save();

    res.json({
      success: true,
      message: 'Streak restored and marked as completed',
      restoreChances: 5 - restoreRecord.usedChances,
      habitName: habit.name
    });

  } catch (err) {
    console.error('Error restoring streak:', err);
    res.status(500).json({ success: false, message: 'Failed to restore streak' });
  }
});

export default router;
