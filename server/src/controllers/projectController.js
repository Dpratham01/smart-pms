import Project from "../models/Project.js";
import Report from "../models/Report.js";
import Evaluation from "../models/Evaluation.js";
import File from "../models/File.js";
import { uploadFile } from "../utils/fileUpload.js";

// -------------------- FILE UPLOAD --------------------

// Upload a file
export const uploadProjectFile = async (req, res) => {
  const { projectId, type } = req.body;

  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  // Upload to cloud / local storage
  const fileUrl = await uploadFile(req.file.path); 

  // Determine version
  const existingFiles = await File.find({ project: projectId, type }).sort({ version: -1 });
  const version = existingFiles.length ? existingFiles[0].version + 1 : 1;

  const file = await File.create({
    project: projectId,
    uploadedBy: req.user._id,
    fileName: req.file.originalname,
    url: fileUrl,
    type: type || "general",
    version
  });

  res.status(201).json(file);
};

// Get files for a project
export const getProjectFiles = async (req, res) => {
  const { projectId } = req.params;
  const files = await File.find({ project: projectId }).sort({ version: 1 });
  res.status(200).json(files);
};

// -------------------- PROJECTS --------------------

// Create project (student)
export const createProject = async (req, res) => {
  const { title, description, domain } = req.body;
  const studentId = req.user._id;

  const project = await Project.create({
    title,
    description,
    domain,
    student: studentId
  });

  res.status(201).json(project);
};

// Get projects (role-based)
export const getProjects = async (req, res) => {
  const { role, _id } = req.user;

  let projects;
  if (role === "student") {
    projects = await Project.find({ student: _id }).populate("faculty","name email");
  } else if (role === "faculty") {
    projects = await Project.find({ faculty: _id }).populate("student","name email");
  } else {
    // admin
    projects = await Project.find().populate("student faculty","name email");
  }

  res.status(200).json(projects);
};

// Update project (faculty feedback / approval)
export const updateProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found" });

  const { status, feedback, faculty } = req.body;
  if (status) project.status = status;
  if (feedback) project.feedback = feedback;
  if (faculty) project.faculty = faculty;

  await project.save();
  res.status(200).json(project);
};

// -------------------- REPORTS --------------------

// Submit weekly report (student)
export const submitReport = async (req, res) => {
  const { projectId, weekNumber, description, files } = req.body;
  const studentId = req.user._id;

  const report = await Report.create({
    project: projectId,
    student: studentId,
    weekNumber,
    description,
    files
  });

  res.status(201).json(report);
};

// Get reports (role-based)
export const getReports = async (req, res) => {
  const { role, _id } = req.user;

  let reports;
  if (role === "student") {
    reports = await Report.find({ student: _id }).populate("project", "title domain");
  } else if (role === "faculty") {
    reports = await Report.find().populate("project", "title domain").populate("student","name email");
  } else {
    // admin
    reports = await Report.find().populate("project student", "title name email");
  }

  res.status(200).json(reports);
};

// Faculty evaluate report
export const evaluateReport = async (req, res) => {
  const report = await Report.findById(req.params.id);
  if (!report) return res.status(404).json({ message: "Report not found" });

  const { status, feedback, marks } = req.body;
  if (status) report.status = status;
  if (feedback) report.feedback = feedback;
  if (marks !== undefined) report.marks = marks;

  await report.save();
  res.status(200).json(report);
};

// -------------------- EVALUATIONS --------------------

// Submit evaluation (faculty/coordinator)
export const submitEvaluation = async (req, res) => {
  const { projectId, type, marks, feedback } = req.body;

  const evaluation = await Evaluation.create({
    project: projectId,
    evaluator: req.user._id,
    type,
    marks,
    feedback
  });

  res.status(201).json(evaluation);
};

// Get evaluations (role-based)
export const getEvaluations = async (req, res) => {
  const { role, _id } = req.user;

  let evaluations;
  if (role === "student") {
    evaluations = await Evaluation.find().populate("project").populate("evaluator","name email");
    evaluations = evaluations.filter(e => e.project.students.includes(_id));
  } else if (role === "faculty") {
    evaluations = await Evaluation.find({ evaluator: _id }).populate("project").populate("evaluator","name");
  } else {
    evaluations = await Evaluation.find().populate("project").populate("evaluator","name");
  }

  res.status(200).json(evaluations);
};

// -------------------- AGGREGATED RESULTS --------------------

export const getAggregatedResults = async (req, res) => {
  const { projectId } = req.params;
  const evaluations = await Evaluation.find({ project: projectId });

  const totalMarks = evaluations.reduce((acc, e) => acc + e.marks, 0);
  const maxMarks = evaluations.reduce((acc, e) => acc + (e.maxMarks || 100), 0); // default max 100
  const percentage = maxMarks ? (totalMarks / maxMarks) * 100 : 0;

  let grade = "F";
  if (percentage >= 90) grade = "A+";
  else if (percentage >= 80) grade = "A";
  else if (percentage >= 70) grade = "B";
  else if (percentage >= 60) grade = "C";
  else if (percentage >= 50) grade = "D";

  res.status(200).json({ totalMarks, maxMarks, percentage, grade, evaluations });
};
