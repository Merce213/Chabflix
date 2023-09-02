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
                    <h1 className="title text-2xl md:text-6xl">
                        {data.title || data.name}
                    </h1>
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
