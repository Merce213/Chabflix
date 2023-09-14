import dotenv from "dotenv";
dotenv.config();

export const movieApiKey = process.env.MOVIEDB_API_KEY;
export const REDIRECT_URI_CLIENT = "https://chabflix.vercel.app/";
export const REDIRECT_URI_SERVER =
    "https://chabflix.onrender.com/api/auth/tmdb/callback";
