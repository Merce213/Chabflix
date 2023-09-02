import React from "react";
import bg from "../assets/images/footer-bg.jpg";
import logo from "../assets/images/logo.png";
import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <footer
            className="mt-5 relative py-6 px-4 bg-top bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${bg})` }}
        >
            <nav className="flex justify-center max-w-3xl mx-auto items-center">
                <div className="flex flex-col">
                    <div className="flex justify-center items-center mb-3 mr-10">
                        <div className="mb-6">
                            <img
                                src={logo}
                                alt="logo"
                                width={140}
                                height={32}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 md:gap-6 lg:gap-10">
                        <div className="flex justify-start items-start flex-col mt-1 font-semibold leading-relaxed mb-2 mr-10">
                            <NavLink
                                className="hover:text-blue-600 duration-300"
                                to="/"
                            >
                                Home
                            </NavLink>
                            <NavLink
                                className="hover:text-blue-600 duration-300"
                                to="/"
                            >
                                Contact us
                            </NavLink>
                            <NavLink
                                className="hover:text-blue-600 duration-300"
                                to="/"
                            >
                                Term of services
                            </NavLink>
                            <NavLink
                                className="hover:text-blue-600 duration-300"
                                to="/"
                            >
                                About us
                            </NavLink>
                        </div>
                        <div className="flex justify-start items-start flex-col mt-1 font-semibold leading-relaxed mb-2 mr-10">
                            <NavLink
                                className="hover:text-blue-600 duration-300"
                                to="/"
                            >
                                Live
                            </NavLink>
                            <NavLink
                                className="hover:text-blue-600 duration-300"
                                to="/"
                            >
                                FAQ
                            </NavLink>
                            <NavLink
                                className="hover:text-blue-600 duration-300"
                                to="/"
                            >
                                Premium
                            </NavLink>
                            <NavLink
                                className="hover:text-blue-600 duration-300"
                                to="/"
                            >
                                Pravacy policy
                            </NavLink>
                        </div>
                        <div className="flex justify-start items-start flex-col mt-1 font-semibold leading-relaxed mb-2 mr-10">
                            <NavLink
                                className="hover:text-blue-600 duration-300"
                                to="/"
                            >
                                You must watch
                            </NavLink>
                            <NavLink
                                className="hover:text-blue-600 duration-300"
                                to="/"
                            >
                                Recent release
                            </NavLink>
                            <NavLink
                                className="hover:text-blue-600 duration-300"
                                to="/"
                            >
                                Top IMDB
                            </NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;
