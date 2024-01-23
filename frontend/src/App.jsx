import * as React from 'react';
import { Routes, Route } from 'react-router-dom'
import Signup from './components/Signup';
import Login from './components/Login';
import Verify_otp from './components/Verify_otp';
import Homepage from './components/Home_Page';
import Forgot from './components/Forgot_Password';
import Reset from './components/Reset_Password';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/verify-otp' element={<Verify_otp />}></Route>
        <Route path='/home' element={<Homepage />}></Route>
        <Route path='/forgot-password' element={<Forgot />} ></Route>
        <Route path='user/reset-password/:id/:token' element={<Reset />}></Route>
      </Routes>
      <Toaster />
    </>
  )
}

export default App
