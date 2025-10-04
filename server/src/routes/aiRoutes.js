import express from "express";
import { checkTopicSimilarity, generateFeedback } from "../controllers/aiController.js";
import { getFeedback, getSummary } from "../controllers/aiController.js";
import { proposalFeedback, topicClashCheck } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/similarity", protect, checkTopicSimilarity);
router.post("/feedback", protect, generateFeedback);

router.post("/feedback", protect, getFeedback);
router.post("/summary", protect, getSummary);

router.post("/feedback", protect, proposalFeedback);
router.post("/topic-clash", protect, topicClashCheck);

export default router;
