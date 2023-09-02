import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Select from "react-select";
import { getMovieFilters, getMovieGenres } from "../api/apiCall/movies";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { apiConfig } from "../api/apiConfig";
import ReactPaginate from "react-paginate";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import blankImg from "../assets/images/blank-img.png";
import options from "../libs/SelectSortBy.JS";

const Movie = () => {
    const initialState = {
        page: 1,
        sort_by: "popularity.desc",
        with_genres: "",
    };

    const [filters, setFilters] = useState(initialState);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [filters]);

    const {
        data: dataGenre,
        isLoading: isLoadingGenre,
        isError: isErrorGenre,
        error: errorGenre,
    } = useQuery({
        queryKey: ["movieGenre"],
        queryFn: () => getMovieGenres(),
        staleTime: Infinity,
    });

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["movieFilters", filters],
        queryFn: () => getMovieFilters(filters),
        keepPreviousData: true,
    });

    if (isLoading || isLoadingGenre) return <Loading />;

    if (isError || isErrorGenre)
        return <div>Error: {error?.message || errorGenre?.message}</div>;

    const pageCount = data.total_pages > 500 ? 500 : data.total_pages;
    const totalMovies = data.total_results > 10000 ? 10000 : data.total_results;

    const handleGenreToggle = (genreId) => {
        const updatedGenres = filters.with_genres.includes(genreId)
            ? filters.with_genres.filter((id) => id !== genreId)
            : [...filters.with_genres, genreId];

        setFilters({
            ...filters,
            with_genres: updatedGenres,
            page: 1,
        });
    };

    const resetFilters = () => {
        setFilters({
            ...initialState,
        });
    };

    const link = (result) => {
        return `/movie/${result.title
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s/g, "-")}`;
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

    const handlePageClick = ({ selected: selectedPage }) => {
        setFilters({
            ...filters,
            page: selectedPage + 1,
        });
    };

    const genresOfTheMovie = (result) => {
        const genres = result.genre_ids
            .map(
                (genreId) =>
                    dataGenre.genres.find((genre) => genre.id === genreId)?.name
            )
            .filter(Boolean);

        return genres.length > 0 ? genres.join(", ") : "No genres";
    };

    return (
        <section className="mt-20 w-full">
            <div className="flex items-start w-full justify-center flex-wrap max-w-full md:max-w-none md:flex-nowrap">
                <div className="flex items-start content-start w-full max-w-screen flex-wrap md:flex-nowrap md:p-[30px_40px] md:max-w-[1600px]">
                    <div className="md:w-[260px] md:min-w-[260px] flex-wrap w-full max-w-screen items-start content-start md:max-w-none md:justify-end md:top-24">
                        <div className="md:block md:w-[260px] md:min-w-[260px] md:border-solid md:border md:border-transparent shadow-[0_0_7px_8px_rgba(29,78,216,0.5)] md:rounded-lg md:overflow-hidden w-full">
                            <h3 className="bg-blue-600 w-full md:p-5 py-2 px-5 flex items-center justify-start font-semibold text-xl">
                                Movies ({totalMovies})
                            </h3>
                            <div className="p-3">
                                <div className="flex flex-wrap">
                                    <div className="w-full mb-3">
                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                                            Sort by
                                        </label>
                                        <Select
                                            options={options}
                                            defaultValue={options[0]}
                                            onChange={(value) =>
                                                setFilters({
                                                    ...filters,
                                                    sort_by: value.value,
                                                    page: 1,
                                                })
                                            }
                                            className="w-full"
                                            value={options.find(
                                                (option) =>
                                                    option.value ===
                                                    filters.sort_by
                                            )}
                                            theme={(theme) => ({
                                                ...theme,
                                                borderRadius: 5,
                                                colors: {
                                                    ...theme.colors,
                                                    primary25: "#1d4ed8",
                                                    primary: "#1d4ed8",
                                                },
                                            })}
                                            styles={{
                                                control: (base) => ({
                                                    ...base,
                                                    boxShadow: "none",
                                                    border: "1px solid #e5e7eb",
                                                    "&:hover": {
                                                        border: "1px solid #e5e7eb",
                                                    },
                                                }),
                                                option: (provided, state) => ({
                                                    ...provided,
                                                    color: state.isSelected
                                                        ? "white"
                                                        : "black",
                                                    backgroundColor:
                                                        state.isSelected
                                                            ? "#1d4ed8"
                                                            : "white",
                                                    "&:hover": {
                                                        backgroundColor:
                                                            "#1d4ed8",
                                                        color: "white",
                                                    },
                                                }),
                                            }}
                                        />
                                    </div>

                                    <div className="w-full">
                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                                            Filter by genre
                                        </label>
                                        <ul>
                                            {dataGenre.genres.map((genre) => (
                                                <li
                                                    key={genre.id}
                                                    className={`${
                                                        filters.with_genres.includes(
                                                            genre.id
                                                        )
                                                            ? "bg-blue-600 shadow-[0_0_7px_8px_rgba(29,78,216,0.5)]"
                                                            : "bg-gray-200 hover:bg-blue-600 shadow-[0_2px_8px_rgba(29,78,216,0.5)] hover:shadow-[0_0_7px_8px_rgba(29,78,216,0.5)]"
                                                    } cursor-pointer px-2 py-1 text-sm rounded-full text-black mr-2 mb-2 ease-in-out duration-300 inline-flex flex-wrap border-solid border-transparent md:text-base md:px-4 md:py-2`}
                                                    onClick={() =>
                                                        handleGenreToggle(
                                                            genre.id
                                                        )
                                                    }
                                                >
                                                    {genre.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    {filters.with_genres.length > 0 && (
                                        <div className="py-3 mt-2">
                                            <button
                                                className="border-2 border-solid border-transparent px-2 py-1 rounded-full font-bold bg-blue-600 shadow-[0_0_7px_8px_rgba(29,78,216,0.5)] hover:shadow-[0_0_7px_15px_rgba(29,78,216,0.5)] transition-all duration-300"
                                                onClick={resetFilters}
                                            >
                                                Reset filters
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-5 md:mt-0 md:ml-5 h-auto justify-start flex flex-wrap flex-initial">
                        <section className="last-of-type:pb-5 first-of-type:border-t-0 first-of-type:pt-0 w-full p-5 block md:last-of-type:pb-0 py-[30px]">
                            <div>
                                <div className="items-start content-start justify-start flex flex-wrap lg:grid lg:grid-cols-2 gap-5">
                                    {data.results.map((result) => (
                                        <div
                                            key={result.id}
                                            className="flex-wrap w-full flex rounded-md overflow-hidden shadow-[0_2px_8px_rgba(29,78,216,0.5)] bg-gray-100 border-solid"
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
                                                                className="min-w-[88px] w-[88px] h-full block"
                                                                src={
                                                                    (result.poster_path ??
                                                                        result.backdrop_path !==
                                                                            undefined) &&
                                                                    (result.poster_path ??
                                                                        result.backdrop_path !==
                                                                            null)
                                                                        ? apiConfig.w500Image(
                                                                              result.poster_path ??
                                                                                  result.backdrop_path
                                                                          )
                                                                        : blankImg
                                                                }
                                                                alt={
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
                                                                state={
                                                                    result.id
                                                                }
                                                                className="whitespace-nowrap overflow-hidden text-ellipsis font-medium md:text-lg"
                                                            >
                                                                <h2 className="block whitespace-normal overflow-visible text-clip">
                                                                    {
                                                                        result.title
                                                                    }
                                                                </h2>
                                                            </Link>
                                                            <span className="text-xs md:text-sm w-full whitespace-nowrap text-gray-600">
                                                                {formattedDate(
                                                                    result.release_date
                                                                )}
                                                                <span className="text-yellow-600 pl-2">
                                                                    {" "}
                                                                    {result.vote_average.toFixed(
                                                                        1
                                                                    )}
                                                                    /10
                                                                </span>
                                                            </span>
                                                            <span className="text-xs md:text-sm w-full whitespace-nowrap text-gray-600">
                                                                {genresOfTheMovie(
                                                                    result
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="max-h-[3.2em] md:max-h-none h-auto mt-3">
                                                        <p className="text-sm overflow-hidden text-ellipsis line-clamp-2 md:text-base">
                                                            {result.overview}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="w-full flex justify-center items-center">
                                    <ReactPaginate
                                        activeLinkClassName={
                                            "items-center cursor-pointer flex text-sm h-10 justify-center p-2 md:p-4 text-blue-500"
                                        }
                                        breakClassName={
                                            "items-center cursor-pointer flex text-sm h-10 justify-center p-2 md:p-4"
                                        }
                                        breakLabel={".."}
                                        containerClassName={
                                            "w-full flex justify-center mt-4 items-center"
                                        }
                                        disabledLinkClassName={
                                            "cursor-default text-gray-400/30"
                                        }
                                        marginPagesDisplayed={1}
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
                                        forcePage={
                                            filters.page
                                                ? parseInt(filters.page) - 1
                                                : 0
                                        }
                                        renderOnZeroPageCount={null}
                                    />
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Movie;
