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

// import { createContext, useState, useEffect, useContext } from "react";
// import { useNavigate } from 'react-router-dom';

// const UserContext = createContext();

// const UserProvider = ({ children }) => {
//     const navigate = useNavigate();
//     const [loggedUser, setLoggedUser] = useState();

//     // useEffect(() => {
//     //     try {
//     //         const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     //         if (userInfo) {
//     //             setLoggedUser(userInfo);
//     //         } else {
//     //             navigate("/");
//     //         }
//     //     } catch (error) {
//     //         console.error("Error parsing user info:", error);
//     //         navigate("/");
//     //     }
//     // },[]);

//     return (
//         <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
//             {children}
//         </UserContext.Provider>
//     );
// };

// export const UserState = () => {
//     return useContext(UserContext);
// };

// export default UserProvider;
import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const [loggedUser, setLoggedUser] = useState(
        () => {
        // Load logged user from localStorage if it exists
        const storedUser = localStorage.getItem('userInfo');
        return storedUser ? JSON.parse(storedUser) : null;
    }
);
    
    // Update localStorage whenever loggedUser changes
    useEffect(() => {
        localStorage.setItem('userInfo', JSON.stringify(loggedUser));
    }, [loggedUser]);

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

