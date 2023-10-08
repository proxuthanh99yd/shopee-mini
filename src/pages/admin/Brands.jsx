import {
    IoAddSharp,
    IoCreateOutline,
    IoTrashBinOutline,
} from "react-icons/io5";
import Breadcrumb from "../../components/Breadcrumb";
import { useEffect, useState } from "react";
import { ModalBox, Paginate, SelectImage } from "../../components/admin";
import { useDispatch, useSelector } from "react-redux";

import { dateFormat } from "../../utils/helper";
import { createBrands, fetchBrands } from "../../features/brands/brandsSlice";
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
    const { results, isLoading, isError, status } = useSelector(
        (state) => state.brands,
    );
    const [modalCreate, setModalCreate] = useState(false);
    const [modalDelete, setModalDelete] = useState(true);
    const [input, setInput] = useState({
        name: "",
        image: [],
        imagePreview: [],
    });

    const dispatch = useDispatch();
    useEffect(() => {
        if (status === "created") {
            handleClear();
            setModalCreate(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    useEffect(() => {}, []);

    const handleCreate = () => {
        console.log(input);
        if (input?.name && input.image) {
            const formData = new FormData();
            formData.append("name", input.name);
            formData.append("image", input.image);
            dispatch(createBrands({ body: formData }));
        }
    };
    const handleDelete = (value) => {
        // dispatch(deletebrands({ id }));
    };
    const handleUpdate = (value) => {
        // dispatch(updatebrands(value));
    };
    const handleClear = () => {
        setInput({
            name: "",
            image: [],
            imagePreview: [],
        });
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
                        <div className="hidden rounded-t bg-orange-400 p-1 font-semibold md:flex">
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
                                        <button className="mr-1 inline-flex items-center gap-1 rounded bg-orange-400 px-3 py-1 text-xs text-orange-50 transition-colors hover:bg-orange-500 ">
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
            <ModalBox open={modalCreate} setOpen={setModalCreate}>
                <div className="flex gap-4">
                    <SelectImage
                        name="image"
                        imagePreviews={input?.imagePreview}
                        setImagePreviews={(image) =>
                            setInput((input) => ({
                                ...input,
                                imagePreview: [image],
                            }))
                        }
                        setImageSelected={(image) =>
                            setInput((input) => ({
                                ...input,
                                image: image,
                            }))
                        }
                        removeImage={() =>
                            setInput((input) => ({
                                ...input,
                                image: "",
                                imagePreview: [],
                            }))
                        }
                        className="h-24 w-24 text-xs"
                    />
                    <input
                        value={input.name}
                        onChange={(e) =>
                            setInput((input) => ({
                                ...input,
                                name: e.target.value,
                            }))
                        }
                        className="w-full self-center px-2 py-1"
                        type="text"
                        placeholder="Brand Name"
                    />
                </div>
                <div className="mt-4 flex justify-between">
                    <button
                        onClick={handleClear}
                        className="rounded-sm bg-orange-400 px-3 py-1 text-neutral-50"
                    >
                        Clear
                    </button>
                    <button
                        onClick={handleCreate}
                        className="rounded-sm bg-green-500 px-3 py-1 text-neutral-50"
                    >
                        Submit
                    </button>
                </div>
            </ModalBox>
            <ModalBox open={modalDelete} setOpen={setModalDelete}>
                <div className="flex gap-4">
                    <img
                        src={input.imagePreview}
                        className="h-24 w-24 text-xs"
                    />
                    <input
                        value={input.name}
                        onChange={(e) =>
                            setInput((input) => ({
                                ...input,
                                name: e.target.value,
                            }))
                        }
                        className="w-full self-center px-2 py-1"
                        type="text"
                        placeholder="Brand Name"
                    />
                </div>
                <div className="mt-4 flex justify-between">
                    <button
                        onClick={handleClear}
                        className="rounded-sm bg-blue-400 px-3 py-1 text-neutral-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCreate}
                        className="rounded-sm bg-red-500 px-3 py-1 text-neutral-50"
                    >
                        Delete
                    </button>
                </div>
            </ModalBox>
        </>
    );
}
