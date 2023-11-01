import {
    IoCartOutline,
    IoChevronDownOutline,
    IoHelpCircleOutline,
    IoLanguageOutline,
    IoLogoFacebook,
    IoLogoInstagram,
    IoNotifications,
    IoSearchOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { discountCalculator } from "../../utils/helper";

export default function Header({
    isAuthenticating,
    isAuthenticated,
    isLogin,
    name,
    handleLogout,
    isAdmin,
    carts,
    searchParam,
    setSearchParam,
    handleSearch,
}) {
    return (
        <div className="bg-orange-600  text-neutral-50 ">
            <header className="container mx-auto px-2 pb-2 xl:max-w-7xl">
                <div className="flex justify-between py-1 text-sm font-normal">
                    <div className="flex items-center gap-2">
                        {isAdmin && (
                            <Link to="/admin/dashboard" href="#!">
                                <span>Admin Manager</span>
                            </Link>
                        )}
                        <a className="flex items-center gap-1" href="#!">
                            <span>Follow us on</span>
                            <span className="text-base">
                                <IoLogoFacebook />
                            </span>
                            <span className="text-base">
                                <IoLogoInstagram />
                            </span>
                        </a>
                    </div>
                    <div className="flex items-center gap-4">
                        <a className="flex items-center gap-1" href="#!">
                            <span className="text-base">
                                <IoNotifications />
                            </span>
                            Notifications
                        </a>
                        <a className="flex items-center gap-1" href="#!">
                            <span className="text-base">
                                <IoHelpCircleOutline />
                            </span>
                            Help
                        </a>
                        <a className="flex items-center gap-1" href="#!">
                            <span className="text-base">
                                <IoLanguageOutline />
                            </span>
                            English
                            <span className="text-base">
                                <IoChevronDownOutline />
                            </span>
                        </a>
                        <div className="flex">
                            {isAuthenticating ? (
                                <span className="inline-flex items-center border-r-[1px] border-neutral-50/50 px-2 text-sm font-normal">
                                    <svg
                                        aria-hidden="true"
                                        role="status"
                                        className="mr-2 inline h-3.5 w-3.5 animate-spin text-orange-200"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="#f97316"
                                        />
                                    </svg>
                                    Loading...
                                </span>
                            ) : isAuthenticated || isLogin ? (
                                <>
                                    <Link
                                        className="border-r-[1px] border-neutral-50/50 px-2"
                                        to="/account/profile"
                                    >
                                        {name}
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="px-2"
                                        to="/login"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        className="border-r-[1px] border-neutral-50/50 px-2"
                                        to="/signup"
                                    >
                                        Sign Up
                                    </Link>
                                    <Link className="px-2" to="/login">
                                        Login
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-10 py-3">
                    <div>
                        <Link to="/" className="font-nunito text-3xl font-bold">
                            Shopee Mini
                        </Link>
                    </div>
                    <div className="relative flex-1">
                        <input
                            onChange={setSearchParam}
                            value={searchParam}
                            className="w-full rounded-sm px-3 py-1.5 text-sm text-neutral-600 focus:outline-1 focus:outline-orange-500"
                            type="text"
                            placeholder="Search ..."
                        />
                        <button
                            onClick={handleSearch}
                            className="absolute right-1 top-1/2 -translate-y-1/2 rounded-sm bg-orange-600 px-4 py-1 text-lg hover:opacity-80"
                        >
                            <IoSearchOutline />
                        </button>
                    </div>
                    {isAuthenticated || isLogin ? (
                        <div className="group relative mr-5 cursor-pointer text-3xl">
                            <Link to="/cart">
                                <IoCartOutline />
                            </Link>
                            {carts.length > 0 && (
                                <>
                                    <span className="absolute right-0 top-0 flex h-4 w-4 -translate-y-1/3 translate-x-1/4  items-center justify-center rounded-full bg-neutral-50 text-xs text-orange-500">
                                        {carts.length}
                                    </span>
                                    <ul className="invisible absolute right-0 top-full z-[99999] w-96 rounded-sm bg-neutral-50 text-base opacity-0 transition-opacity group-hover:visible group-hover:opacity-100">
                                        <li className="block px-4 py-2 text-sm text-neutral-400">
                                            <span className="">
                                                Recently Added Products
                                            </span>
                                        </li>
                                        {carts.slice(0, 5).map((cart) => {
                                            return (
                                                <li className="" key={cart.id}>
                                                    <Link className="flex items-center justify-between gap-4 p-2 text-neutral-600 transition-colors hover:bg-neutral-200">
                                                        <img
                                                            className="h-10 w-10 object-cover"
                                                            src={
                                                                import.meta.env
                                                                    .VITE_IMAGE_LINK +
                                                                cart.product
                                                                    .image
                                                            }
                                                            alt=""
                                                        />
                                                        <div className="flex flex-1 flex-col">
                                                            <span className="flex-1 truncate">
                                                                {
                                                                    cart.product
                                                                        .name
                                                                }
                                                            </span>
                                                            <span className="self-start rounded-sm border p-0.5 text-xs">
                                                                {
                                                                    cart
                                                                        .classify
                                                                        .name
                                                                }
                                                            </span>
                                                        </div>
                                                        <span className="text-orange-500">
                                                            $
                                                            {discountCalculator(
                                                                cart.classify
                                                                    .price,
                                                                cart.product
                                                                    .discount,
                                                            )}
                                                        </span>
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                        <li className="flex justify-end">
                                            <Link
                                                to="/cart"
                                                className="m-2 rounded-sm bg-orange-500 p-1 text-sm text-neutral-50"
                                            >
                                                View My Shopping Cart
                                            </Link>
                                        </li>
                                    </ul>
                                </>
                            )}
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </header>
        </div>
    );
}

Header.propTypes = {
    name: PropTypes.string,
    isAuthenticating: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
    isLogin: PropTypes.bool,
    isAdmin: PropTypes.bool,
    handleLogout: PropTypes.func,
    carts: PropTypes.array,
};
