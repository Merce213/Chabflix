import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getDetails } from "../api/apiCall/details";
import Loading from "../components/Loading";
import { apiConfig } from "../api/apiConfig";
import ItemList from "../components/ItemList";
import CastList from "../components/CastList";
import VideoList from "../components/VideoList";

const Detail = () => {
    const { category } = useParams();
    const { state } = useLocation();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["detail", category, state],
        queryFn: () => getDetails(category, state),
        staleTime: Infinity,
    });

    if (isLoading) return <Loading />;
    if (isError) return <p>Error: {error.message}</p>;

    const bg = apiConfig.originalImage(data.backdrop_path || data.poster_path);

    const formattedDate = (dateNumeric) => {
        if (!dateNumeric) {
            return "";
        }

        const date = new Date(dateNumeric);
        const options = { year: "numeric", month: "long", day: "numeric" };
        const formatDate = date.toLocaleDateString("en-EN", options);

        return formatDate;
    };

    const timeConvert = (num) => {
        const hours = Math.floor(num / 60);
        const minutes = num % 60;
        return `${hours}h ${minutes}min`;
    };

    return data ? (
        <>
            <div
                className={`w-full h-[50dvh] brightness-50 relative bg-cover bg-center bg-no-repeat after:content-[''] after:block after:w-full after:h-[150px] after:absolute after:bottom-0 after:left-0 after:bg-gradient-to-t after:from-slate-900 after:to-transparent`}
                style={{
                    backgroundImage: `url(${bg})`,
                }}
            ></div>

            <section className="mb-8 flex justify-start items-start container mx-auto -mt-[200px] relative py-0 px-8">
                <div className="grow hidden md:block">
                    <div
                        className="bg-cover bg-center bg-no-repeat rounded-lg pt-[165%]"
                        style={{
                            backgroundImage: `url(${apiConfig.originalImage(
                                data.poster_path || data.backdrop_path
                            )})`,
                        }}
                        alt={data.title || data.name}
                    ></div>
                </div>

                <div className="w-full pl-0 md:w-[70%] md:px-8 relative [&>*]:mb-12">
                    <h1 className="text-2xl md:text-6xl font-bold">
                        {data.title || data.name}
                        <span className="text-xl md:text-4xl ml-2">
                            (
                            {(data.release_date || data.first_air_date).slice(
                                0,
                                4
                            )}
                            )
                        </span>
                    </h1>
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                            <span className="text-sm font-semibold">
                                {formattedDate(
                                    data.release_date || data.first_air_date
                                )}
                            </span>
                            <span className="text-sm font-semibold ml-2">
                                ⋅
                            </span>
                            <span className="text-sm text-yellow-400 font-semibold ml-2">
                                {data.vote_average.toFixed(1)}/10
                            </span>
                            <span className="text-sm font-semibold ml-2">
                                ⋅
                            </span>
                            <span className="text-sm font-semibold ml-2">
                                {timeConvert(
                                    data.runtime || data.episode_run_time
                                )}
                            </span>
                        </div>
                    </div>
                    <div className="md:[&>*~*]:ml-2 grid grid-cols-2 gap-2 md:gap-0 md:flex md:flex-wrap">
                        {data.genres.map((genre) => (
                            <span
                                key={genre.id}
                                className="md:py-2 md:px-6 py-1 px-3 text-center border-2 border-solid rounded-full text-sm font-semibold"
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>
                    <p>{data.overview}</p>
                    <div>
                        <div className="mb-2">
                            <h2>Casts</h2>
                        </div>
                        <CastList id={data.id} />
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-8 mb-8">
                <div className="mb-3">
                    <VideoList id={data.id} />
                </div>
                <div className="mb-3">
                    <div className="mb-2 flex items-center justify-between">
                        <h2>Similar</h2>
                    </div>
                    <ItemList category={category} type="similar" id={data.id} />
                </div>
            </div>
        </>
    ) : (
        <div>There is not details for this {category}</div>
    );
};

export default Detail;
