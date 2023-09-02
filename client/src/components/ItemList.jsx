import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import { getList } from "../api/apiCall/movies";
import ItemCard from "./ItemCard";

const ItemList = ({ category, type, id }) => {
    const { isLoading, isError, error, data } = useQuery({
        queryKey: ["list", category, type, id || ""],
        queryFn: () => getList(category, type, id),
        staleTime: Infinity,
    });

    if (isLoading) return <Loading />;

    if (isError) return <div>Something went wrong.. {error.message}</div>;

    // console.table([category, type, data.results]);

    return (
        <div>
            <swiper-container slides-per-view="auto" space-between="10">
                {data.results.map((item) => (
                    <swiper-slide
                        key={item.id}
                        class="w-[40%] md:w-[30%] lg:w-[15%]"
                    >
                        <ItemCard item={item} category={category} />
                    </swiper-slide>
                ))}
            </swiper-container>
        </div>
    );
};

export default ItemList;
