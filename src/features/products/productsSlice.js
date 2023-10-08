import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProductsApi, deleteProductsApi, getProductsApi, getSingleProductApi, updateProductsApi } from "../../services/products";

const initialState = {
    isError: false,
    isLoading: true,
    results: [],
    currentPage: 1,
    totalPage: 0,
    create: {
        name: '',
        description: '',
        image: [],
        imagePreview: [],
        active: 0,
        discount: 0,
        category_id: 0,
        brand_id: 0,
        thumbnails: [],
        classification: {
            name: ""
        },
        classify: [{
            name: "",
            price: 0,
            stock: 0
        }],
        thumbPreviews: []
    },
    deleted: false,
    edit: {
        id: '',
        name: '',
        description: '',
        image: [],
        imagePreview: [],
        active: '',
        discount: '',
        category_id: '',
        brand_id: '',
        thumbnails: [],
        classification: {},
        classify: [],
        thumbPreviews: []
    },
    status: ""
}

export const fetchProducts = createAsyncThunk("Products/get",
    async () => {
        const { data } = await getProductsApi();
        return data
    })

export const fetchSingleProduct = createAsyncThunk("SingleProduct/get",
    async ({ id }) => {
        const { data } = await getSingleProductApi({ id });
        return data
    })

export const createProducts = createAsyncThunk("Products/create",
    async (value) => {
        const { data } = await createProductsApi(value);
        return data
    })
export const deleteProducts = createAsyncThunk("Products/delete",
    async ({ id }) => {
        const { data } = await deleteProductsApi(id);
        if (data.status === "succeeded") {
            return id
        }
    })
export const updateProducts = createAsyncThunk("Products/update",
    async (value) => {
        const { data } = await updateProductsApi(value);
        return data
    })
const productsSlice = createSlice({
    name: "Products",
    initialState,
    reducers: {
        handleInput: (state, { payload }) => {
            if (payload.name === 'classification') {
                state[payload.type][payload.name] = {
                    ...state[payload.type][payload.name],
                    name: payload.value
                };
            } else if (payload.name === 'classify') {
                state[payload.type][payload.name] = state[payload.type][payload.name].map((classify, index) => {
                    if (payload.id) {
                        if (classify.id === payload.id) {
                            return {
                                ...classify,
                                [payload.field]: payload.value
                            }
                        }
                    } else {
                        if (index === payload.index) {
                            return {
                                ...classify,
                                [payload.field]: payload.value
                            }
                        }
                    }
                    return classify
                })
            } else {
                state[payload.type][payload.name] = payload.value;
            }
        },
        setNewClassify: (state, { payload }) => {
            state[payload.type].classify.push({
                name: "",
                price: 0,
                stock: 0,
            })
        },
        removeClassify: (state, { payload }) => {
            state[payload.type].classify = state[payload.type].classify.filter((classify, index) => {
                return payload.value !== index;
            })
        },
        setThumbPreview: (state, { payload }) => {
            state[payload.type].thumbPreviews.push(...payload.value)
        },
        setImagePreview: (state, { payload }) => {
            state[payload.type].imagePreview = [payload.value]
        },
        removeThumbPreview: (state, { payload }) => {
            state[payload.type].thumbPreviews = state[payload.type].thumbPreviews.filter((_, i) => {
                return payload.value !== i
            })
        },
        removeImagePreview: (state, { payload }) => {
            state[payload.type].imagePreview = []
        }

    },
    extraReducers(builder) {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchProducts.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.results = payload.results.data;
                state.currentPage = payload.results.current_page;
                state.totalPage = payload.results.total;
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.isLoading = false;
                state.isError = true
            })
            .addCase(fetchSingleProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchSingleProduct.fulfilled, (state, { payload }) => {
                state.isLoading = false;

                state.edit.id = payload.results.id;
                state.edit.name = payload.results.name;
                state.edit.description = payload.results.description;
                state.edit.image = import.meta.env.VITE_IMAGE_LINK + payload.results.image
                state.edit.imagePreview = [import.meta.env.VITE_IMAGE_LINK + payload.results.image];
                state.edit.active = payload.results.active;
                state.edit.discount = payload.results.discount;
                state.edit.category_id = payload.results.category_id;
                state.edit.brand_id = payload.results.brand_id;
                state.edit.thumbnails = payload.results.thumbnails
                state.edit.thumbPreviews = payload.results.thumbnails.reduce((prev, curr) => {
                    return [...prev, import.meta.env.VITE_IMAGE_LINK + curr.name]
                }, []);
                state.edit.classification = payload.results.classification[0];
                state.edit.classify = payload.results.classify;
            })
            .addCase(fetchSingleProduct.rejected, (state) => {
                state.isLoading = false;
                state.isError = true
            })
            .addCase(createProducts.pending, (state) => {
                // state.isLoading = true;
            })
            .addCase(createProducts.fulfilled, (state, { payload }) => {
                // state.isLoading = false;
                state.results.push(payload.results)
            })
            .addCase(createProducts.rejected, (state) => {
                state.created = false;
            })
            .addCase(deleteProducts.pending, (state) => {
                state.deleted = false;
            })
            .addCase(deleteProducts.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.results = state.results.filter(result => result.id !== payload)
                state.deleted = true;
            })
            .addCase(deleteProducts.rejected, (state) => {
                state.deleted = false;
            })
            .addCase(updateProducts.pending, (state) => {
                state.updated = false;
            })
            .addCase(updateProducts.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.results = state.results.map(result => {
                    if (result.id === payload.results.id) {
                        return { ...result, ...payload.results }
                    }
                    return result
                })
                state.updated = true;
            })
            .addCase(updateProducts.rejected, (state) => {
                state.updated = false;
            })
    }
})

export const {
    handleInput,
    setNewClassify,
    removeClassify,
    setThumbPreview,
    setImagePreview,
    removeImagePreview,
    removeThumbPreview
} = productsSlice.actions
export default productsSlice.reducer