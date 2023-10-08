import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createCategoriesApi, deleteCategoriesApi, getCategoriesApi, updateCategoriesApi } from "../../services/categories";

const initialState = {
    isError: false,
    isLoading: true,
    results: [],
    currentPage: 1,
    totalPage: 0,
    created: false,
    deleted: false,
    updated: false
}

export const fetchCategories = createAsyncThunk("Categories/get",
    async () => {
        const { data } = await getCategoriesApi();
        return data
    })
export const createCategories = createAsyncThunk("Categories/create",
    async ({ value }) => {
        const { data } = await createCategoriesApi(value);
        return data
    })
export const deleteCategories = createAsyncThunk("Categories/delete",
    async ({ id }) => {
        const { data } = await deleteCategoriesApi(id);
        if (data.status === "succeeded") {
            return id
        }
    })
export const updateCategories = createAsyncThunk("Categories/update",
    async (value) => {
        const { data } = await updateCategoriesApi(value);
        return data
    })
const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchCategories.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.results = payload.results.data;
                state.currentPage = payload.results.current_page;
                state.totalPage = payload.results.total;
            })
            .addCase(fetchCategories.rejected, (state) => {
                state.isLoading = false;
                state.isError = true
            })
            .addCase(createCategories.pending, (state) => {
                state.created = false;
            })
            .addCase(createCategories.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.results.push(payload.results)
                state.created = true;
            })
            .addCase(createCategories.rejected, (state) => {
                state.created = false;
            })
            .addCase(deleteCategories.pending, (state) => {
                state.deleted = false;
            })
            .addCase(deleteCategories.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.results = state.results.filter(result => result.id !== payload)
                state.deleted = true;
            })
            .addCase(deleteCategories.rejected, (state) => {
                state.deleted = false;
            })
            .addCase(updateCategories.pending, (state) => {
                state.updated = false;
            })
            .addCase(updateCategories.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.results = state.results.map(result => {
                    if (result.id === payload.results.id) {
                        return { ...result, ...payload.results }
                    }
                    return result
                })
                state.updated = true;
            })
            .addCase(updateCategories.rejected, (state) => {
                state.updated = false;
            })
    }
})

export default categoriesSlice.reducer