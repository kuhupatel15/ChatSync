import { Routes, Route } from 'react-router-dom'
import Signup from './components/auth/Signup.jsx';
import Login from './components/auth/Login.jsx';
import VerifyOtp from './components/auth/VerifyOtp.jsx';
import HomePage from './components/HomePage.jsx';
import ForgotPassword from './components/auth/ForgotPassword.jsx';
import ResetPassword from './components/auth/ResetPassword.jsx';
import { Toaster } from 'react-hot-toast';
import Protected from './layouts/Protected.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/verify-otp' element={<VerifyOtp />}></Route>
        <Route path='/home' element={<Protected Component={HomePage} />}></Route>
        <Route path='/chat/:chatid' element={<Protected Component={HomePage} />}></Route>

        <Route path='/forgot-password' element={<ForgotPassword />} ></Route>
        <Route path='user/reset-password/:id/:token' element={<ResetPassword />}></Route>

      </Routes>
      <Toaster />
    </>
  )
}

export default App
