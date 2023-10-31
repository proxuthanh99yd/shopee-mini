import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const carts = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
    }
});

export const addCart = createAsyncThunk("myCarts/post",
    async ({ body }, thunkApi) => {
        try {
            const { data } = await carts({
                method: "post",
                url: '/carts',
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

export const buyNowCart = createAsyncThunk("buyNowCart/post",
    async ({ body }, thunkApi) => {
        try {
            const { data } = await carts({
                method: "post",
                url: '/carts',
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
export const fetchMyCarts = createAsyncThunk("myCarts/get",
    async (_, thunkApi) => {
        try {
            const { data } = await carts({
                method: "get",
                url: '/carts',
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

export const updateCart = createAsyncThunk("myCarts/put",
    async ({ id, body }, thunkApi) => {
        try {
            const { data } = await carts({
                method: "put",
                url: `/carts/${id}`,
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

export const deleteCart = createAsyncThunk("myCarts/delete",
    async ({ id }, thunkApi) => {
        try {
            const { data } = await carts({
                method: "delete",
                url: `/carts/${id}`,
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