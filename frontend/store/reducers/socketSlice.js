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
  },
});
export const { setsocket } = socketSlice.actions;
export default socketSlice.reducer;
