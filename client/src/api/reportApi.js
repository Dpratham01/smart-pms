import axios from "axios";
import { getToken } from "../utils/storage";

const API_URL = "http://localhost:5000/api/reports";
const config = { headers: { Authorization: `Bearer ${getToken()}` } };

export const getProjectAnalyticsApi = async (projectId) => {
  const res = await axios.get(`${API_URL}/project/${projectId}`, config);
  return res.data;
};

export const getOverallAnalyticsApi = async () => {
  const res = await axios.get(`${API_URL}/overall`, config);
  return res.data;
};
