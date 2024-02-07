import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../store/store.js'
import ChatProvider from './Context/ChatProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ChatProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ChatProvider>
  </Provider>
)
