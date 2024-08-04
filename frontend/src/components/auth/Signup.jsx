import React from 'react'
import { Input, Button } from "@nextui-org/react";
import '../../index.css'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/reducers/UserSlice.js';
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons'
import { Register } from '../../routes/AuthRoutes.js';

const Signup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const submithandler = async (data) => {
    const user = await Register(data);
    navigate('/verify-otp', { state: user.data })
  }

  return (

    <div className='signup w-[100vw] h-[100vh] flex items-center justify-center'>
      <form onSubmit={handleSubmit(submithandler)} className="flex w-[40%] rounded-2xl flex-col gap-4 bg-pri p-6">
        <div className='flex flex-col gap-2 mb-2'>
          <h1 className='text-white text-3xl tracking-wide font-bold'>Sign up</h1>
          <h1 className='text-white text-lg tracking-wide'>Create your account</h1>
        </div>

        <div>
          <label htmlFor="Email" className='text-md text-gray-400'>Email</label>
          <Input
            isRequired
            type="userEmail"
            size="sm"
            placeholder="name@gmail.com"
            className="w-full mt-2 "
            {...register("userEmail")}
          />
        </div>

        <div>
          <label htmlFor="Username" className='text-md text-gray-400'>Username</label>
          <Input
            isRequired
            size="sm"
            type="userName"
            {...register("userName")}
            id="userName"
            placeholder="Enter you name"
            className="w-full mt-2 "
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
        </div>

        <Button className="font-bold mt-2 bg-gradient-to-br from-purple-500  to-cyan-500 text-lg" size='lg' type="submit">
          Register
        </Button>

        <p className='text-gray-400 text-sm md:text-md self-end'>
          Already have an account ? <Link to={'/login'}><button className='text-blue-500 text-sm'>Login</button></Link>
        </p>
      </form>
    </div>
  )
}

export default Signup