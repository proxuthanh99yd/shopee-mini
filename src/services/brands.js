import axios from "axios"

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const getBrandsApi = async () => {
    try {
        const { data } = await axios.get('/brands?page=1');
        return data
    } catch (error) {
        return error
    }
}
export const createBrandsApi = async ({ body }) => {
    try {
        const { data } = await axios.post('/brands', body);
        return data
    } catch (error) {
        return error
    }
}

export const deleteBrandsApi = async (id) => {
    try {
        const { data } = await axios.delete(`/brands/${id}}`);
        return data
    } catch (error) {
        return error
    }
}

export const updateBrandsApi = async ({ id, body }) => {
    try {
        const { data } = await axios.put(`/brands/${id}}`, body);
        return data
    } catch (error) {
        return error
    }
}