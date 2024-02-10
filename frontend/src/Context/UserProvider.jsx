// import React from 'react'
import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom'

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const [loggedUser, setloggedUser] = useState({});
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setloggedUser(userInfo);

        if (!userInfo) { navigate("/"); }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);


    return (
        <UserContext.Provider value={
            { loggedUser, setloggedUser }
        }>
            {children}
        </UserContext.Provider>)
}
export const UserState = () => {
    return useContext(UserContext);
};

export default UserProvider