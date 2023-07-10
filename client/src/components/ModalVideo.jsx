import React, { useState, useRef } from "react";
import Modal from "react-modal";
import { register } from "swiper/element/bundle";
import { RiCloseLine } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import { fetchVideoTrailer } from "../api/apiCall/movies";

register();

const ModalVideo = ({ showModal, setShowModal, id }) => {
    const { isError, error, data } = useQuery({
        queryKey: ["ModalVideo", id],
        queryFn: () => fetchVideoTrailer(id),
        staleTime: Infinity,
    });

    if (isError) {
        return <div>Une erreur est survenue {error.message}</div>;
    }

    const videos = data?.results.length > 0;

    const closeModal = () => {
        setShowModal(false);
        document.body.style.overflow = "";
    };

    return (
        <div>
            <Modal
                ariaHideApp={false}
                isOpen={showModal}
                onRequestClose={closeModal}
                contentLabel="Trailer movie"
                className="w-1/2 h-1/2 translate-y-1/2 translate-x-1/2 relative bg-slate-900 p-4"
                overlayClassName="absolute inset-0 bg-black bg-opacity-70 overflow-auto z-50"
            >
                {videos ? (
                    <swiper-container
                        class="w-full h-full"
                        slides-per-view="1"
                        pagination="true"
                        pagination-clickable="true"
                        navigation="true"
                        centered-slides="true"
                        autoplay-delay="4000"
                        autoplay-disable-on-interaction="false"
                    >
                        {data?.results?.map(
                            (video) =>
                                video.site === "YouTube" && (
                                    <swiper-slide key={video.id}>
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={`https://www.youtube.com/embed/${video.key}`}
                                            title="YouTube video player"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                        />
                                    </swiper-slide>
                                )
                        )}
                    </swiper-container>
                ) : (
                    <div className="flex justify-center items-center w-full h-full">
                        There is no trailer for this movie
                    </div>
                )}

                <button
                    className="absolute -top-10 -right-10"
                    onClick={closeModal}
                >
                    <RiCloseLine
                        size={"28px"}
                        className="opacity-50 ease duration-500 hover:opacity-100 focus:opacity-100"
                    />
                </button>
            </Modal>
        </div>
    );
};

export default ModalVideo;
