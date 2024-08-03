import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chat: null,
};

const chatSlice = createSlice({
    name: "selectedchat",
    initialState: initialState,
    reducers: {
        setchat: (state, action) => {
            state.chat = action.payload;
        },
        clearchat: (state) => {
            state.chat = null;
        },
    },
});

export const { setchat, clearchat } = chatSlice.actions;
export default chatSlice.reducer;
