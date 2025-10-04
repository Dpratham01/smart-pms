import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  link: { type: String }, // optional link to related page
  read: { type: Boolean, default: false },
  type: { type: String, enum: ["info", "alert", "deadline"], default: "info" },
}, { timestamps: true });

export default mongoose.model("Notification", notificationSchema);
