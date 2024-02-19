// import React, { useEffect } from 'react'
// import { logout } from '../../store/reducers/AuthSlice.js';
// import { useDispatch } from 'react-redux';
// import toast from 'react-hot-toast'
// import { useNavigate } from 'react-router-dom';

// const ProtectedRoute = (props) => {
//     const navigate = useNavigate();
//     const { Component } = props;
//     const dispatch = useDispatch();

//     useEffect(() => {
//         let token = localStorage.getItem('jwt_token');
//         if (!token) {
//             toast.error("Login first to access !!")
//             dispatch(logout())
//             navigate('/')
//         }
//     }, [])

//     return (
//         <div>
//             <Component />
//         </div>
//     )
// }

// export default ProtectedRoute;

import React, { useEffect } from 'react';
import { logout } from '../../store/reducers/AuthSlice.js';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ProtectedLayout = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        let token = localStorage.getItem('jwt_token');
        if (!token) {
            toast.error("Login first to access !!");
            dispatch(logout());
            navigate('/');
        }
    }, [dispatch, navigate]);

    return (
        <div>
            {children}
        </div>
    );
};

export default ProtectedLayout;
