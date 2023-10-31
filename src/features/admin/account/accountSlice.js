import { createSlice } from "@reduxjs/toolkit";
import { accountInitState as initialState } from "./accountInitState"
import { changeStatusUser, fetchUsers } from "./accountThunkApi";

const accountSlice = createSlice({
    name: "managerAccount",
    initialState,
    reducers: {
        setCurrentPage: (state, { payload }) => {
            state.currentPage = payload.currentPage
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(fetchUsers.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.results = payload.data;
                state.currentPage = payload.current_page;
                state.totalPage = payload.last_page;
            })
            .addCase(fetchUsers.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = true
                state.errorMessage = `${payload.status} - ${payload.data.message}`
            })
            .addCase(changeStatusUser.pending, (state) => {
                state.toastLoading = true;
                state.toastSuccess = false;
                state.toastError = false;
                state.loadingMessage = "change status";
                state.successMessage = "";
                state.errorMessage = "";
            })
            .addCase(changeStatusUser.fulfilled, (state, { payload }) => {
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
            .addCase(changeStatusUser.rejected, (state, { payload }) => {
                state.toastLoading = false;
                state.toastSuccess = false;
                state.toastError = true;
                state.loadingMessage = "";
                state.successMessage = "";
                state.errorMessage = `${payload.status} - ${payload.data.message}`
            })

    }
})

export const { setCurrentPage } = accountSlice.actions;
export default accountSlice.reducer