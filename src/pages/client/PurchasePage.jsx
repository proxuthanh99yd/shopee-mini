import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    cancelOrders,
    getMyOrder,
} from "../../features/client/orders/orderThunkApi";
import {
    DateFormat,
    discountCalculator,
    discountOrderTotalCalculator,
    orderStatus,
} from "../../utils/helper";
import { setFilter } from "../../features/client/orders/orderSlice";
import Loading from "../../components/Loading";
import { useRef } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
export default function PurchasePage() {
    const {
        isLoading,
        isError,
        orderItems,
        orderFilter,
        selectFilter,
        toastLoading,
        toastSuccess,
        toastError,
        loadingMessage,
        successMessage,
        errorMessage,
    } = useSelector((state) => state.orders);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMyOrder(selectFilter));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectFilter]);
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
    const handleFilter = (param) => {
        dispatch(setFilter(param));
    };
    const handleCancelOrder = (id) => {
        dispatch(cancelOrders(id));
    };
    if (isError) {
        return <p>Error</p>;
    }
    return (
        <div className="bg-slate-100">
            <div className="flex justify-between bg-neutral-50 shadow-sm">
                {orderFilter.map((item) => {
                    return (
                        <button
                            onClick={() => handleFilter(item.param)}
                            key={item.param}
                            className={`flex-1 border-b-2 px-1 py-2 ${
                                item.param === selectFilter
                                    ? "border-orange-500 text-orange-500"
                                    : ""
                            }`}
                        >
                            {item.label}
                        </button>
                    );
                })}
            </div>
            {isLoading ? (
                <Loading />
            ) : (
                orderItems.map((item) => {
                    return (
                        <div key={item.id} className="mt-4">
                            <div className="flex items-center justify-between gap-2 border-b bg-neutral-50 px-6 py-2 text-teal-500">
                                <span>{DateFormat.full(item.order_date)}</span>
                                <span className="text-right text-sm">
                                    {orderStatus(item.status)}
                                </span>
                            </div>
                            <div className="flex flex-col gap-4 bg-neutral-50 px-4 py-2">
                                {item.order_items.map((orderItem) => {
                                    return (
                                        <div
                                            key={orderItem.id}
                                            className="flex items-center gap-3 border-b border-dashed py-2"
                                        >
                                            <img
                                                src={
                                                    import.meta.env
                                                        .VITE_IMAGE_LINK +
                                                    orderItem.product.image
                                                }
                                                alt=""
                                                className="h-24 w-24 object-cover"
                                            />
                                            <div className="flex flex-col gap-2">
                                                <Link
                                                    to={`/product/${orderItem.product.id}`}
                                                >
                                                    {orderItem.product.name}
                                                </Link>
                                                <span className="text-sm text-neutral-500">
                                                    Variation :{" "}
                                                    {orderItem.classify.name}
                                                </span>
                                                <span className="text-sm text-neutral-500">
                                                    x{orderItem.quantity}
                                                </span>
                                            </div>
                                            <div className="ml-auto">
                                                <span className="text-sm text-neutral-500 line-through">
                                                    ${orderItem.price}
                                                </span>
                                                <span className="ml-2 text-sm text-orange-600">
                                                    $
                                                    {discountCalculator(
                                                        orderItem.price,
                                                        orderItem.product
                                                            .discount,
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div className="flex flex-col justify-between md:flex-row md:items-center">
                                    <div className="flex">
                                        {item.status == 0 && (
                                            <button
                                                onClick={() =>
                                                    handleCancelOrder(item.id)
                                                }
                                                className="mx-2 rounded-sm bg-orange-500 px-2 py-1 text-neutral-50 hover:bg-orange-400"
                                            >
                                                Cancel
                                            </button>
                                        )}
                                        <div className="flex items-center rounded-sm p-1 text-teal-500">
                                            Order Code: {item.id}
                                        </div>
                                    </div>
                                    <div className="self-end text-sm md:self-auto">
                                        Order Total:
                                        <span className="ml-2 text-2xl text-orange-600">
                                            $
                                            {discountOrderTotalCalculator(
                                                item.order_items,
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}
