import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  domain: { type: String },
  status: { type: String, enum: ["pending","approved","rejected"], default: "pending" },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // assigned guide
  files: [{ type: String }],
  feedback: { type: String },
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
