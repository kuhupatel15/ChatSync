import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store from '../store/store.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { NextUIProvider } from '@nextui-org/react';



ReactDOM.createRoot(document.getElementById('root')).render(
  <NextUIProvider theme="dark">
    <Provider store={store}>
      <BrowserRouter>
        <main className="dark">
          <App />
        </main>
      </BrowserRouter>
    </Provider>
  </NextUIProvider>
);