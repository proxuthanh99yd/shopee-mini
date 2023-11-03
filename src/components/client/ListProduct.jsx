import { IoChevronBack, IoChevronForward, IoStar } from "react-icons/io5";
import PropTypes from "prop-types";
import {
    discountCalculator,
    maxPriceCalculator,
    minPriceCalculator,
    stockCalculator,
} from "../../utils/helper";
import { Link } from "react-router-dom";
import Paginate from "../Paginate";
export default function ListProduct({
    productResults,
    handleSort,
    sort,
    handlePageClick,
    pageCount,
    currentPage,
}) {
    return (
        <>
            <div className="flex justify-between rounded-sm bg-neutral-200 p-3">
                <div className="flex items-center gap-4 text-sm">
                    <span className="hidden text-neutral-500 md:block">
                        Sort by
                    </span>
                    <button
                        onClick={() => handleSort("updated_at.desc")}
                        className={`rounded-sm px-3 py-1  ${
                            sort == "updated_at.desc"
                                ? "bg-orange-500 text-neutral-50"
                                : "bg-neutral-50 text-neutral-500"
                        }`}
                    >
                        Latest
                    </button>
                    <button
                        onClick={() => handleSort("discount.desc")}
                        className={`rounded-sm px-3 py-1  ${
                            sort == "discount.desc"
                                ? "bg-orange-500 text-neutral-50"
                                : "bg-neutral-50 text-neutral-500"
                        }`}
                    >
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
                <div className="hidden items-center gap-5 md:flex">
                    <div>
                        <span className="text-orange-500">{currentPage}</span>/
                        <span>{pageCount}</span>
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
            <div className="mt-2 grid grid-cols-2 gap-4 p-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
                {productResults.map((product) => {
                    return (
                        <Link
                            to={`/product/${product.id}`}
                            className=" cursor-pointer rounded-sm bg-neutral-50 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow"
                            key={product.id}
                        >
                            <div className="relative h-56 p-4">
                                {product.discount ? (
                                    <span className="absolute right-0 top-0 rounded-bl-lg bg-yellow-300 px-2 py-1 text-sm text-red-500">
                                        -{product.discount}%
                                    </span>
                                ) : (
                                    ""
                                )}
                                <img
                                    className="h-full w-full object-contain"
                                    src={
                                        import.meta.env.VITE_IMAGE_LINK +
                                        product.image
                                    }
                                    alt=""
                                />
                            </div>
                            <div className="flex h-32 flex-col justify-between p-2">
                                <p className="line-clamp-2 flex-1 text-sm">
                                    {product.name}
                                </p>
                                <span className="my-2 flex flex-col text-orange-500">
                                    <span className="text-xs text-neutral-500 line-through">
                                        $
                                        {minPriceCalculator(
                                            product.classify,
                                        ).toFixed(1)}
                                        {" - "}$
                                        {maxPriceCalculator(
                                            product.classify,
                                        ).toFixed(1)}
                                    </span>
                                    $
                                    {discountCalculator(
                                        minPriceCalculator(product.classify),
                                        product.discount,
                                    ).toFixed(1)}
                                    {" - "}$
                                    {discountCalculator(
                                        maxPriceCalculator(product.classify),
                                        product.discount,
                                    ).toFixed(1)}
                                </span>
                                <div className="flex items-center justify-between gap-1 text-yellow-500">
                                    <span className="flex">
                                        <IoStar />
                                        <IoStar />
                                        <IoStar />
                                        <IoStar />
                                        <IoStar />
                                    </span>
                                    <span className="text-sm text-neutral-600">
                                        {stockCalculator(product.classify)} sold
                                    </span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
            <nav
                className="mb-10 mt-3 flex justify-center md:mb-0"
                aria-label="Pagination"
            >
                <Paginate
                    currentPage={currentPage}
                    pageCount={pageCount}
                    handlePageClick={handlePageClick}
                />
            </nav>
        </>
    );
}

ListProduct.propTypes = {
    productResults: PropTypes.array,
    handleSort: PropTypes.func,
    sort: PropTypes.string,
    handlePageClick: PropTypes.func,
    pageCount: PropTypes.number,
    currentPage: PropTypes.number,
};
