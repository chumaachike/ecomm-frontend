// src/components/ProtectedRoute.js
import React, { useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie';
import { selectIsAuthenticated, validateToken } from '../redux/slices/authSlice';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const loading = useSelector((state) => state.auth.loading);
    const token = Cookies.get('springBootEcom');
    const dispatch = useDispatch();

    useEffect(() => {
        if (token) {
            dispatch(validateToken(token));
        }
    }, [dispatch, token]);

    if (loading) {
        return <div>Loading...</div>; // Optional: Show a loading indicator
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
