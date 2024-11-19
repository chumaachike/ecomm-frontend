import { apiClient } from "../apiClient";

const getProducts = async (pageNumber = 0, pageSize = 10, sortBy = 'productName', sortOrder = 'asc') => {
    try {
        const response = await apiClient.get('/public/products', {
            params: { pageNumber, pageSize, sortBy, sortOrder },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getProduct = async (productId) => {
    try {
        const response = await apiClient.get(`/public/products/${productId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getProductsByCategory = async (productId) => {
    try {
        const response = await apiClient.get(`/public/categories/${productId}/products`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const searchProductsByKeyword = async (keyword) => {
    try {
        const response = await apiClient.get(`/public/products/keyword/${keyword}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default { getProducts, getProduct, getProductsByCategory, searchProductsByKeyword };