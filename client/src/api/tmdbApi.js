import axiosClient from "./axiosClient";

export const category = {
    movie: "movie",
    tv: "tv",
    person: "person",
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
    getTvList: (type, params) => {
        const url = "tv/" + tvType[type];
        return axiosClient.get(url, { params });
    },
    getVideos: (cate, id) => {
        const url = category[cate] + "/" + id + "/videos";
        return axiosClient.get(url, { params: {} });
    },
    searchByQuery: (params) => {
        const url = "search/multi";
        return axiosClient.get(url, { params });
    },
    searchByQueryAndCategory: (cate, params) => {
        const url = "search/" + category[cate];
        return axiosClient.get(url, { params });
    },
    getTrending: () => {
        const url = "trending/all/day";
        return axiosClient.get(url, { params: {} });
    },
    getMovieFilters: (params) => {
        const url = "discover/movie";
        return axiosClient.get(url, { params });
    },
    getMovieGenres: () => {
        const url = "genre/movie/list";
        return axiosClient.get(url, { params: {} });
    },
    getTvFilters: (params) => {
        const url = "discover/tv";
        return axiosClient.get(url, { params });
    },
    getTvGenres: () => {
        const url = "genre/tv/list";
        return axiosClient.get(url, { params: {} });
    },
};
