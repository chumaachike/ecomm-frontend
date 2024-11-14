import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoriesApi from "../../services/api/categoriesApi";

export const getCategories = createAsyncThunk(
    'category/getCategories',
    async ({ pageNumber = 0, pageSize = 10, sortBy = 'categoryName', sortOrder = 'asc' }, { rejectWithValue }) => {
        try {
            const response = await categoriesApi.getAllCategories(pageNumber, pageSize, sortBy, sortOrder);
            return response;
        } catch (error) {
            return rejectWithValue(
                error.response ? error.response.data : "Network or server error"
            );
        }
    }
);

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        category: null,
        pageNumber: 0,
        pageSize: 10,
        totalElements: 0,
        totalPages: 0,
        lastPage: false,
        loading: false,
        error: null,
    },
    reducers: {
        clearCategories: (state) => {
            state.categories = [];
            state.pageNumber = 0;
            state.totalElements = 0;
            state.totalPages = 0;
            state.lastPage = false;
            state.error = null;
        },
        setSelectedCategory: (state, action) => {
            state.category = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                const { content, pageNumber, pageSize, totalElements, totalPages, lastPage } = action.payload;
                state.categories = content;
                state.pageNumber = pageNumber;
                state.pageSize = pageSize;
                state.totalElements = totalElements;
                state.totalPages = totalPages;
                state.lastPage = lastPage;
                state.loading = false;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "An error occurred.";
            });
    },
});

export const { clearCategories, setSelectedCategory } = categorySlice.actions;
export default categorySlice.reducer;
