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
    update: async (id, data) => {
        try {

            console.log(`${id}, ${data}`)
            const response = await axios.put(`${url}/transaction/${id}`, { quantity: data });
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },
    confirmPayment: async (id, data) => {
        try {

            console.log( data)
            const response = await axios.put(`${url}/transaction/confirmPayment/${id}`,data);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },


    getAllByPage: async (data) => {
        try {
            console.log(data)
            const response = await axios.get(`${url}/transaction/getbypage?page=${data.page}&size=${data.size}&transaction_status=${data.transaction_status}`);
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
