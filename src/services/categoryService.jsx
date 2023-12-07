// /src/services/productService.js
import axios from 'axios';


const url = process.env.REACT_APP_API_URL;

const categoryService = {
    create: async (data) => {
        try {
            console.log(data)
            const response = await axios.post(`${url}/product_category`,data);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    getall: async (data) => {
        try {
            console.log(data)
            const response = await axios.get(`${url}/product_category/getall`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },



    // ... other product-related API calls
};

export default categoryService;
