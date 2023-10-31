import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const brands = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
    }
});
export const fetchBrands = createAsyncThunk("ManagerBrands/get",
    async ({ page }, thunkApi) => {
        try {
            const { data } = await brands({
                method: 'get',
                url: '/brands',
                params: {
                    page
                }
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
export const createBrands = createAsyncThunk("ManagerBrands/create",
    async ({ body }, thunkApi) => {
        try {
            const { data } = await brands({
                method: 'post',
                url: '/admin/brands',
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
export const deleteBrands = createAsyncThunk("ManagerBrands/delete",
    async ({ id }, thunkApi) => {
        try {
            const { data } = await brands({
                method: 'delete',
                url: `/admin/brands/${id}`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                },
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
export const updateBrands = createAsyncThunk("ManagerBrands/update",
    async ({ id, body }, thunkApi) => {
        try {
            const { data } = await brands({
                method: 'put',
                url: `/admin/brands/${id}`,
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