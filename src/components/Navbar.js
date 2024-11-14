// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import '../assets/styles/navbar.css'; // Import CSS
import { signout } from '../redux/slices/authSlice'; // Assuming logout is available

const Navbar = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleLogout = () => {
        dispatch(signout());
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">MyApp</Link>
            </div>
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
