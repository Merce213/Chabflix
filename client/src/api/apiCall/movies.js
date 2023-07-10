import { category, movieType, tmdbApi } from "../tmdbApi";

export const fetchHeroBanner = async () => {
    let randomNumberPage = Math.floor(Math.random() * 501);
    while (randomNumberPage === Math.random() * 501) {
        randomNumberPage = Math.floor(Math.random() * 501);
    }

    let randomNumberMovie = Math.floor(Math.random() * 20);
    while (randomNumberMovie === Math.random() * 20) {
        randomNumberMovie = Math.floor(Math.random() * 20);
    }

    const params = { page: randomNumberPage };

    const response = await tmdbApi.getMovieList(movieType.popular, params);

    return response.results[randomNumberMovie];
};

export const fetchVideoTrailer = async (id) => {
    const response = await tmdbApi.getVideos(category.movie, id);

    console.log(response);

    return response;
};
