import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const categories = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
    }
});
export const fetchCategories = createAsyncThunk("Categories/get",
    async (_, thunkApi) => {
        try {
            const { data } = await categories({
                method: 'get',
                url: '/categories',
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
