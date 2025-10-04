import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // null for broadcast
  group: { type: String }, // optional for broadcast/group chats
  content: { type: String, required: true },
  seen: { type: Boolean, default: false },
  seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  type: { type: String, enum: ["text", "file"], default: "text" },
}, { timestamps: true });

export default mongoose.model("Message", messageSchema);
