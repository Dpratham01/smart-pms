import { Server } from "socket.io";
import Message from "../models/Message.js";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Join a project room
    socket.on("joinRoom", (projectId) => {
      socket.join(projectId);
      console.log(`${socket.id} joined project ${projectId}`);
    });

    // Send message to project room
    socket.on("sendMessage", async ({ projectId, sender, content }) => {
      const message = await Message.create({ project: projectId, sender, content });
      io.to(projectId).emit("receiveMessage", message);
    });

    // Typing indicator for project room
    socket.on("typing", ({ projectId, user }) => {
      socket.to(projectId).emit("typing", user);
    });

    // Optional: 1-to-1 messaging
    socket.on("privateMessage", async ({ sender, receiver, content }) => {
      const message = await Message.create({ sender, receiver, content });
      io.to(receiver).to(sender).emit("receiveMessage", message);
    });

    // Optional: broadcast message to all users
    socket.on("broadcastMessage", async ({ sender, content }) => {
      const message = await Message.create({ sender, group: "broadcast", content });
      io.emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized!");
  return io;
};
