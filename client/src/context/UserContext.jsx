import { createContext, useState, useContext, useEffect, useMemo } from "react";

export const userContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const isSessionId = document.cookie.includes("success");
    console.log(isSessionId);

    const fetchUserInfos = async () => {
        const response = await fetch("http://localhost:8000/api/auth/me", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        if (isSessionId) fetchUserInfos();
    }, [isSessionId]);

    const value = useMemo(
        () => ({
            user,
            setUser,
        }),
        [user]
    );

    return (
        <userContext.Provider value={value}>{children}</userContext.Provider>
    );
};

export const useUserValue = () => useContext(userContext);
