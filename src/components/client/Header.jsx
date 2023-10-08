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

export default function Header() {
    return (
        <div className="bg-orange-600  text-neutral-50 ">
            <header className="container mx-auto px-2 pb-2 xl:max-w-7xl">
                <div className="flex justify-between py-1 text-sm font-normal">
                    <div>
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
                            <a
                                className="border-r-[1px] border-neutral-50/50 px-2"
                                href="#!"
                            >
                                Sign Up
                            </a>
                            <a className="px-2" href="#!">
                                Login
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-10 py-3">
                    <div>
                        <p className="font-nunito text-3xl font-bold">
                            Shopee Mini
                        </p>
                    </div>
                    <div className="relative flex-1">
                        <input
                            className="w-full rounded-sm px-3 py-1.5 text-sm focus:outline-1 focus:outline-orange-500"
                            type="text"
                            placeholder="Search ..."
                        />
                        <button className="absolute right-1 top-1/2 -translate-y-1/2 rounded-sm bg-orange-600 px-4 py-1 text-lg hover:opacity-80">
                            <IoSearchOutline />
                        </button>
                    </div>
                    <div className="cursor-pointer text-3xl">
                        <IoCartOutline />
                    </div>
                </div>
            </header>
        </div>
    );
}
