// index.js or main file

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store from '../store/store.js';
import ChatProvider from './context/ChatProvider.jsx';
import GroupChatProvider from './context/GroupChatProvider.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { NextUIProvider } from '@nextui-org/react';



ReactDOM.createRoot(document.getElementById('root')).render(
  <NextUIProvider theme="dark">
      <Provider store={store}>
          <BrowserRouter>
              <GroupChatProvider>
                <ChatProvider>
                  <main className="dark">
                    <App />
                  </main>
                </ChatProvider>
              </GroupChatProvider>
          </BrowserRouter>
      </Provider>
  </NextUIProvider>
);