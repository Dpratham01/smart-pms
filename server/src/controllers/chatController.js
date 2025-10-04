import Message from "../models/Message.js";

// Get messages between two users
export const getMessages = async (req, res) => {
  const { userId } = req.params;
  const myId = req.user._id;

  const messages = await Message.find({
    $or: [
      { sender: myId, receiver: userId },
      { sender: userId, receiver: myId }
    ]
  }).sort("createdAt");

  res.status(200).json(messages);
};

// Send a message (saved to DB)
export const sendMessage = async (req, res) => {
  const { receiver, group, content } = req.body;
  const sender = req.user._id;

  const message = await Message.create({ sender, receiver, group, content });
  res.status(201).json(message);
};

// Mark messages as seen
export const markSeen = async (req, res) => {
  const { messageIds } = req.body;
  await Message.updateMany({ _id: { $in: messageIds } }, { seen: true });
  res.status(200).json({ success: true });
};

// Save chat message (project-specific)
export const saveMessage = async (req, res) => {
  const { projectId, content, type } = req.body;

  const message = await Message.create({
    project: projectId,
    sender: req.user._id,
    content,
    type
  });

  res.status(201).json(message);
};

// Get chat history for a project
export const getProjectMessages = async (req, res) => {
  const { projectId } = req.params;
  const messages = await Message.find({ project: projectId })
    .populate("sender", "name email")
    .sort({ createdAt: 1 });
  res.status(200).json(messages);
};
