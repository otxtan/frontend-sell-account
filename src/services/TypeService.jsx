// /src/services/productService.js
import axios from 'axios';


const url = process.env.REACT_APP_API_URL;

const typeService = {
    create: async (data) => {
        try {
            console.log(data)
            const response = await axios.post(`${url}/product_type`,data);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching :', error);
            throw error;
        }
    },

    getall: async (data) => {
        try {
            console.log(data)
            const response = await axios.get(`${url}/product_type/getall`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching :', error);
            throw error;
        }
    },



    // ... other product-related API calls
};

export default typeService;
