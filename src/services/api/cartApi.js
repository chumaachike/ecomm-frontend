import { apiClient } from "../apiClient";

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
