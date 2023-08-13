import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { register } from "swiper/element/bundle";
import Loading from "./Loading";
import { fetchHeroBanner } from "../api/apiCall/movies";
import { Link } from "react-router-dom";
import { apiConfig } from "../api/apiConfig";
import ModalVideo from "./ModalVideo";

register();

const HeroSlideBanner = () => {
    const ref = useRef();

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

    return (
        <swiper-container
            ref={ref}
            slides-per-view="1"
            autoplay-delay="3000"
            autoplay-disable-on-interaction="false"
            loop="true"
        >
            {data.map((movie) => (
                <swiper-slide key={movie.id}>
                    <HeroSlideItem ref={ref} movie={movie} />
                </swiper-slide>
            ))}
        </swiper-container>
    );
};

const HeroSlideItem = forwardRef(({ movie }, ref) => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const element = ref.current;

        if (showModal) {
            element.swiper.autoplay.stop();
        } else {
            element.swiper.autoplay.start();
        }
    }, [showModal]);

    const openModal = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setShowModal(true);
        document.body.style.overflow = "hidden";
    };

    const background = apiConfig.originalImage(
        movie?.backdrop_path ? movie?.backdrop_path : movie?.poster_path
    );

    return (
        <section className="h-screen transition-all duration-500 relative mb-12">
            <img
                className="w-full h-full object-cover brightness-50 object-center"
                src={background}
                alt="background movie"
            />
            <div className="absolute left-1/2 bottom-1/2 -translate-x-1/2 translate-y-1/2 flex justify-center items-center w-full">
                <div className="w-full md:w-[55%] px-4 md:px-12 py-0 [&>*]:mt-12">
                    <h2 className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-bold">
                        {movie.title}{" "}
                        <span className="text-sm sm:text-base md:text-2xl 2xl:text-3xl text-yellow-400">
                            {movie.vote_average}/10
                        </span>
                    </h2>
                    <div className="font-bold">{movie.overview}</div>
                    <div className="space-x-4 flex flex-nowrap">
                        <button className="border-2 border-solid border-transparent px-4 xl:px-8 py-2 rounded-full font-bold xl:text-xl bg-blue-600 shadow-[0_0_7px_8px_rgba(29,78,216,0.5)] hover:shadow-[0_0_7px_15px_rgba(29,78,216,0.5)] transition-shadow duration-300">
                            <Link
                                to={`/movie/${movie.title
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
                <div className="flex-shrink justify-center items-start relative hidden md:flex">
                    <img
                        className="rounded-2xl shadow-md shadow-black w-2/3"
                        src={apiConfig.w500Image(movie.poster_path)}
                        alt="poster movie"
                    />
                </div>
            </div>
            <ModalVideo
                showModal={showModal}
                setShowModal={setShowModal}
                id={movie.id}
            />
        </section>
    );
});

export default HeroSlideBanner;
