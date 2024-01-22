import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './reducers/AuthSlice';
import UserReducer from './reducers/UserSlice'

const store = configureStore({
  reducer: {
    Auth: AuthReducer ,
    User: UserReducer,
  },
});

export default store;
