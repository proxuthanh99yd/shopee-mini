import Breadcrumb from "../../components/Breadcrumb";
import { IoStar } from "react-icons/io5";
import { ProductSlider, SameProductSlider } from "../../components/client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { fetchSingleProduct } from "../../features/client/products/productsThunkApi";
import {
    Link,
    useNavigate,
    useOutletContext,
    useParams,
} from "react-router-dom";
import {
    addToCartCalculator,
    discountCalculator,
    maxPriceCalculator,
    minPriceCalculator,
    stockCalculator,
} from "../../utils/helper";
import {
    clearSelect,
    decrementProduct,
    incrementProduct,
    setQuantity,
    setSelected,
} from "../../features/client/carts/cartsSlice";
import { addCart, buyNowCart } from "../../features/client/carts/cartsThunkApi";
import { toast } from "react-toastify";
import parse from "html-react-parser";
import Loading from "../../components/Loading";

export default function ProductPage() {
    const navigate = useNavigate();
    const { isAuthenticated, isLogin } = useOutletContext();
    const { id } = useParams();
    const { result, isError, isLoading, sameProducts } = useSelector(
        (state) => state.products,
    );
    const {
        selected,
        addToCartForm,
        myCart,
        toastLoading,
        toastSuccess,
        toastError,
        loadingMessage,
        successMessage,
        errorMessage,
    } = useSelector((state) => state.carts);
    const dispatch = useDispatch();
    const toastId = useRef(null);
    useEffect(() => {
        dispatch(fetchSingleProduct({ id }));
        dispatch(clearSelect());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    useEffect(() => {
        localStorage.setItem("myCart", JSON.stringify(myCart));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [myCart]);
    useEffect(() => {
        for (const item of myCart) {
            if (
                item.productId == selected.productId &&
                item.classifyId == selected.classifyId
            ) {
                dispatch(
                    setSelected({
                        productId: id,
                        classifyId: item.classifyId,
                        stock: selected.stock - item.quantity,
                    }),
                );
                break;
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected.classifyId]);
    useEffect(() => {
        if (toastLoading) {
            toastId.current = toast.loading(loadingMessage);
        }
        if (toastSuccess) {
            dispatch(clearSelect());
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
    const handleSelect = (item) => {
        dispatch(
            setSelected({
                productId: id,
                classifyId: item.id,
                stock: item.stock,
            }),
        );
    };
    const handleAddToCard = () => {
        dispatch(
            addCart({
                body: {
                    productId: addToCartForm.productId,
                    classifyId: addToCartForm.classifyId,
                    quantity: addToCartForm.quantity,
                },
            }),
        );
    };
    const handleBuyNow = () => {
        dispatch(
            buyNowCart({
                body: {
                    productId: addToCartForm.productId,
                    classifyId: addToCartForm.classifyId,
                    quantity: addToCartForm.quantity,
                },
            }),
        );
        navigate("/cart");
    };
    if (isLoading) {
        return <Loading />;
    }
    if (isError) {
        return <p>isError</p>;
    }

    return (
        <>
            <div className="bg-neutral-200">
                <div className="container mx-auto p-2 xl:max-w-7xl">
                    <Breadcrumb
                        currentLink={{
                            name: `${result.name}`,
                            path: `/product/${id}`,
                        }}
                        prevLinks={[{ name: "Home", path: "/" }]}
                    />
                </div>
                <div className="container mx-auto mt-2 flex gap-10 rounded-sm bg-neutral-100 p-2 xl:max-w-7xl">
                    <div>
                        <ProductSlider images={result.thumbPreviews} />
                    </div>
                    <div className="flex flex-col justify-between pb-2">
                        <h1 className="text-xl">{result.name}</h1>
                        <div className="mt-3 flex gap-3">
                            <div className="flex items-center gap-1 text-orange-500">
                                <span className="underline">5.0</span>
                                <div className="flex">
                                    <IoStar />
                                    <IoStar />
                                    <IoStar />
                                    <IoStar />
                                    <IoStar />
                                </div>
                            </div>
                            <div className="border-l border-r px-2">
                                <span className="mr-1 underline">731</span>
                                <span className="text-neutral-500">
                                    Ratings
                                </span>
                            </div>
                            <div>
                                <span className="mr-1">2,1k</span>
                                <span className="text-neutral-500">
                                    {stockCalculator(result.classify)} Sold
                                </span>
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-5 bg-neutral-200 p-4">
                            <div className="text-xs text-neutral-500 line-through">
                                <span>
                                    $
                                    {result?.classify[0] &&
                                        minPriceCalculator(result.classify)}
                                </span>
                                -
                                <span>
                                    $
                                    {result?.classify[0] &&
                                        maxPriceCalculator(result.classify)}
                                </span>
                            </div>
                            <div className="text-lg text-orange-500 ">
                                <span>
                                    $
                                    {result?.classify[0] &&
                                        discountCalculator(
                                            minPriceCalculator(result.classify),
                                            result.discount,
                                        ).toFixed(2)}{" "}
                                </span>
                                -{" "}
                                <span>
                                    $
                                    {result?.classify[0] &&
                                        discountCalculator(
                                            maxPriceCalculator(result.classify),
                                            result.discount,
                                        ).toFixed(2)}
                                </span>
                            </div>
                            <div className="bg-orange-500 text-xs text-neutral-50">
                                <span>{result.discount}% OFF</span>
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-10">
                            <span className="text-neutral-600">
                                {result.classification.name}
                            </span>
                            <div className="flex items-center justify-center gap-2">
                                {result.classify.map((item) => {
                                    return (
                                        <button
                                            onClick={() => handleSelect(item)}
                                            key={item.id}
                                            className={`${
                                                selected.classifyId === item.id
                                                    ? "border-orange-500 text-orange-500"
                                                    : ""
                                            } rounded-sm border bg-neutral-50 px-3 py-1 shadow-sm hover:border-orange-500 hover:text-orange-500`}
                                        >
                                            {item.name}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-10">
                            <span className="text-neutral-600">Quantity</span>
                            <div>
                                <button
                                    onClick={() => dispatch(decrementProduct())}
                                    className="w-8 border bg-neutral-50"
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    value={addToCartForm.quantity}
                                    onChange={(e) =>
                                        dispatch(
                                            setQuantity({
                                                quantity: e.target.value,
                                            }),
                                        )
                                    }
                                    className="w-10 border text-center"
                                    onWheel={(e) => e.target.blur()}
                                />
                                <button
                                    onClick={() => dispatch(incrementProduct())}
                                    className="w-8 border bg-neutral-50"
                                >
                                    +
                                </button>
                                <span className="ml-4 text-sm text-neutral-600">
                                    {addToCartCalculator(
                                        selected.classifyId,
                                        selected.stock,
                                        myCart,
                                    )}
                                </span>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-5">
                            {isAuthenticated || isLogin ? (
                                <>
                                    <button
                                        onClick={handleAddToCard}
                                        disabled={
                                            Number(addToCartForm.quantity) === 0
                                                ? true
                                                : false
                                        }
                                        className="border border-orange-500 bg-orange-100 px-10 py-2 text-orange-500 hover:opacity-80"
                                    >
                                        Add To Cart
                                    </button>
                                    <button
                                        onClick={handleBuyNow}
                                        disabled={
                                            Number(addToCartForm.quantity) === 0
                                                ? true
                                                : false
                                        }
                                        className="border border-orange-500 bg-orange-500 px-10 py-2 text-neutral-50 hover:opacity-80"
                                    >
                                        Buy Now
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="border border-orange-500 bg-orange-100 px-10 py-2 text-orange-500 hover:opacity-80"
                                    >
                                        Add To Cart
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="border border-orange-500 bg-orange-500 px-10 py-2 text-neutral-50 hover:opacity-80"
                                    >
                                        Buy Now
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="container mx-auto mt-2 rounded-sm bg-neutral-100 p-2 xl:max-w-7xl">
                    <h2 className="bg-neutral-200 p-2 text-lg ">
                        Product Specifications
                    </h2>
                    <div className="flex p-2">
                        <div className="flex flex-col gap-3">
                            <span className="mr-10 text-neutral-600">
                                Brand
                            </span>
                            <span className="mr-10 text-neutral-600">
                                Discount
                            </span>
                            <span className="mr-10 text-neutral-600">
                                Other
                            </span>
                        </div>
                        <div className="flex flex-col gap-3">
                            <span>{result.brand.name}</span>
                            <span>{result.discount}%</span>
                            <span>
                                stocks {stockCalculator(result.classify)}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto mt-2 rounded-sm bg-neutral-100 p-2 xl:max-w-7xl">
                    <h2 className="bg-neutral-200 p-2 text-lg ">
                        Product Description
                    </h2>
                    <div
                        className="p-2"
                        // dangerouslySetInnerHTML={{ __html: result.description }}
                    >
                        {parse(result.description)}
                    </div>
                </div>
                <div className="container mx-auto mt-2 rounded-sm bg-neutral-100 p-2 xl:max-w-7xl">
                    {/* <h2 className="bg-neutral-200 p-2 text-lg ">
                        Product Ratings
                    </h2> */}
                    {/* <div className="p-2">
                        <div className="flex items-center gap-10 border border-orange-200 bg-orange-50 px-6 py-10">
                            <div className="text-center text-orange-500">
                                <span className="text-2xl font-semibold">
                                    4.9
                                </span>{" "}
                                out of 5
                                <span className="mt-2 flex gap-1">
                                    <IoStar />
                                    <IoStar />
                                    <IoStar />
                                    <IoStar />
                                    <IoStar />
                                </span>
                            </div>
                            <div className="flex gap-5 text-sm">
                                <button className="h-10 w-28 rounded-sm border bg-neutral-50  hover:border-orange-500 hover:text-orange-500">
                                    All
                                </button>
                                <button className="h-10 w-28 rounded-sm border bg-neutral-50 py-1 hover:border-orange-500 hover:text-orange-500">
                                    5 Star(988)
                                </button>
                                <button className="h-10 w-28 rounded-sm border bg-neutral-50 py-1 hover:border-orange-500 hover:text-orange-500">
                                    4 Star(988)
                                </button>
                                <button className="h-10 w-28 rounded-sm border bg-neutral-50 py-1 hover:border-orange-500 hover:text-orange-500">
                                    3 Star(988)
                                </button>
                                <button className="h-10 w-28 rounded-sm border bg-neutral-50 py-1 hover:border-orange-500 hover:text-orange-500">
                                    2 Star(988)
                                </button>
                                <button className="h-10 w-28 rounded-sm border bg-neutral-50 py-1 hover:border-orange-500 hover:text-orange-500">
                                    1 Star(988)
                                </button>
                                <button className="h-10 w-48 rounded-sm border bg-neutral-50 py-1 hover:border-orange-500 hover:text-orange-500">
                                    With Comments (146)
                                </button>
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="px-4">
                        {Array.from({ length: 5 }, (_, i) => {
                            return (
                                <div
                                    key={i}
                                    className="flex gap-4 border-b py-3"
                                >
                                    <div className="h-10 w-10">
                                        <img
                                            className="h-full w-full rounded-full object-cover"
                                            src="../public/images/logo.jpg"
                                            alt=""
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <span>username</span>
                                        <span className="mt-1 flex text-sm text-orange-500">
                                            <IoStar />
                                            <IoStar />
                                            <IoStar />
                                            <IoStar />
                                            <IoStar />
                                        </span>
                                        <span className="mt-1 block text-sm text-neutral-500">
                                            2023-07-01 00:19 | Variation: Deep
                                            Purple
                                        </span>
                                        <p>comment</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div> */}
                    {/* <nav
                        className="mt-3 flex justify-center"
                        aria-label="Pagination"
                    >
                        <a
                            href="#"
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Previous</span>
                            <IoChevronBack
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </a>
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
                            <IoChevronForward
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </a>
                    </nav> */}
                </div>
                <div className="container mx-auto mt-2 rounded-sm  p-2 xl:max-w-7xl">
                    <h2 className="p-2 text-lg uppercase text-neutral-600">
                        The same products
                    </h2>
                    <div className="p-2">
                        <SameProductSlider sameProducts={sameProducts} />
                    </div>
                </div>
            </div>
        </>
    );
}
