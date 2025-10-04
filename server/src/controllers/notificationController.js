import { createNotification, getUserNotifications, markAsRead } from "../services/notificationService.js";

// Send notification
export const sendNotification = async (req, res) => {
  const { userId, message, type } = req.body;
  const notification = await createNotification(userId, message, type);
  res.status(201).json(notification);
};

// Fetch notifications
export const fetchNotifications = async (req, res) => {
  const notifications = await getUserNotifications(req.user._id);
  res.status(200).json(notifications);
};

// Mark as read
export const readNotification = async (req, res) => {
  const { notificationId } = req.params;
  const notification = await markAsRead(notificationId);
  res.status(200).json(notification);
};
