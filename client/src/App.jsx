import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

const App = () => {
    return (
        <>
            <Navbar />

            <main className="w-full min-h-screen">
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </main>
        </>
    );
};

/* Changer l'api movies et faire comme dans bétaseries pour pas que ça change le random number a chq fois */

export default App;
