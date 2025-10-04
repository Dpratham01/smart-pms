import axios from "axios";
import { getToken } from "../utils/storage";

const config = { headers: { Authorization: `Bearer ${getToken()}` } };
const API_URL = "http://localhost:5000/api/notifications";

export const fetchNotificationsApi = async () => {
  const res = await axios.get(API_URL, config);
  return res.data;
};

export const getNotificationsApi = async () => {
  const res = await axios.get(API_URL, config);
  return res.data;
};

export const markNotificationReadApi = async (notificationId) => {
  const res = await axios.put(`${API_URL}/${notificationId}/read`, {}, config);
  return res.data;
};
