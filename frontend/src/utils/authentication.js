import axios from 'axios';
import toast from 'react-hot-toast';
import { Link,useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import baseUrl from './baseURL';
export const Login = async({userEmail,password})=>{
    try {
        let response = await baseUrl.post('/user/login', 
        {userEmail,  password},{}
        )
        return response ; 
      }
      catch (error) {
        console.log(error);
      }
}
export const Register = async({userEmail,userName,password})=>{
    try {
        let response = await baseUrl.post('/user/register', 
        {userEmail,userName,password},{}
        )
        
        return response ; 
      }
      catch (error) {
        console.log(error);
      }
}
export const Verify = async({otp,userID})=>{
    try {
        let response = await baseUrl.post('/user/verifyotp', 
        {otp,userID},{}
        )
        return response ; 
      }
      catch (error) {
        console.log(error);
      }
}

export const Forgot_email = async(userEmail)=>{
    try {
        let response = await baseUrl.post('/user/forgot-password', 
        {userEmail},{}
        )
        return response ; 
      }
      catch (error) {
        console.log(error);
      }
}
