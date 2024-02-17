// import { createContext, useState, useEffect, useContext } from "react";
// import { useNavigate } from 'react-router-dom'

// const UserContext = createContext();

// const UserProvider = ({ children }) => {
//     const navigate = useNavigate();
//     const [loggedUser, setloggedUser] = useState({});

//     useEffect(() => {
//         const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//         setloggedUser(userInfo);
//         if (!userInfo) { navigate("/"); }
//     }, [navigate]);


//     return (
//         <UserContext.Provider value={
//             { loggedUser, setloggedUser }
//         }>
//             {children}
//         </UserContext.Provider>)
// }

// export const UserState = () => {
//     return useContext(UserContext);
// };

// export default UserProvider

import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const [loggedUser, setLoggedUser] = useState();

    useEffect(() => {
        try {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            if (userInfo) {
                setLoggedUser(userInfo);
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Error parsing user info:", error);
            navigate("/");
        }
    },[]);

    return (
        <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const UserState = () => {
    return useContext(UserContext);
};

export default UserProvider;
