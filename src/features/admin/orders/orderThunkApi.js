import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit";

const auth = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
    }
});

export const fetchOrders = createAsyncThunk("ManagerOrders/fetchOrders",
    async ({ page, filter }, thunkApi) => {
        try {
            const { data } = await auth({
                method: 'get',
                url: `/admin/orders/${filter}`,
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

export const fetchSingleOrder = createAsyncThunk("ManagerOrders/fetchSingleOrder",
    async (id, thunkApi) => {
        try {
            const { data } = await auth({
                method: 'get',
                url: `/admin/order/${id}`,
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

export const changeStatusOrders = createAsyncThunk("ManagerOrders/changeStatusOrders",
    async ({ id, value }, thunkApi) => {
        let status = value;
        if (value == 0) {
            status = 'waiting'
        }
        if (value == 1) {
            status = 'shipping'
        }
        if (value == 2) {
            status = 'completed'
        }
        try {
            const { data } = await auth({
                method: 'put',
                url: `/admin/order/${id}/${status}`,
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

