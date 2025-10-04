// Simple string similarity using cosine similarity or Levenshtein
import stringSimilarity from "string-similarity";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Generate feedback for text
export const generateFeedback = async (text) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are an academic project assistant." },
      { role: "user", content: `Provide constructive feedback for this project/report: ${text}` }
    ],
  });
  return response.choices[0].message.content;
};

// Summarize long reports
export const summarizeText = async (text) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You summarize academic text concisely." },
      { role: "user", content: text }
    ],
  });
  return response.choices[0].message.content;
};

export const calculateSimilarity = (newTitle, existingTitles) => {
  return existingTitles.map(title => {
    const similarity = stringSimilarity.compareTwoStrings(newTitle.toLowerCase(), title.toLowerCase());
    return { title, similarity }; // similarity between 0 and 1
  }).sort((a, b) => b.similarity - a.similarity); // highest similarity first
};

// Generate feedback for project proposal
export const generateProposalFeedback = async (title, abstract) => {
  const prompt = `
  You are an academic project assistant. Review the following project proposal and provide constructive feedback:
  Title: ${title}
  Abstract: ${abstract}
  Feedback:
  `;
  
  const response = await client.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 200
  });

  return response.choices[0].message.content.trim();
};

// Check topic similarity with existing projects (basic)
export const checkTopicClash = (existingTitles, newTitle) => {
  const lowerNew = newTitle.toLowerCase();
  const clashes = existingTitles.filter(title => title.toLowerCase().includes(lowerNew));
  return clashes;
};
