import { tmdbApi } from "../tmdbApi";

export const getDetails = async (category, id) => {
    const response = await tmdbApi.getDetail(category, id);

    return response;
};

export const getCredits = async (category, id) => {
    const response = await tmdbApi.getCredit(category, id);

    return response;
};

export const getVideos = async (category, id) => {
    const response = await tmdbApi.getVideos(category, id);

    return response.results.slice(0, 3);
};
