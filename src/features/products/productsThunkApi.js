import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const products = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
    }
});
export const fetchProducts = createAsyncThunk("Products/get",
    async (_, thunkApi) => {
        try {
            const { data } = await products({
                method: 'get',
                url: `/products`,
                params: {
                    page: 1,
                }
            });
            return data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const fetchSingleProduct = createAsyncThunk("SingleProduct/get",
    async ({ id }, thunkApi) => {
        try {
            const { data } = await products({
                method: 'get',
                url: `/admin/products/${id}`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth-token') || ''}`
                }
            });
            return data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const createProducts = createAsyncThunk("Products/create",
    async ({ body }) => {
        try {
            const { data } = await products({
                method: 'post',
                url: `/admin/products`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth-token') || ''}`
                },
                data: body
            });
            return data
        } catch (error) {
            return error
        }
    })
export const deleteProducts = createAsyncThunk("Products/delete",
    async ({ id }) => {
        try {
            const { data } = await products({
                method: 'delete',
                url: `/admin/products/${id}`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth-token') || ''}`
                },
            });
            return data
        } catch (error) {
            return error
        }
    })
export const updateProducts = createAsyncThunk("Products/update",
    async ({ id, body }) => {
        try {
            const { data } = await products({
                method: 'post',
                url: `/admin/products/${id}`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth-token') || ''}`
                },
                data: body
            });
            return data
        } catch (error) {
            return error
        }
    })