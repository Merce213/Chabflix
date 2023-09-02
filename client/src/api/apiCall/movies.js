import { category, movieType, tmdbApi } from "../tmdbApi";

export const fetchHeroBanner = async () => {
    let randomNumberPage = Math.floor(Math.random() * 100);
    while (randomNumberPage === Math.random() * 100) {
        randomNumberPage = Math.floor(Math.random() * 100);
    }

    const params = { page: randomNumberPage };

    function randomSample(arr, sampleSize) {
        const shuffledArray = arr.slice().sort(() => 0.5 - Math.random());
        const sampledArray = [];

        while (sampledArray.length < sampleSize) {
            const randomIndex = Math.floor(
                Math.random() * shuffledArray.length
            );
            const randomElement = shuffledArray[randomIndex];

            if (!sampledArray.includes(randomElement)) {
                sampledArray.push(randomElement);
            }
        }

        return sampledArray;
    }

    const response = await tmdbApi.getMovieList(movieType.popular, params);
    const randomResults = randomSample(response.results, 4);

    return randomResults;
};

export const fetchVideoTrailer = async (id) => {
    const response = await tmdbApi.getVideos(category.movie, id);

    return response;
};

export const getList = async (category, type, id = "") => {
    const params = {};

    if (type !== "similar") {
        switch (category) {
            case "movie":
                return await tmdbApi.getMovieList(type, params);
            case "tv":
                return await tmdbApi.getTvList(type, params);
        }
    } else {
        return await tmdbApi.getSimilar(category, id, params);
    }
};

export const getMovieFilters = async (params) => {
    return await tmdbApi.getMovieFilters(params);
};

export const getMovieGenres = async () => {
    return await tmdbApi.getMovieGenres();
};
