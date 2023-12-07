import axios from 'axios';


const url = process.env.REACT_APP_API_URL;

const subscriptionPlan = {
    create: async (data) => {
        try {

            const response = await axios.post(`${url}/subscription_plan/`,data);

            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },
    update: async (data) => {
        try {

            const response = await axios.put(`${url}/subscription_plan/${data.id}`,data);
            console.log(response)
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },
    delete: async (data) => {
        try {

            const response = await axios.delete(`${url}/subscription_plan/${data.id}`);
            console.log(response)
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },
    findAll: async (data) => {
        try {
            console.log(data)
            const response = await axios.get(`${url}/subscription_plan/getall/?productid=${data.ProductId||''}`);

            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },
    
}
export default subscriptionPlan;