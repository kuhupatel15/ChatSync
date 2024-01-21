import React from 'react'
import { Button, Label, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom'
import './index.css'
const LogIn = () => {
    
  return (
    <div className='text-slate-300 w-[100vw] h-[100vh] signup flex  item-center justify-center ' >
      
        <form className="flex w-[40vw] h-[58vh]  flex-col gap-4 text-left my-auto bg-[#37393F] p-4">
        <h1 className='text-white text-xl text-center font-bold'>Welcome Back !</h1>
      <div>
        <div className="mb-2 block ">
          <Label htmlFor="email2" value="Your email" className='text-slate-300'/>
        </div>
        <TextInput id="email2" type="email" className='text-slate-300' placeholder="name@gmail.com" required shadow />
      </div>
      
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" className='text-slate-300' value="Your password" required/>
        </div>
        <TextInput id="password" className='text-slate-300' placeholder='Password' type="password" required shadow />
      </div>
      <button className='ml-0'>Forget password?</button>
      <Button gradientDuoTone="purpleToBlue" type="submit">Log-In</Button>
      <p className='text-white'>Does not have an account ? <Link to={'/'}><button>Sign Up</button></Link></p>
    </form>
    
    </div>
  )
}

export default LogIn