import React from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getResults } from "../api/apiCall/search";
import Loading from "../components/Loading";
import queryString from "query-string";
import { apiConfig } from "../api/apiConfig";

export const categories = [
    {
        slug: "movie",
        name: "Movies",
        path: "/search/movie",
    },
    {
        slug: "tv",
        name: "TV Shows",
        path: "/search/tv",
    },
    {
        slug: "person",
        name: "People",
        path: "/search/person",
    },
];

const Search = () => {
    const location = useLocation();
    console.log("location", location);

    const category = location.pathname.split("/")[2];
    console.log("category", category);

    const { query } = queryString.parse(location.search);
    console.log("query", query);

    const {
        isLoading,
        isError,
        error,
        data: dataSearch,
    } = useQuery({
        queryKey: ["Search", query],
        queryFn: () => getResults(query),
        staleTime: Infinity,
    });

    console.log("dataSearch", dataSearch);

    if (isError) {
        return <div>Something went wrong.. {error.message}</div>;
    }

    if (isLoading) {
        return <Loading />;
    }

    const results = dataSearch.results;

    console.log("results", results);

    const link = (result) => {
        switch (result.media_type) {
            case "movie":
                return `/movie/${result?.title
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s/g, "-")}`;
            case "tv":
                return `/tv/${result?.name
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s/g, "-")}`;
            case "person":
                return `/person/${result?.name
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s/g, "-")}`;
        }
    };

    const formattedDate = (dateNumeric) => {
        if (!dateNumeric) {
            return "";
        }

        const date = new Date(dateNumeric);
        const options = { year: "numeric", month: "long", day: "numeric" };
        const formatDate = date.toLocaleDateString("en-EN", options);

        return formatDate;
    };

    return (
        <section className="mt-20 w-full">
            <div className="flex items-start w-full justify-center flex-wrap max-w-full md:max-w-none md:flex-nowrap">
                <div className="flex items-start content-start w-full max-w-screen flex-wrap md:flex-nowrap md:p-[30px_40px] md:max-w-[1600px]">
                    <div className="grey_column md:w-[260px] md:min-w-[260px] flex-wrap w-full max-w-screen items-start content-start md:max-w-none md:justify-end">
                        <div className="md:block md:w-[260px] md:min-w-[260px] md:border-solid md:border md:border-gray-500 md:rounded-lg md:overflow-hidden w-full">
                            <h3 className="bg-blue-600 md:p-5 py-2 px-5 flex items-center justify-start font-semibold text-lg">
                                Search Results
                            </h3>
                            <div className="relative top-0 left-0">
                                <ul className="flex md:flex-col overflow-auto justify-start bg-gray-100">
                                    {categories.map(({ slug, name, path }) => (
                                        <li
                                            key={name}
                                            className="justify-start w-auto  inline-flex items-center leading-[1] whitespace-nowrap"
                                        >
                                            <NavLink
                                                to={`${path}?query=${query}`}
                                                className={`p-[14px_12px] first:pl-5 md:first:pl-3 w-full h-full inline-flex items-center font-semibold transition-all duration-300 ${
                                                    category === slug
                                                        ? "text-blue-600 bg-gray-300"
                                                        : "text-black hover:text-blue-600 hover:bg-gray-300"
                                                }`}
                                            >
                                                {name}
                                            </NavLink>
                                            <span></span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-5 md:mt-0 md:ml-5 h-auto justify-start flex flex-wrap flex-initial">
                        <section className="last-of-type:pb-5 first-of-type:border-t-0 first-of-type:pt-0 w-full p-5 block md:last-of-type:pb-0 py-[30px]">
                            <div>
                                <div className="items-start content-start justify-start flex flex-wrap">
                                    {results.map((result) => (
                                        <div
                                            key={result.id}
                                            className="first:mt-0 mt-5 flex-wrap w-full flex rounded-md overflow-hidden shadow-[0_2px_8px_rgba(29,78,216,0.5)] bg-gray-100 border-solid"
                                        >
                                            <div className="flex md:max-w-[calc(100vw_-_82px)] md:w-full w-[calc(100vw_-_42px)]">
                                                <div className="min-w-28 w-28 h-full min-h-[141px]">
                                                    <div className="w-full h-full">
                                                        <Link
                                                            className="block w-full h-full"
                                                            to={link(result)}
                                                        >
                                                            <img
                                                                loading="lazy"
                                                                className="min-w-full w-full h-full block"
                                                                src={apiConfig.w500Image(
                                                                    result.poster_path ||
                                                                        result.backdrop_path ||
                                                                        result.profile_path
                                                                )}
                                                                alt={
                                                                    result.name ||
                                                                    result.title
                                                                }
                                                            />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="p-[14px] flex content-center items-center flex-wrap w-full md:p-[10px_15px] text-black">
                                                    <div className="items-start flex w-full md:items-center">
                                                        <div className="flex-wrap w-full flex items-baseline overflow-hidden">
                                                            <Link
                                                                to={link(
                                                                    result
                                                                )}
                                                                className="whitespace-nowrap overflow-hidden text-ellipsis font-medium md:text-lg"
                                                            >
                                                                <h2 className="block whitespace-normal overflow-visible text-clip">
                                                                    {result.title ||
                                                                        result.name}
                                                                </h2>
                                                            </Link>
                                                            <span className="text-xs md:text-sm w-full whitespace-nowrap text-gray-600">
                                                                {formattedDate(
                                                                    result.release_date ||
                                                                        result.first_air_date
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="max-h-[3.2em] md:max-h-none h-auto mt-5">
                                                        <p className="text-sm overflow-hidden text-ellipsis line-clamp-2 md:text-base">
                                                            {result.overview}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Search;
