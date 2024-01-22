import React from 'react'
import { useForm } from 'react-hook-form';
import { Forgot_email } from '../utils/authentication';
import {Link,useNavigate} from 'react-router-dom'
const Forgot = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm()
    const submitEmail =async (data)=>{
        console.log(data)
        let email = await Forgot_email(data);
        console.log(email)
        navigate('/reset')
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