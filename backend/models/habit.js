// backend/models/Habit.js
import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  icon: {
    type: String,
    default: "🎯",
  },
  emoji: {
    type: String,
    required: true,
    default: "🎯",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly'],
    default: 'daily',
  },
  target: {
    type: Number,
    default: 1,
  },
  time: {
    type: String,
    default: '',
  },
  timeFrom: {
    type: String,
    default: '',
  },
  timeTo: {
    type: String,
    default: '',
  },
  completedDates: [{
    type: String, // Format: YYYY-MM-DD
  }],
  streak: {
    type: Number,
    default: 0,
  },
  startTime: {
    type: String, // Format: HH:mm
    default: '',
  },
  endTime: {
    type: String, // Format: HH:mm
    default: '',
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'missed'],
    default: 'pending',
  },
  // Soft-delete fields — set by the streak monitor cron instead of hard-deleting.
  // All queries MUST filter { isDeleted: { $ne: true } } to exclude soft-deleted habits.
  isDeleted: {
    type: Boolean,
    default: false,
    index: true,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

// ✅ Prevent OverwriteModelError when using nodemon or ES modules
export default mongoose.models.Habit || mongoose.model("Habit", habitSchema);