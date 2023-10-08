import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createBrandsApi, getBrandsApi } from "../../services/brands";

const initialState = {
    isError: false,
    isLoading: true,
    results: [],
    currentPage: 1,
    totalPage: 0,
    status: ""
}

export const fetchBrands = createAsyncThunk("Brands/get",
    async () => {
        return await getBrandsApi();
    })
export const createBrands = createAsyncThunk("Brands/create",
    async ({ body }) => {
        return await createBrandsApi({ body });
    })
// export const deleteBrands = createAsyncThunk("Brands/delete",
//     async ({ id }) => {
//         const { data } = await deleteBrandsApi(id);
//         if (data.status === "succeeded") {
//             return id
//         }
//     })
// export const updateBrands = createAsyncThunk("Brands/update",
//     async (value) => {
//         const { data } = await updateBrandsApi(value);
//         return data
//     })
const brandsSlice = createSlice({
    name: "brands",
    initialState,
    reducers: {},
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
                state.results.push({ ...payload.results, image: import.meta.env.VITE_IMAGE_LINK + payload.results.image })
            })
            .addCase(createBrands.rejected, (state) => {
                state.status = "failed";
            })
        // .addCase(deleteCategories.pending, (state) => {
        //     state.deleted = false;
        // })
        // .addCase(deleteCategories.fulfilled, (state, { payload }) => {
        //     state.isLoading = false;
        //     state.results = state.results.filter(result => result.id !== payload)
        //     state.deleted = true;
        // })
        // .addCase(deleteCategories.rejected, (state) => {
        //     state.deleted = false;
        // })
        // .addCase(updateCategories.pending, (state) => {
        //     state.updated = false;
        // })
        // .addCase(updateCategories.fulfilled, (state, { payload }) => {
        //     state.isLoading = false;
        //     state.results = state.results.map(result => {
        //         if (result.id === payload.results.id) {
        //             return { ...result, ...payload.results }
        //         }
        //         return result
        //     })
        //     state.updated = true;
        // })
        // .addCase(updateCategories.rejected, (state) => {
        //     state.updated = false;
        // })
    }
})

export default brandsSlice.reducer