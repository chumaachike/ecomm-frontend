import axios from "axios";


// Centralized axios instance (optional, for reuse)
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // Ensure cookies or credentials are sent
  });

  const getUserOrders = async () =>{
    try{
        const response = await apiClient.get('/orders/user')
        return response.data;
    }catch(error){
        throw error;
    }
  }

  const placeOrder = async (data) => {
    try {
        console.log(data);
        const response = await apiClient.post('order/cart/', data);
        return response.data;  // Return response data if request is successful
    } catch (error) {
       throw error;
    }
};



  export default {getUserOrders, placeOrder}