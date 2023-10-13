import {
    IoAddSharp,
    IoCreateOutline,
    IoTrashBinOutline,
} from "react-icons/io5";
import Breadcrumb from "../../components/Breadcrumb";
import { useEffect, useRef } from "react";
import { ModalBox, Paginate, SelectImage } from "../../components/admin";
import { useDispatch, useSelector } from "react-redux";

import { dateFormat } from "../../utils/helper";
import {
    clearFormInput,
    removeImage,
    setFormInput,
    setIsCreate,
    setIsDelete,
    setIsUpdate,
} from "../../features/brands/brandsSlice";
import {
    updateBrands,
    fetchBrands,
    deleteBrands,
    createBrands,
} from "../../features/brands/brandsThunkApi";
import { toast } from "react-toastify";
const currentLink = {
    name: "brands",
    path: "/admin/brands",
};

const prevLinks = [
    {
        name: "Admin",
        path: "/admin/dashboard",
    },
];

export default function Brands() {
    const {
        results,
        isLoading,
        isError,
        status,
        formInput,
        isCreate,
        isUpdate,
        isDelete,
    } = useSelector((state) => state.brands);
    const dispatch = useDispatch();
    const imageRef = useRef();
    const toastId = useRef(null);
    useEffect(() => {
        if (status === "creating") {
            toastId.current = toast.loading("Creating");
        }
        if (status === "created") {
            toast.update(toastId.current, {
                render: "Create success!",
                type: "success",
                isLoading: false,
                autoClose: 2000,
            });
            handleClear();
        }
        if (status === "deleting") {
            toastId.current = toast.loading("Deleting");
        }
        if (status === "deleted") {
            toast.update(toastId.current, {
                render: "Delete success!",
                type: "success",
                isLoading: false,
                autoClose: 2000,
            });
            handleClear();
        }
        if (status === "failed") {
            toast.update(toastId.current, {
                render: "Delete Failed!",
                type: "error",
                isLoading: false,
                autoClose: 2000,
            });
        }
        if (status === "updating") {
            toastId.current = toast.loading("Updating");
        }
        if (status === "updated") {
            toast.update(toastId.current, {
                render: "Update success!",
                type: "success",
                isLoading: false,
                autoClose: 2000,
            });
            handleClear();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    useEffect(() => {
        dispatch(fetchBrands());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = () => {
        if (isCreate) {
            if (formInput.name && imageRef.current) {
                const formData = new FormData();
                formData.append("name", formInput.name);
                formData.append("image", imageRef.current);
                dispatch(createBrands({ body: formData }));
            }
        }
        if (isUpdate) {
            if (formInput.name || imageRef.current) {
                const formData = new FormData();
                if (formInput.name) {
                    formData.append("name", formInput.name);
                }
                if (imageRef.current) {
                    formData.append("image", imageRef.current);
                }
                dispatch(
                    updateBrands({
                        id: formInput.id,
                        body: formData,
                    }),
                );
            }
        }
        if (isDelete) {
            dispatch(deleteBrands({ id: formInput.id }));
        }
        console.log("isCreate", isCreate);
        console.log("isUpdate", isUpdate);
        console.log("isDelete", isDelete);
        console.log(formInput);
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
        imageRef.current = "";
    };
    const handleRemoveImage = () => {
        dispatch(removeImage());
        imageRef.current = "";
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
                        Brands{" "}
                        <button
                            onClick={handleCreate}
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
                        <div className="hidden rounded-t bg-orange-400 p-1 font-semibold text-neutral-50 md:flex">
                            <div className="mx-1 basis-1/12">No.</div>
                            <div className="mx-1 basis-1/12">ID</div>
                            <div className="mx-1 flex-1">Name</div>
                            <div className="mx-1 basis-2/12">Updated at</div>
                            <div className="mx-1 basis-1/12">Image</div>
                            <div className="mx-1 basis-3/12 text-center">
                                Action
                            </div>
                        </div>
                        {/* table item start */}
                        {results.map((brand, index) => {
                            const { id, name, image, updated_at } = brand;
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
                                    <div className="order-1 mx-1 basis-1/12 md:order-none">
                                        <img
                                            className="max-w-xs rounded md:w-16 md:object-cover"
                                            src={image}
                                            alt=""
                                        />
                                    </div>
                                    <div className="mx-1 basis-3/12 text-center">
                                        <span className="font-semibold md:hidden">
                                            Action :{" "}
                                        </span>
                                        <button
                                            onClick={() => handleUpdate(brand)}
                                            className="mr-1 inline-flex items-center gap-1 rounded bg-orange-400 px-3 py-1 text-xs text-orange-50 transition-colors hover:bg-orange-500 "
                                        >
                                            Edit{" "}
                                            <IoCreateOutline className="text-sm" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(brand)}
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
                <Paginate total={1} />
            </div>
            <ModalBox open={isCreate} closeModal={handleClear}>
                <div className="flex gap-4">
                    <SelectImage
                        name="image"
                        imagePreviews={formInput.imagePreview}
                        setImagePreviews={(image) =>
                            dispatch(
                                setFormInput({
                                    value: image,
                                    name: "imagePreview",
                                }),
                            )
                        }
                        setImageSelected={(image) => {
                            imageRef.current = image;
                        }}
                        removeImage={handleRemoveImage}
                        className="h-24 w-24 text-xs"
                    />
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
                        placeholder="Brand Name"
                    />
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
                        Create
                    </button>
                </div>
            </ModalBox>
            <ModalBox open={isDelete} closeModal={handleClear}>
                <div className="flex gap-4">
                    <img
                        className="h-24 w-24 object-contain"
                        src={formInput.imagePreview}
                        alt=""
                    />
                    <div className="self-center p-4">
                        Are you sure delete brand ?{" "}
                        <span className="text-red-500">{formInput.name}</span>
                    </div>
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
            <ModalBox open={isUpdate} closeModal={handleClear}>
                <div className="flex gap-4">
                    <SelectImage
                        name="image"
                        imagePreviews={formInput.imagePreview}
                        setImagePreviews={(image) =>
                            dispatch(
                                setFormInput({
                                    value: image,
                                    name: "imagePreview",
                                }),
                            )
                        }
                        setImageSelected={(image) => {
                            imageRef.current = image;
                        }}
                        removeImage={handleRemoveImage}
                        className="h-24 w-24 text-xs"
                    />
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
                        placeholder="Brand Name"
                    />
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
                        Update
                    </button>
                </div>
            </ModalBox>
        </>
    );
}
