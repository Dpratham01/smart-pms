import Notification from "../models/Notification.js";

// Create a notification
export const createNotification = async ({ user, message, type, link }) => {
  const notification = await Notification.create({
    user,
    message,
    type,       // e.g., "evaluation", "report", "ai-feedback"
    link,       // URL to redirect user
    read: false,
  });
  return notification;
};

// Get notifications for a user
export const getNotifications = async (userId) => {
  return await Notification.find({ user: userId }).sort({ createdAt: -1 });
};

// Mark a notification as read
export const markAsRead = async (notificationId) => {
  return await Notification.findByIdAndUpdate(notificationId, { read: true }, { new: true });
};
