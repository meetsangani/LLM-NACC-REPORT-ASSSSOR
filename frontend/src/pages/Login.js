// filepath: d:\Hackathon\LLM-NAAC-Report-Assessor\frontend\src\pages\Login.js
import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate, useLocation } from 'react-router-dom';
import '../assets/styles/Auth.css';

const Login = ({ setAuth }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await loginUser(formData);
            setSuccess(response.message || 'Login successful!');
            localStorage.setItem('token', response.token); // Save the token
            setAuth(true);

            // Redirect to the previous page or home
            const redirectPath = location.state?.from || '/';
            setTimeout(() => {
                navigate(redirectPath);
            }, 2000);
        } catch (error) {
            setError(
                (error.response && error.response.data && error.response.data.message) ||
                'Login failed. Please try again.'
            );
        }
    };

    return (
        <div className="auth-page">
            <div className="header-line"></div>
            <div className="auth-container">
                <h2>Login</h2>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
                <p className="register-link">
                    Don't have an account? <a href="/register">Register</a>
                </p>
            </div>
        </div>
    );
};

export default Login;