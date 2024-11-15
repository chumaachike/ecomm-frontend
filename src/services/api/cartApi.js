import axios from "axios";

// Centralized axios instance (optional, for reuse)
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensure cookies or credentials are sent
});

const addOrUpdateUserCart = async ({ productId, quantity }) => {
  try {
    const response = await apiClient.post(`/carts/products/${productId}/quantity/${quantity}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getUserCart = async () => {
  try {
    const response = await apiClient.get('/carts/users/cart');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const removeItem = async (id) => {
  try {
    const response = await apiClient.delete(`/carts/product/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default { addOrUpdateUserCart, getUserCart, removeItem };
