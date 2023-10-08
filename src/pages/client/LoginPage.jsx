import { Link } from "react-router-dom";
import { Footer } from "../../components/client";

export default function LoginPage() {
    return (
        <div>
            <header className="container mx-auto flex items-center justify-between p-8 text-orange-500 xl:max-w-7xl">
                <div className="flex items-center">
                    <p className="font-nunito text-3xl font-bold ">
                        Shopee Mini
                    </p>
                    <span className="ml-4 text-xl font-semibold text-neutral-950">
                        Login
                    </span>
                </div>
                <span className="underline">Need help?</span>
            </header>
            <div className="bg-loginBg relative">
                <img
                    className="mx-auto block"
                    src="../public/images/loginBanner.jpg"
                    alt=""
                />
                <div className="absolute right-[10%] top-1/2 flex w-[400px] -translate-y-1/2 flex-col gap-4 rounded-sm bg-slate-100 p-8">
                    <h3 className="text-lg">Log In</h3>
                    <input
                        className="rounded-sm border p-2 focus:border-neutral-700 focus:outline-none"
                        type="text"
                        placeholder="Phone number / Username / Email"
                    />
                    <input
                        className="rounded-sm border p-2 focus:border-neutral-700 focus:outline-none"
                        type="password"
                        placeholder="Password"
                    />
                    <button className="rounded-sm bg-orange-500 p-2 text-neutral-50">
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
