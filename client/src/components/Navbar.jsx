import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { AiOutlineSearch } from "react-icons/ai";
import { RiCloseLine } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { useUserValue } from "../context/UserContext";
import { apiConfig } from "../api/apiConfig";
import NavLinks from "./NavLinks";

const Navbar = () => {
    const [searchBoxOpen, setSearchBoxOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false);

    const userDropdownRef = useRef(null);

    const { user } = useUserValue();

    const login = async () => {
        const response = await fetch(
            "http://localhost:8000/api/auth/request-token",
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();

        window.location.href = data.redirectUrl;
    };

    const logout = async () => {
        await fetch("http://localhost:8000/api/auth/logout", {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        // console.log("data", data);
        window.location.reload(true);
    };

    const avatar = apiConfig.w500Image(user?.avatar?.tmdb?.avatar_path);

    const handleOutsideClick = (event) => {
        if (
            userDropdownRef.current &&
            !userDropdownRef.current.contains(event.target)
        ) {
            setDropdownMenuOpen(false);
        }
    };

    useEffect(() => {
        if (dropdownMenuOpen) {
            document.addEventListener("mousedown", handleOutsideClick);
        } else {
            document.removeEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [dropdownMenuOpen]);

    return (
        <header className="relative p-4 w-full lg:container mx-auto">
            <nav className="flex justify-between items-center gap-4">
                <NavLink to={"/"}>
                    <img
                        src={logo}
                        alt="Chabflix home"
                        width={140}
                        height={32}
                    />
                </NavLink>

                <div className="hidden md:flex w-full justify-center space-x-8">
                    <NavLinks />
                </div>

                <div
                    className={`absolute top-0 left-0 w-full h-full py-6 px-4 ${
                        searchBoxOpen ? "flex" : "hidden"
                    } items-center gap-2 z-10`}
                >
                    <div className="relative grow">
                        <input
                            type="text"
                            name="search"
                            aria-label="search movies or shows..."
                            placeholder="Search..."
                            autoComplete="off"
                            className="bg-gray-600 h-12 leading-[48px] ps-11 pe-4 outline-none rounded-lg ease duration-500 hover:shadow-red-600 focus:border focus:shadow-gray-300 focus:ps-4 peer w-full"
                        />

                        <AiOutlineSearch
                            size={"24px"}
                            alt="search"
                            className="absolute top-1/2 -translate-y-1/2 left-3 opacity-50 ease duration-500 peer-focus:opacity-0"
                        />
                    </div>

                    <button
                        className="p-3 bg-gray-600 rounded-lg"
                        onClick={() => setSearchBoxOpen(!searchBoxOpen)}
                    >
                        <RiCloseLine
                            size={"24px"}
                            className="opacity-50 ease duration-500 hover:opacity-100 focus:opacity-100"
                            alt="close search box"
                        />
                    </button>
                </div>

                {user ? (
                    <div
                        className="flex items-center cursor-pointer relative"
                        onClick={() => setDropdownMenuOpen(!dropdownMenuOpen)}
                        ref={userDropdownRef}
                    >
                        {user?.avatar ? (
                            <img
                                src={avatar}
                                alt="avatar"
                                className="rounded-full
                                    w-10 h-10 object-cover"
                            />
                        ) : (
                            <FaUserCircle size={"1.8rem"} color="white" />
                        )}

                        <ul
                            className={`${
                                dropdownMenuOpen ? "block" : "hidden"
                            } absolute top-14 left-5 -translate-x-[50%] w-32 text-center border bg-gray-600 shadow-md shadow-blue-400 text-white rounded-md z-30`}
                        >
                            <li className="p-2 border-b">
                                <span>{user.username}</span>
                            </li>
                            <li>
                                <Link
                                    to="/profile"
                                    className="block hover:bg-slate-900 ease duration-500 p-2 border-b"
                                >
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <span
                                    className="block p-2 hover:bg-slate-900 ease duration-500 text-red-600 hover:rounded-md"
                                    onClick={logout}
                                >
                                    Sign out
                                </span>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <button
                        onClick={login}
                        className="flex items-center space-x-2"
                    >
                        <FaUserCircle
                            size={"1.8rem"}
                            color="white"
                            title="Connexion"
                        />
                        <span className="text-white md:block hidden">
                            Connexion
                        </span>
                    </button>
                )}

                <button
                    className="p-3 bg-gray-600 rounded-lg"
                    onClick={() => setSearchBoxOpen(!searchBoxOpen)}
                >
                    <AiOutlineSearch
                        size={"24px"}
                        className="opacity-50 ease duration-500 hover:opacity-100 focus:opacity-100"
                        alt="open search box"
                    />
                </button>

                <button className="p-2 md:hidden">
                    {mobileMenuOpen ? (
                        <RiCloseLine
                            size={"24px"}
                            alt="close menu"
                            className="close"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        />
                    ) : (
                        <HiOutlineMenu
                            size={"24px"}
                            alt="open menu"
                            className="menu"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        />
                    )}
                </button>

                <div
                    className={`absolute top-0 h-screen w-1/3 bg-gray-600 z-10 p-6 md:hidden transition-all duration-500 ${
                        mobileMenuOpen ? "left-0" : "-left-full"
                    }`}
                    id="mobile-menu"
                >
                    <img
                        src={logo}
                        alt="logo"
                        className="w-32 object-contain mx-auto mb-8"
                    />
                    <NavLinks handleClick={() => setMobileMenuOpen(false)} />
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
