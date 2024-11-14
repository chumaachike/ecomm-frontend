// src/components/ProtectedRoute.js
import React, { useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie';
import { selectIsAuthenticated, validateToken } from '../redux/slices/authSlice';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const token = Cookies.get('springBootEcom');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(validateToken(token));
    }, [dispatch, token])


    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
