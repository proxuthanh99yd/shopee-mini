import { IoArrowForwardCircle } from "react-icons/io5";
import Breadcrumb from "../../components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchDashboard } from "../../features/admin/dashboard/dashboardThunkApi";
import Loading from "../../components/Loading";
import { setFilter as setFilterOrder } from "../../features/admin/orders/orderSlice";
import { setFilter as setFilterProduct } from "../../features/admin/products/productsSlice";
const currentLink = {
    name: "Dashboard",
    path: "/admin/dashboard",
};
const prevLinks = [
    {
        name: "Admin",
        path: "/admin/dashboard",
    },
];
export default function Dashboard() {
    const navigate = useNavigate();
    const { isLoading, isError, results } = useSelector(
        (state) => state.managerDashboard,
    );
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchDashboard());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleLinkOrders = (value) => {
        dispatch(setFilterOrder(value));
        navigate("/admin/orders");
    };
    const handleLinkProducts = (value) => {
        dispatch(setFilterProduct(value));
        navigate("/admin/products");
    };
    if (isLoading) {
        return <Loading />;
    }
    if (isError) {
        return <p>ERROR!</p>;
    }
    return (
        <div className="p-1">
            <div className="mt-2 flex justify-between">
                <h2 className="text-xl">Dashboard</h2>
                <Breadcrumb currentLink={currentLink} prevLinks={prevLinks} />
            </div>
            <div className="m-4 flex flex-wrap justify-start gap-3 ">
                <button
                    onClick={() => handleLinkOrders("waiting")}
                    className="group/card  flex-1  cursor-pointer rounded bg-white text-orange-400"
                >
                    <div className="flex justify-between p-3">
                        <div className="flex flex-col">
                            <span className="text-4xl font-bold">
                                {results.waitOrder}
                            </span>
                            <span className="text-md whitespace-nowrap capitalize">
                                Waiting order
                            </span>
                        </div>
                        <div className="overflow-visible">
                            {/* <IoBagAddOutline className="text-6xl transition-transform group-hover/card:scale-125" /> */}
                        </div>
                    </div>
                    <div className="border-t-2 border-orange-300">
                        <p className=" text-md flex items-center justify-center whitespace-nowrap font-semibold capitalize text-orange-300 hover:text-orange-500">
                            more info <IoArrowForwardCircle />
                        </p>
                    </div>
                </button>
                <button
                    onClick={() => handleLinkOrders("shipping")}
                    className="group/card  flex-1  cursor-pointer rounded bg-white text-orange-400"
                >
                    <div className="flex justify-between p-3">
                        <div className="flex flex-col">
                            <span className="text-4xl font-bold">
                                {results.shippingOrder}
                            </span>
                            <span className="text-md whitespace-nowrap capitalize">
                                Shipping order
                            </span>
                        </div>
                        <div className="overflow-visible">
                            {/* <IoBagAddOutline className="text-6xl transition-transform group-hover/card:scale-125" /> */}
                        </div>
                    </div>
                    <div className="border-t-2 border-orange-300">
                        <p className=" text-md flex items-center justify-center whitespace-nowrap font-semibold capitalize text-orange-300 hover:text-orange-500">
                            more info <IoArrowForwardCircle />
                        </p>
                    </div>
                </button>
                <button
                    onClick={() => handleLinkOrders("completed")}
                    className="group/card  flex-1  cursor-pointer rounded bg-white text-orange-400"
                >
                    <div className="flex justify-between p-3">
                        <div className="flex flex-col">
                            <span className="text-4xl font-bold">
                                {results.completed}
                            </span>
                            <span className="text-md whitespace-nowrap capitalize">
                                Completed order
                            </span>
                        </div>
                        <div className="overflow-visible">
                            {/* <IoBagAddOutline className="text-6xl transition-transform group-hover/card:scale-125" /> */}
                        </div>
                    </div>
                    <div className="border-t-2 border-orange-300">
                        <p className=" text-md flex items-center justify-center whitespace-nowrap font-semibold capitalize text-orange-300 hover:text-orange-500">
                            more info <IoArrowForwardCircle />
                        </p>
                    </div>
                </button>
                <button
                    onClick={() => handleLinkOrders("cancelled")}
                    className="group/card  flex-1  cursor-pointer rounded bg-white text-orange-400"
                >
                    <div className="flex justify-between p-3">
                        <div className="flex flex-col">
                            <span className="text-4xl font-bold">
                                {results.cancelOrder}
                            </span>
                            <span className="text-md whitespace-nowrap capitalize">
                                Cancelled order
                            </span>
                        </div>
                        <div className="overflow-visible">
                            {/* <IoBagAddOutline className="text-6xl transition-transform group-hover/card:scale-125" /> */}
                        </div>
                    </div>
                    <div className="border-t-2 border-orange-300">
                        <p className=" text-md flex items-center justify-center whitespace-nowrap font-semibold capitalize text-orange-300 hover:text-orange-500">
                            more info <IoArrowForwardCircle />
                        </p>
                    </div>
                </button>
                <button
                    onClick={() => handleLinkProducts("active")}
                    className="group/card  flex-1  cursor-pointer rounded bg-white text-orange-400"
                >
                    <div className="flex justify-between p-3">
                        <div className="flex flex-col">
                            <span className="text-4xl font-bold">
                                {results.activeProduct}
                            </span>
                            <span className="text-md whitespace-nowrap capitalize">
                                Active Product
                            </span>
                        </div>
                        <div className="overflow-visible">
                            {/* <IoBagAddOutline className="text-6xl transition-transform group-hover/card:scale-125" /> */}
                        </div>
                    </div>
                    <div className="border-t-2 border-orange-300">
                        <p className=" text-md flex items-center justify-center whitespace-nowrap font-semibold capitalize text-orange-300 hover:text-orange-500">
                            more info <IoArrowForwardCircle />
                        </p>
                    </div>
                </button>
                <button
                    onClick={() => handleLinkProducts("hidden")}
                    className="group/card  flex-1  cursor-pointer rounded bg-white text-orange-400"
                >
                    <div className="flex justify-between p-3">
                        <div className="flex flex-col">
                            <span className="text-4xl font-bold">
                                {results.blockProduct}
                            </span>
                            <span className="text-md whitespace-nowrap capitalize">
                                Hidden Product
                            </span>
                        </div>
                        <div className="overflow-visible">
                            {/* <IoBagAddOutline className="text-6xl transition-transform group-hover/card:scale-125" /> */}
                        </div>
                    </div>
                    <div className="border-t-2 border-orange-300">
                        <p className=" text-md flex items-center justify-center whitespace-nowrap font-semibold capitalize text-orange-300 hover:text-orange-500">
                            more info <IoArrowForwardCircle />
                        </p>
                    </div>
                </button>
                <button
                    onClick={() => handleLinkProducts("out_of_stock")}
                    className="group/card  flex-1  cursor-pointer rounded bg-white text-orange-400"
                >
                    <div className="flex justify-between p-3">
                        <div className="flex flex-col">
                            <span className="text-4xl font-bold">
                                {results.outOfStockProduct}
                            </span>
                            <span className="text-md whitespace-nowrap capitalize">
                                Out of Stock
                            </span>
                        </div>
                        <div className="overflow-visible">
                            {/* <IoBagAddOutline className="text-6xl transition-transform group-hover/card:scale-125" /> */}
                        </div>
                    </div>
                    <div className="border-t-2 border-orange-300">
                        <p className=" text-md flex items-center justify-center whitespace-nowrap font-semibold capitalize text-orange-300 hover:text-orange-500">
                            more info <IoArrowForwardCircle />
                        </p>
                    </div>
                </button>
            </div>
        </div>
    );
}
