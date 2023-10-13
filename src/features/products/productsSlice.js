import { createSlice } from "@reduxjs/toolkit";
import { productsInitState as initialState } from "./productsInitState";
import { createProducts, deleteProducts, fetchProducts, fetchSingleProduct, updateProducts } from "./productsThunkApi";

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
        },
        clearForm: (state) => {
            state.create = {
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
            }
        },
        setFilter: (state, { payload }) => {
            state.filter = payload.param
            state.currentPage = 1
        },
        setCurrentPage: (state, { payload }) => {
            state.currentPage = payload.currentPage
        },
        setSearchParam: (state, { payload }) => {
            state.searchParam = payload.searchParam
        }

    },
    extraReducers(builder) {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchProducts.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.results = payload.results.data.reduce((prev, curr) => {
                    return [...prev, { ...curr, image: import.meta.env.VITE_IMAGE_LINK + curr.image }]
                }, [])
                state.currentPage = payload.results.current_page;
                state.totalPage = payload.results.last_page;
                state.links = payload.results.links;

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
                state.status = "creating";
            })
            .addCase(createProducts.fulfilled, (state, { payload }) => {
                state.status = "created";
                state.results.push(payload.results)
            })
            .addCase(createProducts.rejected, (state) => {
                state.status = "failed";
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
                state.status = "updating";
            })
            .addCase(updateProducts.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.results = state.results.map(result => {
                    if (result.id === payload.results.id) {
                        return { ...result, ...payload.results }
                    }
                    return result
                })
                state.status = "updated";
            })
            .addCase(updateProducts.rejected, (state) => {
                state.status = "failed";
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
    removeThumbPreview,
    clearForm,
    setFilter,
    setCurrentPage,
    setSearchParam
} = productsSlice.actions
export default productsSlice.reducer