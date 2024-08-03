import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chats: [],
};

const AllChatsSlice = createSlice({
    name: "allchats",
    initialState: initialState,
    reducers: {
        setAllChats: (state, action) => {
            state.chats = action.payload;
        },
        clearAllChats: (state) => {
            state.chats = [];
        },
    },
});

export const { setAllChats, clearAllChats } = AllChatsSlice.actions;
export default AllChatsSlice.reducer;
