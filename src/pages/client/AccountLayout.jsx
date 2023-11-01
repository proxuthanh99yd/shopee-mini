import {
    IoCreateOutline,
    IoKeypadOutline,
    IoPersonOutline,
    IoReceiptOutline,
} from "react-icons/io5";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
export default function AccountLayout() {
    const { user } = useSelector((state) => state.account);
    return (
        <>
            <div className="container mx-auto my-6 flex gap-8 px-2 pb-2 xl:max-w-7xl">
                <div>
                    <div className="flex items-center gap-2 border-b px-2 pb-4">
                        <img
                            className="h-12 w-12 rounded-full object-cover"
                            src="/images/book.jpg"
                            alt=""
                        />
                        <div className="flex flex-col">
                            <span className="text-base font-semibold">
                                {user.name}
                            </span>
                            <button className="flex items-center text-sm text-neutral-500">
                                <IoCreateOutline /> Edit Profile
                            </button>
                        </div>
                    </div>
                    <ul className="mt-4 flex flex-col gap-4">
                        <li>
                            <NavLink
                                className="child flex items-center gap-2"
                                to={"profile"}
                            >
                                <IoPersonOutline className=" text-blue-500" />
                                <span> My Profile</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="child flex items-center gap-2"
                                to={"change_password"}
                            >
                                <IoKeypadOutline className=" text-blue-500" />
                                <span>Change Password</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="child flex items-center gap-2"
                                to={"purchase"}
                            >
                                <IoReceiptOutline className=" text-blue-500" />
                                <span>My Purchase</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="flex-1 rounded-sm bg-neutral-50">
                    <Outlet />
                </div>
            </div>
        </>
    );
}
