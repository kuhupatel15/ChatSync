import axios from 'axios';
import toast from 'react-hot-toast';
import { Link,useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import baseUrl from './baseURL';

export const Login = async({userEmail,password})=>{
    try {
        const response = await axios.post('http://localhost:3000/user/login', 
        {userEmail,  password},{}
        )
        return response ; 
      }
      catch (error) {
        console.log(error);
      }
}