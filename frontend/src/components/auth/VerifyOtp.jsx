import React from 'react'
import { Button, Input } from "@nextui-org/react";
import '../../index.css'
import { useLocation, useNavigate } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Verify } from '../../routes/AuthRoutes';
import { login } from '../../../store/reducers/UserSlice';


const VerifyOtp = () => {

  const navigate = useNavigate()

  const location = useLocation();
  const { state } = location;
  const userId = state.user._id;

  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');

  const handleVerify = async () => {
    await Verify({ otp, userId });
    dispatch(login(state.user))
    navigate('/home')
  }

  return (
   
    <div className='signup w-[100vw] h-[100vh] flex items-center justify-center'>
      <div className="flex w-max rounded-2xl flex-col gap-4 bg-pri p-6">
        <div className='flex flex-col gap-2 mb-2'>
          <h1 className='text-white text-3xl tracking-wide font-bold'>Verify OTP</h1>
          <h1 className='text-gray-400 text-md tracking-wide'>Enter the OTP sent to your registered <br /> email to proceed further.</h1>
        </div>

        <div className='flex items-center justify-center'>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span> </span>}
            inputType="tel"
            containerStyle={{ display: 'unset' }}
            inputStyle={{ width: "3rem", height: "3.5rem" }}
            renderInput={(props) => <input {...props} className='otp-input ml-[2.3vw] bg-red-300' />}
          />
        </div>

        <Button className="font-bold mt-2 bg-gradient-to-br from-purple-500  to-cyan-500 text-lg" size='lg' onClick={handleVerify}>
          Verify account
        </Button>
      </div>
    </div>
  )
}

export default VerifyOtp