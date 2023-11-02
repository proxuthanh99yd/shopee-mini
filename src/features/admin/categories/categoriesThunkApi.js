import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const categories = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
    }
});
export const fetchCategories = createAsyncThunk("ManagerCategories/get",
    async ({ page }, thunkApi) => {
        try {
            const { data } = await categories({
                method: 'get',
                url: '/categories',
                params: {
                    page
                }
            })
            return data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const createCategories = createAsyncThunk("ManagerCategories/create",
    async ({ body }, thunkApi) => {
        try {
            const { data } = await categories({
                method: 'post',
                url: '/admin/category',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                },
                data: body
            })
            return data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const deleteCategories = createAsyncThunk("ManagerCategories/delete",
    async ({ id }, thunkApi) => {
        try {
            const { data } = await categories({
                method: 'delete',
                url: `/admin/category/${id}`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                },
            })
            return data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const updateCategories = createAsyncThunk("ManagerCategories/update",
    async ({ id, body }, thunkApi) => {
        try {
            const { data } = await categories({
                method: 'put',
                url: `/admin/category/${id}`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                },
                data: body
            })
            return data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })