import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notifications: {},
};

const notificationsSlice = createSlice({
    name: "notifications",
    initialState: initialState,
    reducers: {
        addNotification: (state, action) => {
            state.notifications = action.payload;
        },
        clearnotifications: (state) => {
            state.notifications = {};
        },
        removeNotification: (state) => {
            state.notifications = {};
        },
    },
});

export const { clearnotifications, addNotification, removeNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
