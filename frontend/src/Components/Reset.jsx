import React, { useRef } from 'react'
import { useForm } from 'react-hook-form';
import { Reset_Password } from '../utils/authentication';

const Reset = () => {
    const {id,token}=useRef();
    
    const { register, handleSubmit } = useForm()
    const submitPassword =async (id, token, data)=>{
        console.log(data)
        let email = await Reset_Password(data);
        console.log(email)

    }
  return (
    <div>
        <form onSubmit={handleSubmit(submitPassword)}>
            <input type="text" {...register("password")}/>
            
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default Reset