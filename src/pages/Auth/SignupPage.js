import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import { signup } from '../../redux/slices/authSlice';
import '../../assets/styles/signupPage.css'; // Import CSS

function SignupPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        if (auth.user) {
            navigate('/');
        }
    }, [auth.user, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signup({ username, email, password }))
            .then((result) => {
                if (signup.fulfilled.match(result)) {
                    navigate('/login');
                }
            });
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            {auth.error && <p className="error-message">{auth.error.message}</p>}
            <form className="signup-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
            <p className="login-link">
                Already have an account? <Link to="/login">Log in here</Link>.
            </p>
        </div>
    );
}

export default SignupPage;
