import React, { useRef } from 'react'
import { useForm } from 'react-hook-form';
import { Reset_Password } from '../../utils/FetchData.js';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { id, token } = useParams();
  const { register, handleSubmit } = useForm()

  const submitPassword = async (data) => {
    let res = await Reset_Password({ id, token, password: data.password });
    if (res.status) navigate('/login');
  }

  return (
    <div>
      <form onSubmit={handleSubmit(submitPassword)}>
        <input type="text" {...register("password")} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default ResetPassword