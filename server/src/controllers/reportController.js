import Project from "../models/Project.js";
import Evaluation from "../models/Evaluation.js";

// Get analytics for a project
export const getProjectAnalytics = async (req, res) => {
  const { projectId } = req.params;

  const evaluations = await Evaluation.find({ project: projectId });
  const totalMarks = evaluations.reduce((acc, e) => acc + e.marks, 0);
  const maxMarks = evaluations.reduce((acc, e) => acc + (e.maxMarks || 100), 0);
  const percentage = (totalMarks / maxMarks) * 100;

  res.status(200).json({
    projectId,
    totalMarks,
    maxMarks,
    percentage,
    evaluations,
  });
};

// Get overall analytics for admin dashboard
export const getOverallAnalytics = async (req, res) => {
  const projects = await Project.find();
  const analytics = await Promise.all(projects.map(async (p) => {
    const evaluations = await Evaluation.find({ project: p._id });
    const totalMarks = evaluations.reduce((acc, e) => acc + e.marks, 0);
    const maxMarks = evaluations.reduce((acc, e) => acc + (e.maxMarks || 100), 0);
    const percentage = maxMarks ? (totalMarks / maxMarks) * 100 : 0;
    return { project: p.title, totalMarks, maxMarks, percentage };
  }));
  res.status(200).json(analytics);
};
