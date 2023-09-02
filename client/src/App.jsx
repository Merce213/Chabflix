import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Search from "./pages/Search";
import Movie from "./pages/Movie";
import ScrollToTop from "./libs/ScrollToTop";
import Serie from "./pages/Serie";
import Detail from "./pages/Detail";

const App = () => {
    return (
        <>
            <Navbar />

            <main className="w-full min-h-screen">
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search/:category?" element={<Search />} />
                    <Route path="/movie" element={<Movie />} />
                    <Route path="/tv" element={<Serie />} />
                    <Route path="/:category/:name" element={<Detail />} />
                </Routes>
            </main>

            <Footer />
        </>
    );
};

export default App;
