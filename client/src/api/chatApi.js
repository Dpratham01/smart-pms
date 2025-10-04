import axios from "axios";
import { getToken } from "../utils/storage";

const API_URL = "http://localhost:5000/api/chat";
const config = () => ({ headers: { Authorization: `Bearer ${getToken()}` } });

export const getMessagesApi = async (userId) => {
  const res = await axios.get(`${API_URL}/${userId}`, config());
  return res.data;
};

export const sendMessageApi = async (data) => {
  const res = await axios.post(API_URL, data, config());
  return res.data;
};

export const markMessagesSeenApi = async (messageIds) => {
  const res = await axios.put(`${API_URL}/seen`, { messageIds }, config());
  return res.data;
};
