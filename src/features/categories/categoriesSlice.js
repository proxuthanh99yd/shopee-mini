import { createSlice } from "@reduxjs/toolkit";
import { categoriesInitState as initialState } from "./categoriesInitState";
import { createCategories, deleteCategories, fetchCategories, updateCategories } from "./categoriesThunkApi";

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setFormInput: (state, { payload }) => {
            state.formInput[payload.name] = payload.value
        },
        setIsCreate: (state) => {
            state.isCreate = true;
        },
        setIsUpdate: (state, { payload }) => {
            state.formInput = { ...payload }
            state.isUpdate = true;
        },
        setIsDelete: (state, { payload }) => {
            state.formInput = { ...payload }
            state.isDelete = true;
        },
        clearFormInput: (state) => {
            state.formInput = {
                id: "",
                name: "",
            }
            state.isCreate = false
            state.isDelete = false
            state.isUpdate = false
        },
    },
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
                state.isError = true;
            })
            .addCase(createCategories.pending, (state) => {
                state.status = "creating";
            })
            .addCase(createCategories.fulfilled, (state, { payload }) => {
                state.status = "created";
                state.isCreate = false;
                state.results.push(payload.results)
            })
            .addCase(createCategories.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(deleteCategories.pending, (state) => {
                state.status = "deleting";
            })
            .addCase(deleteCategories.fulfilled, (state, { payload }) => {
                if (payload) {
                    state.isDelete = false;
                    state.status = "deleted";
                    state.results = state.results.filter(result => result.id !== payload)
                } else {
                    state.status = "failed";
                }
            })
            .addCase(deleteCategories.rejected, (state) => {
                state.status = false;
            })
            .addCase(updateCategories.pending, (state) => {
                state.status = "updating";
            })
            .addCase(updateCategories.fulfilled, (state, { payload }) => {
                state.isUpdate = false;
                state.status = "updated";
                state.results = state.results.map(result => {
                    if (result.id === payload.results.id) {
                        return { ...result, ...payload.results }
                    }
                    return result
                })
            })
            .addCase(updateCategories.rejected, (state) => {
                state.status = "failed";
            })
    }
})

export const { setFormInput, setIsCreate, setIsDelete, setIsUpdate, clearFormInput } = categoriesSlice.actions
export default categoriesSlice.reducer