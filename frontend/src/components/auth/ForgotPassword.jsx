import React from 'react'
import { useForm } from 'react-hook-form';
import { Forgot_Password } from '../../utils/FetchData.js';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const { register, handleSubmit } = useForm()

  const submitEmail = async (data) => {
    let res = await Forgot_Password(data);
    if (res) toast.loading("Mail has been sent to reset the password")
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