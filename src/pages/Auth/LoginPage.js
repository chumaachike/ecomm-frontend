import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../redux/slices/authSlice';
import '../../assets/styles/loginPage.css';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ username, password })); 
    };

    useEffect(() => {
        if (auth.user) {
            navigate('/');
        }
    }, [auth.user, navigate]);

    return (
        <div className="login-container">
            <h2>Login</h2>
            {auth.error && <p className="error-message">{auth.error.message}</p>}
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <p className="signup-link">
                Don't have an account? <Link to="/register">Sign up here</Link>.
            </p>
        </div>
    );
}

export default LoginPage;
