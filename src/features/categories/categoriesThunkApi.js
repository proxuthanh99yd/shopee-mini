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
    async () => {
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
            return error
        }
    })
export const createCategories = createAsyncThunk("Categories/create",
    async ({ body }) => {
        try {
            const { data } = await categories({
                method: 'post',
                url: '/categories',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                },
                data: body
            })
            return data
        } catch (error) {
            return error
        }
    })
export const deleteCategories = createAsyncThunk("Categories/delete",
    async ({ id }) => {
        try {
            const { data } = await categories({
                method: 'delete',
                url: `/categories/${id}`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                },
            })
            return data
        } catch (error) {
            return error
        }
    })
export const updateCategories = createAsyncThunk("Categories/update",
    async ({ id, body }) => {
        try {
            const { data } = await categories({
                method: 'put',
                url: `/categories/${id}`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                },
                data: body
            })
            return data
        } catch (error) {
            return error
        }
    })