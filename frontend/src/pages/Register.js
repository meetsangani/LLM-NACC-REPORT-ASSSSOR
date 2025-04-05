import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../assets/styles/Auth.css';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', username: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await registerUser(formData);
            if (response.otpSent) {
                setSuccess(response.message || 'Registration successful! Please verify your OTP.');
                setFormData({ name: '', email: '', password: '', username: '' });

                // Redirect to OTP verification page after successful registration
                navigate(`/verify-otp/${response.userId}`);
            } else {
                setError("Failed to send OTP. Please check your email configuration or try again later.");
            }
        } catch (error) {
            setError(
                (error.response && error.response.data && error.response.data.message) ||
                'Registration failed. Please try again.'
            );
        }
    };

    return (
        <div className="auth-page">
            <div className="header-line"></div>
            <div className="auth-container">
                <h2>Create Account</h2>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
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
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Register</button>
                </form>
                <p className="register-link">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Register;