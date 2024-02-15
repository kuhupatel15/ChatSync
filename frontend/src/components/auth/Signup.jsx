import React from 'react'
import { Input, Button } from "@nextui-org/react";
import '../../index.css'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../../../store/reducers/UserSlice.js';
import { Register } from '../../utils/FetchData.js'
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons'

const Signup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const submithandler = async (data) => {
    const user = await Register(data);
    dispatch(userData(user.data))
    navigate('/verify-otp')
  }

  return (
    <div className='text-slate-300 w-[100vw] h-[100vh] signup flex  item-center justify-center ' >

      <form onSubmit={handleSubmit(submithandler)} className="flex w-[40vw] h-[65vh]  flex-col gap-4 text-left my-auto bg-[#37393F] p-4">
        <h1 className='text-white text-xl text-center font-bold'>Create an account</h1>
        <div>
          <div className="mb-2 block ">
            <span htmlFor="email2" value="Your email" className='text-slate-300' />
          </div>
          <Input
            isRequired
            type="userEmail"
            label="Email"
            size="md"
            placeholder="name@gmail.com"
            className="w-full"
            {...register("userEmail")}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <span htmlFor="username" className='text-slate-300' value="Username" />
          </div>
          <Input
            isRequired
            size="md"
            type="userName"
            label="Name"
            {...register("userName")}
            id="userName"
            placeholder="Enter you name"
            className="w-full"
          />
        </div>
        <div>
          <div className="mb-2 block">
            <label htmlFor="password" className='text-slate-300' value="Your password" required />
          </div>
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
          <Button className="mt-2" color="primary" type="submit">
            Register new account
          </Button>
        </div>
        <p>Already have an account ? <Link to={'/login'}><button>Login</button></Link></p>
      </form>
    </div>
  )
}

export default Signup