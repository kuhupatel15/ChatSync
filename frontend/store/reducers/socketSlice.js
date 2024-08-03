import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
};
export const socketSlice = createSlice({
  name: "socket",
  initialState: initialState,
  reducers: {
    setsocket: (state, action) => {
      state.socket = action.payload;
    },
    clearsocket: (state, action) => {
      state.socket = null;
    },
  },
});
export const { setsocket, clearsocket } = socketSlice.actions;
export default socketSlice.reducer;
