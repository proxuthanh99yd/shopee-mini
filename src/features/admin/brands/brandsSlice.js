import { createSlice } from "@reduxjs/toolkit";
import { brandsInitState as initialState } from "./brandsInitState";
import { createBrands, deleteBrands, fetchBrands, updateBrands } from "./brandsThunkApi";

const brandsSlice = createSlice({
    name: "brands",
    initialState,
    reducers: {
        setFormInput: (state, { payload }) => {
            if (payload.name === "imagePreview") {
                state.formInput[payload.name] = [payload.value]
            } else {
                state.formInput[payload.name] = payload.value
            }
        },
        setIsCreate: (state) => {
            state.isCreate = true;
        },
        setIsUpdate: (state, { payload }) => {
            state.formInput = { ...payload, imagePreview: [payload.image] }
            state.isUpdate = true;
        },
        setIsDelete: (state, { payload }) => {
            state.formInput = { ...payload, imagePreview: [payload.image] }
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
            .addCase(fetchBrands.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchBrands.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.results = payload.data;
                state.currentPage = payload.current_page;
                state.totalPage = payload.last_page;
            })
            .addCase(fetchBrands.rejected, (state) => {
                state.isLoading = false;
                state.isError = true
            })
            .addCase(createBrands.pending, (state) => {
                state.toastLoading = true;
                state.toastSuccess = false;
                state.toastError = false;
                state.loadingMessage = "creating";
                state.successMessage = "";
                state.errorMessage = "";
            })
            .addCase(createBrands.fulfilled, (state, { payload }) => {
                state.toastLoading = false;
                state.toastSuccess = true;
                state.toastError = false;
                state.loadingMessage = "";
                state.successMessage = "created!";
                state.errorMessage = "";
                state.isCreate = false;
                state.results.push(payload)
            })
            .addCase(createBrands.rejected, (state, { payload }) => {
                state.toastLoading = false;
                state.toastSuccess = false;
                state.toastError = true;
                state.loadingMessage = "";
                state.successMessage = "";
                state.errorMessage = `${payload.status} - ${payload.data.message}`
            })
            .addCase(deleteBrands.pending, (state) => {
                state.toastLoading = true;
                state.toastSuccess = false;
                state.toastError = false;
                state.loadingMessage = "deleting";
                state.successMessage = "";
                state.errorMessage = "";
            })
            .addCase(deleteBrands.fulfilled, (state, { payload }) => {
                state.toastLoading = false;
                state.toastSuccess = true;
                state.toastError = false;
                state.loadingMessage = "";
                state.successMessage = "deleted!";
                state.errorMessage = "";
                state.isDelete = false;
                state.results = state.results.filter(result => result.id !== payload)
            })
            .addCase(deleteBrands.rejected, (state, { payload }) => {
                state.toastLoading = false;
                state.toastSuccess = false;
                state.toastError = true;
                state.loadingMessage = "";
                state.successMessage = "";
                state.errorMessage = `${payload.status} - ${payload.data.message}`
            })
            .addCase(updateBrands.pending, (state) => {
                state.toastLoading = true;
                state.toastSuccess = false;
                state.toastError = false;
                state.loadingMessage = "updating";
                state.successMessage = "";
                state.errorMessage = "";
            })
            .addCase(updateBrands.fulfilled, (state, { payload }) => {
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
            .addCase(updateBrands.rejected, (state, { payload }) => {
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
export const { setFormInput, setIsCreate, setIsDelete, setIsUpdate, clearFormInput, setCurrentPage } = brandsSlice.actions;
export default brandsSlice.reducer