import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  weekNumber: { type: Number, required: true },
  description: { type: String },
  files: [{ type: String }],
  status: { type: String, enum: ["pending","reviewed","late"], default: "pending" },
  feedback: { type: String },
  marks: { type: Number },
}, { timestamps: true });

export default mongoose.model("Report", reportSchema);
