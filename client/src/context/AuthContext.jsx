import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [publisherKey, setPublisherKey] = useState(() => localStorage.getItem("publisherKey"));
    const [userEmail, setUserEmail] = useState(() => localStorage.getItem("userEmail"));

    const isAuthenticated = Boolean(publisherKey && userEmail);

    // 🔹 Sync to localStorage
    useEffect(() => {
        if (publisherKey) localStorage.setItem("publisherKey", publisherKey);
        else localStorage.removeItem("publisherKey");

        if (userEmail) localStorage.setItem("userEmail", userEmail);
        else localStorage.removeItem("userEmail");
    }, [publisherKey, userEmail]);

    // 🔹 Login after signup/login API
    const loginUser = (email, publisherKeyValue) => {
        setUserEmail(email);
        setPublisherKey(publisherKeyValue);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("publisherKey", publisherKeyValue);
    };

    // 🔹 Logout
    const logout = () => {
        setPublisherKey(null);
        setUserEmail(null);
        localStorage.removeItem("publisherKey");
        localStorage.removeItem("userEmail");
    };

    const value = {
        userEmail,
        publisherKey,
        isAuthenticated,
        loginUser,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
