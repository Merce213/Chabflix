import React, { useEffect, useState } from "react";
import { HiTrendingUp } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getResultMultiQuery, getTrendingSearch } from "../api/apiCall/search";
import Loading from "./Loading";

const SearchModalResults = ({ setSearchBoxOpen, search }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);

    const handleScroll = () => {
        const currentScrollPos = window.scrollY;
        const visible = prevScrollPos > currentScrollPos;

        // console.log("currentScrollPos", currentScrollPos);
        // console.log("visible", visible);

        setPrevScrollPos(currentScrollPos);
        setIsVisible(visible);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollPos, isVisible, handleScroll]);

    const trendingSearchResult = useQuery({
        queryKey: ["TrendingSearch"],
        queryFn: getTrendingSearch,
        staleTime: 24 * 60 * 1000,
    });

    const resultQuery = useQuery({
        queryKey: ["SearchLink", search],
        queryFn: () => getResultMultiQuery(search),
        staleTime: Infinity,
    });

    if (trendingSearchResult.isError || resultQuery.isError) {
        return <div>Something went wrong.. {error.message}</div>;
    }

    if (trendingSearchResult.isLoading || resultQuery.isLoading) {
        return <Loading />;
    }
    console.log("resultQuery", resultQuery.data);
    return (
        <div
            className={`fixed left-0 w-full bg-slate-900 transition-all duration-300 ${
                isVisible ? "top-20" : "-top-full"
            }`}
        >
            {search.length >= 1 ? null : (
                <div className="border-y flex space-x-2 py-1 ps-4">
                    <button>
                        <HiTrendingUp size={"28px"} />
                    </button>
                    <h2 className="text-lg font-extrabold tracking-wide">
                        Trending
                    </h2>
                </div>
            )}
            <div className="flex flex-col">
                {search.length >= 1
                    ? resultQuery.data.map((item) => (
                          <Link
                              key={item.id}
                              className="flex border-b py-1 ps-4 space-x-2 cursor-pointer hover:bg-gray-600"
                              to={{
                                  pathname: `/search/${item.media_type}`,
                                  search: `?query=${item.title || item.name}`,
                              }}
                              onClick={() => setSearchBoxOpen(false)}
                          >
                              <button>
                                  <AiOutlineSearch size={"20px"} />
                              </button>
                              <p>
                                  {item.title || item.name}{" "}
                                  <span className="uppercase text-sm opacity-40">
                                      - {item.media_type}
                                  </span>
                              </p>
                          </Link>
                      ))
                    : trendingSearchResult.data.map((item) => (
                          <Link
                              key={item.id}
                              className="flex border-b py-1 ps-4 space-x-2 cursor-pointer hover:bg-gray-600"
                              to={{
                                  pathname: `/search/${item.media_type}`,
                                  search: `?query=${item.title || item.name}`,
                              }}
                              onClick={() => setSearchBoxOpen(false)}
                          >
                              <button>
                                  <AiOutlineSearch size={"20px"} />
                              </button>
                              <p>
                                  {item.title || item.name}{" "}
                                  <span className="uppercase text-sm opacity-40">
                                      - {item.media_type}
                                  </span>
                              </p>
                          </Link>
                      ))}
            </div>
        </div>
    );
};

export default SearchModalResults;
