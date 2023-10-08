import { IoChevronBack, IoChevronForward, IoStar } from "react-icons/io5";

export default function ListProduct() {
    return (
        <>
            <div className="flex justify-between rounded-sm bg-neutral-200 p-3">
                <div className="flex items-center gap-4 text-sm">
                    <span className="text-neutral-500">Sort by</span>
                    <button className="rounded-sm bg-orange-500 px-3 py-1 text-neutral-50">
                        Popular
                    </button>
                    <button className="rounded-sm bg-neutral-50 px-3 py-1 text-neutral-500">
                        Latest
                    </button>
                    <button className="rounded-sm bg-neutral-50 px-3 py-1 text-neutral-500">
                        Top Sales
                    </button>
                    <select className="rounded-sm px-3 py-1 focus:outline-none">
                        <option value="1" key="1">
                            Price
                        </option>
                        <option value="2" key="2">
                            Price: Low to High
                        </option>
                        <option value="3" key="3">
                            Price: High to Low
                        </option>
                    </select>
                </div>
                <div className="flex items-center gap-5">
                    <div>
                        <span className="text-orange-500">1</span>/
                        <span>17</span>
                    </div>
                    <div className="flex gap-0.5">
                        <button
                            disabled
                            className="rounded-sm border border-neutral-50 bg-neutral-50 p-1.5 text-neutral-300 shadow-sm"
                        >
                            <IoChevronBack />
                        </button>
                        <button className="rounded-sm border border-neutral-300 bg-neutral-300 p-1.5 text-neutral-600 shadow-sm transition-colors hover:border-neutral-50 hover:bg-neutral-50">
                            <IoChevronForward />
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-2 grid grid-cols-5 gap-4 p-2">
                {Array.from({ length: 20 }, (_, i) => {
                    return (
                        <div
                            className="cursor-pointer rounded-sm bg-neutral-50 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow"
                            key={i}
                        >
                            <div>
                                <img
                                    className="h-full w-full object-cover"
                                    src="../public/images/product.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="p-2">
                                <p className="line-clamp-2 text-sm">
                                    Bộ giấy vệ sinh dây sạc nhanh PD20W Bu27,cáp
                                    sạc bọc dù chống đứt, xạc nhanh truyền dữ
                                    liệu
                                </p>
                                <span className="my-2 block">$80000</span>
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <span className="flex">
                                        <IoStar />
                                        <IoStar />
                                        <IoStar />
                                        <IoStar />
                                        <IoStar />
                                    </span>
                                    <span className="text-sm text-neutral-600">
                                        512 sold
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <nav className="mt-3 flex justify-center" aria-label="Pagination">
                <a
                    href="#"
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                    <span className="sr-only">Previous</span>
                    <IoChevronBack className="h-5 w-5" aria-hidden="true" />
                </a>
                {/* Current: "z-10 bg-orange-500 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500", Default: "text-gray-900  ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                <a
                    href="#"
                    aria-current="page"
                    className="relative z-10 inline-flex items-center bg-orange-500 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                >
                    1
                </a>
                <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900  ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                    2
                </a>
                <a
                    href="#"
                    className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900  ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                >
                    3
                </a>
                <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700  ring-gray-300 focus:outline-offset-0">
                    ...
                </span>
                <a
                    href="#"
                    className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900  ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                >
                    8
                </a>
                <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900  ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                    9
                </a>
                <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900  ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                    10
                </a>
                <a
                    href="#"
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400  ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                    <span className="sr-only">Next</span>
                    <IoChevronForward className="h-5 w-5" aria-hidden="true" />
                </a>
            </nav>
        </>
    );
}
