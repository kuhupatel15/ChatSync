import React, { useRef } from 'react'
import { useForm } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';
import { Reset_Password } from '../../routes/AuthRoutes';
import { Button, Input } from '@nextui-org/react';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { id, token } = useParams();
  const { register, handleSubmit } = useForm()

  const submitPassword = async (data) => {
    let res = await Reset_Password({ id, token, password: data.password });
    if (res.status) navigate('/login');
  }

  return (
    <div className='signup w-[100vw] h-[100vh] flex items-center justify-center'>
      <form onSubmit={handleSubmit(submitPassword)} className="flex w-[40%] rounded-2xl flex-col gap-4 bg-pri p-6">
        <div className='flex flex-col gap-2 mb-2'>
          <h1 className='text-white text-3xl tracking-wide font-bold'>Reset Your Password</h1>
          <h1 className='text-gray-400 text-md tracking-wide'>Enter your new password to reset your password.</h1>
        </div>

        <div>
          <label htmlFor="password" className='text-md text-gray-400'>Password</label>
          <Input
            isRequired
            type="password"
            size="sm"
            placeholder="********"
            className="w-full mt-2 "
            {...register("password")}
          />
        </div>

        <Button className="font-bold mt-2 bg-gradient-to-br from-purple-500  to-cyan-500 text-lg" size='lg' type="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default ResetPassword