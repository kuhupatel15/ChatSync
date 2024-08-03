import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
    const token = localStorage.getItem("jwt_token");

    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;



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
