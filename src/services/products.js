import axios from "axios"

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

export const getProductsApi = async () => {
    try {
        const { data } = await axios.get('/products?page=1');
        return { data }
    } catch (error) {
        return error
    }
}

export const getSingleProductApi = async ({ id }) => {
    try {
        const { data } = await axios.get(`/products/${id}`);
        return { data }
    } catch (error) {
        return error
    }
}

export const createProductsApi = async (value) => {
    try {
        const { data } = await axios.post('/products', value);
        return { data }
    } catch (error) {
        return error
    }
}
export const deleteProductsApi = async (id) => {
    try {
        const { data } = await axios.delete(`/products/${id}}`);
        return { data }
    } catch (error) {
        return error
    }
}
export const updateProductsApi = async ({ id, value }) => {
    try {
        const { data } = await axios.post(`/products/${id}`, value);
        return { data }
    } catch (error) {
        return error
    }
}