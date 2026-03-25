import mongoose from "mongoose";

const userChecklistProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    checklist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Checklist",
      required: [true, "Checklist item is required"],
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: [true, "Task is required"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate progress record for same user and checklist
userChecklistProgressSchema.index({ user: 1, checklist: 1 }, { unique: true });

const UserChecklistProgress = mongoose.model(
  "UserChecklistProgress",
  userChecklistProgressSchema
);

export default UserChecklistProgress;