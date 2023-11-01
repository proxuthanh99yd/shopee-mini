import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
    changeStatusOrders,
    fetchSingleOrder,
} from "../../features/admin/orders/orderThunkApi";
import Breadcrumb from "../../components/Breadcrumb";
import { IoLocationSharp } from "react-icons/io5";
import {
    checkoutTotalCalculator,
    discountCalculator,
} from "../../utils/helper";
import Loading from "../../components/Loading";

const prevLinks = [
    {
        name: "Admin",
        path: "/admin/dashboard",
    },
    {
        name: "Orders",
        path: "/admin/orders",
    },
];
export default function OrderDetail() {
    const { id } = useParams();
    const currentLink = {
        name: "Detail",
        path: `/admin/orders/${id}`,
    };
    const {
        result,
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
        dispatch(fetchSingleOrder(id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleChangeStatus = () => {
        dispatch(changeStatusOrders({ id, value: 1 }));
    };
    if (isLoading) {
        return <Loading />;
    }
    if (isError) {
        return <p>Error ...</p>;
    }
    return (
        <div className="p-1">
            <div className="flex justify-between">
                <h2 className="flex items-center gap-2 text-xl">
                    Orders Detail{" "}
                </h2>
                <Breadcrumb currentLink={currentLink} prevLinks={prevLinks} />
            </div>
            <div className="mt-4">
                <div className="h-1 w-full bg-gradient"></div>
                <div className=" bg-neutral-100 px-10 pb-6 pt-4">
                    <div className="flex items-center text-xl text-orange-500">
                        <IoLocationSharp /> Delivery Address
                    </div>
                    <div className="mt-2 flex justify-between">
                        <div className="flex flex-col">
                            {result.user && (
                                <>
                                    <span>Name: {result.user.name}</span>
                                    <span>Phone: {result.user.phone}</span>
                                    <span>Address: {result.user.address}</span>
                                </>
                            )}
                        </div>
                        {/* <div className="text-blue-600">Change</div> */}
                    </div>
                </div>
                <div className="mt-2 flex bg-neutral-50 px-10 py-4">
                    <div className="flex basis-6/12 gap-3 text-xl text-neutral-500">
                        Products Ordered
                    </div>
                    <div className="basis-2/12 text-center text-neutral-500">
                        Unit Price
                    </div>
                    <div className="basis-2/12 text-center text-neutral-500">
                        Amount
                    </div>
                    <div className="basis-2/12 text-center text-neutral-500">
                        Item Subtotal
                    </div>
                </div>
                {result.order_items &&
                    result.order_items.map((item) => {
                        return (
                            <div
                                key={item.id}
                                className="mt-1 flex items-center bg-white px-10 py-4"
                            >
                                <div className="flex basis-6/12 gap-3">
                                    <div className="flex items-center gap-4">
                                        <img
                                            className="h-20 w-20 object-cover"
                                            src={
                                                import.meta.env
                                                    .VITE_IMAGE_LINK +
                                                item.product.image
                                            }
                                            alt=""
                                        />
                                        <p className="line-clamp-2 w-80">
                                            {item.product.name}
                                            <span className="text-neutral-500">
                                                ( {item.classify.name})
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div className="basis-2/12 text-center text-neutral-500">
                                    $
                                    {discountCalculator(
                                        item.classify.price,
                                        item.product.discount,
                                    ).toFixed(2)}
                                </div>
                                <div className="basis-2/12 text-center text-neutral-500">
                                    {item.quantity}
                                </div>
                                <div className="basis-2/12 text-center text-orange-500">
                                    $
                                    {(
                                        discountCalculator(
                                            item.classify.price,
                                            item.product.discount,
                                        ) * item.quantity
                                    ).toFixed(2)}
                                </div>
                            </div>
                        );
                    })}
                <div className="flex items-center justify-end bg-orange-50 px-10 py-4">
                    <span className="basis-2/12 text-end text-base text-neutral-500">
                        Shipping:
                    </span>
                    <p className=" basis-2/12 text-center text-lg text-orange-600">
                        $0
                    </p>
                </div>
                <div className="flex items-center justify-end bg-orange-50 px-10 py-4 text-end">
                    <span className="basis-2/12 text-base text-neutral-500">
                        Order Total (
                        {result.order_items && result.order_items.length} item):
                    </span>
                    <p className=" basis-2/12 text-center text-xl text-orange-600">
                        $
                        {result.order_items &&
                            checkoutTotalCalculator(result.order_items)}
                    </p>
                </div>
                <div className="flex items-center justify-end  border-t-2 border-dashed px-10 pt-4 text-end">
                    <button
                        disabled={!result.status != 1}
                        onClick={handleChangeStatus}
                        className="rounded-sm bg-orange-600 px-10 py-2 text-neutral-50 disabled:bg-orange-400"
                    >
                        Change to Shipping
                    </button>
                </div>
            </div>
        </div>
    );
}
