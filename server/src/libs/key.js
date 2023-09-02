import dotenv from "dotenv";
dotenv.config();

export const movieApiKey = process.env.MOVIEDB_API_KEY;
export const REDIRECT_URI_CLIENT = "http://localhost:5173/";
export const REDIRECT_URI_SERVER =
    "http://localhost:8000/api/auth/tmdb/callback";
