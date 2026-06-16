// backend/models/Circle.js
import mongoose from "mongoose";

const circleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: "",
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  privacy: {
    type: String,
    enum: ["public", "private"],
    default: "public",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  habits: {
    type: [String],
    default: [],
  },
  category: {
    type: String,
    default: "Other",
  },
  image: {
    type: String,
    default: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
  },
  members: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      joinedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
}, { timestamps: true });

// Add text index on name and description for search support
circleSchema.index({ name: "text", description: "text" });

export default mongoose.models.Circle || mongoose.model("Circle", circleSchema);