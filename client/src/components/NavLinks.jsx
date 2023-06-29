import { HiOutlineHome } from "react-icons/hi";

import { BsLaptop, BsFilm } from "react-icons/bs";
import { NavLink } from "react-router-dom";

export const links = [
    { name: "Home", to: "/", icon: HiOutlineHome },
    { name: "TV Shows", to: "/shows", icon: BsLaptop },
    { name: "Movies", to: "/movies", icon: BsFilm },
];

const NavLinks = ({ handleClick }) =>
    links.map((link) => (
        <NavLink
            key={link.name}
            to={link.to}
            className={({ isActive }) =>
                "flex flex-row justify-start items-center my-6 md:my-2 text-sm font-medium hover:text-slate-900 md:hover:text-gray-400" +
                (isActive ? " md:text-gray-400 text-gray-900" : " text-white")
            }
            onClick={() => handleClick && handleClick()}
        >
            <link.icon size="1.6rem" className="mr-2" />
            {link.name}
        </NavLink>
    ));

export default NavLinks;
