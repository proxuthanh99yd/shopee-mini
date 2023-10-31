import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit";

const auth = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
    }
});

export const fetchUsers = createAsyncThunk("Users/fetchUser",
    async ({ page }, thunkApi) => {
        try {
            const { data } = await auth({
                method: 'get',
                url: '/admin/users',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                },
                params: {
                    page
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

export const changeStatusUser = createAsyncThunk("Users/changeStatusUser",
    async (id, thunkApi) => {
        try {
            const { data } = await auth({
                method: 'post',
                url: `/admin/user/${id}/change-status`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                },
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