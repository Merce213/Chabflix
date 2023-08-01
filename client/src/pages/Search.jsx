import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getResultQuery } from "../api/apiCall/search";
import Loading from "../components/Loading";
import queryString from "query-string";

const Search = () => {
    const location = useLocation();
    console.log("location", location);

    const category = location.pathname.split("/")[2];
    console.log("category", category);

    const { query } = queryString.parse(location.search);
    console.log("query", query);

    const {
        isLoading,
        isError,
        error,
        data: dataSearch,
    } = useQuery({
        queryKey: ["Search", category, location.search],
        queryFn: () => getResultQuery(category, query),
        staleTime: Infinity,
    });

    if (isError) {
        return <div>Something went wrong.. {error.message}</div>;
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <section className="mt-20 container mx-auto">
            <h1>Location </h1>
        </section>
    );
};

export default Search;
