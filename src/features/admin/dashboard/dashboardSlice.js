import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./dashboardInitState"
import { fetchDashboard } from "./dashboardThunkApi";

const slice = createSlice({
    name: "ManagerDashboard",
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(fetchDashboard.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(fetchDashboard.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.results = payload
            })
            .addCase(fetchDashboard.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = true
                state.errorMessage = `${payload.status} - ${payload.data.message}`
            })

    }
})

// export const { setCurrentPage } = slice.actions;
export default slice.reducer