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
        setCurrentPage: (state, { payload }) => {
            state.currentPage = payload.currentPage
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchCategories.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.results = payload.data;
                state.currentPage = payload.current_page;
                state.totalPage = payload.last_page;
            })
            .addCase(fetchCategories.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(createCategories.pending, (state) => {
                state.toastLoading = true;
                state.toastSuccess = false;
                state.toastError = false;
                state.loadingMessage = "creating";
                state.successMessage = "";
                state.errorMessage = "";
            })
            .addCase(createCategories.fulfilled, (state, { payload }) => {
                state.toastLoading = false;
                state.toastSuccess = true;
                state.toastError = false;
                state.loadingMessage = "";
                state.successMessage = "created!";
                state.errorMessage = "";
                state.isCreate = false;
                state.results.push(payload)
            })
            .addCase(createCategories.rejected, (state, { payload }) => {
                state.toastLoading = false;
                state.toastSuccess = false;
                state.toastError = true;
                state.loadingMessage = "";
                state.successMessage = "";
                state.errorMessage = `${payload.status} - ${payload.data.message}`
            })
            .addCase(deleteCategories.pending, (state) => {
                state.toastLoading = true;
                state.toastSuccess = false;
                state.toastError = false;
                state.loadingMessage = "deleting";
                state.successMessage = "";
                state.errorMessage = "";
            })
            .addCase(deleteCategories.fulfilled, (state, { payload }) => {
                state.toastLoading = false;
                state.toastSuccess = true;
                state.toastError = false;
                state.loadingMessage = "";
                state.successMessage = "deleted!";
                state.errorMessage = "";
                state.isDelete = false;
                state.results = state.results.filter(result => result.id !== payload)
            })
            .addCase(deleteCategories.rejected, (state, { payload }) => {
                state.toastLoading = false;
                state.toastSuccess = false;
                state.toastError = true;
                state.loadingMessage = "";
                state.successMessage = "";
                state.errorMessage = `${payload.status} - ${payload.data.message}`
            })
            .addCase(updateCategories.pending, (state) => {
                state.toastLoading = true;
                state.toastSuccess = false;
                state.toastError = false;
                state.loadingMessage = "updating";
                state.successMessage = "";
                state.errorMessage = "";
            })
            .addCase(updateCategories.fulfilled, (state, { payload }) => {
                state.toastLoading = false;
                state.toastSuccess = true;
                state.toastError = false;
                state.loadingMessage = "";
                state.successMessage = "updated!";
                state.errorMessage = "";
                state.isUpdate = false;
                state.results = state.results.map(result => {
                    if (result.id === payload.id) {
                        return { ...result, ...payload }
                    }
                    return result
                })
            })
            .addCase(updateCategories.rejected, (state, { payload }) => {
                state.toastLoading = false;
                state.toastSuccess = false;
                state.toastError = true;
                state.loadingMessage = "";
                state.successMessage = "";
                state.errorMessage = `${payload.status} - ${payload.data.message}`
                state.updated = false;
            })
    }
})

export const { setFormInput, setIsCreate, setIsDelete, setIsUpdate, clearFormInput, setCurrentPage } = categoriesSlice.actions
export default categoriesSlice.reducer