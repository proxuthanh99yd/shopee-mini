import { createSlice } from "@reduxjs/toolkit";
import { productsInitState as initialState } from "./productsInitState";
import { changeStatusProducts, createProducts, deleteProducts, fetchProducts, fetchSingleProduct, updateProducts } from "./productsThunkApi";

const productsSlice = createSlice({
    name: "Products",
    initialState,
    reducers: {
        addToCarts: (state) => {
            const index = state.myCart.findIndex((item) => {
                return item.productId == state.addToCartForm.productId && item.classifyId == state.addToCartForm.classifyId
            })
            if (index == -1) {
                state.myCart.push(state.addToCartForm)
            } else {
                state.myCart[index].quantity = state.myCart[index].quantity + state.addToCartForm.quantity
            }
        },
        incrementProduct: (state) => {
            if (state.selected.stock > 0) {
                state.selected.stock--;
                state.addToCartForm.quantity++;
            }
        },
        decrementProduct: (state) => {
            if (state.addToCartForm.quantity > 0) {
                state.selected.stock++;
                state.addToCartForm.quantity--;
            }
        },
        setQuantity: (state, { payload }) => {
            const sum = Number(state.selected.stock) + Number(state.addToCartForm.quantity);

            if (payload.quantity >= sum) {
                state.addToCartForm.quantity = sum;
                state.selected.stock = 0;
            } else {
                state.addToCartForm.quantity = payload.quantity;
                state.selected.stock = sum - payload.quantity;
            }
        },
        setSelected: (state, { payload }) => {
            state.selected.classifyId = payload.classifyId;
            state.selected.productId = payload.productId;
            state.selected.stock = payload.stock;
            state.addToCartForm.classifyId = payload.classifyId;
            state.addToCartForm.productId = payload.productId;
            state.addToCartForm.quantity = 0;
        },
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
            state.filter = payload
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
                state.results = payload.data.reduce((prev, curr) => {
                    return [...prev, { ...curr, image: import.meta.env.VITE_IMAGE_LINK + curr.image }]
                }, [])
                state.currentPage = payload.current_page;
                state.totalPage = payload.last_page;
                state.links = payload.links;

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

                state.edit.id = payload.product.id;
                state.edit.name = payload.product.name;
                state.edit.description = payload.product.description;
                state.edit.image = import.meta.env.VITE_IMAGE_LINK + payload.product.image
                state.edit.imagePreview = [import.meta.env.VITE_IMAGE_LINK + payload.product.image];
                state.edit.active = payload.product.active;
                state.edit.discount = payload.product.discount;
                state.edit.category_id = payload.product.category_id;
                state.edit.brand_id = payload.product.brand_id;
                state.edit.thumbnails = payload.product.thumbnails
                state.edit.thumbPreviews = payload.product.thumbnails.reduce((prev, curr) => {
                    return [...prev, import.meta.env.VITE_IMAGE_LINK + curr.name]
                }, []);
                state.edit.classification = payload.product.classification[0];
                state.edit.classify = payload.product.classification[0].classify;
                state.brands = payload.brands;
                state.categories = payload.categories
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
                state.toastLoading = true;
                state.toastSuccess = false;
                state.toastError = false;
                state.loadingMessage = "updating";
                state.successMessage = "";
                state.errorMessage = "";
            })
            .addCase(updateProducts.fulfilled, (state, { payload }) => {
                state.toastLoading = false;
                state.toastSuccess = true;
                state.toastError = false;
                state.loadingMessage = "";
                state.successMessage = "update success!";
                state.errorMessage = "";
                state.results = state.results.map(result => {
                    if (result.id === payload.id) {
                        return { ...result, ...payload }
                    }
                    return result
                })
            })
            .addCase(updateProducts.rejected, (state, { payload }) => {
                state.toastLoading = false;
                state.toastSuccess = false;
                state.toastError = true;
                state.loadingMessage = "";
                state.successMessage = "";
                state.errorMessage = `${payload.status} - ${payload.data.message}`
            })
            .addCase(changeStatusProducts.pending, (state) => {
                state.toastLoading = true;
                state.toastSuccess = false;
                state.toastError = false;
                state.loadingMessage = "change status";
                state.successMessage = "";
                state.errorMessage = "";
            })
            .addCase(changeStatusProducts.fulfilled, (state, { payload }) => {
                state.toastLoading = false;
                state.toastSuccess = true;
                state.toastError = false;
                state.loadingMessage = "";
                state.successMessage = "change status success !";
                state.errorMessage = "";
                state.results = state.results.map(result => {
                    if (result.id === payload.id) {
                        return { ...result, active: payload.active }
                    }
                    return result
                })
            })
            .addCase(changeStatusProducts.rejected, (state, { payload }) => {
                state.toastLoading = false;
                state.toastSuccess = false;
                state.toastError = true;
                state.loadingMessage = "";
                state.successMessage = "";
                state.errorMessage = `${payload.status} - ${payload.data.message}`
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
    setSearchParam,
    setSelected,
    setQuantity,
    incrementProduct,
    decrementProduct,
    addToCarts
} = productsSlice.actions
export default productsSlice.reducer