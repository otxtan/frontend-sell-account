// /src/services/productService.js
import axios from 'axios';


const url = process.env.REACT_APP_API_URL;

const roleService = {
    create: async (data) => {
        try {
            console.log(data)
            const response = await axios.post(`${url}/role/`,data);

            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },
    findone: async (id) => {
        try {

            const response = await axios.get(`${url}/role/${id}`);

            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },
    findAll: async (id) => {
        try {

            const response = await axios.get(`${url}/role/getall`);

            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },
    delete: async (id) => {
        try {
            const response = await axios.delete(`${url}/role/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }

    },
    update: async (id, value) => {
        try {

            console.log(`${id}, ${value}`)
            const response = await axios.put(`${url}/role/${id}`, { quantity: value });
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },


    getAllByPage: async (data) => {
        try {
            console.log(data)
            const response = await axios.get(`${url}/role/findallbylbypage?page=${data.page}&size=${data.size}&categoryname=${data.categoryname}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },




    // ... other product-related API calls
};

export default roleService;
