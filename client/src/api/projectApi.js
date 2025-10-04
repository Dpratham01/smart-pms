import axios from "axios";
import { getToken } from "../utils/storage";

const API_URL = "http://localhost:5000/api/projects";

const config = () => ({ headers: { Authorization: `Bearer ${getToken()}` } });

// -------------------- PROJECTS --------------------
export const createProject = async (data) => {
  const res = await axios.post(API_URL, data, config());
  return res.data;
};

export const getProjects = async () => {
  const res = await axios.get(API_URL, config());
  return res.data;
};

export const updateProject = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data, config());
  return res.data;
};

// -------------------- FILE UPLOAD --------------------
export const uploadFileApi = async (formData) => {
  const res = await axios.post(`${API_URL}/files`, formData, {
    headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${getToken()}` }
  });
  return res.data;
};

export const uploadProjectFileApi = async (projectId, file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("projectId", projectId);

  const res = await axios.post(`${API_URL}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${getToken()}` }
  });

  return res.data;
};

export const getProjectFilesApi = async (projectId) => {
  const res = await axios.get(`${API_URL}/files/${projectId}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.data;
};

// -------------------- REPORTS --------------------
export const submitReportApi = async (data) => {
  const res = await axios.post(`${API_URL}/reports`, data, config());
  return res.data;
};

export const getReportsApi = async () => {
  const res = await axios.get(`${API_URL}/reports`, config());
  return res.data;
};

export const evaluateReportApi = async (id, data) => {
  const res = await axios.put(`${API_URL}/reports/${id}`, data, config());
  return res.data;
};

// -------------------- EVALUATIONS --------------------
export const submitEvaluationApi = async (data) => {
  const res = await axios.post(`${API_URL}/evaluations`, data, config());
  return res.data;
};

export const getEvaluationsApi = async () => {
  const res = await axios.get(`${API_URL}/evaluations`, config());
  return res.data;
};

export const getAggregatedResultsApi = async (projectId) => {
  const res = await axios.get(`${API_URL}/results/${projectId}`, config());
  return res.data;
};

export const getAIProposalFeedbackApi = async (projectId, text) => {
  const res = await axios.post(`${API_URL}/ai/proposal-feedback`, { projectId, text }, {
  headers: { Authorization: `Bearer ${getToken()}` }});
  return res.data;
};