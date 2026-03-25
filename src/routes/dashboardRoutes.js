import express from "express";
import {
  getDashboardJourney,
  updateChecklistProgress,
} from "../controllers/dashboardController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/journey", protect, getDashboardJourney);
router.patch("/checklist/:id/progress", protect, updateChecklistProgress);

export default router;