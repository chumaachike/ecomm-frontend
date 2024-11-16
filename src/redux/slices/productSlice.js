import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productApi from "../../services/api/productApi";

export const getProducts = createAsyncThunk('product/getProducts', 
  async ({ pageNumber = 0, pageSize = 10, sortBy = 'productName', sortOrder = 'asc' }, { rejectWithValue }) => {
    try {
      const response = await productApi.getProducts(pageNumber, pageSize, sortBy, sortOrder);
      return response;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const getProductById = createAsyncThunk('product/getProduct',async(data, {rejectWithValue}) =>{
  try{
    const response = await productApi.getProduct(data);
    return response;
  } catch(error){
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const getProductsByCategory = createAsyncThunk( 'product/categoryProduct', async(id, {rejectWithValue})=>{
  try{
    const response = await productApi.getProductsByCategory(id);
    return response;
  }catch (error) {
    return rejectWithValue(error.response? error.response.data : error.message);
  }
})

export const getProductsByKeyword = createAsyncThunk(
  'product/getProductByKeyword', async(keyword, {rejectWithValue}) =>{
  try {
    const response = await productApi.searchProductsByKeyword(keyword);
    return response;
  } catch (error){
    console.log(error);
    return rejectWithValue(error.response? error.response.data : error.message);
  }
})

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    product: null,
    pageNumber: 0,
    pageSize: 50,
    totalElements: 0,
    totalPages: 0,
    lastPage: false,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        const { content, pageNumber, pageSize, totalElements, totalPages, lastPage } = action.payload;

        state.products = content;
        state.pageNumber = pageNumber;
        state.pageSize = pageSize;
        state.totalElements = totalElements;
        state.totalPages = totalPages;
        state.lastPage = lastPage;
        state.loading = false; // Reset loading
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false; // Reset loading
        state.error = action.payload; // Set error message
      })
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProductsByCategory.pending, (state)=> {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) =>{
        const { content, pageNumber, pageSize, totalElements, totalPages, lastPage } = action.payload;

        state.products = content;
        state.pageNumber = pageNumber;
        state.pageSize = pageSize;
        state.totalElements = totalElements;
        state.totalPages = totalPages;
        state.lastPage = lastPage;
        state.loading = false; // Reset loading
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProductsByKeyword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsByKeyword.fulfilled, (state, action) => {
        const { content, pageNumber, pageSize, totalElements, totalPages, lastPage } = action.payload;
        state.products = content;
        state.pageNumber = pageNumber;
        state.pageSize = pageSize;
        state.totalElements = totalElements;
        state.totalPages = totalPages;
        state.lastPage = lastPage;
        state.loading = false;
      })
      .addCase(getProductsByKeyword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default productSlice.reducer;
