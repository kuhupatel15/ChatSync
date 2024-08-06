import React from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Forgot_Password } from '../../routes/AuthRoutes.js';
import { Button, Input } from '@nextui-org/react';
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';


const ForgotPassword = () => {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate();

  const submitEmail = async (data) => {
    let res = await Forgot_Password(data);
    if (res) toast.loading("Mail has been sent to reset the password")
  }

  return (

    <div className='signup w-[100vw] h-[100vh] flex items-center justify-center'>
      <form onSubmit={handleSubmit(submitEmail)} className="flex w-[40%] rounded-2xl flex-col gap-4 bg-pri p-6">
        <div className='flex flex-col gap-2 mb-2'>
          <div className='flex justify-between items-center'>
            <h1 className='text-white text-3xl tracking-wide font-bold'>Forgot Password</h1>
            <IoMdArrowBack className='text-white text-xl cursor-pointer' onClick={() => navigate('/login')} />
          </div>
          <h1 className='text-gray-400 text-md tracking-wide'>Enter your registered email to reset you password.</h1>
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

        <Button className="font-bold mt-2 bg-gradient-to-br from-purple-500  to-cyan-500 text-lg" size='lg' type="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default ForgotPassword