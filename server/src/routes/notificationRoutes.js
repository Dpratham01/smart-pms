import express from "express";
import { sendNotification, fetchNotifications, readNotification } from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, sendNotification);
router.get("/", protect, fetchNotifications);
router.put("/:notificationId/read", protect, readNotification);

export default router;
