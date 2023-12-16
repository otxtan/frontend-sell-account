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
    },
    findOneIncludeCategoryOrProduct: async(code)=>{
        try {
            
            const response = await axios.get(`${url}/voucher/findOneIncludeCategoryOrProduct/${code}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },
    delete: async(code)=>{
        try {
            
            const response = await axios.delete(`${url}/voucher/${code}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },
    findAllVoucherCategoryProductByPage: async(data)=>{
        try {
            console.log(data)
            const response = await axios.get(`${url}/voucher/findAllVoucherCategoryProductByPage?page=${data.page}&size=${data.size}&is_fixed_discount=${data.is_fixed_discount}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },
    create: async(data)=>{
        try {
            
            const response = await axios.post(`${url}/voucher/`,data);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },
    updateVoucherVoucherCategoryProduct: async(code,data)=>{
        try {
            
            const response = await axios.put(`${url}/voucher/updateVoucherVoucherCategoryProduct/${code}`,data);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    // ... other product-related API calls
};

export default voucherService;
