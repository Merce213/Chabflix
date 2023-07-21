import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";

const App = () => {
    return (
        <>
            <Navbar />

            <main className="w-full min-h-screen">
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </main>

            <Footer />
        </>
    );
};

export default App;
