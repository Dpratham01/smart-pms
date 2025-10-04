import express from "express";
import { getAIProposalFeedback } from "../controllers/aiController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/proposal-feedback", authMiddleware, getAIProposalFeedback);

export default router;
