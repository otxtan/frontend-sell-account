// /src/services/productService.js
import axios from 'axios';


const url = process.env.REACT_APP_API_URL;

const cartService = {
    checkVoucher: async(data)=>{
        try {
            // console.log(data)
            const response = await axios.post(`${url}/cart/checkout`,data);
            console.log(response);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            // throw error;
            
        }

    },
    getCartByUser: async (id) => {
        try {

            const response = await axios.get(`${url}/cart/getallbyuser/${id}`);
            
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },
    addToCart: async(plan) => {
        try {

            console.log(plan)
            const response = await axios.post(`${url}/cart`,plan);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },
    deleteItem: async(id)=>{
        try{
            const response = await axios.delete(`${url}/cart/${id}`);
            return response.data;
        }catch(error){
            console.error('Error fetching products:', error);
            throw error;
        }

    },
    updateCart: async(id,value)=>{
        try {

           console.log(`${id}, ${value}`)
            const response = await axios.put(`${url}/cart/${id}`,{quantity:value});
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

export default cartService;
