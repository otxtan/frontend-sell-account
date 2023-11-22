// /src/services/productService.js
import axios from 'axios';


const url = process.env.REACT_APP_API_URL;

const voucherService = {
    
    getvoucherbyproductcategory: async(product) => {
        try {
            
            const response = await axios.post(`${url}/voucher/getbyproductcategory`,product);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },
    findVoucher: async(code)=>{
        try {
            
            const response = await axios.get(`${url}/voucher/${code}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }


    // ... other product-related API calls
};

export default voucherService;
