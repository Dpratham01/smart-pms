import { fetchNotifications, readNotification } from "../controllers/userController.js";
import { createEvent, getEvents } from "../controllers/userController.js";

router.post("/events", protect, createEvent);
router.get("/events", protect, getEvents);


router.get("/notifications", protect, fetchNotifications);
router.put("/notifications/:id/read", protect, readNotification);
