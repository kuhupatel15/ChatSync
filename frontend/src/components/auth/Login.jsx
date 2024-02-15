import React from 'react'
import { Input, Button } from "@nextui-org/react";
import { Link, useNavigate } from 'react-router-dom'
import '../../index.css'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form';
import { login } from "../../../store/reducers/AuthSlice.js"
import { LogIn } from '../../utils/FetchData.js';
import { userData } from '../../../store/reducers/UserSlice.js';
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons'


const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const submithandler = async (data) => {
    dispatch(login(data));
    const res = await LogIn(data);
    dispatch(userData(res.data.user))
    localStorage.setItem("userInfo", JSON.stringify(res.data.user));
    if (res) navigate('/home')
  }

  return (
    <div className='text-slate-300 w-[100vw] h-[100vh] signup flex  item-center justify-center ' >

      <form onSubmit={handleSubmit(submithandler)} className="flex w-[40vw] h-[58vh]  flex-col gap-4 text-left my-auto bg-[#37393F] p-4">
        <h1 className='text-white text-xl text-center font-bold'>Welcome Back !</h1>
        <div>
          <Input
            isRequired
            type="email"
            label="Email"
            size="md"
            placeholder="name@gmail.com"
            className="w-full"
            {...register("userEmail")}
          />
        </div>

        <div>
          <Input
            size="md"
            label="Password"
            isRequired
            placeholder="Enter your password"
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <EyeOpenIcon />
                ) : (
                  <EyeClosedIcon />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="w-full"
            {...register("password")}
          />
        <Link to={'/forgot-password'}><button className='ml-0'>Forget password?</button></Link>
        </div>
        <Button className="mt-2" color="primary" type="submit">
          Log-In
        </Button>
        <p className='text-white'>Does not have an account ? <Link to={'/'}><button>Sign Up</button></Link></p>
      </form>

    </div>
  )
}

export default Login