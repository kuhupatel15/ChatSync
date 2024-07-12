import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    
    const [loggedUser, setLoggedUser] = useState(() => {
        // Load logged user from localStorage if it exists
        const storedUser = localStorage.getItem('userInfo');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    
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

