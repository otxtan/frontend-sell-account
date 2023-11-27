// /src/services/productService.js
import axios from 'axios';


const url = process.env.REACT_APP_API_URL;

const customerService = {
    findone: async (id) => {
        try {

            const response = await axios.get(`${url}/customer/${id}`);

            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },
    delete: async (id) => {
        try {
            const response = await axios.delete(`${url}/customer/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }

    },
    update: async (id, value) => {
        try {

            console.log(`${id}, ${value}`)
            const response = await axios.put(`${url}/customer/${id}`, { quantity: value });
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },


    getAllByPage: async (data) => {
        try {
            console.log(data)
            const response = await axios.get(`${url}/customer/findallbylbypage?page=${data.page}&size=${data.size}&categoryname=${data.categoryname}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },



    // ... other product-related API calls
};

export default customerService;
