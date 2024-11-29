import { apiClient } from "../apiClient";

const getAllCategories = async (pageNumber = 0, pageSize = 10, sortBy = 'categoryName', sortOrder = 'asc') => {
    try {
        const response = await apiClient.get('/public/categories', {
            params: { pageNumber, pageSize, sortBy, sortOrder },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default { getAllCategories };