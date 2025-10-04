import mongoose from "mongoose";

const evaluationSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  evaluator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["mid", "final"], required: true },
  marks: { type: Number, required: true },
  maxMarks: { type: Number, default: 100 },
  feedback: { type: String },
}, { timestamps: true });

export default mongoose.model("Evaluation", evaluationSchema);
