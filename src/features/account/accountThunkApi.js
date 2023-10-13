import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit";

const auth = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
    }
});

export const login = createAsyncThunk("auth/login",
    async ({ body }, thunkApi) => {
        try {
            const { data } = await auth({
                method: "post",
                url: '/login',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                },
                data: body
            })
            return data
        } catch (error) {
            const throwError = {
                data: error.response.data,
                status: error.response.status,
                headers: error.response.headers,
            }
            return thunkApi.rejectWithValue(throwError)
        }
    })

export const logout = createAsyncThunk("auth/logout",
    async (_, thunkApi) => {
        try {
            const { data } = await auth({
                method: 'post',
                url: '/logout',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                }
            });
            return data
        } catch (error) {
            const throwError = {
                data: error.response.data,
                status: error.response.status,
                headers: error.response.headers,
            }
            return thunkApi.rejectWithValue(throwError)
        }
    })

export const signup = createAsyncThunk("auth/signup",
    async ({ body }, thunkApi) => {
        try {
            const { data } = await auth({
                method: "post",
                url: '/register',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                },
                data: body
            })
            return data
        } catch (error) {
            const throwError = {
                data: error.response.data,
                status: error.response.status,
                headers: error.response.headers,
            }
            return thunkApi.rejectWithValue(throwError)
        }
    })

export const getUserProfile = createAsyncThunk("auth/getUserProfile",
    async (_, thunkApi) => {
        try {
            const { data } = await auth({
                method: 'get',
                url: '/user',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                }
            });
            return data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const updateUserProfile = createAsyncThunk("auth/updateUserProfile",
    async ({ body }, thunkApi) => {
        try {
            const { data } = await auth({
                method: 'put',
                url: '/user',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                },
                data: body
            });
            return data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const changePassword = createAsyncThunk("auth/changePassword",
    async ({ body }, thunkApi) => {
        try {
            const { data } = await auth({
                method: 'put',
                url: '/user/change_password',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                },
                data: {
                    old_password: body.oldPassword,
                    new_password: body.newPassword,
                    confirm_password: body.cfPassword,
                }
            });
            return data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })