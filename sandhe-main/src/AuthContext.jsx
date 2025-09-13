import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userContact, setUserContact] = useState(null); // Store user's contact info

    const login = (contact) => {
        console.log("Logging in with contact:", contact); // Debugging
        setIsAuthenticated(true);
        setUserContact(contact); // Set user's contact info on login
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserContact(null); // Clear user's contact info on logout
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userContact, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};