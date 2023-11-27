// /src/services/productService.js
import axios from 'axios';


const url = process.env.REACT_APP_API_URL;

const transactionDetailService = {
    findbytransaction: async(data) => {
        try {
            console.log(data)
            const response = await axios.get(`${url}/transaction_detail/getallbytransaction/${data.id}`);

            return response.data;
        } catch(error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },
    
    delete: async (id) => {
        try {
            const response = await axios.delete(`${url}/transactionDetail/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }

    },
    update: async (id, value) => {
        try {

            console.log(`${id}, ${value}`)
            const response = await axios.put(`${url}/transactionDetail/${id}`, { quantity: value });
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },


    getAllByPage: async (data) => {
        try {
            console.log(data)
            const response = await axios.get(`${url}/transactionDetail/findallbylbypage?page=${data.page}&size=${data.size}&categoryname=${data.categoryname}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },



    // ... other product-related API calls
};

export default transactionDetailService;
