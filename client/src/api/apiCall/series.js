import { tmdbApi } from "../tmdbApi";

export const getTvFilters = async (params) => {
    return await tmdbApi.getTvFilters(params);
};

export const getTvGenres = async () => {
    return await tmdbApi.getTvGenres();
};
