import {
    IoAddSharp,
    IoCreateOutline,
    IoTrashBinOutline,
} from "react-icons/io5";
import Breadcrumb from "../../components/Breadcrumb";
import { useEffect, useState } from "react";
import { Paginate } from "../../components/admin";
import { useDispatch, useSelector } from "react-redux";
import {
    createCategories,
    deleteCategories,
    fetchCategories,
    updateCategories,
} from "../../features/categories/categoriesSlice";
import { dateFormat } from "../../utils/helper";
const currentLink = {
    name: "Categories",
    path: "/admin/categories",
};

const prevLinks = [
    {
        name: "Admin",
        path: "/admin/dashboard",
    },
];

const field = [
    {
        id: "test",
        type: "text",
        name: "name",
        label: "name",
        value: "",
    },
];
export default function Categories() {
    const [modalEdit, setModalEdit] = useState(() => ({
        open: false,
        data: {},
    }));
    const [openDeleteModal, setOpenDeleteModal] = useState(() => ({
        open: false,
        data: {},
    }));

    const [modalCreate, setModalCreate] = useState(false);
    const {
        isLoading,
        results,
        totalPage,
        isError,
        created,
        deleted,
        updated,
    } = useSelector((state) => state.categories);
    const dispatch = useDispatch();

    useEffect(() => {
        if (created) {
            setModalCreate(false);
        }
        if (deleted) {
            setOpenDeleteModal({ open: false, data: {} });
        }
        if (updated) {
            setModalEdit({ open: false, data: {} });
        }
    }, [created, deleted, updated]);

    useEffect(() => {
        dispatch(fetchCategories());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCreate = (value) => {
        if (value?.name) {
            dispatch(createCategories({ value }));
        }
    };
    const handleDelete = (id) => {
        dispatch(deleteCategories({ id }));
    };
    const handleUpdate = (value) => {
        dispatch(updateCategories(value));
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
                            onClick={() => setModalCreate(true)}
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
                            <div className="mx-1 basis-3/12">Action</div>
                        </div>
                        {/* table item start */}
                        {results.map((category, index) => {
                            const { id, name, updated_at } = category;
                            return (
                                <div
                                    key={id}
                                    className="my-2 rounded bg-slate-300 pb-2 pl-3 transition-colors hover:bg-slate-100 md:my-0 md:flex md:items-center md:rounded-none md:border-b md:p-1"
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
                                    <div className="mx-1 basis-3/12">
                                        <span className="font-semibold md:hidden">
                                            Action :{" "}
                                        </span>
                                        <button
                                            onClick={() =>
                                                setModalEdit({
                                                    open: true,
                                                    data: category,
                                                })
                                            }
                                            className="mr-1 inline-flex items-center gap-1 rounded bg-slate-400 px-3 py-1 text-xs text-slate-300 transition-colors hover:bg-slate-500 hover:text-slate-50"
                                        >
                                            Edit{" "}
                                            <IoCreateOutline className="text-sm" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                setOpenDeleteModal({
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
