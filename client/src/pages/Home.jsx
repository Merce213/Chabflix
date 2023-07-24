import React from "react";
import HeroSlideBanner from "../components/HeroSlideBanner";
import { Link } from "react-router-dom";
import ItemList from "../components/ItemList";
import { category, movieType, tvType } from "../api/tmdbApi";

const Home = () => {
    return (
        <>
            <HeroSlideBanner />
            <div className="flex flex-col container mx-auto gap-2">
                <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-2xl font-bold">Trending Movies</h2>
                        <Link to="/movie">
                            <button className="border-2 rounded-full px-6 py-1 hover:bg-white hover:text-slate-900 transition-colors duration-300">
                                View more
                            </button>
                        </Link>
                    </div>
                    <ItemList
                        category={category.movie}
                        type={movieType.popular}
                    />
                </div>
                <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-2xl font-bold">Top Rated Movies</h2>
                        <Link to="/movie">
                            <button className="border-2 rounded-full px-6 py-1 hover:bg-white hover:text-slate-900 transition-colors duration-300">
                                View more
                            </button>
                        </Link>
                    </div>
                    <ItemList
                        category={category.movie}
                        type={movieType.top_rated}
                    />
                </div>
                <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-2xl font-bold">Trending TV's</h2>
                        <Link to="/tv">
                            <button className="border-2 rounded-full px-6 py-1 hover:bg-white hover:text-slate-900 transition-colors duration-300">
                                View more
                            </button>
                        </Link>
                    </div>
                    <ItemList category={category.tv} type={tvType.popular} />
                </div>
                <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-2xl font-bold">Top Rated TV's</h2>
                        <Link to="/tv">
                            <button className="border-2 rounded-full px-6 py-1 hover:bg-white hover:text-slate-900 transition-colors duration-300">
                                View more
                            </button>
                        </Link>
                    </div>
                    <ItemList category={category.tv} type={tvType.top_rated} />
                </div>
            </div>
        </>
    );
};

export default Home;
