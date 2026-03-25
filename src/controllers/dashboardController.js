import User from "../models/User.js";
import Project from "../models/Project.js";
import Task from "../models/Task.js";
import Checklist from "../models/Checklist.js";
import UserChecklistProgress from "../models/UserChecklistProgress.js";

/**
 * GET /dashboard/journey
 * Returns dashboard summary for a user: projects, tasks, checklist progress
 */
export const getDashboardJourney = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get all projects where user is owner or member
    const projects = await Project.find({
      $or: [{ owner: userId }, { members: userId }],
    }).lean();

    const dashboard = [];

    for (const project of projects) {
      // Get all tasks in project
      const tasks = await Task.find({ project: project._id }).lean();

      const tasksWithProgress = [];

      for (const task of tasks) {
        // Get all checklist items for task
        const checklists = await Checklist.find({ task: task._id }).lean();

        // Get progress for this user
        const progress = await UserChecklistProgress.find({
          task: task._id,
          user: userId,
        }).lean();

        // Calculate completed checklist items
        const completedCount = progress.filter((p) => p.completed).length;
        const totalCount = checklists.length;

        tasksWithProgress.push({
          ...task,
          totalChecklist: totalCount,
          completedChecklist: completedCount,
          checklistProgress:
            totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100),
        });
      }

      dashboard.push({
        ...project,
        tasks: tasksWithProgress,
      });
    }

    res.status(200).json({
      status: "success",
      data: dashboard,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

/**
 * PATCH /checklist/:id/progress
 * Mark a checklist item as completed or not completed for the logged-in user
 */
export const updateChecklistProgress = async (req, res) => {
  try {
    const userId = req.user._id;
    const checklistId = req.params.id;
    const { completed } = req.body;

    // Get checklist item
    const checklist = await Checklist.findById(checklistId);
    if (!checklist) {
      return res.status(404).json({ status: "error", message: "Checklist not found" });
    }

    // Upsert user's progress
    const progress = await UserChecklistProgress.findOneAndUpdate(
      { user: userId, checklist: checklistId },
      {
        completed,
        completedAt: completed ? new Date() : null,
        task: checklist.task,
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      status: "success",
      data: progress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};