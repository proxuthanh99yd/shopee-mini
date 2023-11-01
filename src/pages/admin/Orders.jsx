import { useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import Breadcrumb from "../../components/Breadcrumb";
import Paginate from "../../components/Paginate";
import {
    setCurrentPage,
    setFilter,
} from "../../features/admin/orders/orderSlice";
import {
    changeStatusOrders,
    fetchOrders,
} from "../../features/admin/orders/orderThunkApi";
import { dateFormat } from "../../utils/helper";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { Link } from "react-router-dom";

const currentLink = {
    name: "Orders",
    path: "/admin/orders",
};

const prevLinks = [
    {
        name: "Admin",
        path: "/admin/dashboard",
    },
];
export default function Orders() {
    const {
        filter,
        currentPage,
        totalPage,
        results,
        isLoading,
        isError,
        toastLoading,
        toastSuccess,
        toastError,
        loadingMessage,
        successMessage,
        errorMessage,
    } = useSelector((state) => state.managerOrders);
    const dispatch = useDispatch();
    const toastId = useRef(null);
    useEffect(() => {
        if (toastLoading) {
            toastId.current = toast.loading(loadingMessage);
        }
        if (toastSuccess) {
            toast.update(toastId.current, {
                render: successMessage,
                type: "success",
                isLoading: false,
                autoClose: 2000,
            });
        }
        if (toastError) {
            toast.update(toastId.current, {
                render: errorMessage,
                type: "error",
                isLoading: false,
                autoClose: 2000,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toastLoading, toastSuccess, toastError]);
    useEffect(() => {
        dispatch(fetchOrders({ page: currentPage, filter }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, filter]);
    const handlePageClick = ({ selected }) => {
        dispatch(setCurrentPage({ currentPage: selected + 1 }));
    };
    const handleChangeStatus = (id, e) => {
        dispatch(changeStatusOrders({ id, value: e.target.value }));
    };
    // if (isLoading) {
    //     return <Loading />;
    // }
    if (isError) {
        return <p>Error ...</p>;
    }
    return (
        <>
            <div className="p-1">
                <div className="flex justify-between">
                    <h2 className="flex items-center gap-2 text-xl">Orders </h2>
                    <Breadcrumb
                        currentLink={currentLink}
                        prevLinks={prevLinks}
                    />
                </div>
                <div className="mt-4 flex gap-2 p-1">
                    <button
                        disabled={isLoading}
                        onClick={() => dispatch(setFilter("all"))}
                        className={`${
                            filter === "all"
                                ? "border-orange-300 text-orange-300"
                                : "text-neutral-600"
                        } self-center rounded-sm border  px-3 py-1  shadow-sm`}
                    >
                        All
                    </button>
                    <button
                        disabled={isLoading}
                        onClick={() => dispatch(setFilter("waiting"))}
                        className={`${
                            filter === "waiting"
                                ? "border-orange-300 text-orange-300"
                                : "text-neutral-600"
                        } self-center rounded-sm border  px-3 py-1  shadow-sm`}
                    >
                        Waiting
                    </button>
                    <button
                        disabled={isLoading}
                        onClick={() => dispatch(setFilter("shipping"))}
                        className={`${
                            filter === "shipping"
                                ? "border-orange-300 text-orange-300"
                                : "text-neutral-600"
                        } self-center rounded-sm border  px-3 py-1  shadow-sm`}
                    >
                        Shipping
                    </button>
                    <button
                        disabled={isLoading}
                        onClick={() => dispatch(setFilter("completed"))}
                        className={`${
                            filter === "completed"
                                ? "border-orange-300 text-orange-300"
                                : "text-neutral-600"
                        } self-center rounded-sm border  px-3 py-1  shadow-sm`}
                    >
                        Completed
                    </button>
                    <button
                        disabled={isLoading}
                        onClick={() => dispatch(setFilter("cancelled"))}
                        className={`${
                            filter === "cancelled"
                                ? "border-orange-300 text-orange-300"
                                : "text-neutral-600"
                        } self-center rounded-sm border  px-3 py-1  shadow-sm`}
                    >
                        Cancelled
                    </button>
                    <form
                        className="relative flex-1"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            // value={searchParam}
                            // onChange={(e) =>
                            //     dispatch(
                            //         setSearchParam({
                            //             searchParam: e.target.value,
                            //         }),
                            //     )
                            // }
                            type="search"
                            className="w-full rounded-sm px-3 py-1 focus:outline-none"
                        />
                        <button
                            // onClick={handleSearch}
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
                            <div className="mx-1 flex-1">Total Price</div>
                            <div className="mx-1 basis-2/12">Order date</div>
                            <div className="mx-1 basis-2/12 text-center">
                                Status
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
                                        <div className="skeleton mx-1 basis-2/12 text-center"></div>
                                        <div className="skeleton mx-1 basis-2/12 text-center"></div>
                                    </div>
                                );
                            })}
                        {/* table item start */}
                        {!isLoading &&
                            results.map((user, index) => {
                                const { id, total_price, order_date, status } =
                                    user;
                                return (
                                    <div
                                        key={id}
                                        className="my-2 rounded bg-orange-50 pb-2 pl-3 transition-colors hover:bg-orange-100 md:my-0 md:flex md:items-center md:rounded-none md:border-b md:p-1"
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
                                        <Link
                                            to={`/admin/orders/${id}`}
                                            className="mx-1 flex-1 cursor-pointer rounded-sm py-1"
                                        >
                                            <span className="font-semibold md:hidden">
                                                Total Price :{" "}
                                            </span>
                                            {total_price}$
                                        </Link>
                                        <div className="mx-1 basis-2/12">
                                            <span className="font-semibold md:hidden">
                                                Order date :
                                            </span>
                                            {dateFormat(new Date(order_date))}
                                        </div>
                                        <div className="mx-1 basis-2/12 text-start md:text-center">
                                            <span className="font-semibold md:hidden">
                                                Status :{" "}
                                            </span>
                                            <select
                                                onChange={(e) =>
                                                    handleChangeStatus(id, e)
                                                }
                                                defaultValue={status}
                                            >
                                                <option
                                                    disabled={status > 0}
                                                    value="0"
                                                    key="0"
                                                >
                                                    Waiting
                                                </option>
                                                <option
                                                    disabled={status > 1}
                                                    value="1"
                                                    key="1"
                                                >
                                                    Shipping
                                                </option>
                                                <option
                                                    disabled={status > 2}
                                                    value="2"
                                                    key="2"
                                                >
                                                    Completed
                                                </option>
                                                {status == 3 && (
                                                    <option
                                                        disabled
                                                        value="3"
                                                        key="3"
                                                    >
                                                        Canceled
                                                    </option>
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                );
                            })}

                        {/* table item end */}
                    </div>
                </div>
                <Paginate
                    handlePageClick={handlePageClick}
                    pageCount={totalPage}
                    currentPage={currentPage}
                />
            </div>
        </>
    );
}
