// Notifications
export const fetchNotificationsApi = async () => {
  const res = await axios.get(`${API_URL}/notifications`, config());
  return res.data;
};

export const readNotificationApi = async (id) => {
  const res = await axios.put(`${API_URL}/notifications/${id}/read`, {}, config());
  return res.data;
};

// Events
export const fetchEventsApi = async () => {
  const res = await axios.get(`${API_URL}/events`, config());
  return res.data;
};

export const createEventApi = async (data) => {
  const res = await axios.post(`${API_URL}/events`, data, config());
  return res.data;
};
