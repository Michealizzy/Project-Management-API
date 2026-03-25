import mongoose from "mongoose";

const checklistSchema = new mongoose.Schema(
  {
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: [true, "Task is required"],
    },
    title: {
      type: String,
      required: [true, "Checklist title is required"],
      trim: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Checklist creator is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Checklist = mongoose.model("Checklist", checklistSchema);

export default Checklist;