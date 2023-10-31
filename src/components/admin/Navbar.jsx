import {
    IoMenu,
    IoPersonCircleOutline,
    IoChevronDownOutline,
} from "react-icons/io5";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";

Navbar.propTypes = {
    setMenu: PropTypes.func,
    name: PropTypes.string,
};

export default function Navbar({ setMenu, name }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="flex items-center justify-between bg-gray-50 px-3 py-2">
            <div>
                <IoMenu
                    onClick={() => setMenu((curr) => !curr)}
                    className="cursor-pointer text-3xl text-gray-900 hover:text-gray-600"
                />
            </div>
            <div className="relative flex cursor-pointer items-center gap-1">
                <div
                    className="hover:text-slate-400"
                    onClick={() => setOpen((curr) => !curr)}
                >
                    {/* <img src="" alt="" /> */}
                    <IoPersonCircleOutline className="text-2xl" />
                </div>
                <div
                    className="hidden items-center gap-1 hover:text-slate-400 sm:flex"
                    onClick={() => setOpen((curr) => !curr)}
                >
                    <p>{name}</p>
                    <IoChevronDownOutline />
                </div>
                <div
                    className={`absolute right-0  rounded bg-slate-300 transition-all ${
                        !open
                            ? "invisible -top-full scale-50 opacity-0"
                            : "visible top-full scale-100 opacity-100"
                    }`}
                >
                    <Link
                        to="/account/profile"
                        className="m-1 block whitespace-nowrap rounded-sm p-1 text-sm text-slate-600 transition-colors hover:bg-slate-400 hover:text-slate-600"
                    >
                        Your Profile
                    </Link>
                </div>
            </div>
        </div>
    );
}
