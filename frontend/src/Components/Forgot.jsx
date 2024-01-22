import React from 'react'
import { useForm } from 'react-hook-form';
import { Forgot_email } from '../utils/authentication';
const Forgot = () => {
    const { register, handleSubmit } = useForm()
    const submitEmail =async (data)=>{
        console.log(data)
        let email = await Forgot_email(data);
        console.log(email)

    }
  return (
    <div>
        <form onSubmit={handleSubmit(submitEmail)}>
            <input type="text" {...register("userEmail")}/>
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default Forgot