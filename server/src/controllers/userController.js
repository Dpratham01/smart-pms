import { sendNotification, getNotifications, markAsRead } from "../services/notificationService.js";
import Event from "../models/Event.js";

// CRUD events
export const createEvent = async (req, res) => {
  const event = await Event.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json(event);
};

export const getEvents = async (req, res) => {
  const events = await Event.find({ attendees: req.user._id });
  res.status(200).json(events);
};


// Get notifications
export const fetchNotifications = async (req, res) => {
  const notifications = await getNotifications(req.user._id);
  res.status(200).json(notifications);
};

// Mark notification as read
export const readNotification = async (req, res) => {
  const updated = await markAsRead(req.params.id);
  res.status(200).json(updated);
};
