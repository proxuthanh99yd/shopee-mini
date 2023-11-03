import {
    IoLogoFacebook,
    IoLogoInstagram,
    IoLogoLinkedin,
} from "react-icons/io5";

export default function Footer() {
    return (
        <div className="hidden border-t-2 border-orange-500 md:block">
            <div className="container mx-auto my-6 flex items-start justify-between border-b border-b-neutral-300 px-20 pb-4 xl:max-w-7xl">
                <ul className="text-sm">
                    <li className="mb-2 text-base font-semibold">
                        CUSTOMER SERVICE
                    </li>
                    <li className="mt-1">Help Centre</li>
                    <li className="mt-1">Shopee Blog</li>
                    <li className="mt-1">Shopee Mall</li>
                    <li className="mt-1">How To Buy</li>
                    <li className="mt-1">How To Sell</li>
                    <li className="mt-1">Payment</li>
                    <li className="mt-1">Shopee Coins</li>
                    <li className="mt-1">Shipping</li>
                    <li className="mt-1">Return & Refund</li>
                    <li className="mt-1">Contact Us</li>
                    <li className="mt-1">Warranty Policy</li>
                </ul>
                <ul className="text-sm">
                    <li className="mb-2 text-base font-semibold">
                        ABOUT SHOPEE
                    </li>
                    <li className="mt-1">About Us</li>
                    <li className="mt-1">Shopee Careers</li>
                    <li className="mt-1">Shopee Policies</li>
                    <li className="mt-1">Privacy Policy</li>
                    <li className="mt-1">Shopee Mall</li>
                    <li className="mt-1">Payment</li>
                    <li className="mt-1">Seller Centre</li>
                    <li className="mt-1">Flash Deals</li>
                    <li className="mt-1">Shopee Ambassador Programme</li>
                    <li className="mt-1">Media Contact</li>
                </ul>
                <div>
                    <div>
                        <h5 className="mb-2 font-semibold">PAYMENT</h5>
                        <div className="grid grid-cols-3 gap-2">
                            {Array.from({ length: 8 }, (_, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="h-8 w-16 rounded-sm bg-neutral-50 p-1 shadow"
                                    >
                                        <img
                                            className="h-full w-full object-contain"
                                            src={`/images/payment-${i}.png`}
                                            alt=""
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div>
                        <h5 className="mb-2 mt-4 font-semibold">LOGISTICS</h5>
                        <div className="grid grid-cols-3 gap-2">
                            {Array.from({ length: 8 }, (_, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="h-8 w-16 rounded-sm bg-neutral-50 p-1 shadow"
                                    >
                                        <img
                                            className="h-full w-full object-contain"
                                            src={`/images/logitic-${i + 1}.png`}
                                            alt=""
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <ul className="text-sm">
                    <li className="mb-2 text-base font-semibold">FOLLOW US</li>
                    <li className="mt-1 flex items-center gap-2">
                        <IoLogoFacebook className="text-lg" /> Facebook
                    </li>
                    <li className="mt-1 flex items-center gap-2">
                        <IoLogoInstagram className="text-lg" /> Instagram
                    </li>
                    <li className="mt-1 flex items-center gap-2">
                        <IoLogoLinkedin className="text-lg" /> LinkedIn
                    </li>
                </ul>
            </div>
        </div>
    );
}
