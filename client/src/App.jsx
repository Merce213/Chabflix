import { useUserValue } from "./context/UserContext";

const App = () => {
    const { user } = useUserValue();

    const getRequestToken = async () => {
        const response = await fetch(
            "http://localhost:8000/api/auth/request-token",
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();

        window.location.href = data.redirectUrl;
    };

    const logout = async () => {
        const response = await fetch("http://localhost:8000/api/auth/logout", {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        const data = await response.json();
        // console.log("data", data);
        window.location.reload(true);
    };

    return (
        <div>
            {user ? (
                <div>
                    <h1>Home</h1>
                    <p>{user.username}</p>
                    <p>{user.id}</p>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <div>
                    <h1>Home</h1>
                    <button onClick={getRequestToken}>Login</button>
                </div>
            )}
        </div>
    );
};

export default App;
