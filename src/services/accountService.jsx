// /src/services/productService.js
import axios from 'axios';


const url = process.env.REACT_APP_API_URL;

const accountService = {
    create: async (data) => {
        try {
            console.log(data)
            const response = await axios.post(`${url}/account/`, data);
            return response.data;
        } catch (error) {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    findAllAccountSubscriptonplanProductByPage: async (data) => {
        try {
            console.log(data)
            const response = await axios.get(`${url}/account/findAllAccountSubscriptonplanProductByPage?page=${data.page}&size=${data.size}&information=${data.information}` );
            return response.data;
        } catch (error) {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    findOne: async (data) => {
        try {
            console.log(data)
            const response = await axios.get(`${url}/account/${data.id}` );
            return response.data;
        } catch (error) {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    delete: async (data) => {
        try {
            console.log(data)
            const response = await axios.delete(`${url}/account/${data.id}` );
            return response.data;
        } catch (error) {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    update: async (id,data) => {
        try {
            console.log(data)
            const response = await axios.put(`${url}/account/${id}`,data );
            return response.data;
        } catch (error) {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    
};
export default accountService;
