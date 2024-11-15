// src/App.js
import React, { useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cookies from 'js-cookie';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import ProductDetails from './components/ProductDetails';
import { validateToken, loadUser } from './redux/slices/authSlice';
import CategoryProduct from './pages/CategoryProducts';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import CheckoutPage from './pages/CheckoutPage';

function App() {
    const dispatch = useDispatch();

    useEffect(()=>{
        const token = Cookies.get('springBootEcom');
        if (token) {
            dispatch(validateToken(token))
                .unwrap()
                .then(({isValid, user})=> {
                    if (isValid && user){
                        dispatch(loadUser(user));
                    }
                })
                .catch(() => {
                    Cookies.remove('springBootEcom');
                })
        }
    }, [dispatch])
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<SignupPage />} />
                <Route path="/products/:id" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
                <Route path="categories/:id" element={<ProtectedRoute><CategoryProduct /></ProtectedRoute>} />
                <Route path='/cart' element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
                <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                <Route path='orders' element={<ProtectedRoute><OrderPage /></ProtectedRoute>} />
                <Route path='checkout' element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
