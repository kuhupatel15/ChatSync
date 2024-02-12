import React from 'react'
import { Button, Label, TextInput } from 'flowbite-react';
import '../../index.css'
import { useNavigate } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Verify } from '../../utils/FetchData.js';

const VerifyOtp = () => {

  const userID = useSelector((state) => state.User.userdata.user._id)
  const navigate = useNavigate()

  const [otp, setOtp] = useState('');

  const handleVerify = async () => {
    const res = await Verify({ otp, userID });
    navigate('/home')
  }

  return (
    <div className='text-slate-300 w-[100vw] h-[100vh] signup flex  item-center justify-center ' >
      <div className='bg-[#37393F] flex flex-col gap-4 h-[40vh] w-[30vw] justify-around m-auto item-center p-4'>
        <h2 className='text-center text-xl font-bold'>Enter the OTP sent to your registered email to proceed further.</h2>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          renderSeparator={<span> </span>}
          inputType="tel"
          containerStyle={{ display: 'unset' }}
          inputStyle={{ width: "3rem", height: "3.5rem" }}
          renderInput={(props) => <input {...props} className='otp-input ml-[2.3vw]' />}
        />
        <Button gradientDuoTone="purpleToBlue" onClick={handleVerify}>Verify account</Button>
      </div>
    </div>
  )
}

export default VerifyOtp