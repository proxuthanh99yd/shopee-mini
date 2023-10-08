import { IoBicycleOutline, IoHelpCircleOutline } from "react-icons/io5";
export default function PurchasePage() {
    return (
        <div className="bg-slate-100">
            <div className="flex justify-between bg-neutral-50 shadow-sm">
                <button className="flex-1 border-b-2 border-orange-500 px-1 py-2 text-orange-500">
                    All
                </button>
                <button className="flex-1">To Pay</button>
                <button className="flex-1">To Ship</button>
                <button className="flex-1">To Receive</button>
                <button className="flex-1">Completed</button>
                <button className="flex-1">Cancelled</button>
                <button className="flex-1">Return Refund</button>
            </div>
            {Array.from({ length: 5 }, (_, i) => {
                return (
                    <div key={i} className="mt-4">
                        <div className="flex items-center justify-end gap-2 border-b bg-neutral-50 px-6 py-2 text-teal-500">
                            <IoBicycleOutline />
                            <span className="text-sm">
                                Đơn hàng đã được giao thành công
                            </span>
                            <IoHelpCircleOutline className="text-neutral-700" />
                            <span className="text-sm text-orange-500">
                                RATED
                            </span>
                        </div>
                        <div className="flex flex-col gap-4 bg-neutral-50 px-4 py-2">
                            <div className="flex items-center gap-3 border-b border-dashed py-2">
                                <img
                                    src="../public/images/book.jpg"
                                    alt=""
                                    className="h-24 w-24 object-cover"
                                />
                                <div className="flex flex-col gap-2">
                                    <span>
                                        Sách - Oxford Advanced Learner&apos;s
                                        Dictionary Anh - Việt (bìa mềm)
                                    </span>
                                    <span className="text-sm text-neutral-500">
                                        Variation :
                                    </span>
                                    <span className="text-sm text-neutral-500">
                                        x1
                                    </span>
                                </div>
                                <div className="ml-auto">
                                    <span className="text-sm text-neutral-500 line-through">
                                        ₫435.000
                                    </span>
                                    <span className="ml-2 text-sm text-orange-600">
                                        ₫349.000
                                    </span>
                                </div>
                            </div>
                            <div className="ml-auto">
                                <span className="text-sm">Order Total:</span>
                                <span className="ml-2 text-2xl text-orange-600">
                                    ₫341.000
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
