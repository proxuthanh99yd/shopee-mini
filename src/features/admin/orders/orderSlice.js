import { createSlice } from "@reduxjs/toolkit";
import { orderInitState as initialState } from "./orderInitState"
import { changeStatusOrders, fetchOrders } from "./orderThunkApi";

const orderSlice = createSlice({
    name: "managerOrder",
    initialState,
    reducers: {
        setCurrentPage: (state, { payload }) => {
            state.currentPage = payload.currentPage
        },
        setFilter: (state, { payload }) => {
            state.filter = payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(fetchOrders.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.results = payload.data;
                state.currentPage = payload.current_page;
                state.totalPage = payload.last_page;
            })
            .addCase(fetchOrders.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = true
                state.errorMessage = `${payload.status} - ${payload.data.message}`
            })
            .addCase(changeStatusOrders.pending, (state) => {
                state.toastLoading = true;
                state.toastSuccess = false;
                state.toastError = false;
                state.loadingMessage = "change status";
                state.successMessage = "";
                state.errorMessage = "";
            })
            .addCase(changeStatusOrders.fulfilled, (state, { payload }) => {
                state.toastLoading = false;
                state.toastSuccess = true;
                state.toastError = false;
                state.loadingMessage = "";
                state.successMessage = "change status success !";
                state.errorMessage = "";
                state.results = state.results.map(result => {
                    if (result.id === payload.id) {
                        return { ...result, status: payload.status }
                    }
                    return result
                })
            })
            .addCase(changeStatusOrders.rejected, (state, { payload }) => {
                state.toastLoading = false;
                state.toastSuccess = false;
                state.toastError = true;
                state.loadingMessage = "";
                state.successMessage = "";
                state.errorMessage = `${payload.status} - ${payload.data.message}`
            })
    }
})

export const { setCurrentPage, setFilter } = orderSlice.actions;
export default orderSlice.reducer