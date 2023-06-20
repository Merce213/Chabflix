import axios from "axios";
import queryString from "query-string";
import { apiConfig } from "./apiConfig";

export const axiosClient = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        "Content-Type": "application/json",
    },
    paramsSerializer: (params) =>
        queryString.stringify({ ...params, api_key: apiConfig.apiKey }),
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response?.data) {
            return response.data;
        }

        return response;
    },
    (error) => {
        throw error;
    }
);
