import { Routes, Route } from 'react-router-dom'
import Signup from './components/auth/Signup.jsx';
import Login from './components/auth/Login.jsx';
import VerifyOtp from './components/auth/VerifyOtp.jsx';
import HomePage from './components/HomePage.jsx';
import ForgotPassword from './components/auth/ForgotPassword.jsx';
import ResetPassword from './components/auth/ResetPassword.jsx';
import GrpProfilePage from './components/group-chat/GrpProfilePage.jsx';
import { Toaster } from 'react-hot-toast';
// import Protected from './layouts/Protected.jsx';
import DefaultLayout from './layouts/DefaultLayout.jsx'
import ChatWindow from './components/chat-window/ChatWindow.jsx';
import PrivateRoutes from './layouts/Protected.jsx';


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Signup />}></Route>

        <Route path='/login' element={<Login />} />
        <Route path='/verify-otp' element={<VerifyOtp />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/user/reset-password/:id/:token' element={<ResetPassword />} />


        <Route element={<PrivateRoutes />}>
          <Route path='/home' element={
            <DefaultLayout>
              <HomePage />
            </DefaultLayout>
          } />

          <Route path='/chat/:chatid' element={
            <DefaultLayout>
              <ChatWindow />
            </DefaultLayout>
          } />

          <Route path='/profile/:chatid' element={
            <DefaultLayout>
              <GrpProfilePage />
            </DefaultLayout>
          } />
        </Route>
      </Routes>
      <Toaster />
    </>
  )
}

export default App
