// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import categoryReducer from './slices/categorySlice';
import cartReducer from './slices/cartSlice';
import addressReducer from './slices/addressSlice';
import orderReducer from './slices/orderSlice';



const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    category: categoryReducer,
    cart: cartReducer,
    address: addressReducer,
    order: orderReducer,
  },
});

export default store;
