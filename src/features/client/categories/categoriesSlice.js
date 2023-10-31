import { createSlice } from "@reduxjs/toolkit";
import { categoriesInitState as initialState } from "./categoriesInitState";
import { fetchCategories } from "./categoriesThunkApi";

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
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
                state.totalPage = payload.total;
            })
            .addCase(fetchCategories.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
    }
})

export default categoriesSlice.reducer