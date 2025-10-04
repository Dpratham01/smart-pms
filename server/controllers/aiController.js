import axios from "axios";
import Project from "../models/Project.js";
import Notification from "../models/Notification.js";

// AI feedback for a project proposal
export const getAIProposalFeedback = async (req, res) => {
  const { projectId, text } = req.body;

  try {
    // Example: Using OpenAI GPT API (replace with actual API & key)
    const response = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a project advisor for students." },
        { role: "user", content: `Provide constructive feedback on this project proposal:\n${text}` }
      ],
      max_tokens: 300
    }, {
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
    });

    const feedback = response.data.choices[0].message.content;

    // Optionally, save feedback as a notification
    const project = await Project.findById(projectId);
    if (project?.student) {
      await Notification.create({
        user: project.student,
        message: `AI Feedback on your project proposal: ${feedback}`,
        type: "ai-feedback",
        read: false
      });
    }

    res.status(200).json({ feedback });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "AI feedback failed", error: err.message });
  }
};
