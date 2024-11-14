// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import authApi from '../../services/api/authApi';

export const login = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
    try {
        const response = await authApi.login(data);
        return response;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

export const signup = createAsyncThunk('auth/signup', async (data, { rejectWithValue }) => {
    try {
        console.log(data);
        const response = await authApi.signup(data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

export const signout = createAsyncThunk('auth/signout', async () => {
    return await authApi.signout();
});

export const validateToken = createAsyncThunk('auth/validateToken', async (token) =>{
    return await authApi.validateToken(token);
})

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;
export const selectUser = (state) => state.auth.user;

export const selectAuthStatus = createSelector(
    [selectIsAuthenticated, selectLoading],
    (isAuthenticated, isLoading) => ({
        isAuthenticated,
        isLoading,
    })
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        roles: [],
        id: null,
        token: Cookies.get('springBootEcom') || null,
        isAuthenticated: !!Cookies.get('springBootEcom'),
        loading: false,
        error: null
    },
    reducers: {
        loadUser(state, action) {
            state.user = action.payload.username;
            state.roles = action.payload.roles;
            state.id = action.payload.id;
            state.isAuthenticated = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                const payload = action.payload || {};
                state.user = payload.username || null;
                state.roles = payload.roles || [];
                state.id = payload.id || null;
                state.token = payload.token || null;
                state.isAuthenticated = true;
                state.loading = false;

                if (payload.token) {
                    Cookies.set('springBootEcom', payload.token, { expires: 7 });
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload || "Login failed";
                state.isAuthenticated = false;
                state.loading = false;
            })
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Signup failed";
            })
            .addCase(signout.fulfilled, (state) => {
                state.user = null;
                state.roles = [];
                state.id = null;
                state.token = null;
                state.isAuthenticated = false;
                Cookies.remove('springBootEcom');
            })
            .addCase(validateToken.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(validateToken.fulfilled, (state, action) => {
                const { isValid, user } = action.payload || {};
                state.isAuthenticated = isValid;
                if (isValid) {
                    state.user = user.username || null;
                    state.roles = user.roles || [];
                    state.id = user.id || null;
                }
                state.loading = false;
            })
            .addCase(validateToken.rejected, (state) => {
                state.isAuthenticated = false;
                state.user = null;
                state.roles = [];
                state.id = null;
                state.token = null;
                Cookies.remove('springBootEcom');
                state.loading = false;
            });
    },
});
export const { loadUser } = authSlice.actions;
export default authSlice.reducer;
