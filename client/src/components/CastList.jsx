import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { getCredits } from "../api/apiCall/details";
import { apiConfig } from "../api/apiConfig";
import blankImg from "../assets/images/blank-img.png";
import "../assets/styles/swiperScrollbar.css";

const CastList = ({ id }) => {
    const { category } = useParams();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["cast", category, id],
        queryFn: () => getCredits(category, id),
        staleTime: Infinity,
    });

    if (isLoading) return <Loading />;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <div className="casts">
            <swiper-container
                slides-per-view="auto"
                space-between="10"
                scrollbar="true"
                scrollbar-draggable="true"
                scrollbar-drag-snap-on-release="true"
            >
                {data.cast.map((item) => (
                    <swiper-slide
                        key={item.id}
                        class="w-[35%] sm:w-[25%] lg:w-[15%] mb-2"
                    >
                        <div className="">
                            <div
                                className="pt-48 bg-cover bg-center bg-no-repeat"
                                style={
                                    item.profile_path
                                        ? {
                                              backgroundImage: `url(${apiConfig.w500Image(
                                                  item.profile_path
                                              )})`,
                                          }
                                        : {
                                              backgroundImage: `url(${blankImg})`,
                                          }
                                }
                            ></div>
                            <p className="text-sm py-2">{item.name}</p>
                        </div>
                    </swiper-slide>
                ))}
            </swiper-container>
        </div>
    );
};

export default CastList;
