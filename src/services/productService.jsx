// /src/services/productService.js
import axios from 'axios';


const url= process.env.REACT_APP_API_URL;

const productService = {
  getProduct: async (id) => {
    try {
      
      const response = await axios.get(`${url}/product/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
  getProductDetail: async (id) => {
    try {
      
      const response = await axios.get(`${url}/product/detail/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
  getAllProducts: async () => {
    try {
      const response = await axios.get(`${url}/product/getall`);

      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
  getAllProductsByPage: async (data) => {
    try {
      console.log(data)
      const response = await axios.get(`${url}/product/findallbylbypage?page=${data.page}&size=${data.size}&categoryname=${data.categoryname}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },



  // ... other product-related API calls
};

export default productService;
