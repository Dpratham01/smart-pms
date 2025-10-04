import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getNotificationsApi, markNotificationReadApi } from '../../api/notificationApi';

export const fetchNotifications = createAsyncThunk(
  "notifications/fetch",
  async (userId) => {
    return await getNotificationsApi(userId); // correct
  }
);

export const markNotificationRead = createAsyncThunk(
  "notifications/markRead",
  async (notificationId) => {
    return await markNotificationReadApi(notificationId); // correct
  }
);


const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => { state.loading = true; })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchNotifications.rejected, (state) => { state.loading = false; })
      .addCase(markNotificationRead.fulfilled, (state, action) => {
        const index = state.items.findIndex(n => n._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      });
  }
});

export default notificationSlice.reducer;
