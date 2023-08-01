import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Search from "./pages/Search";

const App = () => {
    return (
        <>
            <Navbar />

            <main className="w-full min-h-screen">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search/:category" element={<Search />} />
                </Routes>
            </main>

            <Footer />
        </>
    );
};
/* Finir la recherche autocomplet avec l'input + Finir la recherche page résultat */

export default App;
