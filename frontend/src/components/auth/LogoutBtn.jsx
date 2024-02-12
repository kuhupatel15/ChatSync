import React from 'react'
import { Button } from 'flowbite-react';
import '../../index.css'
import { useDispatch } from 'react-redux'
import { logout } from "../../../store/reducers/AuthSlice.js"
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { HiOutlineLogout } from "react-icons/hi";

const LogoutBtn = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const submithandler = async () => {
        toast.success("Log out successfully.")
        localStorage.removeItem("jwt_token");
        dispatch(logout());
        navigate('/login')
    }

    return (
        <Button outline gradientDuoTone="purpleToBlue" onClick={submithandler} className='text-3xl'>
            <HiOutlineLogout className='text-xl'></HiOutlineLogout>
        </Button>
    )
}

export default LogoutBtn