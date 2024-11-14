import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartApi from "../../services/api/cartApi";

// Async thunk to add an item to the cart
export const addOrUpdateUserCart = createAsyncThunk(
    'cart/addToCart',
    async (data, { rejectWithValue }) => {
        try {
            const response = await cartApi.addOrUpdateUserCart(data);
            return response;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// Async thunk to fetch user's cart
export const getUserCart = createAsyncThunk('cart/getUserCart', async (_, { rejectWithValue }) => {
        try {
            const response = await cartApi.getUserCart();
            return response;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);


export const removeItem = createAsyncThunk('cart/removeItem', async(id, {rejectWithValue}) =>{
    try{
        const response = await cartApi.removeItem(id);
        return {productId: id, message: response}
    }catch(error){
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})

// Cart slice
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        totalPrice: 0,
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            // Add to Cart
            .addCase(addOrUpdateUserCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addOrUpdateUserCart.fulfilled, (state, action) => {
                const existingItem = state.cartItems.find(item => item.productId === action.payload.productDTO.productId);
                if (existingItem) {
                    existingItem.quantity = action.payload.quantity;
                } else {
                    action.payload.productDTO.quantity = action.payload.quantity;
                    state.cartItems.push(action.payload.productDTO);
                }
                state.totalPrice = action.payload.cartDTO.totalPrice
                state.loading = false;
            })
            .addCase(addOrUpdateUserCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get User Cart
            .addCase(getUserCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserCart.fulfilled, (state, action) => {
                const { totalPrice, products } = action.payload;
                state.cartItems = products;
                state.totalPrice = totalPrice;
                state.loading = false;
            })
            .addCase(getUserCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(removeItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeItem.fulfilled, (state, action) => {
                const { productId } = action.payload;
                // Remove the item from cartItems
                state.cartItems = state.cartItems.filter(item => item.productId !== productId);

                // Recalculate total price
                state.totalPrice = state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
                state.loading = false;
            })
            .addCase(removeItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default cartSlice.reducer;
