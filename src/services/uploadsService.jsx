import axios from 'axios';


const url = process.env.REACT_APP_API_URL;
const uploads = {
    uploadImg: async(fileToUpload) => {
        try {
            console.log(fileToUpload)
            const response = await axios.post(url + '/uploads/cloudinary-upload', fileToUpload)
            
            return response.data;
        } catch(error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },
    
   


    // ... other product-related API calls
};

export default uploads;
