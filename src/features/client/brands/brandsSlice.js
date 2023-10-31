import { createSlice } from "@reduxjs/toolkit";
import { brandsInitState as initialState } from "./brandsInitState";
import { fetchBrands } from "./brandsThunkApi";

const brandsSlice = createSlice({
    name: "brands",
    initialState,
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

    }
})
export default brandsSlice.reducer