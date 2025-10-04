import express from "express";
import { getMessages, sendMessage, markSeen } from "../controllers/chatController.js";
import { saveMessage, getProjectMessages } from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:userId", protect, getMessages);
router.post("/", protect, sendMessage);
router.put("/seen", protect, markSeen);
router.post("/", protect, saveMessage);
router.get("/:projectId", protect, getProjectMessages);


export default router;
