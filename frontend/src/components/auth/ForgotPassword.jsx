import React from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Forgot_Password } from '../../routes/AuthRoutes';


const ForgotPassword = () => {
  const { register, handleSubmit } = useForm()

  const submitEmail = async (data) => {
    let res = await Forgot_Password(data);
    if (res) toast.loading("Mail has been sent to reset the password")
  }

  return (
    <div>
      <form onSubmit={handleSubmit(submitEmail)}>
        <input type="text" {...register("userEmail")} className='' />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default ForgotPassword