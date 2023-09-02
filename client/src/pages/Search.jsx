import React from "react";
import { NavLink, useLocation, Link, useNavigate } from "react-router-dom";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getResultsQueryAndCategory } from "../api/apiCall/search";
import Loading from "../components/Loading";
import queryString from "query-string";
import { apiConfig } from "../api/apiConfig";
import blankImg from "../assets/images/blank-img.png";

import ReactPaginate from "react-paginate";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Search = () => {
    const navigate = useNavigate();

    const location = useLocation();

    const category = location.pathname.split("/")[2];

    const { query } = queryString.parse(location.search);
    const { page } = queryString.parse(location.search);

    const searchQuery = useQueries({
        queries: [
            {
                queryKey: ["Search", "movie", query, 1],
                queryFn: () => getResultsQueryAndCategory("movie", query),
                staleTime: Infinity,
            },
            {
                queryKey: ["Search", "tv", query, 1],
                queryFn: () => getResultsQueryAndCategory("tv", query),
                staleTime: Infinity,
            },
            {
                queryKey: ["Search", "person", query, 1],
                queryFn: () => getResultsQueryAndCategory("person", query),
                staleTime: Infinity,
            },
        ],
    });

    const moviesQuery = searchQuery[0];
    const tvQuery = searchQuery[1];
    const personQuery = searchQuery[2];

    const { error, isError, isLoading, data } = useQuery({
        queryKey: ["Search", category, query, page],
        queryFn: () => getResultsQueryAndCategory(category, query, page),
        staleTime: Infinity,
        keepPreviousData: true,
    });

    if (
        moviesQuery.isError ||
        tvQuery.isError ||
        personQuery.isError ||
        isError
    ) {
        return <div>Something went wrong.. {error.message}</div>;
    }

    if (
        moviesQuery.isLoading ||
        tvQuery.isLoading ||
        personQuery.isLoading ||
        isLoading
    ) {
        return <Loading />;
    }

    const categories = [
        {
            slug: "movie",
            name: "Movies",
            path: "/search/movie",
            total_results: moviesQuery.data.total_results ?? 0,
        },
        {
            slug: "tv",
            name: "TV Shows",
            path: "/search/tv",
            total_results: tvQuery.data.total_results ?? 0,
        },
        {
            slug: "person",
            name: "People",
            path: "/search/person",
            total_results: personQuery.data.total_results ?? 0,
        },
    ];

    let pageCount;
    switch (category) {
        case "movie":
            pageCount = moviesQuery.data.total_pages;
            break;
        case "tv":
            pageCount = tvQuery.data.total_pages;
            break;
        case "person":
            pageCount = personQuery.data.total_pages;
            break;
        default:
            pageCount = moviesQuery.data.total_pages;
            break;
    }

    const link = (result) => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        switch (category) {
            case "movie":
                return `/movie/${result?.title
                    ?.toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s/g, "-")}`;
            case "tv":
                return `/tv/${result?.name
                    ?.toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s/g, "-")}`;
            case "person":
                return `/person/${result?.name
                    ?.toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s/g, "-")}`;
            default:
                return `/movie/${result?.title
                    ?.toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s/g, "-")}`;
        }
    };

    const knownFor = (item) => {
        switch (item.media_type) {
            case "movie":
                return `/movie/${item.title
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s/g, "-")}`;
            case "tv":
                return `/tv/${item.name
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s/g, "-")}`;
            default:
                return `/movie/${item.title
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

    const handlePageClick = (event) => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        const selectedPage = event.selected + 1;
        switch (category) {
            case "movie":
                return navigate({
                    pathname: `/search/movie`,
                    search: `?query=${query}&page=${selectedPage}`,
                });
            case "tv":
                return navigate({
                    pathname: `/search/tv`,
                    search: `?query=${query}&page=${selectedPage}`,
                });
            case "person":
                return navigate({
                    pathname: `/search/person`,
                    search: `?query=${query}&page=${selectedPage}`,
                });
            default:
                return navigate({
                    pathname: `/search/movie`,
                    search: `?query=${query}&page=${selectedPage}`,
                });
        }
    };

    return (
        <section className="mt-20 w-full">
            <div className="flex items-start w-full justify-center flex-wrap max-w-full md:max-w-none md:flex-nowrap">
                <div className="flex items-start content-start w-full max-w-screen flex-wrap md:flex-nowrap md:p-[30px_40px] md:max-w-[1600px]">
                    <div className="md:w-[260px] md:min-w-[260px] flex-wrap w-full max-w-screen items-start content-start md:max-w-none md:justify-end md:sticky md:top-24">
                        <div className="md:block md:w-[260px] md:min-w-[260px] md:border-solid md:border md:border-gray-500 md:rounded-lg md:overflow-hidden w-full">
                            <h3 className="bg-blue-600 md:p-5 py-2 px-5 flex items-center justify-start font-semibold text-lg">
                                Search Results
                            </h3>
                            <div className="relative top-0 left-0">
                                <ul className="flex md:flex-col overflow-auto justify-start bg-gray-100">
                                    {categories.map(
                                        ({
                                            slug,
                                            name,
                                            path,
                                            total_results,
                                        }) => (
                                            <li
                                                key={name}
                                                className={`justify-start md:justify-between w-auto inline-flex items-center leading-[1] whitespace-nowrap transition-all duration-300 pe-3 group ${
                                                    category === slug
                                                        ? "bg-gray-300"
                                                        : "bg-white hover:bg-gray-300"
                                                }`}
                                            >
                                                <NavLink
                                                    to={`${path}?query=${query}`}
                                                    className={`p-[14px_12px] first:pl-5 md:first:pl-3 w-full h-full inline-flex items-center font-semibold transition-all duration-300 ${
                                                        category === slug
                                                            ? "text-blue-600"
                                                            : "text-black hover:text-blue-600"
                                                    }`}
                                                >
                                                    {name}
                                                </NavLink>
                                                <span
                                                    className={`text-black p-2 border rounded-lg transition-all duration-300 ${
                                                        category === slug
                                                            ? "bg-blue-600 text-white"
                                                            : "bg-gray-300 text-black group-hover:bg-blue-600 group-hover:text-white"
                                                    }`}
                                                >
                                                    {total_results}
                                                </span>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-5 md:mt-0 md:ml-5 h-auto justify-start flex flex-wrap flex-initial">
                        <section className="last-of-type:pb-5 first-of-type:border-t-0 first-of-type:pt-0 w-full p-5 block md:last-of-type:pb-0 py-[30px]">
                            <div>
                                <div className="items-start content-start justify-start flex flex-wrap">
                                    {data.results.map((result) => (
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
                                                            state={result.id}
                                                        >
                                                            <img
                                                                loading="lazy"
                                                                className="min-w-full w-full h-full block"
                                                                src={
                                                                    (result.poster_path ??
                                                                        result.backdrop_path ??
                                                                        result.profile_path !==
                                                                            undefined) &&
                                                                    (result.poster_path ??
                                                                        result.backdrop_path ??
                                                                        result.profile_path !==
                                                                            null)
                                                                        ? apiConfig.w500Image(
                                                                              result.poster_path ??
                                                                                  result.backdrop_path ??
                                                                                  result.profile_path
                                                                          )
                                                                        : blankImg
                                                                }
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
                                                                state={
                                                                    result.id
                                                                }
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
                                                                <span className="text-yellow-600 pl-2">
                                                                    {" "}
                                                                    {result?.vote_average
                                                                        ? result?.vote_average?.toFixed(
                                                                              1
                                                                          ) +
                                                                          "/10"
                                                                        : ""}
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="max-h-[3.2em] md:max-h-none h-auto mt-5">
                                                        <p className="text-sm overflow-hidden text-ellipsis line-clamp-2 md:text-base">
                                                            {result.overview ||
                                                                result?.known_for_department +
                                                                    " • "}
                                                            {result?.known_for?.map(
                                                                (item) => (
                                                                    <Link
                                                                        key={
                                                                            item.id
                                                                        }
                                                                        to={knownFor(
                                                                            item
                                                                        )}
                                                                        className="text-sm"
                                                                        state={
                                                                            item.id
                                                                        }
                                                                    >
                                                                        {item.title ||
                                                                            item.name}

                                                                        {result
                                                                            ?.known_for
                                                                            ?.length >
                                                                            1 &&
                                                                            result?.known_for?.indexOf(
                                                                                item
                                                                            ) !==
                                                                                result
                                                                                    ?.known_for
                                                                                    ?.length -
                                                                                    1 && (
                                                                                <span className="text-gray-600">
                                                                                    ,{" "}
                                                                                </span>
                                                                            )}
                                                                    </Link>
                                                                )
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="w-full flex justify-center">
                                        <ReactPaginate
                                            activeLinkClassName={
                                                "items-center cursor-pointer flex text-sm h-10 justify-center p-2 md:p-4 text-blue-500"
                                            }
                                            breakClassName={
                                                "items-center cursor-pointer flex text-sm h-10 justify-center p-2 md:p-4"
                                            }
                                            breakLabel={"..."}
                                            containerClassName={
                                                "w-full flex justify-center mt-4 items-center"
                                            }
                                            disabledLinkClassName={
                                                "cursor-default text-gray-400/30"
                                            }
                                            marginPagesDisplayed={2}
                                            nextClassName={
                                                "items-center cursor-pointer flex text-sm h-10 justify-center p-2 md:p-4"
                                            }
                                            nextLabel={
                                                <IoIosArrowForward size={20} />
                                            }
                                            onPageChange={handlePageClick}
                                            pageCount={pageCount}
                                            pageLinkClassName={
                                                "items-center cursor-pointer flex text-sm h-10 justify-center hover:text-blue-500 p-2 md:p-3"
                                            }
                                            pageRangeDisplayed={4}
                                            previousClassName={
                                                "items-center cursor-pointer flex text-sm h-10 justify-center p-2 md:p-4"
                                            }
                                            previousLabel={
                                                <IoIosArrowBack size={20} />
                                            }
                                            forcePage={parseInt(page) - 1 || 0}
                                            renderOnZeroPageCount={null}
                                        />
                                    </div>
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
