import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../../components/Breadcrumb";
import {
    changeQuantity,
    decrementCart,
    incrementCart,
    selectAllCartCheckout,
    selectSingleCartCheckout,
} from "../../features/client/carts/cartsSlice";
import {
    deleteCart,
    updateCart,
} from "../../features/client/carts/cartsThunkApi";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";
import { toast } from "react-toastify";
import { setCheckoutItem } from "../../features/client/orders/orderSlice";
import { discountCalculator } from "../../utils/helper";

export default function CartPage() {
    const {
        myCart,
        toastLoading,
        toastSuccess,
        toastError,
        loadingMessage,
        successMessage,
        errorMessage,
    } = useSelector((state) => state.carts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
    const handleChangeQuantity = (value) => {
        dispatch(changeQuantity(value));
    };
    const handleIncrement = (id) => {
        dispatch(incrementCart({ id }));
    };
    const handleDecrement = (id) => {
        dispatch(decrementCart({ id }));
    };
    const handleUpdateCart = (value) => {
        dispatch(
            updateCart({
                id: value.id,
                body: {
                    quantity: value.quantity,
                },
            }),
        );
    };
    const handleDeleteCart = (id) => {
        dispatch(deleteCart({ id }));
    };
    const handleCheckout = () => {
        dispatch(setCheckoutItem(myCart.filter((i) => i.checked)));
        navigate("/checkout");
    };
    return (
        <>
            <div className="bg-neutral-200 py-2">
                <div className="container mx-auto p-2 xl:max-w-7xl">
                    <Breadcrumb
                        currentLink={{
                            name: "Cart",
                            link: "checkout",
                        }}
                        prevLinks={[
                            {
                                name: "Home",
                                link: "/",
                            },
                        ]}
                    />
                </div>
                <div className="container mx-auto p-2 xl:max-w-7xl">
                    <div className="flex bg-neutral-100 px-10 py-4">
                        <div className="flex basis-6/12 gap-3">
                            <input
                                defaultChecked={false}
                                checked={
                                    myCart.find(
                                        (cart) => cart.checked === false,
                                    )
                                        ? false
                                        : true
                                }
                                onChange={(e) =>
                                    dispatch(
                                        selectAllCartCheckout({
                                            checked: e.target.checked,
                                        }),
                                    )
                                }
                                type="checkbox"
                                name=""
                                id=""
                            />
                            <label className="text-neutral-500" htmlFor="">
                                Product
                            </label>
                        </div>
                        <div className="basis-1/12 text-center text-neutral-500">
                            Unit Price
                        </div>
                        <div className="basis-2/12 text-center text-neutral-500">
                            Quantity
                        </div>
                        <div className="basis-1/12 text-center text-neutral-500">
                            Total Price
                        </div>
                        <div className="basis-2/12 text-center text-neutral-500">
                            Actions
                        </div>
                    </div>
                    {myCart.map((cart) => {
                        return (
                            <div
                                key={cart.id}
                                className="mt-1 flex items-center bg-white px-10 py-4"
                            >
                                <div className="flex basis-6/12 gap-3">
                                    <input
                                        type="checkbox"
                                        checked={cart.checked}
                                        onChange={() =>
                                            dispatch(
                                                selectSingleCartCheckout({
                                                    id: cart.id,
                                                }),
                                            )
                                        }
                                        name=""
                                        id=""
                                    />
                                    <div className="flex items-center gap-4">
                                        <img
                                            className="h-20 w-20 object-cover"
                                            src={
                                                import.meta.env
                                                    .VITE_IMAGE_LINK +
                                                cart.product.image
                                            }
                                            alt=""
                                        />
                                        <Link
                                            to={`/product/${cart.product.id}`}
                                            className="flex w-80 flex-col"
                                        >
                                            <span className="line-clamp-2 flex-1">
                                                {cart.product.name}
                                            </span>
                                            <span className="self-start rounded-sm border p-0.5 text-xs">
                                                {cart.classify.name}
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="basis-1/12 text-center text-neutral-500">
                                    $
                                    {discountCalculator(
                                        cart.classify.price,
                                        cart.product.discount,
                                    )}
                                </div>
                                <div className="basis-2/12 text-center text-neutral-500">
                                    <div>
                                        <button
                                            onClick={() =>
                                                handleDecrement(cart.id)
                                            }
                                            className="w-8 border bg-neutral-50 p-1"
                                        >
                                            -
                                        </button>
                                        <input
                                            onChange={(e) =>
                                                handleChangeQuantity({
                                                    id: cart.id,
                                                    quantity: e.target.value,
                                                })
                                            }
                                            value={cart.quantity}
                                            type="number"
                                            className="w-10 border p-1 text-center"
                                            onWheel={(e) => e.target.blur()}
                                        />
                                        <button
                                            onClick={() =>
                                                handleIncrement(cart.id)
                                            }
                                            className="w-8 border bg-neutral-50 p-1"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="basis-1/12 text-center text-orange-500">
                                    $
                                    {(
                                        cart.quantity *
                                        discountCalculator(
                                            cart.classify.price,
                                            cart.product.discount,
                                        )
                                    ).toFixed(2)}
                                </div>
                                <div className="flex basis-2/12 flex-col text-center text-neutral-500">
                                    <button
                                        onClick={() =>
                                            handleUpdateCart({
                                                id: cart.id,
                                                quantity: cart.quantity,
                                            })
                                        }
                                        className="p-0.5 text-blue-300 hover:text-blue-500"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDeleteCart(cart.id)
                                        }
                                        className="p-0.5 text-orange-300 hover:text-orange-500"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                    <div className="sticky bottom-0 flex items-center bg-neutral-100 px-10 py-4">
                        <div className="ml-auto font-semibold">
                            Total (
                            {
                                myCart.filter((cart) => cart.checked === true)
                                    .length
                            }{" "}
                            item):
                            <span className="ml-2 text-xl text-orange-500">
                                $
                                {myCart
                                    .reduce((prev, curr) => {
                                        if (curr.checked === true) {
                                            return (
                                                prev +
                                                curr.quantity *
                                                    discountCalculator(
                                                        curr.classify.price,
                                                        curr.product.discount,
                                                    )
                                            );
                                        }
                                        return prev;
                                    }, 0)
                                    .toFixed(2)}
                            </span>
                        </div>
                        <div className="ml-4">
                            <button
                                disabled={
                                    myCart.filter(
                                        (cart) => cart.checked === true,
                                    ).length === 0
                                }
                                onClick={handleCheckout}
                                className="rounded-sm bg-orange-500 px-10 py-2 text-neutral-50 disabled:bg-orange-300"
                            >
                                Check Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
