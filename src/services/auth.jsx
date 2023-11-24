// /src/services/productService.js
import axios from 'axios';


const url = process.env.REACT_APP_API_URL;

const authService = {
    register: async (data) => {
        try {
            console.log(data)
            const response = await axios.post(`${url}/auth/register`, data);
            return response.data;
        } catch (error) {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    login: async (data) => {
        try {
            console.log(data)
            const response = await axios.post(`${url}/auth/signin`, data);
            return response.data;
        } catch (error) {
            console.error('Error fetching :', error);
            throw error;
        }
    }
};
export default authService;
