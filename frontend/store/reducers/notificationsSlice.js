// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     notifications: [],
// };

// const notificationsSlice = createSlice({
//     name: "notifications",
//     initialState: initialState,
//     reducers: {
//         setnotifications: (state, action) => {
//             state.notifications = action.payload;
//         },
//         clearnotifications: (state) => {
//             state.notifications = [];
//         },
//     },
// });

// export const { setnotifications, clearnotifications } = notificationsSlice.actions;
// export default notificationsSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: new Map(),
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const { id, ...notification } = action.payload;
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

export const { addNotification, removeNotification, clearNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;
