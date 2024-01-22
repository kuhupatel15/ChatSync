import * as React from 'react';
import { Routes, Route } from 'react-router-dom'
import SignUp from './Components/SignUp';
import LogIn from './Components/LogIn';
import OTP from './Components/OTP';
function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<SignUp></SignUp>}></Route>
        <Route path='/login' element={<LogIn></LogIn>}></Route>
        <Route path='/otp' element={<OTP></OTP>}></Route>
      </Routes>
      
    </>
  )
}

export default App
