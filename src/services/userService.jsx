// /src/services/productService.js
import axios from 'axios';


const url= process.env.REACT_APP_API_URL;

const userService = {
  getAllPayment: async () => {
    try {
      
      const response = await axios.get(`${url}/payment_method/getall`);
      return response.data;
    } catch (error) {
      console.error('Error fetching payment:', error);
      throw error;
    }
  },

  // ... other product-related API calls
};

export default userService;
