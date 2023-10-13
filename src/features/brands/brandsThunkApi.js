import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const brands = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
    }
});
export const fetchBrands = createAsyncThunk("Brands/get",
    async () => {
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
            return error
        }
    })
export const createBrands = createAsyncThunk("Brands/create",
    async ({ body }) => {
        try {
            const { data } = await brands({
                method: 'post',
                url: '/brands',
                data: body
            })
            return data
        } catch (error) {
            return error
        }
    })
export const deleteBrands = createAsyncThunk("Brands/delete",
    async ({ id }) => {
        try {
            const { data } = await brands({
                method: 'delete',
                url: `/brands/${id}`
            })
            return data
        } catch (error) {
            return error
        }
    })
export const updateBrands = createAsyncThunk("Brands/update",
    async ({ id, body }) => {
        try {
            const { data } = await brands({
                method: 'delete',
                url: `/brands/${id}`,
                data: body
            })
            return data
        } catch (error) {
            return error
        }
    })