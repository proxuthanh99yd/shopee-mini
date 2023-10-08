import { NavLink } from "react-router-dom";
import {
    IoBagOutline,
    IoPeopleOutline,
    IoLogOutOutline,
    IoSpeedometerOutline,
} from "react-icons/io5";
import PropTypes from "prop-types";

Sidebar.propTypes = {
    menu: PropTypes.bool,
};

export default function Sidebar({ menu }) {
    return (
        <div className="text-neutral-600">
            <div className="ml-2 truncate py-4 font-nunito font-bold text-orange-500">
                Administrator
            </div>
            <ul>
                <li>
                    <NavLink
                        to={"/admin/dashboard"}
                        className="parent flex items-center justify-center gap-2  px-3 py-2 text-3xl transition-colors hover:bg-orange-600 hover:text-neutral-50
            md:justify-start md:text-lg"
                    >
                        <IoSpeedometerOutline />
                        {menu && (
                            <span className="hidden md:block">Dashboard</span>
                        )}
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={"/admin/products"}
                        className="parent flex items-center justify-center gap-2  px-3 py-2 text-3xl transition-colors hover:bg-orange-600 hover:text-neutral-50
                                            md:justify-start md:text-lg"
                    >
                        <IoBagOutline />
                        {menu && (
                            <span className="hidden md:block">Products</span>
                        )}
                    </NavLink>
                </li>
                <ul className="ml-10 text-base">
                    <li>
                        <NavLink
                            to={"/admin/products/create"}
                            className="child"
                        >
                            Create Product
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/admin/products/categories"
                            className="child"
                        >
                            {menu && (
                                <span className="hidden md:block">
                                    Categories
                                </span>
                            )}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/products/brands" className="child">
                            {menu && (
                                <span className="hidden md:block">Brands</span>
                            )}
                        </NavLink>
                    </li>
                </ul>
                <li>
                    <a
                        href="#!"
                        className="flex items-center justify-center gap-2 px-3 py-2 text-3xl transition-colors hover:bg-orange-600 hover:text-neutral-50
            md:justify-start md:text-lg"
                    >
                        <IoPeopleOutline />
                        {menu && <span className="hidden md:block">Users</span>}
                    </a>
                </li>
                <li>
                    <a
                        href="#!"
                        className="flex items-center justify-center gap-2 px-3 py-2 text-3xl transition-colors hover:bg-orange-600 hover:text-neutral-50 md:justify-start
            md:text-lg"
                    >
                        <IoLogOutOutline />
                        {menu && (
                            <span className="hidden md:block">Logout</span>
                        )}
                    </a>
                </li>
            </ul>
        </div>
    );
}
