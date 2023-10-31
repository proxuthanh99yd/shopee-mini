import { createSlice } from "@reduxjs/toolkit";
import { orderInitState as initialState } from "./orderInitState";
import { cancelOrders, createOrder, getMyOrder } from "./orderThunkApi";
const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setCheckoutItem: (state, { payload }) => {
            state.checkoutItems = payload
            state.toastLoading = false
            state.toastSuccess = false
            state.toastError = false
        },
        setFilter: (state, { payload }) => {
            state.selectFilter = payload
        },
        clearCheckoutItems: (state) => {
            state.checkoutItems = []
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getMyOrder.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(getMyOrder.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.isError = false
                state.orderItems = payload
            })
            .addCase(getMyOrder.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = true
                state.errorMessage = `${payload.status} - ${payload.data.message}`
            }).addCase(createOrder.pending, (state) => {
                state.loadingMessage = "Creating new order"
                state.successMessage = ""
                state.errorMessage = ""
                state.toastLoading = true
                state.toastSuccess = false
                state.toastError = false
            })
            .addCase(createOrder.fulfilled, (state, { payload }) => {
                state.loadingMessage = ""
                state.successMessage = "Created new order"
                state.errorMessage = ""
                state.toastLoading = false
                state.toastSuccess = true
                state.toastError = false
                // state.orderItems = payload
            })
            .addCase(createOrder.rejected, (state, { payload }) => {
                state.loadingMessage = ""
                state.successMessage = ""
                state.toastLoading = false
                state.toastSuccess = false
                state.toastError = true
                state.errorMessage = `${payload.status} - ${payload.data.message}`
            })
            .addCase(cancelOrders.pending, (state) => {
                state.loadingMessage = "Canceling order"
                state.successMessage = ""
                state.errorMessage = ""
                state.toastLoading = true
                state.toastSuccess = false
                state.toastError = false
            })
            .addCase(cancelOrders.fulfilled, (state, { payload }) => {
                state.loadingMessage = ""
                state.successMessage = "Canceled order"
                state.errorMessage = ""
                state.toastLoading = false
                state.toastSuccess = true
                state.toastError = false
                state.orderItems = state.orderItems.filter(item => item.id != payload.id)
            })
            .addCase(cancelOrders.rejected, (state, { payload }) => {
                state.loadingMessage = ""
                state.successMessage = ""
                state.toastLoading = false
                state.toastSuccess = false
                state.toastError = true
                state.errorMessage = `${payload.status} - ${payload.data.message}`
            })
    }
})
export const { setCheckoutItem, setFilter, clearCheckoutItems } = orderSlice.actions
export default orderSlice.reducer