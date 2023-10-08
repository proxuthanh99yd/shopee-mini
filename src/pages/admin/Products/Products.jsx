import { useEffect, useState } from "react";
import { Paginate } from "../../../components/admin";
import {
    IoAddSharp,
    IoCreateOutline,
    IoTrashBinOutline,
} from "react-icons/io5";
import { dateFormat } from "../../../utils/helper";
import Breadcrumb from "../../../components/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import {
    createProducts,
    deleteProducts,
    fetchProducts,
} from "../../../features/products/productsSlice";
import { Link } from "react-router-dom";
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
    const [modal, setModal] = useState(() => ({
        type: "",
        open: false,
        data: {},
    }));

    const {
        isLoading,
        results,
        totalPage,
        isError,
        created,
        deleted,
        updated,
    } = useSelector((state) => state.products);

    const dispatch = useDispatch();

    useEffect(() => {
        if (created || deleted || updated) {
            setModal({ type: "", open: false, data: {} });
        }
    }, [created, deleted, updated]);

    useEffect(() => {
        dispatch(fetchProducts());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCreate = (value) => {
        if (value.name && value.image && value.category_id) {
            dispatch(createProducts({ value }));
        }
    };
    const handleDelete = (id) => {
        dispatch(deleteProducts({ id }));
    };
    const handleUpdate = (value) => {
        console.log("update");
        // dispatch(updateCategories(value));
    };
    if (isLoading) {
        return <p>Loading ...</p>;
    }
    if (isError) {
        return <p>Error ...</p>;
    }
    return (
        <>
            <div className="p-1">
                <div className="flex justify-between">
                    <h2 className="flex items-center gap-2 text-xl">
                        Categories{" "}
                        <button
                            onClick={() =>
                                setModal({
                                    data: {},
                                    open: true,
                                    type: "create",
                                })
                            }
                            className="block rounded-sm bg-green-500 text-2xl text-green-50 transition-colors hover:bg-green-700"
                        >
                            <IoAddSharp />
                        </button>
                    </h2>
                    <Breadcrumb
                        currentLink={currentLink}
                        prevLinks={prevLinks}
                    />
                </div>
                <div className="mt-4">
                    <div>
                        <div className="hidden rounded-t bg-slate-400 p-1 font-semibold md:flex">
                            <div className="mx-1 basis-1/12">No.</div>
                            <div className="mx-1 basis-1/12">ID</div>
                            <div className="mx-1 flex-1">Name</div>
                            <div className="mx-1 basis-2/12">Updated at</div>
                            <div className="mx-1 basis-1/12">Image</div>
                            <div className="mx-1 basis-3/12">Action</div>
                        </div>
                        {/* table item start */}
                        {results.map((category, index) => {
                            const { id, name, updated_at, image } = category;
                            return (
                                <div
                                    key={id}
                                    className="my-2 flex flex-col rounded bg-slate-300 pb-2 pl-3 transition-colors hover:bg-slate-100 md:my-0 md:flex-row md:items-center md:rounded-none md:border-b md:p-1"
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
                                    <div className="mx-1 my-2 basis-3/12 md:my-0 ">
                                        <span className="font-semibold md:hidden">
                                            Action :{" "}
                                        </span>
                                        <Link
                                            to={`${id}/edit`}
                                            className="mr-1 inline-flex items-center gap-1 rounded bg-slate-400 px-3 py-1 text-xs text-slate-300 transition-colors hover:bg-slate-500 hover:text-slate-50"
                                        >
                                            Edit
                                            <IoCreateOutline className="text-sm" />
                                        </Link>
                                        <button
                                            onClick={() =>
                                                setModal({
                                                    type: "delete",
                                                    open: true,
                                                    data: category,
                                                })
                                            }
                                            className="inline-flex items-center gap-1 rounded bg-red-400 px-3 py-1 text-xs text-red-300 transition-colors hover:bg-red-500 hover:text-red-50"
                                        >
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
                <Paginate total={totalPage} />
            </div>
        </>
    );
}
