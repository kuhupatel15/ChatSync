import React, { useEffect } from 'react'
import { Input, Button } from "@nextui-org/react";
import { Link, useNavigate } from 'react-router-dom'
import '../../index.css'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form';
import { login } from "../../../store/reducers/AuthSlice.js"
import { LogIn } from '../../utils/FetchData.js';
import { userData } from '../../../store/reducers/UserSlice.js';
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons'
import { UserState } from '../../context/UserProvider.jsx';
import { useGoogleLogin} from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode'
import { FcGoogle } from "react-icons/fc";

const Login = () => {



  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const { setLoggedUser } = UserState();
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  // const submithandler = async (data) => {
  //   dispatch(login(data));
  //   const res = await LogIn(data);
  //   if (res) {
  //     dispatch(userData(res.data.user))
  //     setLoggedUser(res.data.user)
  //     localStorage.setItem("userInfo", JSON.stringify(res.data.user));
  //     navigate('/home')
  //   }
  // }
  // const loginResponse = (response)=>{
  //   const resp = jwtDecode(response.credential)
  //   console.log(resp)
  // }
  // const errorResponse = (error)=>{
  //   console.log(error)
  // }
//   const login = useGoogleLogin({
//     onSuccess: (response)=>{
//       const resp = jwtDecode(response)
//       console.log(resp)
//       // const res= Login(resp.email)
//       // console.log(res.data)
//     },
//     onError:  (error)=>{
//       console.log(error)}
// });

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      setLoggedUser(JSON.parse(storedUser));
    }
  }, [setLoggedUser]);

  const submithandler = async (data) => {
    dispatch(login(data));
    const res = await LogIn(data);
    if (res) {
      dispatch(userData(res.data.user));
      localStorage.setItem('userInfo', JSON.stringify(res.data.user));
      setLoggedUser(res.data.user); 
      navigate('/home');
    }
  };

  return (
    <div className='text-slate-300 w-[100vw] h-[100vh] signup flex  item-center justify-center ' >
      <div className='w-[40vw] my-auto'>
      <form onSubmit={handleSubmit(submithandler)} className="flex w-[40vw]   flex-col gap-4 text-left my-auto bg-[#37393F] p-4">
        <h1 className='text-white text-xl text-center font-bold'>Welcome Back !</h1>
        <div>
          <label htmlFor="Email" className='ml-2 '>Email</label>
          <Input
            isRequired
            type="email"

            size="sm"
            placeholder="name@gmail.com"
            className="w-full mt-2"
            {...register("userEmail")}
          />
        </div>

        <div>
          <label htmlFor="Password" className='ml-2 '>Password</label>
          <Input
            size="sm"

            isRequired
            placeholder="Enter your password"
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <EyeOpenIcon />
                ) : (
                  <EyeClosedIcon />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="w-full mt-2"
            {...register("password")}
          />
          <div className='flex flex-col'>
            <Link to={'/forgot-password'} className='ml-0 text-sky-400 mt-2'>Forget password?</Link>
            <Button className="mt-2 bg-gradient-to-br from-purple-500  to-cyan-500" type="submit">
              Log-In
            </Button>
          </div>

        </div>
        <p className='text-white'>Does not have an account ? <Link to={'/'}><button className='text-sky-400'>Sign Up</button></Link></p>
      </form>
          {/* <Button onClick={login} className="mt-2 w-full bg-gradient-to-br from-purple-500  to-cyan-500" variant="solid" startContent={<FcGoogle className='text-2xl'/>}>
        Sign-In with Google
      </Button> */}
      </div>
    </div>
  )
}

export default Login