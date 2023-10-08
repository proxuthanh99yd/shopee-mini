import Breadcrumb from "../../components/Breadcrumb";

export default function CartPage() {
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
                            <input type="checkbox" name="" id="" />
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
                    {Array.from({ length: 5 }, (_, i) => {
                        return (
                            <div
                                key={i}
                                className="mt-1 flex items-center bg-white px-10 py-4"
                            >
                                <div className="flex basis-6/12 gap-3">
                                    <input type="checkbox" name="" id="" />
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
                                <div className="basis-1/12 text-center text-neutral-500">
                                    ₫625.000
                                </div>
                                <div className="basis-2/12 text-center text-neutral-500">
                                    <div>
                                        <button className="w-8 border bg-neutral-50 p-1">
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            className="w-10 border p-1 text-center"
                                            onWheel={(e) => e.target.blur()}
                                        />
                                        <button className="w-8 border bg-neutral-50 p-1">
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="basis-1/12 text-center text-orange-500">
                                    ₫625.000
                                </div>
                                <div className="basis-2/12 text-center text-neutral-500">
                                    Delete
                                </div>
                            </div>
                        );
                    })}
                    <div className="sticky bottom-0 flex items-center bg-neutral-100 px-10 py-4">
                        <div className="flex gap-3">
                            <input type="checkbox" name="" id="" />
                            <label className="text-neutral-500" htmlFor="">
                                Select all (5)
                            </label>
                        </div>
                        <div className="ml-3 ">Delete</div>
                        <div className="ml-auto">
                            Total (5 item):
                            <span className="ml-2 text-xl text-orange-500">
                                ₫0
                            </span>
                        </div>
                        <div className="ml-4">
                            <button className="rounded-sm bg-orange-500 px-10 py-2 text-neutral-50">
                                Check Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
