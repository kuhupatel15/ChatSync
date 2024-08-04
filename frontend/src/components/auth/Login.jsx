import React, { useEffect, useState } from 'react'
import { Input, Button, useSelect } from "@nextui-org/react";
import { Link, useNavigate } from 'react-router-dom'
import '../../index.css'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import { login } from "../../../store/reducers/UserSlice.js"
import { LogIn } from '../../routes/AuthRoutes.js'
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons'

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const submithandler = async (data) => {
    const res = await LogIn(data);
    if (res) {
      dispatch(login(res.data.user));
      navigate('/home');
    }
  };

  return (
    <div className='signup w-[100vw] h-[100vh] flex items-center justify-center'>
      <form onSubmit={handleSubmit(submithandler)} className="flex w-[40%] rounded-2xl flex-col gap-4 bg-pri p-6">
        <div className='flex flex-col gap-2 mb-2'>
          <h1 className='text-white text-3xl tracking-wide font-bold'>Welcome Back !</h1>
          <h1 className='text-white text-lg tracking-wide'>Please login to your account</h1>
        </div>

        <div>
          <label htmlFor="Email" className='text-md text-gray-400'>Email</label>
          <Input
            isRequired
            type="email"
            size="sm"
            placeholder="name@gmail.com"
            className="w-full mt-2 "
            {...register("userEmail")}
          />
        </div>

        <div>
          <label htmlFor="Password" className='text-md text-gray-400'>Password</label>
          <Input
            size="sm"
            isRequired
            placeholder="Enter your password"
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                {isVisible ? <EyeOpenIcon className='text-md text-gray-400' /> : <EyeClosedIcon className='text-md text-gray-400' />}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="w-full mt-2 "
            {...register("password")}
          />
          <div className='flex flex-col'>
            <Link to={'/forgot-password'} className='text-blue-500 text-sm mt-2 self-end'>Forget password?</Link>
          </div>
        </div>

        <Button className="font-bold mt-2 bg-gradient-to-br from-purple-500  to-cyan-500 text-lg" size='lg' type="submit">
          Login
        </Button>

        <p className='text-gray-400 text-sm md:text-md self-end'>
          Doesn't have an account ? <Link to={'/'}><button className='text-blue-500 text-sm'>Sign Up</button></Link>
        </p>
      </form>
    </div>
  )
}

export default Login