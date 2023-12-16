// /src/services/productService.js
import axios from 'axios';


const url = process.env.REACT_APP_API_URL;

const productService = {
  create: async (data) => {
    try {
      const response = await axios.post(`${url}/product/`, data);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
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
  getAllProductsByCategoryByPage: async (data) => {
    try {
      console.log(data)
      const response = await axios.get(`${url}/product/findallbyCategoryNamebypage?page=${data.page}&size=${data.size}&categoryname=${data.categoryname}`);
     
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
  getAllProductsDetailByPage: async (data) => {
    try {
      console.log(data)
      const response = await axios.get(`${url}/product/findAllProductDetailByPage?page=${data.page}&size=${data.size}&name=${data.name}`);
     
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  findAllProductCheckOut: async (data) => {
    try {
      console.log(data)
      const response = await axios.post(`${url}/product/getProductCheckOut`,data);

      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  getAllProductsCategoryTypeByPage: async (data) => {
    try {

      console.log(data)
      const response = await axios.get(`${url}/product/findallproductcategorytypebypage?page=${data.page}&size=${data.size}&categoryid=${data.categoryid}&typeid=${data.typeid}&name=${data?.name}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
  findOne: async (data) => {
    try {

      console.log(data)
      const response = await axios.get(`${url}/product/${data.id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }

  },
  update: async (id, data) => {
    try {

      console.log(data)
      const response = await axios.put(`${url}/product/${id}`,
        {
          ProductTypeId: data.ProductTypeId,
          ProductCategoryId: data.ProductCategoryId,
          name: data.name,
          description: data.description,
          content: data.content,
          image: data.image,
          thumbnail: data.thumbnail,
          published: data.published
        });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }

  },
  delete: async (id) => {
    try {
      const response = await axios.delete(`${url}/product/${id}`);
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
