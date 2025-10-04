import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  filename: { type: String, required: true },
  url: { type: String, required: true },
  version: { type: Number, default: 1 },
  type: { type: String, enum: ["proposal", "report", "deliverable"], required: true },
}, { timestamps: true });

export default mongoose.model("File", fileSchema);
