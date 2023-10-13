import { createSlice } from "@reduxjs/toolkit";
import { accountInitState as initialState } from "./accountInitState"
import { changePassword, getUserProfile, login, logout, signup, updateUserProfile } from "./accountThunkApi";

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setInput: (state, { payload }) => {
            state.formInput[payload.name] = payload.value
        },
        setChangePassword: (state, { payload }) => {
            state.changePassword[payload.name] = payload.value
        }
    },
    extraReducers(builder) {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true
                state.isLogin = false
                state.isError = false
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.isLogin = true
                state.authToken = payload.access_token
                state.user = payload.user
                localStorage.setItem('auth-token', payload.access_token)
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = true
                state.errorMessage = `${payload.status} - ${payload.data.message}`
            })
            .addCase(signup.pending, (state) => {
                state.isLoading = true
                state.isSigned = false
                state.isError = false
            })
            .addCase(signup.fulfilled, (state) => {
                state.isLoading = false
                state.isSigned = true
            })
            .addCase(signup.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = true
                state.errorMessage = `${payload.status} - ${payload.data.message}`
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true
                state.isAuthenticating = true
            })
            .addCase(logout.fulfilled, (state) => {
                localStorage.removeItem('auth-token')
                return { ...state, ...initialState, authToken: "" }
            })
            .addCase(logout.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isAuthenticating = false
                state.isError = true
                state.errorMessage = payload
            })
            .addCase(getUserProfile.pending, (state) => {
                state.isAuthenticating = true
                state.isAuthenticated = false
                state.isLogin = false
                state.isError = false
            })
            .addCase(getUserProfile.fulfilled, (state, { payload }) => {
                state.isAuthenticating = false
                state.isAuthenticated = true
                state.isLogin = true
                state.user = payload
            })
            .addCase(getUserProfile.rejected, (state, { payload }) => {
                localStorage.removeItem('auth-token')
                return { ...state, ...initialState, isError: true, errorMessage: payload, authToken: "" }
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.status = 'updating'
            })
            .addCase(updateUserProfile.fulfilled, (state, { payload }) => {
                state.status = 'updated'
                state.user = payload

            })
            .addCase(updateUserProfile.rejected, (state) => {
                state.status = 'failed'
            })
            .addCase(changePassword.pending, (state) => {
                state.status = 'changing'
            })
            .addCase(changePassword.fulfilled, (state, { payload }) => {
                state.status = 'changed'
                state.user = payload

            })
            .addCase(changePassword.rejected, (state) => {
                state.status = 'failed'
            })
    }
})

export const { setInput, setChangePassword } = accountSlice.actions;
export default accountSlice.reducer