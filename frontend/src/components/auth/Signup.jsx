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

      <form onSubmit={handleSubmit(submithandler)} className="flex w-[40vw] h-[70vh]  flex-col gap-4 text-left my-auto bg-[#37393F] p-4">
        <h1 className='text-white text-xl text-center font-bold'>Create an account</h1>
        <div>
        <label htmlFor="Email" className='ml-2 '>Email</label>

          <Input
            isRequired
            type="userEmail"
            
            size="sm"
            placeholder="name@gmail.com"
            className="w-full mt-2"
            {...register("userEmail")}
          />
        </div>
        <div>
        <label htmlFor="Username" className='ml-2 '>Username</label>
          <Input
            isRequired
            size="sm"
            type="userName"
            
            {...register("userName")}
            id="userName"
            placeholder="Enter you name"
            className="w-full mt-2"
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
                {isVisible ? (
                  <EyeOpenIcon />
                ) : (
                  <EyeClosedIcon />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="w-full mt-2"
            {...register("password")}
          />
          <Button className="w-full mt-4 bg-gradient-to-br from-purple-500  to-cyan-500"  type="submit">
            Register new account
          </Button>
        </div>
        <p>Already have an account ? <Link to={'/login'}><button className='text-sky-400'>Login</button></Link></p>
      </form>
    </div>
  )
}

export default Signup