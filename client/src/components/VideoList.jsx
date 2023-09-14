import React, { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { getVideos } from "../api/apiCall/details";

const VideoList = ({ id }) => {
    const { category } = useParams();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["video", category, id],
        queryFn: () => getVideos(category, id),
        staleTime: Infinity,
    });

    if (isLoading) return <Loading />;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <>
            {data.map((item) => (
                <Video key={item.id} item={item} />
            ))}
        </>
    );
};

const Video = ({ item }) => {
    const iframeRef = useRef();

    // console.log(iframeRef);

    useEffect(() => {
        const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";
        iframeRef.current.setAttribute("height", height);
    }, []);

    return item ? (
        <div key={item.id} className="mb-12">
            <div className="mb-6">
                <h2>{item.name}</h2>
            </div>
            <iframe
                ref={iframeRef}
                width="100%"
                src={`https://www.youtube.com/embed/${item.key}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            />
        </div>
    ) : (
        <p>There is no video trailer for this {category}</p>
    );
};

export default VideoList;
