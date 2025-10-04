import express from "express";
import { createProject, getProjects, updateProject } from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";
import { submitReport, getReports, evaluateReport } from "../controllers/projectController.js";
import { submitEvaluation, getEvaluations, getAggregatedResults } from "../controllers/projectController.js";
import multer from "multer";
import { uploadProjectFile, getProjectFiles } from "../controllers/projectController.js";
import { upload } from "../utils/fileUpload.js";

const upload = multer({ dest: "uploads/" });

router.post("/files", protect, upload.single("file"), uploadProjectFile);
router.get("/files/:projectId", protect, getProjectFiles);

// Evaluations
router.route("/evaluations")
router.post("/evaluations", protect, submitEvaluation);
router.get("/evaluations/:projectId", protect, getEvaluations);
router.get("/results/:projectId", protect, getAggregatedResults);
// Reports
router.route("/reports")
  .post(protect, submitReport) // student
  .get(protect, getReports);   // all roles

router.route("/reports/:id")
  .put(protect, evaluateReport); // faculty/admin

const router = express.Router();

router.route("/")
  .post(protect, createProject)    // student creates project
  .get(protect, getProjects);      // get projects (role-based)

router.route("/:id")
  .put(protect, updateProject);    // faculty/admin updates project

export default router;
