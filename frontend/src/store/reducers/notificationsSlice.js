import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notifications: {},
};

const notificationsSlice = createSlice({
    name: "notifications",
    initialState: initialState,
    reducers: {
        setnotifications: (state, action) => {
            state.notifications = action.payload;
        },
        clearnotifications: (state) => {
            state.notifications = {};
        },
    },
});

export const { setnotifications, clearnotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;
