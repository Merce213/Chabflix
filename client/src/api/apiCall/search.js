import { category, movieType, tmdbApi } from "../tmdbApi";

export const getTrendingSearch = async () => {
    const response = await tmdbApi.getTrending();

    return response.results.slice(0, 10);
};

export const getResultQuery = async (category, query) => {
    const params = { query: query };

    const response = await tmdbApi.search(category, params);

    return response.results;
};

export const getResultMultiQuery = async (query) => {
    const params = { query: query };

    const response = await tmdbApi.searchByQuery(params);

    return response.results.slice(0, 10);
};
