import axiosClient from "./axiosClient";

export const category = {
    movie: "movie",
    tv: "tv",
};

export const movieType = {
    upcoming: "upcoming",
    popular: "popular",
    top_rated: "top_rated",
};

export const tvType = {
    popular: "popular",
    top_rated: "top_rated",
    on_the_air: "on_the_air",
};

export const tmdbApi = {
    getMovieList: (type, params) => {
        const url = "movie/" + movieType[type];
        return axiosClient.get(url, { params });
    },
    getVideos: (cate, id) => {
        const url = category[cate] + "/" + id + "/videos";
        return axiosClient.get(url, { params: {} });
    },
};
