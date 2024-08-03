import React, { useEffect } from 'react';
import { logout } from '../../src/store/reducers/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

// const ProtectedLayout = ({ children }) => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const user = useSelector((state) => state.user.userData);

//     useEffect(() => {
//         let token = localStorage.getItem("jwt_token");

//         if (!token) {
//             navigate('/login');
//             return toast.error("Login first to access !!");
//         }
//     }, [dispatch, navigate]);

//     return (
//         <div>
//             {children}
//         </div>
//     );
// };

// export default ProtectedLayout;




const PrivateRoutes = () => {
    const isAuthenticated = useSelector(({ auth }) => auth.status)

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;