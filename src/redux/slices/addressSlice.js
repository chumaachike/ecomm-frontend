import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import addressApi from "../../services/api/addressApi";

export const getUserAddress = createAsyncThunk(
    'address/getUserAddress', async(_, {rejectWithValue}) => {
        try{
            const response = await addressApi.getUserAddress();
            return response;
        }catch(error){
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export const saveNewAddress = createAsyncThunk(
    'address/saveAddress', async(data, {rejectWithValue}) => {
        try{
            const response = await addressApi.saveAddress(data);
            return response;
        }catch(error){
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
)
const addressSlice = createSlice({
    name: 'address',
    initialState: {
        addresses: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserAddress.fulfilled, (state, action) => {
                state.addresses = action.payload
                state.loading = false
            })
            .addCase(getUserAddress.rejected, (state, action) =>{
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(saveNewAddress.pending, (state) =>{
                state.loading = true;
                state.error = null;
            })
            .addCase(saveNewAddress.fulfilled, (state, action) => {
                state.addresses = [...state.addresses,action.payload];
                state.loading = false;
            })
            .addCase(saveNewAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default addressSlice.reducer;
