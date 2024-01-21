import React from 'react'
import { Button, Label, TextInput } from 'flowbite-react';
import chatsync from './assets/chatsync.jpg'
import './index.css'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {login} from '../store/reducers/AuthSlice'
import {userData} from '../store/reducers/UserSlice'
const SignUp = () => {
  const { register, handleSubmit } = useForm()
  const dispatch=useDispatch();
  const ud = useSelector((state)=> state.User.userData)
  const submithandler = (data) =>{
    dispatch(userData(data))
  }

  return (
    <div className='text-slate-300 w-[100vw] h-[100vh] signup flex  item-center justify-center ' >
      
        <form onSubmit={handleSubmit(submithandler)} className="flex w-[40vw] h-[65vh]  flex-col gap-4 text-left my-auto bg-[#37393F] p-4">
        <h1 className='text-white text-xl text-center font-bold'>Create an account</h1>
      <div>
        <div className="mb-2 block ">
          <Label htmlFor="email2" value="Your email" className='text-slate-300'/>
        </div>
        <TextInput {...register("userEmail")}  id="email2" type="userEmail" className='text-slate-300' placeholder="name@gmail.com" required shadow />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username" className='text-slate-300' value="Username" />
        </div>
        <TextInput {...register("userName")}  id="username" className='text-slate-300' placeholder='name' type="text" required shadow />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" className='text-slate-300'    value="Your password" required/>
        </div>
        <TextInput {...register("password")}  id="password" className='text-slate-300' placeholder='Password' type="password" required shadow />
      </div>
      
      <Button gradientDuoTone="purpleToBlue" type="submit">Register new account</Button>
      <p>Already have an accout ? <Link to={'/login'}><button>Login</button></Link></p>
    </form>
    
    </div>
  )
}

export default SignUp