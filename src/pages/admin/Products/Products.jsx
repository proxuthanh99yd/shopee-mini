import { useEffect } from "react";
import { IoCreateOutline, IoSearch, IoTrashBinOutline } from "react-icons/io5";
import { dateFormat } from "../../../utils/helper";
import Breadcrumb from "../../../components/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import {
    setCurrentPage,
    setFilter,
    setSearchParam,
} from "../../../features/products/productsSlice";
import { fetchProducts } from "../../../features/products/productsThunkApi";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
const currentLink = {
    name: "Products",
    path: "/admin/products",
};

const prevLinks = [
    {
        name: "Admin",
        path: "/admin/dashboard",
    },
];
export default function Products() {
    const {
        isLoading,
        results,
        totalPage,
        isError,
        currentPage: page,
        filter: param,
        searchParam,
    } = useSelector((state) => state.products);
    const { authToken } = useSelector((state) => state.account);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts({ page, param }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param, page]);
    const handlePageClick = (event) => {
        dispatch(setCurrentPage({ currentPage: event.selected + 1 }));
    };
    const handleSearch = () => {
        dispatch(fetchProducts({ page, param, searchParam, authToken }));
    };
    // if (isLoading) {
    //     return <p>Loading ...</p>;
    // }
    if (isError) {
        return <p>Error ...</p>;
    }
    return (
        <>
            <div className="p-1">
                <div className="flex justify-between">
                    <h2 className="flex items-center gap-2 text-xl">
                        Products{" "}
                    </h2>
                    <Breadcrumb
                        currentLink={currentLink}
                        prevLinks={prevLinks}
                    />
                </div>
                <div className="mt-4 flex gap-2 p-1">
                    <button
                        disabled={isLoading}
                        onClick={() => dispatch(setFilter({ param: "all" }))}
                        className={`${
                            param === "all"
                                ? "border-orange-300 text-orange-300"
                                : "text-neutral-600"
                        } self-center rounded-sm border  px-3 py-1  shadow-sm`}
                    >
                        All
                    </button>
                    <button
                        disabled={isLoading}
                        onClick={() => dispatch(setFilter({ param: "active" }))}
                        className={`${
                            param === "active"
                                ? "border-orange-300 text-orange-300"
                                : "text-neutral-600"
                        } self-center rounded-sm border  px-3 py-1  shadow-sm`}
                    >
                        Active
                    </button>
                    <button
                        disabled={isLoading}
                        onClick={() =>
                            dispatch(setFilter({ param: "out_of_stock" }))
                        }
                        className={`${
                            param === "out_of_stock"
                                ? "border-orange-300 text-orange-300"
                                : "text-neutral-600"
                        } self-center rounded-sm border  px-3 py-1  shadow-sm`}
                    >
                        Out Of Stock
                    </button>
                    <button
                        disabled={isLoading}
                        onClick={() => dispatch(setFilter({ param: "hidden" }))}
                        className={`${
                            param === "hidden"
                                ? "border-orange-300 text-orange-300"
                                : "text-neutral-600"
                        } self-center rounded-sm border  px-3 py-1  shadow-sm`}
                    >
                        Hidden
                    </button>
                    <form
                        className="relative flex-1"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            value={searchParam}
                            onChange={(e) =>
                                dispatch(
                                    setSearchParam({
                                        searchParam: e.target.value,
                                    }),
                                )
                            }
                            type="search"
                            className="w-full rounded-sm px-3 py-1 focus:outline-none"
                        />
                        <button
                            onClick={handleSearch}
                            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-sm bg-orange-400 px-8 py-1.5 text-neutral-50 "
                        >
                            <IoSearch />
                        </button>
                    </form>
                </div>
                <div className="mt-4">
                    <div>
                        <div className="hidden rounded-t bg-orange-400 p-1 font-semibold text-neutral-50 md:flex">
                            <div className="mx-1 basis-1/12">No.</div>
                            <div className="mx-1 basis-1/12">ID</div>
                            <div className="mx-1 flex-1">Name</div>
                            <div className="mx-1 basis-2/12">Updated at</div>
                            <div className="mx-1 basis-1/12">Image</div>
                            <div className="mx-1 basis-3/12 text-center">
                                Action
                            </div>
                        </div>
                        {isLoading &&
                            Array.from({ length: 10 }, (_, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="my-2 flex flex-col rounded bg-orange-50 pb-2 pl-3 transition-colors hover:bg-orange-100 md:my-0 md:flex-row md:items-center md:rounded-none md:border-b md:p-1"
                                    >
                                        <div className="skeleton mx-1 basis-1/12"></div>
                                        <div className="skeleton mx-1 basis-1/12"></div>
                                        <div className="skeleton mx-1 flex-1"></div>
                                        <div className="skeleton mx-1 basis-2/12"></div>
                                        <div className="skeleton mx-1 basis-1/12"></div>
                                        <div className="skeleton mx-1 basis-3/12 text-center"></div>
                                    </div>
                                );
                            })}
                        {/* table item start */}
                        {!isLoading &&
                            results.map((category, index) => {
                                const { id, name, updated_at, image } =
                                    category;
                                return (
                                    <div
                                        key={id}
                                        className="my-2 flex flex-col rounded bg-orange-50 pb-2 pl-3 transition-colors hover:bg-orange-100 md:my-0 md:flex-row md:items-center md:rounded-none md:border-b md:p-1"
                                    >
                                        <div className="mx-1 basis-1/12">
                                            <span className="font-semibold md:hidden">
                                                No. :{" "}
                                            </span>
                                            {index + 1}
                                        </div>
                                        <div className="mx-1 basis-1/12">
                                            <span className="font-semibold md:hidden">
                                                ID :{" "}
                                            </span>
                                            {id}
                                        </div>
                                        <div className="mx-1 flex-1 cursor-pointer rounded-sm py-1">
                                            <span className="font-semibold md:hidden">
                                                Name :{" "}
                                            </span>
                                            {name}
                                        </div>
                                        <div className="mx-1 basis-2/12">
                                            <span className="font-semibold md:hidden">
                                                Updated at :
                                            </span>
                                            {dateFormat(new Date(updated_at))}
                                        </div>
                                        <div className="order-1 mx-1 basis-1/12 md:order-none">
                                            <img
                                                className="max-w-xs rounded md:w-16 md:object-cover"
                                                src={
                                                    import.meta.env
                                                        .VITE_IMAGE_LINK + image
                                                }
                                                alt=""
                                            />
                                        </div>
                                        <div className="mx-1 my-2 basis-3/12 text-center md:my-0">
                                            <span className="font-semibold md:hidden">
                                                Action :{" "}
                                            </span>
                                            <Link
                                                to={`${id}/edit`}
                                                className="mr-1 inline-flex items-center gap-1 rounded bg-orange-400 px-3 py-1 text-xs text-neutral-50 transition-colors hover:bg-orange-500"
                                            >
                                                Edit
                                                <IoCreateOutline className="text-sm" />
                                            </Link>
                                            <button className="inline-flex items-center gap-1 rounded bg-red-400 px-3 py-1 text-xs text-neutral-50 transition-colors hover:bg-red-500 ">
                                                Delete{" "}
                                                <IoTrashBinOutline className="text-sm" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}

                        {/* table item end */}
                    </div>
                </div>
                <ReactPaginate
                    className="flex items-center justify-center gap-4 rounded border-t border-gray-200 bg-slate-100 px-4 py-3 sm:px-6 md:rounded-t-none"
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={totalPage}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                />
            </div>
        </>
    );
}
