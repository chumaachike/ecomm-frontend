import axios from 'axios';

export const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // Ensure cookies or credentials are sent
  });
  

const getAllCategories = async (pageNumber = 0, pageSize = 10, sortBy = 'categoryName', sortOrder = 'asc') => {
    try {
        const response = await apiClient.get('/public/categories', {
            params: { pageNumber, pageSize, sortBy, sortOrder },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default { getAllCategories };