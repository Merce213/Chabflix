import express from "express";
import {
    logout,
    requestToken,
    tmdbCallback,
    userInfos,
} from "../controllers/auth.js";

const router = express.Router();

router.get("/request-token", requestToken);
router.get("/tmdb/callback", tmdbCallback);
router.get("/me", userInfos);
router.get("/logout", logout);

export default router;
