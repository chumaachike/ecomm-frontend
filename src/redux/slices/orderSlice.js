import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderApi from "../../services/api/orderApi";

export const getUserOrders = createAsyncThunk(
    'order/getUserOrders', async (_, { rejectWithValue }) => {
        try {
            const response = await orderApi.getUserOrders();
            return response;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }

    }
);

export const placeOrder = createAsyncThunk(
    'order/placeOrder', async(data, {rejectWithValue}) =>{
        try{
            const response = await orderApi.placeOrder(data);
            return response;
        }catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
)

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: [],
        order: null,
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
            .addCase(getUserOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserOrders.fulfilled, (state, action) => {
                const { content, pageNumber, pageSize, totalElements, totalPages, lastPage } = action.payload;
                state.orders = content;
                state.pageNumber = pageNumber;
                state.pageSize = pageSize;
                state.totalElements = totalElements;
                state.totalPages = totalPages;
                state.lastPage = lastPage;
                state.loading = false; 
            })
            .addCase(getUserOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(placeOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.order = [...state.orders, action.payload];
                state.loading = false;
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export default orderSlice.reducer;