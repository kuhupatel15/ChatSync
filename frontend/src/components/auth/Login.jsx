import React, { useEffect, useState } from 'react'
import { Input, Button, useSelect } from "@nextui-org/react";
import { Link, useNavigate } from 'react-router-dom'
import '../../index.css'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import { login } from "../../../store/reducers/UserSlice.js"
import { LogIn } from '../../Routes/AuthRoutes.js'
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons'

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  // useEffect(() => {
  //   const storedUser = localStorage.getItem('userInfo');
  //   if (storedUser) {
  //     dispatch(login(JSON.parse(storedUser)))
  //   }
  // }, [dispatch]);

  const submithandler = async (data) => {
    const res = await LogIn(data);
    if (res) {
      dispatch(login(res.data.user));
      // localStorage.setItem('userInfo', JSON.stringify(res.data.user));
      navigate('/home');
    }
  };

  return (
    <div className='text-slate-300 w-[100vw] h-[100vh] signup flex  item-center justify-center ' >

      <form onSubmit={handleSubmit(submithandler)} className="flex w-[40vw] h-[60vh]  flex-col gap-4 text-left my-auto bg-[#37393F] p-4">
        <h1 className='text-white text-xl text-center font-bold'>Welcome Back !</h1>
        <div>
          <label htmlFor="Email" className='ml-2 '>Email</label>
          <Input
            isRequired
            type="email"
            size="sm"
            placeholder="name@gmail.com"
            className="w-full mt-2"
            {...register("userEmail")}
          />
        </div>

        <div>
          <label htmlFor="Password" className='ml-2 '>Password</label>
          <Input
            size="sm"
            isRequired
            placeholder="Enter your password"
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                {isVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="w-full mt-2"
            {...register("password")}
          />
          <div className='flex flex-col'>
            <Link to={'/forgot-password'} className='ml-0 text-sky-400 mt-2'>Forget password?</Link>
            <Button className="mt-2 bg-gradient-to-br from-purple-500  to-cyan-500" type="submit">
              Log-In
            </Button>
          </div>

        </div>

        <p className='text-white text-sm md:text-md'>
          Doesn't have an account ? <Link to={'/'}><button className='text-sky-400'>Sign Up</button></Link>
        </p>
      </form>
    </div>
  )
}

export default Login