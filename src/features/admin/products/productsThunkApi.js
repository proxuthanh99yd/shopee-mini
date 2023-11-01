import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const products = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
    }
});

export const fetchProducts = createAsyncThunk("ManagerProducts/get",
    async ({ page = 1, param = 'all', searchParam: query }, thunkApi) => {
        try {
            const { data } = await products({
                method: 'get',
                url: `/admin/products/${param}`,
                params: {
                    page,
                    query
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth-token') || ''}`
                }
            });
            return data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const fetchCategoriesAndBrands = createAsyncThunk("CategoriesAndBrands/get",
    async (_, thunkApi) => {
        try {
            const { data } = await products({
                method: 'get',
                url: `/admin/categories_brands`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth-token') || ''}`
                }
            });
            return data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const fetchSingleProduct = createAsyncThunk("ManagerSingleProduct/get",
    async (id, thunkApi) => {
        try {
            const { data } = await products({
                method: 'get',
                url: `/admin/product/${id}`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth-token') || ''}`
                }
            });
            return data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const createProducts = createAsyncThunk("ManagerProducts/create",
    async ({ body }, thunkApi) => {
        try {
            const { data } = await products({
                method: 'post',
                url: `/admin/product`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth-token') || ''}`
                },
                data: body
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
export const deleteProducts = createAsyncThunk("ManagerProducts/delete",
    async ({ id }, thunkApi) => {
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
            const throwError = {
                data: error.response.data,
                status: error.response.status,
                headers: error.response.headers,
            }
            return thunkApi.rejectWithValue(throwError)
        }
    })
export const updateProducts = createAsyncThunk("ManagerProducts/update",
    async ({ id, value }, thunkApi) => {
        try {
            const { data } = await products({
                method: 'post',
                url: `/admin/product/${id}`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth-token') || ''}`
                },
                data: value
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

export const changeStatusProducts = createAsyncThunk("ManagerProducts/changeStatus",
    async (id, thunkApi) => {
        try {
            const { data } = await products({
                method: 'patch',
                url: `/admin/product/${id}/active`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth-token') || ''}`
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