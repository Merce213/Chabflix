import { tmdbApi } from "../tmdbApi";

export const getTrendingSearch = async () => {
    const response = await tmdbApi.getTrending();

    return response.results.slice(0, 10);
};

export const getResultMultiQuery = async (query) => {
    const params = { query: query };

    const response = await tmdbApi.searchByQuery(params);

    return response.results.slice(0, 10);
};

export const getResultsQueryAndCategory = async (category, query, page = 1) => {
    const params = { query: query, page: page };

    const response = await tmdbApi.searchByQueryAndCategory(category, params);

    return response;
};
