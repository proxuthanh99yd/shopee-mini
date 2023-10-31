import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit";

const dashboard = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
    }
});

export const fetchDashboard = createAsyncThunk("Dashboard/fetchDashboard",
    async (_, thunkApi) => {
        try {
            const { data } = await dashboard({
                method: 'get',
                url: '/admin/dashboard',
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
