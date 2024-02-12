import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './reducers/AuthSlice.js';
import UserReducer from './reducers/UserSlice.js'

const store = configureStore({
  reducer: {
    Auth: AuthReducer ,
    User: UserReducer,
  },
});

export default store;
