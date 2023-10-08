import { IoLocationSharp } from "react-icons/io5";
import Breadcrumb from "../../components/Breadcrumb";

export default function CheckoutPage() {
    return (
        <>
            <div className="bg-neutral-200 pb-12 pt-2">
                <div className="container mx-auto p-2 xl:max-w-7xl">
                    <Breadcrumb
                        currentLink={{
                            name: "Checkout",
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
                    <div className="h-1 w-full bg-gradient"></div>
                    <div className=" bg-neutral-100 px-10 pb-6 pt-4">
                        <div className="flex items-center text-xl text-orange-500">
                            <IoLocationSharp /> Delivery Address
                        </div>
                        <div className="mt-2 flex justify-between">
                            <div className="">
                                <span className="mr-5 font-semibold">
                                    Lê Minh Tâm (+84) 326777247
                                </span>
                                Tạp hoá Cúc Bắc - 24 Đ516C Thung Thôn, Xã Định
                                Hòa, Huyện Yên Định, Thanh Hóa
                            </div>
                            <div className="text-blue-600">Change</div>
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
                    {Array.from({ length: 5 }, (_, i) => {
                        return (
                            <div
                                key={i}
                                className="mt-1 flex items-center bg-white px-10 py-4"
                            >
                                <div className="flex basis-6/12 gap-3">
                                    <div className="flex items-center">
                                        <img
                                            className="h-20 w-20 object-cover"
                                            src="../public/images/book.jpg"
                                            alt=""
                                        />
                                        <p className="line-clamp-2 w-80">
                                            Sách - Oxford Advanced
                                            Learner&apos;s Dictionary Anh - Việt
                                            (bìa mềm)
                                        </p>
                                    </div>
                                </div>
                                <div className="basis-2/12 text-center text-neutral-500">
                                    ₫625.000
                                </div>
                                <div className="basis-2/12 text-center text-neutral-500">
                                    1
                                </div>
                                <div className="basis-2/12 text-center text-orange-500">
                                    ₫625.000
                                </div>
                            </div>
                        );
                    })}
                    <div className="flex items-center justify-end bg-slate-100 px-10 py-4">
                        <span className="basis-2/12 text-end text-base text-neutral-500">
                            Shipping:
                        </span>
                        <p className=" basis-2/12 text-center text-xl text-orange-600">
                            ₫64.200
                        </p>
                    </div>
                    <div className="flex items-center justify-end bg-slate-100 px-10 py-4 text-end">
                        <span className="basis-2/12 text-base text-neutral-500">
                            Order Total (5 item):
                        </span>
                        <p className=" basis-2/12 text-center text-xl text-orange-600">
                            ₫689.200
                        </p>
                    </div>
                    <div className="mt-3 flex gap-3 bg-neutral-50 p-5 text-neutral-500">
                        <h2 className="mr-10 text-lg text-neutral-700">
                            Payment Method
                        </h2>
                        <button className="border px-3 py-1.5  shadow-sm hover:border-orange-500 hover:text-orange-500">
                            ShopeePay
                        </button>
                        <button className="border px-3 py-1.5  shadow-sm hover:border-orange-500 hover:text-orange-500">
                            Apple Pay
                        </button>
                        <button className="border px-3 py-1.5  shadow-sm hover:border-orange-500 hover:text-orange-500">
                            Credit Card
                        </button>
                        <button className="border border-orange-500  px-3 py-1.5 text-orange-500 shadow-sm ">
                            Cash on Delivery
                        </button>
                        <button className="border px-3 py-1.5  shadow-sm hover:border-orange-500 hover:text-orange-500">
                            Bank Transfer
                        </button>
                    </div>

                    <div className="mt-0.5 flex gap-3 bg-neutral-50 p-5 text-neutral-500">
                        <h3 className="mr-16 text-neutral-700">
                            Cash on Delivery
                        </h3>
                        <p>
                            You will be charged extra ₫0 for this payment
                            method.
                        </p>
                    </div>
                    <div className="mt-0.5  bg-neutral-50 p-5 ">
                        <div className="flex items-center justify-end  px-10 py-4 text-end">
                            <span className="basis-2/12 text-left text-base ">
                                Merchandise Subtotal:
                            </span>
                            <span className=" basis-1/12 text-left text-sm text-neutral-500">
                                ₫625.000
                            </span>
                        </div>
                        <div className="flex items-center justify-end  px-10 py-4 text-end">
                            <span className="basis-2/12 text-left text-base ">
                                Shipping Total:
                            </span>
                            <span className=" basis-1/12 text-left text-sm text-neutral-500">
                                ₫64.200
                            </span>
                        </div>
                        <div className="flex items-center justify-end  px-10 py-4 text-end">
                            <span className="basis-2/12 text-left text-base ">
                                Total Payment:
                            </span>
                            <span className=" basis-1/12 text-left text-2xl text-orange-600">
                                ₫689.200
                            </span>
                        </div>
                        <div className="flex items-center justify-end  border-t-2 border-dashed px-10 pt-4 text-end">
                            <button className="rounded-sm bg-orange-600 px-10 py-2 text-neutral-50">
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
