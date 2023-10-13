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
                imagePreview: [],
            }
            state.isCreate = false
            state.isDelete = false
            state.isUpdate = false
        },
        removeImage: (state) => {
            state.formInput.imagePreview = []
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchBrands.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchBrands.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.results = payload.results.data.reduce((prev, curr) => {
                    return [...prev, { ...curr, image: import.meta.env.VITE_IMAGE_LINK + curr.image }]
                }, []);
                state.currentPage = payload.results.current_page;
                state.totalPage = payload.results.total;
            })
            .addCase(fetchBrands.rejected, (state) => {
                state.isLoading = false;
                state.isError = true
            })
            .addCase(createBrands.pending, (state) => {
                state.status = "creating";
            })
            .addCase(createBrands.fulfilled, (state, { payload }) => {
                state.status = "created";
                state.isCreate = false;
                state.results.push({ ...payload.results, image: import.meta.env.VITE_IMAGE_LINK + payload.results.image })
            })
            .addCase(createBrands.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(deleteBrands.pending, (state) => {
                state.status = "deleting";
            })
            .addCase(deleteBrands.fulfilled, (state, { payload }) => {
                if (payload) {
                    state.status = "deleted"
                    state.isDelete = false;
                    state.results = state.results.filter(result => result.id !== payload)
                } else {
                    state.status = "failed"
                }
            })
            .addCase(deleteBrands.rejected, (state) => {
                state.deleted = false;
            })
            .addCase(updateBrands.pending, (state) => {
                state.status = "updating";
            })
            .addCase(updateBrands.fulfilled, (state, { payload }) => {
                state.status = "updated"
                state.isUpdate = false;
                state.results = state.results.map(result => {
                    if (result.id === payload.results.id) {
                        return { ...result, ...payload.results, image: import.meta.env.VITE_IMAGE_LINK + payload.results.image }
                    }
                    return result
                })
            })
            .addCase(updateBrands.rejected, (state) => {
                state.updated = false;
            })
    }
})
export const { setFormInput, setIsCreate, setIsDelete, setIsUpdate, clearFormInput, removeImage } = brandsSlice.actions;
export default brandsSlice.reducer