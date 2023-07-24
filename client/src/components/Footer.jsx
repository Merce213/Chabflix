import React from "react";
import bg from "../assets/images/footer-bg.jpg";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer
            className="mt-5 relative py-6 px-4 bg-top bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${bg})` }}
        >
            <div className="container lg:container mx-auto">
                <div className="flex justify-center items-center mb-3">
                    <div className="mb-6">
                        <img src={logo} alt="logo" width={140} height={32} />
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3">
                    <div className="flex justify-start items-start flex-col mt-1 font-semibold leading-relaxed mb-2">
                        <Link
                            className="hover:text-blue-600 duration-300"
                            to="/"
                        >
                            Home
                        </Link>
                        <Link
                            className="hover:text-blue-600 duration-300"
                            to="/"
                        >
                            Contact us
                        </Link>
                        <Link
                            className="hover:text-blue-600 duration-300"
                            to="/"
                        >
                            Term of services
                        </Link>
                        <Link
                            className="hover:text-blue-600 duration-300"
                            to="/"
                        >
                            About us
                        </Link>
                    </div>
                    <div className="flex justify-start items-start flex-col mt-1 font-semibold leading-relaxed mb-2">
                        <Link
                            className="hover:text-blue-600 duration-300"
                            to="/"
                        >
                            Live
                        </Link>
                        <Link
                            className="hover:text-blue-600 duration-300"
                            to="/"
                        >
                            FAQ
                        </Link>
                        <Link
                            className="hover:text-blue-600 duration-300"
                            to="/"
                        >
                            Premium
                        </Link>
                        <Link
                            className="hover:text-blue-600 duration-300"
                            to="/"
                        >
                            Pravacy policy
                        </Link>
                    </div>
                    <div className="flex justify-start items-start flex-col mt-1 font-semibold leading-relaxed mb-2">
                        <Link
                            className="hover:text-blue-600 duration-300"
                            to="/"
                        >
                            You must watch
                        </Link>
                        <Link
                            className="hover:text-blue-600 duration-300"
                            to="/"
                        >
                            Recent release
                        </Link>
                        <Link
                            className="hover:text-blue-600 duration-300"
                            to="/"
                        >
                            Top IMDB
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
