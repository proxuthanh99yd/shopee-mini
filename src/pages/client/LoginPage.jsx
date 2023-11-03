import { Link, NavLink, useNavigate } from "react-router-dom";
import { Footer } from "../../components/client";
import { useDispatch, useSelector } from "react-redux";
import {
    authentication,
    login,
} from "../../features/client/account/accountThunkApi";
import { setInput } from "../../features/client/account/accountSlice";
import { useEffect } from "react";
import { useRef } from "react";
import { toast } from "react-toastify";
import { IoHomeOutline } from "react-icons/io5";

export default function LoginPage() {
    const navigate = useNavigate();
    const {
        formInput,
        authToken,
        isLogin,
        isError,
        errorMessage,
        isLoading,
        isAuthenticating,
        isAuthenticated,
    } = useSelector((state) => state.account);
    const dispatch = useDispatch();
    const toastId = useRef(null);
    useEffect(() => {
        if (authToken) {
            dispatch(authentication({ authToken }));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (isLoading) {
            toastId.current = toast.loading("Login");
        }
        if (isLogin) {
            toast.update(toastId.current, {
                render: "Login success!",
                type: "success",
                isLoading: false,
                autoClose: 2000,
            });
        }
        if (isError) {
            toast.update(toastId.current, {
                render: errorMessage,
                type: "error",
                isLoading: false,
                autoClose: 2000,
            });
        }
        let idTimeOut;
        if (isLogin) {
            idTimeOut = setTimeout(() => {
                navigate("/", { replace: true });
            }, 2000);
        }
        if (isAuthenticated) {
            navigate("/", { replace: true });
        }
        return () => {
            clearTimeout(idTimeOut);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogin, isError, isError, isLoading]);
    const handleLogin = () => {
        dispatch(
            login({
                body: {
                    email: formInput.email,
                    password: formInput.password,
                },
            }),
        );
    };
    const handleInput = (e) => {
        dispatch(setInput({ name: e.target.name, value: e.target.value }));
    };
    if (isAuthenticating) {
        return (
            <div className="flex h-screen w-screen items-center justify-center">
                <div className="loading">
                    <div className="loadingSpinner">
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="fixed bottom-0 left-0 z-[9999] w-full bg-orange-100 text-neutral-500 shadow md:hidden">
                <div className="flex items-center md:hidden">
                    {/* <button className="p-3 text-4xl">
                        <IoListCircleOutline />
                    </button> */}
                    <div className="flex flex-1 items-center justify-around">
                        <NavLink to="/" className="child p-3 text-4xl">
                            <IoHomeOutline />
                        </NavLink>
                    </div>
                </div>
            </div>
            <header className="container mx-auto flex justify-between p-8 text-orange-500 md:items-center xl:max-w-7xl">
                <div className="flex flex-col md:flex-row md:items-center">
                    <Link to="/" className="font-nunito text-3xl font-bold ">
                        Shopee Mini
                    </Link>
                    <span className="hidden text-xl font-semibold text-neutral-950 md:ml-4 md:block">
                        Login
                    </span>
                </div>
                <span className="underline">Need help?</span>
            </header>
            <div className="relative bg-loginBg">
                <img
                    className="mx-auto hidden md:block"
                    src="/images/loginBanner.jpg"
                    alt=""
                />
                <div className="absolute flex w-full flex-col gap-4 rounded-sm bg-slate-100 p-8 md:right-[10%] md:top-1/2 md:w-[400px] md:-translate-y-1/2">
                    <h3 className="text-center text-2xl font-semibold uppercase md:text-lg md:font-medium md:normal-case">
                        Log In
                    </h3>
                    <input
                        value={formInput.email}
                        onChange={handleInput}
                        name="email"
                        className="rounded-sm border p-2 focus:border-neutral-700 focus:outline-none"
                        type="text"
                        placeholder="Phone number / Username / Email"
                    />
                    <input
                        value={formInput.password}
                        onChange={handleInput}
                        name="password"
                        className="rounded-sm border p-2 focus:border-neutral-700 focus:outline-none"
                        type="password"
                        placeholder="Password"
                    />

                    <button
                        disabled={isLoading}
                        onClick={handleLogin}
                        className="flex items-center justify-center rounded-sm bg-orange-500 p-2 text-neutral-50"
                    >
                        {isLoading && (
                            <svg
                                aria-hidden="true"
                                role="status"
                                className="mr-2 inline h-4 w-4 animate-spin text-orange-200"
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
                        )}
                        LOG IN
                    </button>
                    <div className="self-center">
                        <span className=" text-neutral-400">
                            New to Shopee?{" "}
                        </span>
                        <Link to="/signup" className="text-orange-600">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
