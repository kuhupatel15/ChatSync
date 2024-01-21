import { createSlice } from '@reduxjs/toolkit';



const UserSlice = createSlice({
  name: 'User',
  initialState: null,
  reducers: {
    userData: (state, action) => {
      return action.payload
    },
    
  },
});

export const { userData} = UserSlice.actions;
export default UserSlice.reducer;
