import express from "express";
import { getProjectAnalytics, getOverallAnalytics } from "../controllers/reportController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/project/:projectId", protect, getProjectAnalytics);
router.get("/overall", protect, authorize("admin"), getOverallAnalytics);

export default router;
