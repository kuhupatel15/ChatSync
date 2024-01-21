import * as React from 'react';
import { Routes, Route } from 'react-router-dom'
import SignUp from './SignUp'
import LogIn from './LogIn';

function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<SignUp></SignUp>}></Route>
        <Route path='/login' element={<LogIn></LogIn>}></Route>
      </Routes>
    </>
  )
}

export default App
