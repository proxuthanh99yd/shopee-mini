import { Link, NavLink, useNavigate } from "react-router-dom";
import {
    IoBagOutline,
    IoPeopleOutline,
    IoLogOutOutline,
    IoSpeedometerOutline,
    IoBagCheckOutline,
    IoHomeOutline,
} from "react-icons/io5";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/client/account/accountThunkApi";
import { useEffect } from "react";

Sidebar.propTypes = {
    menu: PropTypes.bool,
};

export default function Sidebar({ menu }) {
    const navigate = useNavigate();
    const { authToken } = useSelector((state) => state.account);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!authToken) {
            navigate("/", { replace: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authToken]);
    const handleLogout = () => {
        dispatch(logout());
    };
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
                <ul className="ml-10 hidden text-base md:block">
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
                    <NavLink
                        to={"/admin/orders"}
                        className="parent flex items-center justify-center gap-2  px-3 py-2 text-3xl transition-colors hover:bg-orange-600 hover:text-neutral-50
                                            md:justify-start md:text-lg"
                    >
                        <IoBagCheckOutline />
                        {menu && (
                            <span className="hidden md:block">Orders</span>
                        )}
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={"/admin/users"}
                        className="parent flex items-center justify-center gap-2  px-3 py-2 text-3xl transition-colors hover:bg-orange-600 hover:text-neutral-50
                                            md:justify-start md:text-lg"
                    >
                        <IoPeopleOutline />
                        {menu && <span className="hidden md:block">Users</span>}
                    </NavLink>
                </li>
                <li>
                    <Link
                        to="/"
                        className="parent flex items-center justify-center gap-2  px-3 py-2 text-3xl transition-colors hover:bg-orange-600 hover:text-neutral-50
                                            md:justify-start md:text-lg"
                    >
                        <IoHomeOutline />
                        {menu && (
                            <span className="hidden md:block">Back home</span>
                        )}
                    </Link>
                </li>
                <li>
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center justify-center gap-2 px-3 py-2 text-3xl transition-colors hover:bg-orange-600 hover:text-neutral-50 md:justify-start
            md:text-lg"
                    >
                        <IoLogOutOutline />
                        {menu && (
                            <span className="hidden md:block">Logout</span>
                        )}
                    </button>
                </li>
            </ul>
        </div>
    );
}
