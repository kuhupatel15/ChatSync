import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userdata: null
}

const UserSlice = createSlice({
  name: 'User',
  initialState: initialState,
  reducers: {
    userData: (state, action) => {
      state.userdata = action.payload;
    },
    
  },
});

export const { userData} = UserSlice.actions;
export default UserSlice.reducer;
