import { Link, NavLink, useNavigate } from "react-router-dom";
import { Footer } from "../../components/client";
import { useDispatch, useSelector } from "react-redux";
import { setInput } from "../../features/client/account/accountSlice";
import { signup } from "../../features/client/account/accountThunkApi";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { IoHomeOutline } from "react-icons/io5";
export default function SignUpPage() {
    const {
        formInput,
        isSigned,
        isError,
        errorMessage,
        isLoading,
        isAuthenticated,
    } = useSelector((state) => state.account);
    const { address, cfPassword, email, name, password, phone } = formInput;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toastId = useRef(null);
    useEffect(() => {
        if (isLoading) {
            toastId.current = toast.loading("Signing");
        }
        if (isSigned) {
            toast.update(toastId.current, {
                render: "Sign up success!",
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
        if (isSigned) {
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
    }, [isSigned, isError, isLoading, isAuthenticated]);

    const handleInput = (e) => {
        dispatch(
            setInput({
                name: e.target.name,
                value: e.target.value,
            }),
        );
    };

    const handleSignUp = () => {
        if (address && cfPassword && email && name && password && phone) {
            if (cfPassword === password) {
                dispatch(signup({ body: formInput }));
            } else {
                toast.error("Confirm password not match !", {
                    autoClose: 2000,
                });
            }
        }
    };
    return (
        <div>
            <div className="fixed bottom-0 left-0 z-[9999] w-full bg-orange-100 text-neutral-500 shadow md:hidden">
                <div className="flex items-center md:hidden">
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
                        Sign Up
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
                        Sign Up
                    </h3>
                    <input
                        value={formInput?.phone}
                        onChange={handleInput}
                        name="phone"
                        className="rounded-sm border p-2 focus:border-neutral-700 focus:outline-none"
                        type="text"
                        placeholder="Phone number"
                    />
                    <input
                        value={formInput?.email}
                        onChange={handleInput}
                        name="email"
                        className="rounded-sm border p-2 focus:border-neutral-700 focus:outline-none"
                        type="email"
                        placeholder="Email"
                    />
                    <input
                        value={formInput?.name}
                        onChange={handleInput}
                        name="name"
                        className="rounded-sm border p-2 focus:border-neutral-700 focus:outline-none"
                        type="text"
                        placeholder="Name"
                    />
                    <input
                        value={formInput?.address}
                        onChange={handleInput}
                        name="address"
                        className="rounded-sm border p-2 focus:border-neutral-700 focus:outline-none"
                        type="text"
                        placeholder="Address"
                    />
                    <input
                        value={formInput?.password}
                        onChange={handleInput}
                        name="password"
                        className="rounded-sm border p-2 focus:border-neutral-700 focus:outline-none"
                        type="password"
                        placeholder="Password"
                    />
                    <input
                        value={formInput?.cfPassword}
                        onChange={handleInput}
                        name="cfPassword"
                        className="rounded-sm border p-2 focus:border-neutral-700 focus:outline-none"
                        type="password"
                        placeholder="Confirm Password"
                    />
                    <button
                        disabled={
                            address &&
                            cfPassword &&
                            email &&
                            name &&
                            password &&
                            phone
                                ? false
                                : true
                        }
                        onClick={handleSignUp}
                        className={`rounded-sm  p-2 text-neutral-50 ${
                            address &&
                            cfPassword &&
                            email &&
                            name &&
                            password &&
                            phone
                                ? "bg-orange-500"
                                : "bg-orange-300"
                        }`}
                    >
                        SIGN UP
                    </button>
                    <div className="self-center">
                        <span className=" text-neutral-400">
                            Have an account?{" "}
                        </span>
                        <Link to="/login" className="text-orange-600">
                            Log In
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
