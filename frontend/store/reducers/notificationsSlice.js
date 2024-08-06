import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const { id, ...notification } = action.payload;
      console.log(action.payload)
      state.notifications.set(id, notification);
    },
    removeNotification: (state, action) => {
      const id = action.payload;
      state.notifications.delete(id);
    },
    clearNotifications: (state) => {
      state.notifications.clear();
    }, 
  },
});

export const { clearnotifications, addNotification, removeNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
