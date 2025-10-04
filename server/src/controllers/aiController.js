import Project from "../models/Project.js";
import { calculateSimilarity } from "../utils/aiHelper.js";
import { generateFeedback, summarizeText } from "../utils/aiHelper.js";
import { generateProposalFeedback, checkTopicClash } from "../utils/aiHelper.js";

export const getFeedback = async (req, res) => {
  const { text } = req.body;
  const feedback = await generateFeedback(text);
  res.status(200).json({ feedback });
};

export const getSummary = async (req, res) => {
  const { text } = req.body;
  const summary = await summarizeText(text);
  res.status(200).json({ summary });
};

// Check topic similarity before submission
export const checkTopicSimilarity = async (req, res) => {
  const { title } = req.body;

  const allProjects = await Project.find({}, "title");
  const existingTitles = allProjects.map(p => p.title);

  const similarityResults = calculateSimilarity(title, existingTitles);
  res.status(200).json(similarityResults);
};

// Generate automated feedback (optional)
export const generateFeedback = async (req, res) => {
  const { title, description } = req.body;
  // Simple AI feedback (you can integrate OpenAI API here)
  const feedback = `Your project titled "${title}" looks promising. Ensure your objectives are clear and measurable.`;
  res.status(200).json({ feedback });
};

// Generate feedback
export const proposalFeedback = async (req, res) => {
  const { title, abstract } = req.body;
  const feedback = await generateProposalFeedback(title, abstract);
  res.status(200).json({ feedback });
};

// Check for topic clash
export const topicClashCheck = async (req, res) => {
  const { title } = req.body;
  const projects = await Project.find({}, "title");
  const existingTitles = projects.map(p => p.title);
  const clashes = checkTopicClash(existingTitles, title);
  res.status(200).json({ clashes });
};