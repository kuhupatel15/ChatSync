import React, { useEffect } from 'react'
import { logout } from '../../store/reducers/AuthSlice.js';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const { Component } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        let token = localStorage.getItem('jwt_token');
        if (!token) {
            toast.error("Login first to access !!")
            dispatch(logout())
            navigate('/')
        }
    }, [])

    return (
        <div>
            <Component />
        </div>
    )
}

export default ProtectedRoute;
