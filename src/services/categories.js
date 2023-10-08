import axios from "axios"

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const getCategoriesApi = async () => {
    try {
        const { data } = await axios.get('/categories?page=1');
        return { data }
    } catch (error) {
        return error
    }
}
export const createCategoriesApi = async (value) => {
    try {
        const { data } = await axios.post('/categories', value);
        return { data }
    } catch (error) {
        return error
    }
}
export const deleteCategoriesApi = async (id) => {
    try {
        const { data } = await axios.delete(`/categories/${id}}`);
        return { data }
    } catch (error) {
        return error
    }
}
export const updateCategoriesApi = async ({ id, ...value }) => {
    try {
        const { data } = await axios.put(`/categories/${id}}`, value);
        return { data }
    } catch (error) {
        return error
    }
}