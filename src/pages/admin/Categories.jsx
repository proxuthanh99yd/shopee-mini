import {
    IoAddSharp,
    IoCreateOutline,
    IoSearch,
    IoTrashBinOutline,
} from "react-icons/io5";
import Breadcrumb from "../../components/Breadcrumb";
import { useEffect, useRef } from "react";
import { ModalBox } from "../../components/admin";
import Paginate from "../../components/Paginate";
import { useDispatch, useSelector } from "react-redux";
import {
    clearFormInput,
    setCurrentPage,
    setFormInput,
    setIsCreate,
    setIsDelete,
    setIsUpdate,
} from "../../features/admin/categories/categoriesSlice";
import {
    createCategories,
    deleteCategories,
    fetchCategories,
    updateCategories,
} from "../../features/admin/categories/categoriesThunkApi";
import { dateFormat } from "../../utils/helper";
import { toast } from "react-toastify";
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
export default function Categories() {
    const {
        currentPage,
        totalPage,
        results,
        isLoading,
        isError,
        formInput,
        isCreate,
        isUpdate,
        isDelete,
        toastLoading,
        toastSuccess,
        toastError,
        loadingMessage,
        successMessage,
        errorMessage,
    } = useSelector((state) => state.managerCategories);
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
            handleClear();
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
        dispatch(fetchCategories({ page: currentPage }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const handleSubmit = () => {
        if (isCreate) {
            if (formInput.name) {
                const formData = new FormData();
                formData.append("name", formInput.name);
                dispatch(createCategories({ body: formData }));
            }
        }
        if (isUpdate) {
            if (formInput.name) {
                dispatch(
                    updateCategories({
                        id: formInput.id,
                        body: {
                            name: formInput.name,
                        },
                    }),
                );
            }
        }
        if (isDelete) {
            dispatch(deleteCategories({ id: formInput.id }));
        }
    };
    const handleCreate = () => {
        dispatch(setIsCreate());
    };
    const handleUpdate = (value) => {
        dispatch(setIsUpdate(value));
    };
    const handleDelete = (value) => {
        dispatch(setIsDelete(value));
    };
    const handleClear = () => {
        dispatch(clearFormInput());
    };
    const handlePageClick = ({ selected }) => {
        dispatch(setCurrentPage({ currentPage: selected + 1 }));
    };
    // if (isLoading) {
    //     return <Loading />;
    // }
    if (isError) {
        return <p>Error ...</p>;
    }
    return (
        <>
            <div className="p-1">
                <div className="mt-2 flex justify-between gap-4">
                    <h2 className="flex items-center gap-2 text-xl">
                        Categories{" "}
                        <button
                            onClick={handleCreate}
                            className="block rounded-sm bg-green-500 text-2xl text-green-50 transition-colors hover:bg-green-700"
                        >
                            <IoAddSharp />
                        </button>
                    </h2>
                    <form
                        className="relative flex-1"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            // value={searchParam}
                            // onChange={(e) =>
                            //     dispatch(
                            //         setSearchParam({
                            //             searchParam: e.target.value,
                            //         }),
                            //     )
                            // }
                            type="search"
                            className="w-full rounded-sm px-3 py-1 focus:outline-none"
                        />
                        <button
                            // onClick={handleSearch}
                            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-sm bg-orange-400 px-8 py-1.5 text-neutral-50 "
                        >
                            <IoSearch />
                        </button>
                    </form>
                    <Breadcrumb
                        currentLink={currentLink}
                        prevLinks={prevLinks}
                    />
                </div>
                <div className="mt-4">
                    <div>
                        <div className="hidden rounded-t bg-orange-400 p-1 font-semibold text-neutral-50 md:flex">
                            <div className="mx-1 basis-1/12">No.</div>
                            <div className="mx-1 basis-1/12">ID</div>
                            <div className="mx-1 flex-1">Name</div>
                            <div className="mx-1 basis-2/12">Updated at</div>
                            <div className="mx-1 basis-3/12 text-center">
                                Action
                            </div>
                        </div>
                        {isLoading &&
                            Array.from({ length: 10 }, (_, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="my-2 flex flex-col rounded bg-orange-50 pb-2 pl-3 transition-colors hover:bg-orange-100 md:my-0 md:flex-row md:items-center md:rounded-none md:border-b md:p-1"
                                    >
                                        <div className="skeleton mx-1 basis-1/12"></div>
                                        <div className="skeleton mx-1 basis-1/12"></div>
                                        <div className="skeleton mx-1 flex-1"></div>
                                        <div className="skeleton mx-1 basis-2/12 text-center"></div>
                                        <div className="skeleton mx-1 basis-3/12 text-center"></div>
                                    </div>
                                );
                            })}
                        {/* table item start */}
                        {!isLoading &&
                            results.map((category, index) => {
                                const { id, name, updated_at } = category;
                                return (
                                    <div
                                        key={id}
                                        className="my-2 rounded bg-orange-50 pb-2 pl-3 transition-colors hover:bg-orange-100 md:my-0 md:flex md:items-center md:rounded-none md:border-b md:p-1"
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
                                        <div className="mx-1 basis-3/12 text-center">
                                            <span className="font-semibold md:hidden">
                                                Action :{" "}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    handleUpdate(category)
                                                }
                                                className="mr-1 inline-flex items-center gap-1 rounded bg-orange-400 px-3 py-1 text-xs text-orange-50 transition-colors hover:bg-orange-500 "
                                            >
                                                Edit{" "}
                                                <IoCreateOutline className="text-sm" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(category)
                                                }
                                                className="inline-flex items-center gap-1 rounded bg-red-400 px-3 py-1 text-xs text-red-50 transition-colors hover:bg-red-500 "
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
                <Paginate
                    handlePageClick={handlePageClick}
                    pageCount={totalPage}
                    currentPage={currentPage}
                />
            </div>
            <ModalBox size="w-96" open={isCreate} closeModal={handleClear}>
                <h3 className="mb-4 text-xl">Create category</h3>
                <input
                    value={formInput.name}
                    onChange={(e) =>
                        dispatch(
                            setFormInput({
                                value: e.target.value,
                                name: "name",
                            }),
                        )
                    }
                    className="w-full self-center px-2 py-1"
                    type="text"
                    placeholder="Category Name"
                />
                <div className="mt-4 flex justify-around">
                    <button
                        onClick={handleClear}
                        className="rounded-sm bg-orange-400 px-3 py-1 text-neutral-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="rounded-sm bg-green-500 px-3 py-1 text-neutral-50"
                    >
                        Create
                    </button>
                </div>
            </ModalBox>
            <ModalBox size="w-96" open={isUpdate} closeModal={handleClear}>
                <h3 className="mb-4 text-xl">Update category</h3>
                <input
                    value={formInput.name}
                    onChange={(e) =>
                        dispatch(
                            setFormInput({
                                value: e.target.value,
                                name: "name",
                            }),
                        )
                    }
                    className="w-full self-center px-2 py-1"
                    type="text"
                    placeholder="Category Name"
                />
                <div className="mt-4 flex justify-around">
                    <button
                        onClick={handleClear}
                        className="rounded-sm bg-orange-400 px-3 py-1 text-neutral-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="rounded-sm bg-green-500 px-3 py-1 text-neutral-50"
                    >
                        Update
                    </button>
                </div>
            </ModalBox>
            <ModalBox size="w-96" open={isDelete} closeModal={handleClear}>
                <h3 className="mb-4 text-xl">Delete category</h3>
                <div>
                    Are you sure delete category ?{" "}
                    <span className="text-red-500">{formInput.name}</span>
                </div>
                <div className="mt-4 flex justify-around">
                    <button
                        onClick={handleClear}
                        className="rounded-sm bg-orange-400 px-3 py-1 text-neutral-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="rounded-sm bg-green-500 px-3 py-1 text-neutral-50"
                    >
                        Delete
                    </button>
                </div>
            </ModalBox>
        </>
    );
}
