import React from 'react'
import { Button } from 'flowbite-react';
import '../index.css'
import { useDispatch } from 'react-redux'
import { logout } from "../../store/reducers/AuthSlice"
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Logout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const submithandler = async () => {
        toast.success("Log out successfully.")
        localStorage.removeItem("jwt_token");
        dispatch(logout());
        navigate('/login')
    }

    return (
        <Button onClick={submithandler} gradientDuoTone="purpleToBlue">Log out</Button>
    )
}

export default Logout