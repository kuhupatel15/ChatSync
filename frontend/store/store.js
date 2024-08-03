import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./reducers/UserSlice";
import AllChatsSlice from './reducers/AllChatsSlice'
import chatSlice from './reducers/chatSlice'
import messagesSlice from './reducers/messagesSlice'
import notificationsSlice from './reducers/notificationsSlice'

const persistConfig = {
  key: "root",
  storage: storage,
};

const rootReducer = combineReducers({
  auth: authSlice,
  chats: AllChatsSlice,
  selectedchat: chatSlice,
  messages: messagesSlice,
  notification: notificationsSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

persistStore(store);


export default store;
