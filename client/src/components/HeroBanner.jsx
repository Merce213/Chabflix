import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Loading from "./Loading";
import { fetchHeroBanner } from "../api/apiCall/movies";
import { Link } from "react-router-dom";
import { apiConfig } from "../api/apiConfig";
import ModalVideo from "./ModalVideo";

const HeroBanner = () => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
        document.body.style.overflow = "hidden";
    };

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ["HeroBanner"],
        queryFn: fetchHeroBanner,
        staleTime: Infinity,
    });

    if (isError) {
        return <div>Une erreur est survenue {error.message}</div>;
    }

    if (isLoading) {
        return <Loading />;
    }

    const background = apiConfig.originalImage(
        data?.backdrop_path ? data?.backdrop_path : data?.poster_path
    );

    return (
        <div className="h-screen transition-all duration-500 relative mb-12">
            <img
                className="w-full h-full object-cover brightness-50 object-center"
                src={background}
                alt="background movie"
            />
            <div className="absolute left-1/2 bottom-1/2 -translate-x-1/2 translate-y-1/2 flex justify-center items-center w-full">
                <div className="heroslideitemscontentinfos w-full md:w-[55%] px-4 md:px-12 py-0 [&>*]:mt-12">
                    <h2 className="title text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-bold">
                        {data.title}
                    </h2>
                    <div className="overview font-bold">{data.overview}</div>
                    <div className="btns space-x-4 flex flex-nowrap">
                        <button className="border-2 border-solid border-transparent px-4 xl:px-8 py-2 rounded-full font-bold xl:text-xl bg-blue-600 shadow-[0_0_7px_8px_rgba(29,78,216,0.5)] hover:shadow-[0_0_7px_15px_rgba(29,78,216,0.5)] transition-shadow duration-300">
                            <Link
                                to={`/movie/${data.title
                                    .toLowerCase()
                                    .replace(/[^\w\s-]/g, "")
                                    .replace(/\s/g, "-")}`}
                            >
                                Watch now
                            </Link>
                        </button>

                        <button
                            className="border-[3px] border-solid bg-transparent shadow-inner px-4 xl:px-8 py-2 rounded-full font-bold xl:text-xl hover:text-blue-600 hover:bg-white transition-colors duration-300"
                            onClick={openModal}
                        >
                            Watch trailer
                        </button>
                    </div>
                </div>
                <div className="heroslideitemscontentposter flex-shrink justify-start items-start relative pr-12 hidden md:flex">
                    <img
                        className="rounded-2xl shadow-md shadow-black"
                        src={apiConfig.w500Image(data.poster_path)}
                        alt="poster movie"
                        width={400}
                        height={400}
                    />
                </div>
            </div>
            <ModalVideo
                showModal={showModal}
                setShowModal={setShowModal}
                id={data.id}
            />
        </div>
    );
};

export default HeroBanner;
