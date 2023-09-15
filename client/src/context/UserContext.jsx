import { useQuery } from "@tanstack/react-query";
import { createContext, useState, useContext, useMemo } from "react";
import Loading from "../components/Loading";

export const userContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const isSessionId = document.cookie.includes("success");
    console.log("isSessionId", isSessionId);

    const fetchUserInfos = async () => {
        const response = await fetch(
            "https://chabflix.onrender.com/api/auth/me",
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            }
        );
        const data = await response.json();
        setUser(data);
        return data;
    };

    console.log("user", user);

    const { isInitialLoading, isError, error } = useQuery({
        queryKey: ["UserInfos"],
        queryFn: fetchUserInfos,
        enabled: isSessionId,
        staleTime: 15 * 60 * 1000,
        refetchIntervalInBackground: true,
    });

    const value = useMemo(
        () => ({
            user,
            setUser,
        }),
        [user]
    );

    if (isError) {
        return <div>Une erreur est survenue {error.message}</div>;
    }

    if (isInitialLoading) {
        return <Loading />;
    }

    return (
        <userContext.Provider value={value}>{children}</userContext.Provider>
    );
};

export const useUserValue = () => useContext(userContext);
