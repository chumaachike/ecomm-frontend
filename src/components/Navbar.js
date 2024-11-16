// src/components/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsByKeyword } from '../redux/slices/productSlice';
import '../assets/styles/navbar.css';
import { signout } from '../redux/slices/authSlice';

const Navbar = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = () => {
        dispatch(signout());
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${searchQuery}`);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">CHU-BAY</Link>
            </div>

            <form onSubmit={handleSearch} className="navbar-search-form">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            <ul className="navbar-links">
                <li>
                    <Link to="/cart">Cart</Link>
                </li>
                <li>
                    <Link to="/orders">Orders</Link>
                </li>
                {auth.user ? (
                    <li
                        className="navbar-user"
                        onMouseEnter={() => setDropdownVisible(true)}
                        onMouseLeave={() => setDropdownVisible(false)}
                    >
                        <span>{auth.user}</span>
                        {dropdownVisible && (
                            <div className="dropdown-menu">
                                <Link to="/profile">View Profile</Link>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </li>
                ) : (
                    <li>
                        <Link to="/login" className="signin-button">Sign In</Link>
                    </li>
                )}
            </ul>
        </nav>

    );
};

export default Navbar;
