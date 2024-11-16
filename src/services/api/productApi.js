import axios from 'axios';

const PRODUCT_URL = 'http://localhost:8080/api/public/products';

const getProducts = async (pageNumber = 0, pageSize = 10, sortBy = 'productName', sortOrder = 'asc') => {
    try {
        const response = await axios.get(`${PRODUCT_URL}`, {
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

const getProduct = async(productId)=>{
    try{
        const response = await axios.get(`${PRODUCT_URL}/${productId}`, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        });
        return response.data;
    } catch (error){
        console.log(error);
        throw error;
    }
}

const getProductsByCategory = async(productId)=>{
    try{
        const response = await axios.get(`http://localhost:8080/api/public/categories/${productId}/products`,{
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        });
        return response.data;
    } catch (error){
        throw error;
    }
}

const searchProductsByKeyword = async(keyword) => {
    try{
        const response = await axios.get(`http://localhost:8080/api/public/products/keyword/${keyword}`, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        });
        return response.data;
    }catch (error){
        throw error;
    }
}

export default {getProducts, getProduct, getProductsByCategory, searchProductsByKeyword}