import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const order = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
    }
});

export const createOrder = createAsyncThunk("Order/post",
    async (body, thunkApi) => {
        try {
            const { data } = await order({
                method: "post",
                url: '/orders',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                },
                data: {
                    cartId: body
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

export const getMyOrder = createAsyncThunk("Order/get",
    async (param = "all", thunkApi) => {
        try {
            const { data } = await order({
                method: "get",
                url: `/orders/${param}`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
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

export const cancelOrders = createAsyncThunk("Order/cancelOrders",
    async (id, thunkApi) => {
        try {
            const { data } = await order({
                method: 'put',
                url: `orders/${id}/cancel`,
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