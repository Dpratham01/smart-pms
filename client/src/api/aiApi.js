import axios from "axios";
import { getToken } from "../utils/storage";

const API_URL = "http://localhost:5000/api/ai";

const config = () => ({ headers: { Authorization: `Bearer ${getToken()}` } });

export const checkSimilarity = async (title) => {
  const res = await axios.post(`${API_URL}/similarity`, { title }, config());
  return res.data;
};

export const getFeedback = async (title, description) => {
  const res = await axios.post(`${API_URL}/feedback`, { title, description }, config());
  return res.data;
};

export const getFeedbackApi = async (text) => {
  const res = await axios.post(`${API_URL}/feedback`, { text }, config);
  return res.data.feedback;
};

export const getSummaryApi = async (text) => {
  const res = await axios.post(`${API_URL}/summary`, { text }, config);
  return res.data.summary;
};

export const getProposalFeedbackApi = async (title, abstract) => {
  const res = await axios.post(`${API_URL}/feedback`, { title, abstract }, config);
  return res.data;
};

export const checkTopicClashApi = async (title) => {
  const res = await axios.post(`${API_URL}/topic-clash`, { title }, config);
  return res.data;
};