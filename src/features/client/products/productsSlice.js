import { createSlice } from "@reduxjs/toolkit";
import { productsInitState as initialState } from "./productsInitState";
import { fetchProducts, fetchSingleProduct } from "./productsThunkApi";

const productsSlice = createSlice({
    name: "Products",
    initialState,
    reducers: {
        setCurrentPage: (state, { payload }) => {
            state.currentPage = payload + 1
        },
        setSearchParam: (state, { payload }) => {
            state.searchParam = payload
        },
        setSort: (state, { payload }) => {
            state.sort = payload
            state.currentPage = 1
        },
        setFilter: (state, { payload }) => {
            state[payload.type] = payload.value
            state.currentPage = 1
        },
        clearFilter: (state) => {
            state.brandFilter = "";
            state.categoryFilter = "";
            state.currentPage = 1
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchProducts.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.results = payload.data
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
                state.result.id = payload.id;
                state.result.name = payload.name;
                state.result.description = payload.description;
                state.result.image = payload.image
                state.result.imagePreview = payload.image;
                state.result.active = payload.active;
                state.result.discount = payload.discount;
                state.result.category_id = payload.category_id;
                state.result.brand_id = payload.brand_id;
                state.result.brand = payload.brands;
                state.sameProducts = payload.sameProducts.data.slice(0, 10);
                state.result.thumbnails = payload.thumbnails
                state.result.thumbPreviews = payload.thumbnails;
                state.result.classification = payload.classification[0];
                state.result.classify = payload.classification[0].classify;
            })
            .addCase(fetchSingleProduct.rejected, (state) => {
                state.isLoading = false;
                state.isError = true
            })
    }
})

export const {
    setFilter,
    setCurrentPage,
    setSearchParam,
    setSort,
    clearFilter
} = productsSlice.actions
export default productsSlice.reducer