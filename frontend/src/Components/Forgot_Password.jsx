import React from 'react'
import { useForm } from 'react-hook-form';
import { Forgot_Password } from '../utils/Fetch_data.js';
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm()

  const submitEmail = async (data) => {
    let res = await Forgot_Password(data);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(submitEmail)}>
        <input type="text" {...register("userEmail")} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default ForgotPassword