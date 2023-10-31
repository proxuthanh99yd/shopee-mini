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
    async ({ sort, brandFilter: brand, categoryFilter: category, page = 1 }, thunkApi) => {
        try {
            const { data } = await products({
                method: 'get',
                url: `/products`,
                params: {
                    page,
                    sort,
                    brand,
                    category
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

export const fetchSingleProduct = createAsyncThunk("SingleProduct/get",
    async ({ id }, thunkApi) => {
        try {
            const { data } = await products({
                method: 'get',
                url: `/product/${id}`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth-token') || ''}`
                }
            });

            const sameProducts = await products({
                method: 'get',
                url: `/products?sort=updated_at.desc&category=${data.categories.name}`,
            });

            data.sameProducts = sameProducts.data;

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

