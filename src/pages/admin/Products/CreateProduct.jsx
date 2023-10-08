import { useEffect, useRef } from "react";
import { SelectImage } from "../../../components/admin";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../features/categories/categoriesSlice";
import { fetchBrands } from "../../../features/brands/brandsSlice";
import {
    createProducts,
    handleInput,
    removeClassify,
    removeImagePreview,
    removeThumbPreview,
    setImagePreview,
    setNewClassify,
    setThumbPreview,
} from "../../../features/products/productsSlice";

export default function CreateProduct() {
    const { create: product } = useSelector((state) => state.products);
    const { results: categories } = useSelector((state) => state.categories);
    const { results: brands } = useSelector((state) => state.brands);
    const dispatch = useDispatch();
    const imageRef = useRef({});
    const thumbRef = useRef([]);
    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchBrands());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (product?.image) {
            imageRef.current = product.image;
        }
        if (product?.thumbnails) {
            thumbRef.current = product.thumbnails;
        }
    }, [product.image, product.thumbnails]);

    const handleCreate = () => {
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("discount", product.discount);
        formData.append("description", product.description);
        formData.append("active", product.active);
        formData.append("category_id", product.category_id);
        formData.append("brand_id", product.brand_id);
        formData.append("image", imageRef.current);
        thumbRef.current.forEach((e, i) => {
            formData.append(`thumbnail[${i + 1}]`, e);
        });
        formData.append("variation_name", product.classification.name);
        product.classify.forEach((e, i) => {
            formData.append(`variation[${i + 1}]`, e.name);
            formData.append(`price[${i + 1}]`, e.price);
            formData.append(`stock[${i + 1}]`, e.stock);
        });
        dispatch(createProducts(formData));
    };

    const handleImageSelected = (image) => {
        imageRef.current = image;
    };

    const handleThumbSelected = (image) => {
        thumbRef.current = [...thumbRef.current, ...image];
    };
    const handleRemoveImage = () => {
        dispatch(removeImagePreview({ type: "create" }));
        imageRef.current = "";
    };
    const handleRemoveThumb = (index) => {
        dispatch(removeThumbPreview({ type: "create", value: index }));
        thumbRef.current = thumbRef.current.filter((_, i) => {
            return i !== index;
        });
    };
    return (
        <div className="bg-neutral-50">
            <h2 className="p-5 text-xl font-semibold">Basic information</h2>
            <form className="px-5" onSubmit={(e) => e.preventDefault()}>
                <div className="flex gap-10 ">
                    <div className="">
                        <SelectImage
                            name="image"
                            imagePreviews={product.imagePreview}
                            setImagePreviews={(image) =>
                                dispatch(
                                    setImagePreview({
                                        type: "create",
                                        value: image,
                                    }),
                                )
                            }
                            setImageSelected={handleImageSelected}
                            removeImage={handleRemoveImage}
                            className="h-60 w-60 text-lg"
                        />
                    </div>
                    <div className="mt-10 flex-1">
                        <div className="mb-4 flex items-center justify-between gap-3">
                            <label
                                htmlFor="productName"
                                className="whitespace-nowrap after:ml-0.5 after:text-red-500 after:content-['*'] "
                            >
                                Product Name
                            </label>
                            <input
                                value={product.name}
                                onChange={(e) =>
                                    dispatch(
                                        handleInput({
                                            type: "create",
                                            name: e.target.name,
                                            value: e.target.value,
                                        }),
                                    )
                                }
                                type="text"
                                id="productName"
                                name="name"
                                className="block basis-10/12 rounded border border-neutral-300 px-3 py-1.5 hover:border-neutral-400 focus:border-neutral-400 focus:outline-none"
                                placeholder="Input"
                            />
                        </div>
                        <div className="mb-4 flex items-center justify-between gap-3">
                            <label
                                htmlFor="productCategories"
                                className="whitespace-nowrap after:ml-0.5 after:text-red-500 after:content-['*']"
                            >
                                Categories
                            </label>
                            <select
                                value={product.category_id}
                                id="productCategories"
                                name="category_id"
                                onChange={(e) =>
                                    dispatch(
                                        handleInput({
                                            type: "create",
                                            name: e.target.name,
                                            value: Number(e.target.value),
                                        }),
                                    )
                                }
                                className="block basis-10/12 rounded border border-neutral-300 p-2 text-neutral-400 hover:border-neutral-400 focus:border-neutral-400 focus:outline-none"
                            >
                                <option value={0} key="-1">
                                    Please set category
                                </option>
                                {categories.map((e) => (
                                    <option value={e.id} key={e.id}>
                                        {e.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4 flex items-center justify-between gap-3">
                            <label
                                htmlFor="productBrands"
                                className="whitespace-nowrap after:ml-0.5 after:text-red-500 after:content-['*']"
                            >
                                Brands
                            </label>
                            <select
                                value={product.brand_id}
                                id="productBrands"
                                name="brand_id"
                                onChange={(e) =>
                                    dispatch(
                                        handleInput({
                                            type: "create",
                                            name: e.target.name,
                                            value: Number(e.target.value),
                                        }),
                                    )
                                }
                                className="block basis-10/12 rounded border border-neutral-300 p-2 text-neutral-400 hover:border-neutral-400 focus:border-neutral-400 focus:outline-none"
                            >
                                <option value={0} key="-1">
                                    Please set brand
                                </option>
                                {brands.map((e) => (
                                    <option value={e.id} key={e.id}>
                                        {e.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4 ml-auto flex w-10/12 items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <label
                                    htmlFor="productActive"
                                    className="whitespace-nowrap after:ml-0.5 after:text-red-500 after:content-['*'] "
                                >
                                    Active
                                </label>
                                <input
                                    checked={product.active}
                                    onChange={(e) =>
                                        dispatch(
                                            handleInput({
                                                type: "create",
                                                name: e.target.name,
                                                value: Number(e.target.checked),
                                            }),
                                        )
                                    }
                                    type="checkbox"
                                    id="productActive"
                                    name="active"
                                    className="block basis-10/12 rounded border border-neutral-300 px-3 py-1.5 hover:border-neutral-400 focus:border-neutral-400 focus:outline-none"
                                    placeholder="Input"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <label
                                    htmlFor="productDiscount"
                                    className="whitespace-nowrap after:ml-0.5 after:text-red-500 after:content-['*'] "
                                >
                                    Discount
                                </label>
                                <input
                                    onWheel={(e) => e.target.blur()}
                                    value={product.discount}
                                    onChange={(e) =>
                                        dispatch(
                                            handleInput({
                                                type: "create",
                                                name: e.target.name,
                                                value: Number(e.target.value),
                                            }),
                                        )
                                    }
                                    type="number"
                                    name="discount"
                                    id="productDiscount"
                                    className="block basis-10/12 rounded border border-neutral-300 px-3 py-1.5 hover:border-neutral-400 focus:border-neutral-400 focus:outline-none"
                                    placeholder="Discount"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <div className="flex items-center justify-between ">
                        <label
                            htmlFor="variationsName"
                            className="whitespace-nowrap after:ml-0.5 after:text-red-500 after:content-['*'] "
                        >
                            Variation name
                        </label>
                        <input
                            value={product.classification.name}
                            onChange={(e) =>
                                dispatch(
                                    handleInput({
                                        type: "create",
                                        name: "classification",
                                        value: e.target.value,
                                    }),
                                )
                            }
                            type="text"
                            id="variationsName"
                            className="block basis-10/12 rounded border border-neutral-300 px-3 py-1.5 hover:border-neutral-400 focus:border-neutral-400 focus:outline-none"
                            placeholder="Variation name"
                        />
                    </div>
                    {product.classify.map(
                        ({ id, name, price, stock }, index) => (
                            <div
                                key={index}
                                className="relative ml-auto mt-3 w-10/12 rounded bg-neutral-300 p-5 pr-16"
                            >
                                <div className="flex items-center justify-between ">
                                    <label
                                        htmlFor={`classify[${id}]`}
                                        className="whitespace-nowrap after:ml-0.5 after:text-red-500 after:content-['*'] "
                                    >
                                        Variation
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) =>
                                            dispatch(
                                                handleInput({
                                                    type: "create",
                                                    id: id,
                                                    index: index,
                                                    name: "classify",
                                                    field: "name",
                                                    value: e.target.value,
                                                }),
                                            )
                                        }
                                        id={`classify[${id}]`}
                                        name={`classify[${id}]`}
                                        className="block basis-10/12 rounded border border-neutral-300 px-3 py-1.5 hover:border-neutral-400 focus:border-neutral-400 focus:outline-none"
                                        placeholder="name"
                                    />
                                </div>
                                <div className="ml-auto mt-3 flex w-10/12 justify-between">
                                    <div className="flex items-center gap-3">
                                        <label
                                            htmlFor={`price[${id}]`}
                                            className="whitespace-nowrap after:ml-0.5 after:text-red-500 after:content-['*'] "
                                        >
                                            Price
                                        </label>
                                        <input
                                            onWheel={(e) => e.target.blur()}
                                            value={price}
                                            onChange={(e) =>
                                                dispatch(
                                                    handleInput({
                                                        type: "create",
                                                        id: id,
                                                        index: index,
                                                        name: "classify",
                                                        field: "price",
                                                        value: Number(
                                                            e.target.value,
                                                        ),
                                                    }),
                                                )
                                            }
                                            type="number"
                                            id={`price[${id}]`}
                                            name={`price[${id}]`}
                                            className="block basis-10/12 rounded border border-neutral-300 px-3 py-1.5 hover:border-neutral-400 focus:border-neutral-400 focus:outline-none"
                                            placeholder="price"
                                        />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <label
                                            htmlFor={`stock[${id}]`}
                                            className="whitespace-nowrap after:ml-0.5 after:text-red-500 after:content-['*'] "
                                        >
                                            Stock
                                        </label>
                                        <input
                                            onWheel={(e) => e.target.blur()}
                                            value={stock}
                                            onChange={(e) =>
                                                dispatch(
                                                    handleInput({
                                                        type: "create",
                                                        id: id,
                                                        index: index,
                                                        name: "classify",
                                                        field: "stock",
                                                        value: Number(
                                                            e.target.value,
                                                        ),
                                                    }),
                                                )
                                            }
                                            type="number"
                                            id={`stock[${id}]`}
                                            name={`stock[${id}]`}
                                            className="block basis-10/12 rounded border border-neutral-300 px-3 py-1.5 hover:border-neutral-400 focus:border-neutral-400 focus:outline-none"
                                            placeholder="stock"
                                        />
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() =>
                                        dispatch(
                                            removeClassify({
                                                type: "create",
                                                value: index,
                                            }),
                                        )
                                    }
                                    className="absolute right-4 top-3 block h-6 w-6 bg-neutral-400 text-neutral-50 hover:bg-red-400"
                                >
                                    X
                                </button>
                            </div>
                        ),
                    )}
                    <div className="relative ml-auto mt-3 w-10/12 rounded bg-neutral-300 p-5 pr-16">
                        <div className="flex items-center">
                            <label className="w-2/12 whitespace-nowrap after:ml-0.5 after:text-red-500 after:content-['*'] ">
                                Variation
                            </label>
                            <button
                                onClick={() =>
                                    dispatch(setNewClassify({ type: "create" }))
                                }
                                type="button"
                                className="rounded border border-dashed border-neutral-300 bg-neutral-100 px-3 py-1.5 text-orange-500 hover:border-neutral-400 focus:border-neutral-400 focus:outline-none"
                            >
                                + Add Variation
                            </button>
                        </div>
                    </div>
                </div>
                <div className="jus mt-5 flex">
                    <label
                        htmlFor="variationsName"
                        className="basis-2/12 whitespace-nowrap after:ml-0.5 after:text-red-500 after:content-['*']"
                    >
                        Thumbnails
                    </label>
                    <div className="">
                        <SelectImage
                            multiple
                            name="thumb"
                            imagePreviews={product.thumbPreviews}
                            setImagePreviews={(image) =>
                                dispatch(
                                    setThumbPreview({
                                        type: "create",
                                        value: image,
                                    }),
                                )
                            }
                            setImageSelected={handleThumbSelected}
                            removeImage={handleRemoveThumb}
                            className="h-28 w-28 text-xs"
                        />
                    </div>
                </div>
                <div className="my-5">
                    <h2 className="mb-5 basis-2/12 whitespace-nowrap after:ml-0.5 after:text-red-500 after:content-['*']">
                        Description
                    </h2>
                    <CKEditor
                        editor={ClassicEditor}
                        data={product.description}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            dispatch(
                                handleInput({
                                    type: "create",
                                    name: "description",
                                    value: data,
                                }),
                            );
                        }}
                        // onReady={(editor) => {
                        //     // You can store the "editor" and use when it is needed.
                        //     console.log("Editor is ready to use!", editor);
                        // }}
                        // onBlur={(event, editor) => {
                        //     console.log("Blur.", editor);
                        // }}
                        // onFocus={(event, editor) => {
                        //     console.log("Focus.", editor);
                        // }}
                    />
                </div>
                <div className="mb-10 text-end">
                    <button
                        type="button"
                        className="rounded bg-orange-500 px-6 py-2 text-neutral-50"
                        onClick={handleCreate}
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
}

CreateProduct.propTypes = {};
