import * as React from 'react';
import { Routes, Route } from 'react-router-dom'
import SignUp from './Components/SignUp';
import LogIn from './Components/LogIn';
import OTP from './Components/OTP';
import Homepage from './Components/Homepage';
import Forgot from './Components/Forgot';
function App() {
  
  

  return (
    <>
      <Routes>
        <Route path='/' element={<SignUp />}></Route>
        <Route path='/login' element={<LogIn></LogIn>}></Route>
        <Route path='/otp' element={<OTP></OTP>}></Route>
        <Route path='/home' element={<Homepage></Homepage>}></Route>
        <Route path='/forgot_email' element={<Forgot></Forgot>} ></Route>
      </Routes>
      
    </>
  )
}

export default App
