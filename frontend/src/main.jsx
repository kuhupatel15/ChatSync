import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../store/store.js'
import ChatProvider from './context/ChatProvider.jsx'
import UserProvider from './context/UserProvider.jsx'
import GroupChatProvider from './context/GroupChatProvider.jsx';

import { NextUIProvider } from '@nextui-org/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <NextUIProvider theme="dark">
    <Provider store={store}>
      <BrowserRouter>
        <UserProvider>
          <GroupChatProvider>
            <ChatProvider>
              <main className="dark">
                <App />
              </main>
            </ChatProvider>
          </GroupChatProvider>
        </UserProvider>
      </BrowserRouter>
    </Provider>
  </NextUIProvider>
)
