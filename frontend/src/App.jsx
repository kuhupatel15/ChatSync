import { Routes, Route } from 'react-router-dom'
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import Verify_otp from './components/Verify_otp.jsx';
import Home_page from './components/Home_Page.jsx';
import Forgot from './components/Forgot_Password.jsx';
import Reset from './components/Reset_Password.jsx';
import { Toaster } from 'react-hot-toast';
import Protected from './Layouts/Protected.jsx';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/verify-otp' element={<Verify_otp />}></Route>
        <Route path='/home' element={<Protected Component={Home_page} />}></Route>
        <Route path='/chat/:chatid' element={<Protected Component={Home_page} />}></Route>

        <Route path='/forgot-password' element={<Forgot />} ></Route>
        <Route path='user/reset-password/:id/:token' element={<Reset />}></Route>

      </Routes>
      <Toaster />
    </>
  )
}

export default App
