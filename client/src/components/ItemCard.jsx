import React from "react";
import { Link } from "react-router-dom";
import { apiConfig } from "../api/apiConfig";
import { BsFillPlayCircleFill } from "react-icons/bs";

import "../assets/styles/itemCard.scss";
import blankImg from "../assets/images/blank-img.png";

const ItemCard = ({ item, category }) => {
    const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

    const link = () => {
        switch (category) {
            case "movie":
                return `/movie/${item.title
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s/g, "-")}`;
            case "tv":
                return `/tv/${item.name
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s/g, "-")}`;
        }
    };

    return (
        <Link to={link()} state={item.id}>
            <div
                className="movie-card"
                style={
                    item.poster_path || item.backdrop_path
                        ? {
                              backgroundImage: `url(${bg})`,
                          }
                        : {
                              backgroundImage: `url(${blankImg})`,
                          }
                }
            >
                <button className="text-blue-600">
                    <BsFillPlayCircleFill size={"4rem"} />
                </button>
            </div>
            <h3 className="ps-1">
                {item.title || item.name}
                <span className="text-sm text-yellow-400">
                    {" "}
                    {item.vote_average.toFixed(1)}/10
                </span>
            </h3>
        </Link>
    );
};

export default ItemCard;
