import fetch from "node-fetch";
import {
    REDIRECT_URI_CLIENT,
    REDIRECT_URI_SERVER,
    movieApiKey,
} from "../libs/key.js";

export const requestToken = async (req, res) => {
    const url = `https://api.themoviedb.org/3/authentication/token/new?api_key=${movieApiKey}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();

    // console.log("request", data);

    const reqToken = data.request_token;

    const redirectUrl = `https://www.themoviedb.org/authenticate/${reqToken}?redirect_to=${REDIRECT_URI_SERVER}`;
    res.status(200).json({ redirectUrl });
};

export const tmdbCallback = async (req, res) => {
    const { request_token } = req.query;
    const approved = req.query.approved === "true";

    if (approved) {
        const url = `https://api.themoviedb.org/3/authentication/session/new?api_key=${movieApiKey}`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ request_token }),
        });
        const data = await response.json();

        // console.log("session", data);

        const success = data.success;
        const sessionId = data.session_id;

        res.cookie("success", success);
        res.cookie("session_id", sessionId, {
            httpOnly: true,
        });

        res.redirect(REDIRECT_URI_CLIENT);
    } else {
        res.redirect(REDIRECT_URI_CLIENT);
    }
};

export const userInfos = async (req, res) => {
    const sessionId = req.cookies.session_id;

    if (!sessionId) {
        res.end();
        return;
    }

    const url = `https://api.themoviedb.org/3/account?api_key=${movieApiKey}&session_id=${sessionId}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();

    // console.log("user", data);

    res.status(200).json(data);
};

export const logout = async (req, res) => {
    const sessionId = req.cookies.session_id;

    if (!sessionId) {
        res.end();
        return;
    }

    const url = `https://api.themoviedb.org/3/authentication/session?api_key=${movieApiKey}`;
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ session_id: sessionId }),
    });
    const data = await response.json();

    // console.log("logout", data);

    res.clearCookie("success");
    res.clearCookie("session_id");
    res.status(200).json(data);
};
