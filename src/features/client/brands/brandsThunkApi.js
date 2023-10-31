import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const brands = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
    }
});
export const fetchBrands = createAsyncThunk("Brands/get",
    async (_, thunkApi) => {
        try {
            const { data } = await brands({
                method: 'get',
                url: '/brands',
                params: {
                    page: 1
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
