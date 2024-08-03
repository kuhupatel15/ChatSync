import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';


const PublicRoutes = () => {
    const token = localStorage.getItem("jwt_token");

    return token ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoutes;