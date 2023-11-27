// /src/services/productService.js
import axios from 'axios';


const url = process.env.REACT_APP_API_URL;

const transactionService = {
    findByUser: async(data) => {
        try {
            console.log(data)
            const response = await axios.get(`${url}/transaction/getbypage/byuser?page=${data.page}&size=${data.size}&userid=${data.UserId}`);

            return response.data;
        } catch(error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },
    
    delete: async (id) => {
        try {
            const response = await axios.delete(`${url}/transaction/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }

    },
    update: async (id, value) => {
        try {

            console.log(`${id}, ${value}`)
            const response = await axios.put(`${url}/transaction/${id}`, { quantity: value });
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },


    getAllByPage: async (data) => {
        try {
            console.log(data)
            const response = await axios.get(`${url}/transaction/findallbylbypage?page=${data.page}&size=${data.size}&categoryname=${data.categoryname}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },



    // ... other product-related API calls
};

export default transactionService;
