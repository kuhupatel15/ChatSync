import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: [],
};

const messagesSlice = createSlice({
    name: "messages",
    initialState: initialState,
    reducers: {
        setmessages: (state, action) => {
            state.messages = action.payload;
        },
        clearmessages: (state) => {
            state.messages = [];
        },
    },
});

export const { setmessages, clearmessages } = messagesSlice.actions;
export default messagesSlice.reducer;
