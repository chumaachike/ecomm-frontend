import axios from "axios";

const API_URL = "http://localhost:8080/api/public/categories";

const getAllCategories = async (pageNumber = 0, pageSize = 10, sortBy = 'categoryName', sortOrder = 'asc') => {
    try {
        const response = await axios.get(`${API_URL}`, {
            params: { pageNumber, pageSize, sortBy, sortOrder },
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export default {getAllCategories};